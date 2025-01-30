let users = {};
try {
    users = JSON.parse(localStorage.getItem('users')) || {};
} catch (error) {
    console.error('Ошибка при чтении данных из localStorage:', error);
}

function register() {
    const nickname = document.getElementById('nickname').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!nickname || !password) {
        showMessage('Заполните все поля!');
        return;
    }

    // Отправляем данные на сервер
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            showMessage(data.message, true);
        }
    })
    .catch(error => {
        showMessage('Ошибка при регистрации.');
    });
}

function login() {
    const nickname = document.getElementById('nickname').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!nickname || !password) {
        showMessage('Заполните все поля!');
        return;
    }

    // Отправляем данные на сервер для авторизации
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            showMessage(data.message, true);
            if (data.message.includes('Добро пожаловать')) {
                // В сервере можно добавить сессионное хранение пользователя или токен
                setTimeout(() => transitionPage('main.html'), 1000);
            }
        }
    })
    .catch(error => {
        showMessage('Ошибка при входе.');
    });
}


function showMessage(msg, success = false) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = msg;
    messageEl.style.color = success ? 'lightgreen' : 'red';
    messageEl.style.opacity = '1';

    setTimeout(() => {
        messageEl.style.opacity = '0';
    }, 3000);
}

function transitionPage(nextPage) {
    document.body.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = nextPage;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".logo");
});
