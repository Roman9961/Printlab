import jQuery from 'jquery';
require('webpack-jquery-ui/widgets');
require('magnific-popup');
require('jquery-validation');

const $ = jQuery;

$(document).ready(function(){

    $(window).keydown(function(event){
        if(event.keyCode === 13) {
            event.preventDefault();
            return false;
        }
    });


    var _smoothScrolling = false;
    function smoothScroll(target) {
        _smoothScrolling = true;

        $('body,html').animate(
            {'scrollTop':target.offset().top},
            600, 'swing', onAnimComplete
        );

    }
    function onAnimComplete() {
        _smoothScrolling = false;
    }

    $('a[data-scrollto]').click(function () {
        $(this).data('scrollto');
        var scrollto = $html.find($(this).data('scrollto'));
        smoothScroll(scrollto);
    });

    // accordion
    var icons = {
        header: "icon-ctrl",
        activeHeader: "icon-ctrl active"
    };
    var $accordion = $('#accordion');
    $accordion.accordion({
        icons: icons,
        heightStyle: "content"
    });

    $( "#toggle" ).button().click(function() {
        if ( $accordion.accordion( "option", "icons" ) ) {
            $accordion.accordion( "option", "icons", null );
        } else {
            $accordion.accordion( "option", "icons", icons );
        }
    });
    // end accordion

// Popup
    var $html = $('html'),
        popupisopen = false,
        yaGoalForSubmit = null;
    function closePopup() {
        if (popupisopen) {
            $html.removeClass('popup');
            $('section').each(function () {
                $(this).removeClass('popup-on').trigger('popup:closed');
            });
            popupisopen = false;
        }
    }

    $('section').on('popup:closed', function() {
        yaGoalForSubmit = null;
    });

    //Формы
    $('body').on('click','.btn-form-calculator',function (e) {
        e.preventDefault();
        closePopup();
        var btnName = $(this).text();
        switch (btnName) {
            case 'Оформить заказ':
                yaGoalForSubmit = 'order.in.top';
                break;
            case 'Узнать цену':
                yaGoalForSubmit = 'cena.in.top';
                break;
            case 'Цена?':
                yaGoalForSubmit = 'cena.1st';
                break;
            case 'Хочу!':
                yaGoalForSubmit = 'xochu.2st';
                break;
            case 'Узнать':
                yaGoalForSubmit = 'cena.3st';
                break;
            case 'Заказать':
                yaGoalForSubmit = 'order.design';
                break;
            case 'Хочу наклейки':
                yaGoalForSubmit = 'order.footer';
                break;
        }
        $html.addClass('popup');
        $('section.form-row').addClass('popup-on');
        //замеряем высоты для popup-bg в зависимости от высоты обертки
        var popup_w = $('section.form-row.popup-on .popup-wrapper').height();
        var height_p = $('section.form-row.popup-on .popup-wrapper .popup').outerHeight(true);
        height_p > popup_w ? $('.popup-bg').css('height', height_p) : $('.popup-bg').css('height', popup_w);
        popupisopen = true;
    });
    $('.btn-close-popup').click(function () {
        closePopup();
    });

    //scroll header
    var _smallmenu = false;
    const $firstpart = $('#firstpart');
    if($firstpart.offset()!== undefined) {
        var $contentposition = $firstpart.offset().top;
        $(window).scroll(function (e) {
            if (!_smallmenu && $(window).scrollTop() >= $contentposition) {
                $('body').addClass('scroll');
                $('.wrapper-select').removeClass('open');
                _smallmenu = true;
            } else if (_smallmenu && $(window).scrollTop() < $contentposition) {
                $('body').removeClass('scroll');
                $('.menu li a').removeClass('active');
                _smallmenu = false;
            }
        });
    }

    //open/close menu + select in header
    $('.menu-icon, .wrapper-select').click(function (event) {
        $(this).toggleClass('open');
    });
    $(document).click(function(event) {
        if(!$(event.target).closest('.wrapper-select').length) {
            if($('.wrapper-select').hasClass("open")) {
                $('.wrapper-select').removeClass('open');
            }
        }
    });
    $('.menu li a').click(function () {
        $('.menu li a').removeClass('active');
        var $attr = $(this).data('scrollto');
        $(this).addClass('active');
    });
    //show-hidden показать цены

    $('body').on('click','.wrapper-example-stick-item .btn',function () {
        var win_w = $(window).width();
        win_w <= '767' ? $(this).toggleClass('show-price') : $('.wrapper-example-stick-item .btn').toggleClass('show-price');

    });
    //form validation
    //Перепишем ошибки форм.
    $.extend($.validator.messages, {
        required: "Это поле обязательно для заполнения.",
        email: "Пожалуйста, введите действующий e-mail",
        url: "Пожалуйста, введите URL",
        date: "Пожалуйста, введите действительную дату.",
        maxlength: jQuery.validator.format("Пожалуйста, введите не больше {0} знаков."),
        minlength: jQuery.validator.format("Пожалуйста, введите минимум {0} знаков."),
        min: jQuery.validator.format("Минимально допустимое значение {0} мм"),
        max: jQuery.validator.format("Максимально допустимое значение {0} мм")
    });

var isDevelopment =true;

    $('.sendmessage').each(function(key, form) {
        $(form).validate({
            rules: {
                'name': {
                    required: true,
                    minlength: 3
                },
                'phone': {
                    required: true,
                    minlength: 10
                },
                'email': {
                    email: true
                },


            },
            errorPlacement: function(error, element) {
                var elSibling = element.siblings(".error-msg");
                element.parent('.form-field').removeClass('ok');
                element.parent('.form-field').addClass('error');
                elSibling.show();
                error.appendTo( elSibling );

            },
            submitHandler: function(form) {
                $.ajax({
                    data: $(form).serialize(),
                    url:"send.php",
                    type:"POST",
                    success: function(data){
                        console.log(data);
                        $(form).replaceWith('<div class="msg-success"><div class="msg-success-header"><div class="wrapper-align-middle-v"><div class="align-middle-v"><i class="icon-checkmark"></i> <p>Спасибо!</p> </div> </div> </div> <div class="msg-success-txt">Мы получили ваше письмо <br class="hidden-xs">и свяжемся с вами <br class="hidden-xs">в ближайшие несколько часов <br class="hidden-xs">или на следующий рабочий день</div></div> ');

                    }
                });


            },
            success: function(label,element,z){
                label.parents('.form-field').removeClass('error');
                label.parents('.form-field').addClass('ok');
            },
            error: function() {
                $('#contact').fadeTo( "slow", 0.15, function() {
                    $('#error').fadeIn();
                });
            }
        });
    }).find('[type=submit]').click(function() {
        if($(this).hasClass('primary-form')){
            if(!isDevelopment)
               1; // yaCounter39267020.reachGoal('zapolnil.formu');
        }
        else if (yaGoalForSubmit){
            if(!isDevelopment)
                1; // yaCounter39267020.reachGoal(yaGoalForSubmit);
        }
    });

    $('body').on('click','.btn-form-contact', function () {
            $('.sendmessage').each(function(key, form) {
                console.log(form);
                $(form).validate({
                    rules: {
                        'name': {
                            required: true,
                            minlength: 3
                        },
                        'phone': {
                            required: true,
                            minlength: 10
                        },
                        'email': {
                            email: true
                        },


                    },
                    errorPlacement: function(error, element) {
                        var elSibling = element.siblings(".error-msg");
                        element.parent('.form-field').removeClass('ok');
                        element.parent('.form-field').addClass('error');
                        elSibling.show();
                        error.appendTo( elSibling );

                    },
                    submitHandler: function(form) {
                        $.ajax({
                            data: $(form).serialize(),
                            url:"send.php",
                            type:"POST",
                            success: function(data){
                                console.log(data);
                                $(form).replaceWith('<div class="msg-success"><div class="msg-success-header"><div class="wrapper-align-middle-v"><div class="align-middle-v"><i class="icon-checkmark"></i> <p>Спасибо!</p> </div> </div> </div> <div class="msg-success-txt">Мы получили ваше письмо <br class="hidden-xs">и свяжемся с вами <br class="hidden-xs">в ближайшие несколько часов <br class="hidden-xs">или на следующий рабочий день</div></div> ');

                            }
                        });


                    },
                    success: function(label,element,z){
                        label.parents('.form-field').removeClass('error');
                        label.parents('.form-field').addClass('ok');
                    },
                    error: function() {
                        $('#contact').fadeTo( "slow", 0.15, function() {
                            $('#error').fadeIn();
                        });
                    }
                });
            }).find('[type=submit]').click(function() {
                if($(this).hasClass('primary-form')){
                    if(!isDevelopment)
                        1; // yaCounter39267020.reachGoal('zapolnil.formu');
                }
                else if (yaGoalForSubmit){
                    if(!isDevelopment)
                        1; // yaCounter39267020.reachGoal(yaGoalForSubmit);
                }
            });

    });

    $('form#sendorder').each(function(key, form) {
        $(form).submit(function(e) {
            e.preventDefault();
        }).validate({
            rules: {
                'height': {
                    min: 3,
                },
                'width': {
                    min: 3,
                },
                'user_mail': {
                    email: true,
                    required: true
                },

            },
            errorPlacement: function(error, element) {
                if(element.siblings(".error-msg").length) var elSibling = element.siblings(".error-msg");
                else var elSibling = element.parents('.frm_container').find(".error-msg");

                element.parent('.form-field').removeClass('ok');
                element.parent('.form-field').addClass('error');
                elSibling.show();
                error.appendTo( elSibling );
                elSibling.append('<br>');

            },
            submitHandler: function(form) {
                $.ajax({
                    data: $(form).serialize()+"&form_name=sendorder",
                    url:"send.php",
                    type:"POST",
                    success: function(data){
                        data = JSON.parse(data);
                        const liq = (data.liqPayLink)?'<a href="/">оплатить</a>':''
                        $(form).replaceWith('' +
                            '<div class="msg-success">' +
                                '<div class="msg-success-header">' +
                                    '<div class="wrapper-align-middle-v">' +
                                        '<div class="align-middle-v">' +
                                            '<i class="icon-checkmark"></i> ' +
                                            '<p>Спасибо!</p> ' +
                                            liq+
                                        '</div> ' +
                                    '</div> ' +
                                '</div> ' +
                                '<div class="msg-success-txt">Мы получили ваше письмо <br class="hidden-xs">и свяжемся с вами <br class="hidden-xs">в ближайшие несколько часов <br class="hidden-xs">или на следующий рабочий день<br class="hidden-xs">' +
                                '<a href="/">Заполнить ещё раз</a>' +
                                '</div>' +
                            '</div> ');

                    }
                });


            },
            success: function(label,element,z){
                label.parents('.form-field').removeClass('error');
                label.parents('.form-field').addClass('ok');
            },
            error: function() {
                $('#contact').fadeTo( "slow", 0.15, function() {
                    $('#error').fadeIn();
                });
            }
        });
    });

    $('.requirements').click(function(event) {
        if(!isDevelopment)
            1; // yaCounter39267020.reachGoal('trebovanija');
    });

   // $("form input[type='tel']").mask('+38 (000) 000-00-00');
    //TODO:Глючит на самсунгах и мейзу, курсор ставится вначало

    //Определение метрики
    var utmarr = ['Продвижение вашего бизнеса <br class="hidden-xs">в социальных сетях',
            'SMM для вас <br class="hidden-xs">и вашего бизнеса',
            'Продвижение в  Вконтакте, <br class="hidden-xs">Facebook, Instagram…',
            'SMM-продвижение <br class="hidden-xs">вашего бренда'],
        utm='utm_content';
    if( window.location.toString().indexOf(utm +'=') !== -1) {
        var utmdata=(window.location.toString().substr(window.location.toString().indexOf(utm+'=')+ utm.length+1,50)).toLowerCase();

        if( utmdata.indexOf('&') !== -1) {
            utmdata=(utmdata.substr(0,utmdata.indexOf('&')));
        }
        switch(utmdata){
            case 'car':
                switchSelect('На автомобиль');
                break;
            case 'paperkonvert':
                switchSelect('На бумажные конверты');
                break;
            case 'booklet':
                switchSelect('На буклет или каталог');
                break;
            case 'upakovka':
                switchSelect('На упаковку');
                break;
            case 'book':
                switchSelect('На книгу');
                break;
            case 'bottle':
                switchSelect('На бутылку');
                break;
            case 'soap':
                switchSelect('На мыло');
                break;
            case 'sandwich':
                switchSelect('На сендвич или бургер');
                break;
            case 'food':
                switchSelect('На еду');
                break;
            case 'cosmetics':
                switchSelect('На косметику');
                break;
            case 'box':
                switchSelect('На коробку');
                break;
            case 'magazine':
                switchSelect('На журнал');
                break;
            case 'card':
                switchSelect('На пластиковую');
                break;
            case 'bag':
                switchSelect('На пакет');
                break;
            case 'toilet':
                switchSelect('На туалет');
                break;
            default:
        }
    }
    function switchSelect(text){
        $(".wrapper-select ul.select li").each(function(){
            if($(this).text() === text)$('.wrapper-select span').text($(this).text());
        });
    }
    $(".wrapper-select ul.select li").click(function(){
        switchSelect($(this).text());
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

    });




    $('span[data-href]').click(function() {
        document.location = $(this).data('href');
    });


});
//
// window.fbAsyncInit = function() {
//     FB.init({
//         appId            : '139762706727681',
//         autoLogAppEvents : true,
//         xfbml            : true,
//         version          : 'v2.11'
//     });
// };
//
// (function(d, s, id){
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {return;}
//     js = d.createElement(s); js.id = id;
//     js.src = "https://connect.facebook.net/ru_RU/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

jQuery('body').append('<div class="fb-customerchat" page_id="1876765745982884" minimized="false"> </div>');