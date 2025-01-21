window.addEventListener('load', () => {
    // Плавно показываем контент
    document.body.classList.add('fade-in');
    
    // Задержка для фона
    setTimeout(() => {
        document.body.classList.add('fade-in-background'); // Проявляем фон с анимацией
    }, 1000); // Фон проявляется через 1 секунду
});
