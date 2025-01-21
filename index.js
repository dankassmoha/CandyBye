// Загружаем данные о пользователях из localStorage (если есть)
const users = JSON.parse(localStorage.getItem('users')) || {}; 

// Функция регистрации пользователя
function register() {
    const nickname = document.getElementById('nickname').value.trim();
    const password = document.getElementById('password').value;

    if (users[nickname]) {
        showMessage('Ник уже занят. Попробуйте другой.');
    } else if (nickname && password.length >= 6) {
        // Сохраняем данные пользователя: пароль и дату регистрации
        users[nickname] = {
            password: password,
            registrationDate: new Date().toLocaleDateString() // Дата регистрации
        };
        // Сохраняем обновлённые данные о пользователях в localStorage
        localStorage.setItem('users', JSON.stringify(users));
        showMessage('Регистрация успешна! Теперь войдите.');
    } else {
        showMessage('Пароль должен быть не менее 6 символов.');
    }
}

// Функция входа пользователя
function login() {
    const nickname = document.getElementById('nickname').value.trim();
    const password = document.getElementById('password').value;

    // Проверка, зарегистрирован ли пользователь и правильный ли пароль
    if (!nickname || !password) {
        showMessage('Заполните все поля!');
        return;
    }

    if (users[nickname] && users[nickname].password === password) {
        showMessage(`Добро пожаловать, ${nickname}!`, true);
        // Сохраняем ник в localStorage для использования на других страницах
        localStorage.setItem('currentUser', nickname);
        // Переход на главную страницу с анимацией
        setTimeout(() => transitionPage('main.html'), 1000);
    } else {
        showMessage('Неправильный ник или пароль.');
    }
}

// Функция для отображения сообщения
function showMessage(msg, success = false) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = msg;
    messageEl.style.color = success ? 'lightgreen' : 'red';
}

// Функция для анимации фейд перед переходом на другую страницу
function transitionPage(nextPage) {
    document.body.classList.add('fade-out');

    setTimeout(() => {
        window.location.href = nextPage;
    }, 1000); // Задержка до завершения анимации
}

// Функция для загрузки данных профиля пользователя
function loadUserProfile() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && users[currentUser]) {
        const user = users[currentUser];
        // Обновляем данные профиля
        document.querySelector('.username').textContent = currentUser;
        document.querySelector('.registration-date').textContent = `Дата регистрации: ${user.registrationDate}`;
        document.querySelector('#bonus').textContent = calculateBonus(user); // Функция для расчёта бонусных баллов
    } else {
        showMessage('Ошибка при загрузке профиля.');
    }
}

// Пример функции для вычисления бонусных баллов
function calculateBonus(user) {
    // Пример расчёта бонусов на основе времени регистрации или других данных
    const registrationDate = new Date(user.registrationDate);
    const currentDate = new Date();
    const diffDays = Math.floor((currentDate - registrationDate) / (1000 * 3600 * 24)); // Разница в днях
    return Math.min(diffDays * 10, 1000); // Примерный расчёт бонусов (макс. 1000)
}

// Добавляем анимацию проявления на странице main.html
if (window.location.pathname === 'main.html') {
    window.addEventListener('load', () => {
        document.body.classList.add('main'); // Добавляем класс для проявления страницы
    });

    AOS.init({
        duration: 1000, // Длительность анимации
        easing: 'ease-in-out', // Тип анимации
        once: true // Анимация будет проигрываться только один раз
    });
}
