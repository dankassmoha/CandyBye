// Функции для работы с меню аватара
function toggleAvatarMenu() {
    const menu = document.getElementById("avatar-menu");
    if (menu) {
        menu.classList.toggle("active");
    } else {
        console.error("Элемент с id 'avatar-menu' не найден.");
    }
}

// Смена аватара
function changeAvatar() {
    const avatarInput = document.createElement("input");
    avatarInput.type = "file";
    avatarInput.accept = "image/*";
    avatarInput.onchange = function (e) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const avatar = document.getElementById("avatar");
            if (avatar) {
                avatar.src = event.target.result;
            } else {
                console.error("Элемент с id 'avatar' не найден.");
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    avatarInput.click();
}

// Удаление аватара
function removeAvatar() {
    const avatar = document.getElementById("avatar");
    if (avatar) {
        avatar.src = "image/default-avatar.jpg";
    } else {
        console.error("Элемент с id 'avatar' не найден.");
    }
}

// Обработка данных страницы при загрузке
document.addEventListener("DOMContentLoaded", () => {
    // Генерация истории заказов
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderCarousel = document.querySelector(".order-carousel");
    if (orderCarousel) {
        orderCarousel.innerHTML = orders.map(order => `
            <div class="order-item">
                ${order.name} - ${order.price} ₽
            </div>
        `).join("");
    } else {
        console.error("Элемент с классом 'order-carousel' не найден.");
    }

    // Обновление имени пользователя и даты регистрации
    const username = localStorage.getItem("currentUser");
    const usernameElement = document.querySelector(".username");
    const registrationDateElement = document.querySelector(".registration-date");

    if (username) {
        if (usernameElement) usernameElement.textContent = username;

        const userData = JSON.parse(localStorage.getItem("users")) || {};
        if (userData[username] && registrationDateElement) {
            registrationDateElement.textContent = `Дата регистрации: ${userData[username].registrationDate}`;
        }
    } else {
        if (usernameElement) usernameElement.textContent = "Не авторизован";
        if (registrationDateElement) registrationDateElement.textContent = "Дата регистрации: неизвестна";
    }

    // Логика показа/скрытия меню аватара
    const avatarMenu = document.getElementById("avatar-menu");
    const avatar = document.getElementById("avatar");

    if (avatarMenu && avatar) {
        // Показ/скрытие меню по клику на аватар
        avatar.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleAvatarMenu();
        });

        // Скрытие меню, если кликнули вне его
        document.addEventListener("click", () => {
            avatarMenu.classList.remove("active");
        });

        // Остановка распространения кликов на меню
        avatarMenu.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }
});

// Функция выхода
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// Функция для отображения/скрытия мобильного меню
function toggleMenu() {
    const nav = document.querySelector('.mobile-nav');
    nav.classList.toggle('active'); // Переключение видимости меню
}