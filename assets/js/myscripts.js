$(document).ready(function () {
    $('.button-cta__copy').popover({
        trigger: 'hover',
        delay: 200
    });
    $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        delay: { "show": 200, "hide": 100 }
    });

    //Функция плавное перемещения и открыть Таб "Стоимость" при нажатии на ссылку
    $("#price-more-link").click(function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //узнаем высоту от начала страницы до блока на который ссылается якорь
        var topTab = $('#detail-info').offset().top - 5;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({ scrollTop: topTab }, 800);
        //Открываем вкладку
        $('#price-tab-link').tab('show');
    });

    //Функция плавное перемещения к блоку с сервисным центром и картой
        $("#service-center-link").click(function (event) {
            //отменяем стандартную обработку нажатия по ссылке
            event.preventDefault();
            //узнаем высоту от начала страницы до блока на который ссылается якорь
            var topTab = $('#service-center-block').offset().top + 35;
            //анимируем переход на расстояние - top за 1500 мс
            $('body,html').animate({ scrollTop: topTab }, 800);
        });
    
});