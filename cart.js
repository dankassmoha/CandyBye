document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Обновление количества товаров и общей стоимости
    const updateCart = () => {
        const cartContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        const checkoutButton = document.getElementById('checkout-btn');
        const cartCountElement = document.getElementById('cart-count');

        // Очистка текущих товаров
        cartContainer.innerHTML = '';

        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.dataset.id = item.id;

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Цена: <span class="price">${item.price}</span> руб.</p>
                    <div class="quantity">
                        <button class="decrease">-</button>
                        <input type="number" value="${item.quantity}" class="quantity-input" min="1" step="1">
                        <button class="increase">+</button>
                    </div>
                    <button class="remove">Удалить</button>
                    <p class="total">${item.price * item.quantity} руб.</p>
                </div>
            `;
            cartContainer.appendChild(cartItem);

            // Обновление общей стоимости
            totalPrice += item.price * item.quantity;
        });

        // Отображение общей суммы
        totalPriceElement.textContent = totalPrice;
        cartCountElement.textContent = `(${cart.length})`;

        // Включение кнопки оформления заказа, если корзина не пуста
        checkoutButton.disabled = cart.length === 0;
    };

    // Слушатели для изменения количества и удаления товаров
    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('decrease')) {
            const itemId = e.target.closest('.cart-item').dataset.id;
            const item = cart.find(item => item.id == itemId);
            if (item.quantity > 1) {
                item.quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            }
        } else if (e.target.classList.contains('increase')) {
            const itemId = e.target.closest('.cart-item').dataset.id;
            const item = cart.find(item => item.id == itemId);
            item.quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        } else if (e.target.classList.contains('remove')) {
            const itemId = e.target.closest('.cart-item').dataset.id;
            const cartItem = e.target.closest('.cart-item');
            cartItem.classList.add('removed'); // Анимация удаления товара
            setTimeout(() => {
                cart = cart.filter(item => item.id != itemId);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            }, 300); // Задержка на время анимации
        }
    });

    // Очистка корзины
    document.getElementById('clear-cart-btn').addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    });

    // Инициализация корзины при загрузке страницы
    updateCart();
});
