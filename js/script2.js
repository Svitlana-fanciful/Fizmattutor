document.addEventListener('DOMContentLoaded', function () {
    // Находим все элементы с классом menu-toggle (кнопки, которые открывают меню)
    const expandButtons = document.querySelectorAll(".menu-toggle");
    const expandedContent = document.getElementById("expandedContent");

    // Добавляем обработчик событий на каждую кнопку
    expandButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Переключаем классы hidden и visible у элемента expandedContent
            if (expandedContent.classList.contains("hidden")) {
                expandedContent.classList.remove("hidden");
                expandedContent.classList.add("visible");

                // Меняем иконку меню на крестик
                const menuIcon = button.querySelector("img");
                if (menuIcon) {
                    menuIcon.src = "svg/krest.svg"; // Заменяем иконку на крестик
                    menuIcon.alt = "close"; // Изменяем описание на "close"
                }
            } else {
                expandedContent.classList.remove("visible");
                expandedContent.classList.add("hidden");

                // Восстанавливаем иконку меню
                const menuIcon = button.querySelector("img");
                if (menuIcon) {
                    menuIcon.src = "svg/menu.svg"; // Возвращаем иконку меню
                    menuIcon.alt = "menu"; // Возвращаем описание на "menu"
                }
            }
        });
    });

    // Закрытие меню при клике на ссылку
    const menuLinks = expandedContent.querySelectorAll('a');
    menuLinks.forEach((link) => {
        link.addEventListener('click', function () {
            expandedContent.classList.remove("visible");
            expandedContent.classList.add("hidden");

            // Восстанавливаем иконку меню
            expandButtons.forEach((button) => {
                const menuIcon = button.querySelector("img");
                if (menuIcon) {
                    menuIcon.src = "svg/menu.svg"; // Возвращаем иконку меню
                    menuIcon.alt = "menu"; // Возвращаем описание на "menu"
                }
            });
        });
    });

    // Отключаем восстановление позиции прокрутки при обновлении страницы
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    window.onload = function () {
        // Прокручиваем страницу наверх
        window.scrollTo(0, 0);

        // Включаем плавную прокрутку, если это требуется
        document.documentElement.style.scrollBehavior = "smooth";
    };

    // Получаем все FAQ блоки
    const faqBlocks = document.querySelectorAll('.text-block-faq');

    // Обрабатываем каждый блок
    faqBlocks.forEach((faqBlock) => {
        const toggleButton = faqBlock.querySelector('.toggle'); // Кнопка для раскрытия/сокрытия текста
        const hiddenText = faqBlock.querySelector('.hidden-text'); // Скрытый текст
        const downArrow = faqBlock.querySelector('.down-arrow'); // Стрелка вниз
        const upArrow = faqBlock.querySelector('.up-arrow'); // Стрелка вверх

        // Изначально скрываем текст
        hiddenText.style.display = 'none';

        // Добавляем обработчик на кнопку
        toggleButton.addEventListener('click', () => {
            // Проверяем текущее состояние текста
            if (hiddenText.style.display === 'none' || hiddenText.style.display === '') {
                // Показываем скрытый текст
                hiddenText.style.display = 'block';
                downArrow.style.display = 'none'; // Прячем стрелку вниз
                upArrow.style.display = 'inline-block'; // Показываем стрелку вверх
            } else {
                // Скрываем текст
                hiddenText.style.display = 'none';
                downArrow.style.display = 'inline-block'; // Показываем стрелку вниз
                upArrow.style.display = 'none'; // Прячем стрелку вверх
            }
        });
    });
});
