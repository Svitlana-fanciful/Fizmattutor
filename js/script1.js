document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.slide');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 1;
    let isAnimating = false;

    // Копируем первый и последний слайды
    const firstSlide = slides[0].cloneNode(true);
    const lastSlide = slides[slides.length - 1].cloneNode(true);

    // Добавляем их в DOM
    carousel.appendChild(firstSlide);
    carousel.insertBefore(lastSlide, slides[0]);

    // Обновляем список слайдов с учетом добавленных
    const updatedSlides = document.querySelectorAll('.slide');
    let slideCount = updatedSlides.length;

    function collapseAllText() {
        const expandedTexts = document.querySelectorAll('.full-text-container');
        expandedTexts.forEach(text => {
            if (text.style.display === 'block') {
                const toggleButton = text.closest('.top-block').querySelector('.toggle-button');
                const downArrow = toggleButton.querySelector('.down-arrow');
                const upArrow = toggleButton.querySelector('.up-arrow');
                const buttonText = toggleButton.querySelector('.text');

                // Сворачиваем текст
                text.style.display = 'none';
                buttonText.textContent = 'читати повністю';
                downArrow.style.display = 'inline-block';
                upArrow.style.display = 'none';
            }
        });
    }

    function updateCarousel(withAnimation = true) {
        collapseAllText(); // Сворачивание всех развернутых текстов перед сменой слайда

        // Убираем класс 'active' у всех слайдов
        updatedSlides.forEach(slide => slide.classList.remove('active'));

        // Присваиваем класс 'active' текущему слайду
        updatedSlides[currentIndex].classList.add('active');

        if (withAnimation) {
            carousel.style.transition = 'transform 0.5s ease-in-out';
        } else {
            carousel.style.transition = 'none';
        }
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Обновляем индикаторы, корректируя индекс
        let indicatorIndex = (currentIndex === 0) ? slides.length - 1 : 
                             (currentIndex === slideCount - 1) ? 0 : 
                             currentIndex - 1;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === indicatorIndex);
        });
    }

    function adjustIndexForLoop() {
        if (currentIndex === slideCount - 1) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = 1;
                updateCarousel(false);
            }, 500); // Время должно совпадать с временем анимации
        } else if (currentIndex === 0) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = slideCount - 2;
                updateCarousel(false);
            }, 500); // Время должно совпадать с временем анимации
        }
    }

    leftButton.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slideCount - 1;
        }
        updateCarousel();
        adjustIndexForLoop();
        setTimeout(() => {
            isAnimating = false;
        }, 500); // Время должно совпадать с временем анимации
    });

    rightButton.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        if (currentIndex < slideCount - 1) {
            currentIndex++;
            updateCarousel();
        }
        adjustIndexForLoop();
        setTimeout(() => {
            isAnimating = false;
        }, 500); // Время должно совпадать с временем анимации
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            currentIndex = index + 1; // Смещение на 1 из-за добавленного слайда
            updateCarousel();
            adjustIndexForLoop();

            setTimeout(() => {
                isAnimating = false;
            }, 500); // Время должно совпадать с временем анимации
        });
    });

    // Initial state
    updateCarousel(false);

    // Modal functionality for multiple videos
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const actionButtons = document.querySelectorAll('.action-button');
    const modalVideos = document.querySelectorAll('.modal video');

    // Определяем, какое модальное окно открывать в зависимости от активного слайда
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activeSlide = document.querySelector('.slide.active'); // Исправлено на '.slide.active'
            
            if (activeSlide && activeSlide.classList.contains('slide-1')) {
                document.getElementById('videoModal1').style.display = 'block';
                document.getElementById('modalVideo1').play();
            } else if (activeSlide && activeSlide.classList.contains('slide-2')) {
                document.getElementById('videoModal2').style.display = 'block';
                document.getElementById('modalVideo2').play();
            }
        });
    });

    // Закрываем модальные окна
    closeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            modals.forEach(modal => modal.style.display = 'none');
            modalVideos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
        });
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        modals.forEach((modal, index) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                modalVideos[index].pause();
                modalVideos[index].currentTime = 0;
            }
        });
    });

    // Toggle functionality for FAQ and slide buttons
    const toggleButtons = document.querySelectorAll('.toggle-button');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const fullTextContainer = this.closest('.top-block').querySelector('.full-text-container');
            const downArrow = this.querySelector('.down-arrow');
            const upArrow = this.querySelector('.up-arrow');
            const buttonText = this.querySelector('.text');

            if (fullTextContainer.style.display === 'none' || fullTextContainer.style.display === '') {
                // Показать полный текст
                fullTextContainer.style.display = 'block';
                buttonText.textContent = 'згорнути';
                downArrow.style.display = 'none';
                upArrow.style.display = 'inline-block';
            } else {
                // Скрыть полный текст
                fullTextContainer.style.display = 'none';
                buttonText.textContent = 'читати повністю';
                downArrow.style.display = 'inline-block';
                upArrow.style.display = 'none';
            }
        });
    });


    
// Modal functionality for "Замовити дзвінок"
    // Получаем модальное окно и элементы
    const orderCallModal = document.getElementById('orderCallModal');
    const openCallButtons = document.querySelectorAll('.order-call-button'); // Выбираем все кнопки с этим классом
    const closeCallButton = orderCallModal.querySelector('.close-button');
    const orderCallForm = document.getElementById('orderCallForm');
    
    // Создаем блок для сообщений в модальном окне
    const messageBoxModal = document.createElement('div');
    orderCallModal.appendChild(messageBoxModal);

     // Открытие модального окна для всех кнопок с классом "order-call-button"
    openCallButtons.forEach(button => {
        button.addEventListener('click', function () {
            orderCallModal.style.display = 'block';
        });
    });

    // Закрытие модального окна для звонка
    closeCallButton.addEventListener('click', function () {
        orderCallModal.style.display = 'none';
        messageBoxModal.textContent = ''; // Очищаем сообщение при закрытии
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function (event) {
        if (event.target === orderCallModal) {
            orderCallModal.style.display = 'none';
            messageBoxModal.textContent = ''; // Очищаем сообщение при закрытии
        }
    });

    // Обработка отправки формы
    function handleFormSubmit(event, messageBox) {
        event.preventDefault(); // Предотвращаем стандартное действие формы

        const formData = new FormData(event.target);

        fetch('send_mail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            if (result === 'success') {
                messageBox.textContent = 'Дякую! Форма відправлена)';
                messageBox.style.color = 'green';
            } else {
                messageBox.textContent = 'Будь ласка, пробуйте інші варіанти для зв\'язку зі мною.';
                messageBox.style.color = 'red';
            }
            event.target.reset();
        })
        .catch(error => {
            messageBox.textContent = 'Виникла помилка під час відправлення форми.';
            messageBox.style.color = 'red';
        });
    }

    // Привязываем функцию отправки к форме в модальном окне
    orderCallForm.addEventListener('submit', function(event) {
        handleFormSubmit(event, messageBoxModal);
    });

    // Привязываем функцию отправки к основной форме на сайте
    const consultationsForm = document.querySelector('.consultations-form');
    const messageBoxForm = document.createElement('div');
    consultationsForm.appendChild(messageBoxForm);

    consultationsForm.addEventListener('submit', function(event) {
        handleFormSubmit(event, messageBoxForm);
    });
});