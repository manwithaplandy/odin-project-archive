import { cp, mkdir, readFile, rm, writeFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const out = resolve(root, 'docs');
const repo = 'https://github.com/manwithaplandy/odin-project-archive';
const projects = [
  ['odin-recipes', 'Recipes', 'The first ingredients', 'An introduction to HTML, links, images, and a little CSS. A collection of recipes that made the fundamentals stick.', ['HTML', 'CSS'], 'Foundations', '01'],
  ['TOP-Landing-Page', 'Landing page', 'Finding the layout', 'A landing page built to practice arranging content, styling sections, and working with CSS layouts.', ['HTML', 'CSS'], 'Foundations', '02'],
  ['TOP-rock-paper-scissors', 'Rock, paper, scissors', 'Making it interactive', 'A browser game that turns JavaScript conditionals, events, and scorekeeping into a five-round challenge.', ['JavaScript', 'DOM'], 'Foundations', '03'],
  ['TOP-etch-a-sketch', 'Etch-a-sketch', 'Drawing with the DOM', 'Move your cursor across a grid to draw. An experiment with event listeners, CSS Grid, and changing the page with JavaScript.', ['JavaScript', 'CSS Grid'], 'Foundations', '04'],
  ['TOP-calculator', 'Calculator', 'Putting it together', 'The final Foundations project: a calculator with four operators, chained calculations, and rounded results.', ['JavaScript', 'HTML', 'CSS'], 'Foundations', '05'],
  ['signup-form', 'Sign-up form', 'Learning the details', 'A form layout exploring input fields, typography, and the visual structure of a sign-up screen.', ['HTML', 'CSS', 'Forms'], 'Layouts & interfaces', '06'],
  ['TOP-admin-dashboard', 'Admin dashboard', 'A more ambitious interface', 'A dashboard layout with a sidebar, project cards, and activity panels. Practice organizing a denser interface.', ['HTML', 'CSS Grid'], 'Layouts & interfaces', '07'],
  ['TOP-tictactoe', 'Tic-tac-toe', 'Thinking in objects', 'A game built to explore modules, factories, and object-oriented JavaScript, while getting familiar with TypeScript.', ['TypeScript', 'JavaScript', 'OOP'], 'Apps & games', '08'],
  ['TOP-restaurant-page', 'Restaurant page', 'Learning the toolchain', 'A deliberately cheeky fictional restaurant. A single-page site for practicing npm, Webpack, and ES modules.', ['JavaScript', 'Webpack'], 'Apps & games', '09'],
  ['TOP-todo', 'To-do list', 'Getting to know React', 'A small task app exploring components, props, state, and the basics of building a React interface.', ['React', 'JavaScript'], 'Apps & games', '10'],
  ['TOP-Battleship', 'Battleship', 'More moving pieces', 'A Battleship game built with TypeScript, exploring game boards, player logic, and interactions between objects.', ['TypeScript', 'Webpack'], 'Apps & games', '11'],
  ['javascript-exercises', 'JavaScript exercises', 'Practice, repeat, understand', 'A collection of curriculum exercises covering strings, arrays, numbers, and problem solving, with Jest tests.', ['JavaScript', 'Jest'], 'Practice', '12'],
];
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
await rm(out, { recursive: true, force: true });
await mkdir(resolve(out, 'demos'), { recursive: true });
await cp(resolve(here, 'style.css'), resolve(out, 'style.css'));
let cards = '';
for (const [name, title, subtitle, description, tags, stage, number] of projects) {
  const demo = name !== 'javascript-exercises';
  if (demo && name !== 'TOP-todo') {
    const src = name === 'TOP-restaurant-page' ? resolve(root, name, 'dist') : resolve(root, name);
    await cp(src, resolve(out, 'demos', name), { recursive: true });
  }
  let preview = false;
  try { await access(resolve(here, 'previews', name + '.png')); preview = true; } catch {}
  if (preview) {
    await mkdir(resolve(out, 'previews'), { recursive: true });
    await cp(resolve(here, 'previews', name + '.png'), resolve(out, 'previews', name + '.png'));
  }
  const art = preview ? `<img src="previews/${name}.png" alt="Preview of the ${esc(title)} project" loading="lazy" width="1200" height="750">` : `<div class="type-preview"><span>{ }</span><strong>JavaScript<br>exercises</strong><small>ONE SMALL PROBLEM AT A TIME</small></div>`;
  cards += `<article class="project" data-project="${name}"><div class="preview tone-${Number(number) % 4}">${art}<span class="number">${number}</span></div><div class="project-body"><p class="stage">${esc(stage)}</p><h3>${esc(title)}</h3><p class="subtitle">${esc(subtitle)}</p><p class="description">${esc(description)}</p><ul class="tags" aria-label="Technologies">${tags.map(tag => `<li>${esc(tag)}</li>`).join('')}</ul><div class="project-links">${demo ? `<a class="demo" href="demos/${name}/" aria-label="Open ${esc(title)} demo">Open demo <span aria-hidden="true">↗</span></a>` : '<span class="exercise-note">Exercises & tests</span>'}<a class="source" href="${repo}/tree/main/${name}" aria-label="View ${esc(title)} source code">View code <span aria-hidden="true">↗</span></a></div></div></article>\n`;
}
const todo = resolve(out, 'demos', 'TOP-todo');
await mkdir(todo, { recursive: true });
await build({ entryPoints: [resolve(root, 'TOP-todo/src/index.js')], bundle: true, minify: true, jsx: 'automatic', loader: { '.js': 'jsx' }, outfile: resolve(todo, 'app.js'), nodePaths: [resolve(here, 'node_modules')], define: { 'process.env.NODE_ENV': '"production"' } });
await writeFile(resolve(todo, 'index.html'), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>To-do list | The Odin Project Archive</title><link rel="stylesheet" href="app.css"></head><body><div id="root"></div><script src="app.js" defer></script></body></html>');
const template = await readFile(resolve(here, 'index.html'), 'utf8');
await writeFile(resolve(out, 'index.html'), template.replace('{{PROJECTS}}', cards));
await writeFile(resolve(out, '.nojekyll'), '');
console.log('Built gallery, 11 demos, and preserved original project files.');
