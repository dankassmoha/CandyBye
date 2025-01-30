// Массив с товаром (для демонстрации, можно подключить данные с сервера)
const products = [
    { id: 1, name: "Coca-Cola", type: "Сладкие напитки", price: 50, image: "images/coca-cola.jpg" },
    { id: 2, name: "Pepsi", type: "Сладкие напитки", price: 45, image: "images/pepsi.jpg" },
    { id: 3, name: "Sprite", type: "Безалкогольные напитки", price: 40, image: "images/sprite.jpg" },
    { id: 4, name: "Fanta", type: "Сладкие напитки", price: 55, image: "images/fanta.jpg" },
    { id: 5, name: "Вода", type: "Минеральная вода", price: 30, image: "images/water.jpg" },
    { id: 6, name: "Red Bull", type: "Энергетики", price: 100, image: "images/redbull.jpg" },
    // ... Другие товары
];

// Элементы для фильтров и отображения товаров
const productContainer = document.getElementById('product-list');
const typeFilter = document.getElementById('type-filter');
const priceFilter = document.getElementById('price-filter');
const sortFilter = document.getElementById('sort-filter');
const cartCount = document.getElementById('cart-count');
const pageLinks = document.getElementById('page-links');

// Страница товара и корзина
let currentPage = 1;
const itemsPerPage = 6;
let cart = [];

// Функция отображения товаров
function displayProducts(productsToDisplay) {
    productContainer.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>Тип: ${product.type}</p>
            <p>Цена: ${product.price} ₽</p>
            <button class="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
        `;
        productContainer.appendChild(productElement);
    });
    addCartListeners();
}

// Фильтрация товаров по типу и цене
function filterProducts() {
    let filteredProducts = products;

    // Фильтр по типу напитка
    const selectedType = typeFilter.value;
    if (selectedType !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.type === selectedType);
    }

    // Фильтр по цене
    const priceRange = priceFilter.value.split('-');
    const minPrice = parseInt(priceRange[0], 10);
    const maxPrice = parseInt(priceRange[1], 10);
    filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);

    // Сортировка
    if (sortFilter.value === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortFilter.value === 'desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    // Пагинация
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    displayProducts(paginatedProducts);
    updatePagination(filteredProducts.length);
}

// Пагинация
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    pageLinks.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            filterProducts();
        });
        pageLinks.appendChild(pageLink);
    }
}

// Обработчик добавления товара в корзину
function addCartListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'), 10);
            const product = products.find(p => p.id === productId);
            cart.push(product);
            updateCart();
        });
    });
}

// Обновление корзины
function updateCart() {
    cartCount.textContent = cart.length;
}

// Инициализация
function init() {
    // Устанавливаем начальные значения фильтров
    typeFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', filterProducts);

    // Отображаем все товары по умолчанию
    filterProducts();
}

init();
