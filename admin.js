function addProduct() {
    const productName = prompt('Введите название товара:');
    const productCategory = prompt('Введите категорию товара:');
    const productPrice = parseFloat(prompt('Введите цену товара:'));
    const productStock = parseInt(prompt('Введите количество товара:'));

    if (!productName || isNaN(productPrice) || isNaN(productStock)) {
        alert('Ошибка: неверные данные!');
        return;
    }

    // Получение списка товаров из LocalStorage (или базы данных)
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Добавление нового товара
    products.push({
        name: productName,
        category: productCategory,
        price: productPrice,
        stock: productStock
    });

    // Сохранение обратно в LocalStorage
    localStorage.setItem('products', JSON.stringify(products));

    alert('Товар успешно добавлен!');
}

// Пример вызова функции управления пользователями
function manageUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Пользователи:', users);
    alert('Посмотрите консоль для информации о пользователях.');
}
