let pw1 = document.getElementById('password');
let pw2 = document.getElementById('pass-confirm');
let errormsg = document.querySelector('.error-msg');

function checkMatch(pw1, pw2) {
    if (pw1.value === pw2.value) {
        pw1.classList.remove('error');
        pw2.classList.remove('error');
        errormsg.style.display = 'none';
    }
}

pw1.addEventListener('change', () => checkMatch(pw1, pw2));
pw2.addEventListener('change', () => checkMatch(pw1, pw2));