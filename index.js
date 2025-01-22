const users = JSON.parse(localStorage.getItem('users')) || {};

function register() {
    const nickname = document.getElementById('nickname').value.trim();
    const password = document.getElementById('password').value;

    if (users[nickname]) {
        showMessage('Ник уже занят. Попробуйте другой.');
    } else if (nickname && password.length >= 6) {
        users[nickname] = {
            password: password,
            registrationDate: new Date().toLocaleDateString()
        };
        localStorage.setItem('users', JSON.stringify(users));
        showMessage('Регистрация успешна! Теперь войдите.');
    } else {
        showMessage('Пароль должен быть не менее 6 символов.');
    }
}

function login() {
    const nickname = document.getElementById('nickname').value.trim();
    const password = document.getElementById('password').value;

    if (!nickname || !password) {
        showMessage('Заполните все поля!');
        return;
    }

    if (users[nickname] && users[nickname].password === password) {
        showMessage(`Добро пожаловать, ${nickname}!`, true);
        localStorage.setItem('currentUser', nickname);
        setTimeout(() => transitionPage('main.html'), 1000);
    } else {
        showMessage('Неправильный ник или пароль.');
    }
}

function showMessage(msg, success = false) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = msg;
    messageEl.style.color = success ? 'lightgreen' : 'red';
}

function transitionPage(nextPage) {
    document.body.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = nextPage;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".logo");
    logo.addEventListener("animationend", () => {
        logo.style.animation = "rotateLogo 5s linear infinite";
    });
});
