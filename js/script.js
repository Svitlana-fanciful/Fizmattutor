document.addEventListener('DOMContentLoaded', function() {
    const expandButton = document.getElementById('expandButton');
    const expandedContent = document.getElementById('expandedContent');
    const links = expandedContent.querySelectorAll('.links a');

    window.onload = function() {
    // Проверяем, является ли устройство мобильным
    if (window.innerWidth <= 768) { // Например, 768 пикселей для мобильных
        setTimeout(() => {
            if (window.location.hash) {
                window.location.hash = ''; // Убираем хеш из URL
                window.scrollTo(0, 0); // Прокручиваем страницу к началу
            }
            // Прокручиваем страницу вверх с учетом высоты меню
            const menuHeight = 60; // Укажите высоту вашего меню
            window.scrollTo(0, menuHeight);
        }, 100); // Задержка в 100 миллисекунд
    }
};
    

    function restoreMenuButton() {
        // Восстанавливаем первоначальный текст кнопки
        const menuIcon = document.createElement('img');
        menuIcon.src = 'svg/menu.svg';
        menuIcon.alt = 'menu';
        menuIcon.classList.add('menu-icon');

        const menuText = document.createElement('span');
        menuText.textContent = 'Меню';

        // Очищаем содержимое кнопки и добавляем первоначальные элементы
        expandButton.textContent = '';
        expandButton.appendChild(menuIcon);
        expandButton.appendChild(menuText);
    }

    if (expandButton && expandedContent) {
        expandButton.addEventListener('click', function(e) {
            e.preventDefault();
            expandedContent.classList.toggle('visible');

            if (expandedContent.classList.contains('visible')) {
                // Меняем иконку и текст при раскрытии
                const menuIcon = document.createElement('img');
                menuIcon.src = 'svg/krest.svg';
                menuIcon.alt = 'menu';
                menuIcon.classList.add('menu-icon');

                const menuText = document.createElement('span');
                menuText.textContent = 'Меню';

                // Очищаем содержимое кнопки и добавляем новые элементы
                expandButton.textContent = '';
                expandButton.appendChild(menuIcon);
                expandButton.appendChild(menuText);
            } else {
                // Восстанавливаем первоначальное состояние кнопки
                restoreMenuButton();
            }
        });

        // Добавляем обработчик клика для ссылок, чтобы сворачивать меню и восстанавливать иконку
        links.forEach(link => {
            link.addEventListener('click', () => {
                expandedContent.classList.remove('visible');
                restoreMenuButton();
            });
        });
    }
    
// Анимации на скролле
    const navbar = document.querySelector('.navbar');
    const textBlocks = document.querySelectorAll('.text-block');
    const horizontalBlocks = document.querySelectorAll('.horizontal-block');

    function checkScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        textBlocks.forEach((block) => {
            const blockPosition = block.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (blockPosition < windowHeight) {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }
        });

        

        horizontalBlocks.forEach((block, index) => {
            const blockPosition = block.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (blockPosition < windowHeight) {
                setTimeout(() => {
                    block.style.opacity = '1';
                    block.style.transform = 'translateX(0)';
                }, index * 300); // Задержка анимации для каждого блока, чтобы они начинались быстрее
            }
        });
    }

    window.addEventListener('scroll', checkScroll);

    // Проверка положения прокрутки при загрузке страницы
    checkScroll();

    // Добавляем события для изменения иконок при наведении на блок
    const iconChanges = [
        { block: '.block-1', newIcon: 'svg/icon1_.svg' },
        { block: '.block-2', newIcon: 'svg/icon2_.svg' },
        { block: '.block-3', newIcon: 'svg/icon3_.svg' }
    ];

    iconChanges.forEach(change => {
        const block = document.querySelector(change.block);
        if (block) {
            const icon = block.querySelector('.icon');
            if (icon) {
                block.addEventListener('mouseenter', () => {
                    icon.dataset.originalSrc = icon.src; // Сохраняем оригинальный src
                    icon.src = change.newIcon; // Меняем иконку на новую
                });

                block.addEventListener('mouseleave', () => {
                    icon.src = icon.dataset.originalSrc; // Восстанавливаем оригинальную иконку
                });
            }
        }
    });
// Анимация для изображения "cat.svg"
    const catImage = document.querySelector('.cat-image');

    if (catImage) {
        setTimeout(function () {
            catImage.classList.add('active');
        }, 100); // Запускаем анимацию через 500 мс
    }
});