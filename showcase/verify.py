"""Check the published site's navigation and archived source integrity."""
import json
import subprocess
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'docs'

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.projects = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'article' and 'data-project' in attrs:
            self.projects.append(attrs['data-project'])
        for attr in ('href', 'src'):
            if attrs.get(attr):
                self.refs.append(attrs[attr])

class ShowcaseChecks(unittest.TestCase):
    def test_visitors_can_reach_every_project_and_local_asset(self):
        self.assertTrue((SITE / 'index.html').is_file(), 'The gallery has not been built')
        manifest = json.loads((ROOT / 'archive-manifest.json').read_text())
        home = Links()
        home.feed((SITE / 'index.html').read_text())
        self.assertCountEqual(home.projects, [p['name'] for p in manifest])
        demos = [r for r in home.refs if r.startswith('demos/')]
        self.assertEqual(len(demos), 11)
        for html in SITE.rglob('*.html'):
            parsed = Links()
            parsed.feed(html.read_text())
            for ref in parsed.refs:
                url = urlsplit(ref)
                if url.scheme or url.netloc or not url.path:
                    continue
                target = (SITE / unquote(url.path).lstrip('/')) if url.path.startswith('/') else html.parent / unquote(url.path)
                self.assertTrue(target.exists(), f'Broken navigation or asset: {html.relative_to(SITE)} -> {ref}')
                if target.is_dir():
                    self.assertTrue((target / 'index.html').exists(), f'Missing demo entry: {ref}')

    def test_original_project_files_remain_identical(self):
        manifest = json.loads((ROOT / 'archive-manifest.json').read_text())
        for project in manifest:
            name = project['name']
            current = subprocess.check_output(['git', 'rev-parse', f'HEAD:{name}'], cwd=ROOT, text=True).strip()
            original = subprocess.check_output(['git', 'rev-parse', project['source_commit'] + '^{tree}'], cwd=ROOT, text=True).strip()
            self.assertEqual(current, original, name)
            self.assertFalse(subprocess.check_output(['git', 'status', '--porcelain', '--', name], cwd=ROOT, text=True).strip(), name)

if __name__ == '__main__':
    unittest.main()
