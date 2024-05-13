// stages
let stagesCards = document.querySelectorAll('.stages__item');
let stagesLeftBtn = document.querySelector('.stages__left-btn');
let stagesRightBtn = document.querySelector('.stages__right-btn');
let stagesDotsElements = document.querySelectorAll('.stages__dots svg');

// Индекс текущего слайда
let currentStagesCard = 0;

//Сброс активного класса карточек и точек
function resetStagesClass() {
    //Сброс активного класса у всех карточек
    stagesCards.forEach(item => item.classList.remove('stages__item-active'));
    //Сброс активного класса у всех точек
    stagesDotsElements.forEach(item => item.classList.remove('stages__dots-active'));
}

//Назначение активного класса карточки и точки
function activeStagesClass(index) {
    //Присваиваем активный класс выбранной карточке
    stagesCards[index].classList.add('stages__item-active');
    //Присваиваем активноый класс нажатой точке
    stagesDotsElements[index].classList.add('stages__dots-active');

    //Для первой точки стрелка влево не активна
    stagesLeftBtn.disabled = index === 0;
    //Для последней точки стрелка вправо не активна
    stagesRightBtn.disabled = index === 4;
}

//Изменяется состояние точки при нажатии
stagesDotsElements.forEach((item, index) => item.addEventListener('click', function () {
    resetStagesClass();
    activeStagesClass(index);
    //Присваиваем индекс текущего слайда
    currentStagesCard = index;
})); 

//Обрабатываем левую кнопку
stagesLeftBtn.addEventListener('click', function () {
    currentStagesCard--;
    resetStagesClass();
    activeStagesClass(currentStagesCard);
});

//Обрабатываем правую кнопку
stagesRightBtn.addEventListener('click', function () {
    currentStagesCard++;
    resetStagesClass();
    activeStagesClass(currentStagesCard);
});

//members
let membersLeftBtn = document.querySelector('#members__leftBtn');
let membersRightBtn = document.querySelector('#members__rightBtn');
let membersCurrentSlideElement = document.querySelector('#members__totalSlide');
let membersTotalSlideElement = document.querySelector('#members__totalSlide');
let membersSlideElements = document.querySelectorAll('.members__main-card');

//Индекс текущего слайда
let membersCurrentSlide = 0;

//Количество слайдов
let membersTotalSlide = membersSlideElements.length;

//Количество слайдов для отображения
let slidesPerView = window.innerWidth <= 1200 ? 1: 3;

//Общее количество слайдов на странице
membersTotalSlideElement.innerHTML = membersTotalSlide;

//Обрабатываем отображение карточек
function updateSlides() {
    //Скрыть все слайды
    membersSlideElements.forEach((slide) => slide.style.display = 'none');

    //Отображаем текущий слайд и определенное количество
    for (let i = membersCurrentSlide; i < membersCurrentSlide + slidesPerView; i++) {
        let adjustedIndex = i % membersTotalSlide; //зацикливание индекса слайдов
        membersSlideElements[adjustedIndex].style.display = 'block';
    }
}

//Обновляем текущий номер слайда
function updateCurrentSlide() {
    membersCurrentSlideElement.innerHtml = membersCurrentSlide + 1;
}

//Обрабатываем клик по кнопке влево
membersLeftBtn.addEventListener('click', function () {
    membersCurrentSlide = (membersCurrentSlide - slidesPerView + membersTotalSlide) % membersTotalSlide;
    updateCurrentSlide();
    updateSlides();
});

//Обрабатываем клик по кнопке вправо
membersRightBtn.addEventListener('click', function () {
    membersCurrentSlide = (membersCurrentSlide + slidesPerView) % membersTotalSlide;
    updateCurrentSlide();
    updateSlides();
});

//Автосмена слайдов каждые 4 секунды
setInterval(function () {
    membersCurrentSlide = (membersCurrentSlide + slidesPerView) % membersTotalSlide;
    updateCurrentSlide();
    updateSlides();
}, 4000);

//Обновление при Загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    updateSlides();
    updateCurrentSlide();
});

//Учет размера окна
window.addEventListener('resize', function () {
    //Пересчет слайдов при изменении размера окна
    slidesPerView = window.innerWidth <= 1200 ? 1 : 3;
    membersCurrentSlide = 0; //Обнуление текущего слайда
    updateSlides();
    updateCurrentSlide();
});