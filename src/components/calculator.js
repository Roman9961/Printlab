import jQuery from 'jquery';
require('blueimp-file-upload');

window.jQuery = jQuery;
const $ = window.jQuery;
var DEBUG = false;

const calc = function (state) {
    //Predefined variables
    const _exchangeRate = state.calculator._exchangeRate,
        // Exchange rate for 1 dollar

        _defectiveSheets = state.calculator._defectiveSheets,                // Листов на брак
        _cutpriceRect = state.calculator._cutpriceRect,                //Цена за порезку прямоугольных наклеек
        _cutpriceSimplecircuit = state.calculator._cutpriceSimplecircuit,                //Цена за порезку наклеек простой формы
        _cutpriceHardcircuit = state.calculator._cutpriceHardcircuit,                //Цена за порезку наклеек сложной формы
        _stampingprice = state.calculator._stampingprice,                // Цена за тиснение
        _varnishprice = state.calculator._varnishprice,                // Цена покрытия уф-лаком
        _laminationprice = state.calculator._laminationprice,                // Цена ламинации за лист
        _paperlist = state.calculator._paperlist,                // Цена за лист бумаги
        _plasticlist = state.calculator._plasticlist,                // Цена за лист пластика
        _delivery =  parseInt( state.calculator._delivery),                // Доставка
        _postprint = parseInt(state.calculator._postprint),                // Постпечатная подгодовка
        _profit = state.calculator._profit,                // Навар :)
        calcProp = state.calcProp,
        rectlistparams = state.calculator.rectlistparams,
        circuitlistparams = state.calculator.circuitlistparams,
        colorfularr = state.calculator.colorfularr, //Price for print in colors
        monochromearr = state.calculator.monochromearr; // Price for print in monochrome


    var formCalc = $('#sendorder'); //Form object


    switchDelivery();
    calculateStickersOnList();
    calculateTotal();



    formCalc.find('input').off().focus(function(){
        notifyme(calcProp);
    });
    /**
     *
     * @param element - jquery object
     *
     * Add or update propery in calcProp object
     */

    function calculateTotal() {
        var totalprice, totalpricehrn, totalpriceprofit, totalpricehrncom, totalpriceonesticker, pricewithlamination;
        totalprice = calculatePrint() + calculateCut() + calculateBasis() + _delivery + _postprint;

        totalprice = totalprice+calculateLamination();
        totalprice = printUrgency(totalprice);
        totalpricehrn = totalprice * _exchangeRate;

        totalpriceprofit = addProfit(totalpricehrn, _profit);

        totalpricehrncom = totalpriceprofit + ((totalpriceprofit / 100) * 3);
        if(calcProp.user_delivery_district){
            totalpricehrncom = totalpricehrncom + calculateDelivery();
        }

        totalpriceonesticker = totalpricehrncom / calcProp.quantity;

        function printResults() {
            if(DEBUG){
                console.log('Кол-во наклеек на листе:' + calcProp.stickersonlist);
                console.log('Количество листов в печать:' + calcProp.numberoflist);
                console.log('Окончательная цена в у.е:' + totalprice.toFixed(2));
                console.log('Окончательная цена в грн.:' + totalpricehrn.toFixed(2));
                console.log('Окончательная цена в грн + надбавка:' + totalpriceprofit.toFixed(2));
                console.log('Окончательная цена +надбавка +3%:' + totalpricehrncom.toFixed(2));
                console.log('Окончательная цена за наклейку:' + totalpriceonesticker.toFixed(2));

            }
            if(isNaN(totalpricehrncom) || totalpricehrncom == Number.POSITIVE_INFINITY || totalpricehrncom == Number.NEGATIVE_INFINITY) totalpricehrncom = 0;
            $('#final-price span').text(totalpricehrncom.toFixed(2));

        }

        printResults();
    }

    //Функция добавления стоимости за срочность заказа

    function printUrgency(price){
        if( parseInt(calcProp.print_time) == 2){
            return price + (price*0.2);
        } else{
            return price;
        }
    }
    // Функция добавления наценки
    function addProfit(price, profitarray) {

        if(price){
            price = parseFloat(price.toFixed(2));
        }

        if (price <= 111) {
            return price + 100;
        }
        else {
            for (var i = 0; i < profitarray.length; i++) {
                var obj = profitarray[i];
                if (price >= obj.min && price <= obj.max) {
                    price = price * obj.price;
                    break;
                }
            }
            return price;
        }
    }

    //Функция расчета стоимости ламинации
    function calculateLamination(){
        if(calcProp.lamination){
            $('#laminationprice').html('Стоимость ламинации:'+calcProp.numberoflist * _laminationprice);
            return calcProp.numberoflist * 0.25;
        }
        else return 0;
    }

    // Функция расчета количества наклеек, помещаемых в лист
    function calculateStickersOnList() {
        if (!calcProp.width || !calcProp.height) {
            return;
        }
        else if (calcProp.width < 45 || calcProp.height < 45){
            switch (calcProp.form) {
                case 'Прямоугольная':
                    calcProp.stickersonlist = calculateFigures(circuitlistparams, calcProp);
                    break;
                case 'Простая форма':
                    calcProp.stickersonlist = calculateFigures(circuitlistparams, calcProp);
                    break;
                case 'Сложная форма':
                    calcProp.stickersonlist = calculateFigures(circuitlistparams, calcProp);
                    break;
            }
        }
        else {
            switch (calcProp.form) {
                case 'Прямоугольная':
                    calcProp.stickersonlist = calculateFigures(rectlistparams, calcProp);
                    break;
                case 'Простая форма':
                    calcProp.stickersonlist = calculateFigures(circuitlistparams, calcProp);
                    break;
                case 'Сложная форма':
                    calcProp.stickersonlist = calculateFigures(circuitlistparams, calcProp);
                    break;
            }
        }
    }

    //Функция расчета цены печати
    function calculatePrint() {
        var printtotal = 0,
            numberoflist = 0,
            printpricelist = 0;
        calcProp.numberoflist = Math.ceil(parseInt(calcProp.quantity) / calcProp.stickersonlist);


        //добавим ещё дополнительные листы на брак
        for (var i = 0; i < _defectiveSheets.length; i++) {
            var obj = _defectiveSheets[i];
            if (calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                calcProp.numberoflist += obj.add;
                $('#deffective').html('Брак составил: '+obj.add+' листов');
                break;
            }
        }



        if (calcProp.type == 'Цветная') {
            for (var i = 0; i < colorfularr.length; i++) {
                var obj = colorfularr[i];
                if (calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                    printpricelist = obj.price;
                    break;
                }
            }

        }
        else if (calcProp.type == 'Черно-белая') {
            for (var i = 0; i < monochromearr.length; i++) {
                var obj = monochromearr[i];
                if (calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                    printpricelist = obj.price;
                    break;
                }
            }

        }
        printtotal = calcProp.numberoflist * printpricelist;
        return printtotal;
    }

    // Функция расчета стоимости порезки
    function calculateCut() {
        if(calcProp.width < 45 || calcProp.height < 45){
            switch (calcProp.form) {
                case 'Прямоугольная':
                    for (var i = 0; i < _cutpriceSimplecircuit.length; i++) {
                        var obj = _cutpriceSimplecircuit[i];
                        if (calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                            return calcProp.numberoflist * obj.price;
                            break;
                        }
                    }
                    break;
                case 'Простая форма':
                    for (var i = 0; i < _cutpriceSimplecircuit.length; i++) {
                        var obj = _cutpriceSimplecircuit[i];
                        if (calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                            return calcProp.numberoflist * obj.price;
                            break;
                        }
                    }
                    break;
                case 'Сложная форма':
                    for (var i = 0; i < _cutpriceHardcircuit.length; i++) {
                        var obj = _cutpriceHardcircuit[i];
                        if (calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                            return calcProp.numberoflist * obj.price;
                            break;
                        }
                    }
                    break;
            }
        } else {
            switch (calcProp.form) {
                case 'Прямоугольная':
                    for (var i = 0; i < _cutpriceRect.length; i++) {
                        var obj = _cutpriceRect[i];
                        if (calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                            return calcProp.numberoflist * obj.price;
                            break;
                        }
                    }
                    break;
                case 'Простая форма':
                    for (var i = 0; i < _cutpriceSimplecircuit.length; i++) {
                        var obj = _cutpriceSimplecircuit[i];
                        if (calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                            return calcProp.numberoflist * obj.price;
                            break;
                        }
                    }
                    break;
                case 'Сложная форма':
                    for (var i = 0; i < _cutpriceHardcircuit.length; i++) {
                        var obj = _cutpriceHardcircuit[i];
                        if (calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                            return calcProp.numberoflist * obj.price;
                            break;
                        }
                    }
                    break;
            }
        }
    }

    // Функция расчета цены основы
    function calculateBasis() {
        switch (calcProp.basis) {
            case 'Бумажная':
                return calcProp.numberoflist * _paperlist;
                break;
            case 'Пластиковая':
                return calcProp.numberoflist * _plasticlist;
                break;
        }
    }
    // Функция расчета стоимости доставки
    function calculateDelivery() {
        switch(calcProp.user_delivery_district){
            case 'Центр, Молдаванка' :
                return 30;
                break;
            case 'Черемушки, Таирова, Фонтан' :
                return 40;
                break;
            case 'Пос. Котовского' :
                return 50;
                break;
            default :
                return 0;
        }
    }







    /**
     * Count an amount of how many stickers can be placed on one paper
     * @param FigureA - object conatining width and height of paper
     * @param list - user defined sitcker width and height
     * @returns {number} - max number of stickers placed on a paper
     */
    function calculateFigures(FigureA, list) {
        var total1 = 0,
            total2 = 0,
            FigureB = {};

        FigureB.width = parseInt(list.width) + 2;
        FigureB.height = parseInt(list.height) + 2;


        (function () {
            var figures_per_row = Math.floor(FigureA.width / FigureB.width),
                figures_per_col = Math.floor(FigureA.height / FigureB.height),
                invers_figures_per_row = 0,
                invers_figures_per_col = 0;

            if (FigureA.width - (figures_per_row * FigureB.width) >= FigureB.height) {
                invers_figures_per_row = Math.floor((FigureA.width - (figures_per_row * FigureB.width)) / FigureB.height);
                invers_figures_per_col = Math.floor(FigureA.height / FigureB.width);
            }

            total1 = (figures_per_row * figures_per_col) + (invers_figures_per_row * invers_figures_per_col);
        }());

        (function () {
            var figures_per_row = Math.floor(FigureA.width / FigureB.height),
                figures_per_col = Math.floor(FigureA.height / FigureB.width),
                invers_figures_per_row = 0,
                invers_figures_per_col = 0;

            if (FigureA.width - (figures_per_row * FigureB.height) >= FigureB.width) {
                invers_figures_per_row = Math.floor((FigureA.width - (figures_per_row * FigureB.height)) / FigureB.width);
                invers_figures_per_col = Math.floor(FigureA.height / FigureB.height);
            }

            total2 = (figures_per_row * figures_per_col) + (invers_figures_per_row * invers_figures_per_col);
        }());

        return Math.max(total1, total2);
    }


    //Управление попапом калькулятора

    // the location of server-side upload handler:
    $('#upload').fileupload({
        url: 'server/php/',
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('#fileformlabel').append('<div class="parent"><i class="icon-checkmark"></i>'+file.name+'<i class="fa fa-trash delete js-delete" data-name = "'+ file.name +'" data-delete-url = "'+ file.deleteUrl +'" data-url = "'+ file.url +'"></i><br /></div>');
                $('#user_files').html($('#user_files').html() + file.url+ '\n');
                // $('<p/><i class="icon-checkmark"></i>').text(file.name).appendTo('#fileformlabel');
            })
        },
        error: function(info){
            console.log('info');
        }

    });
    $('body').on('click','.js-delete',function () {
        const file = $(this);
        $.ajax({
            url: file.data('delete-url'),
            type: 'DELETE',
            success: (data)=> {
                const result = JSON.parse(data);
                if(result[file.data('name')]){
                    file.closest('.parent').remove();

                    const uFiles = $('#user_files').html();
                    $('#user_files').html(uFiles.replace(file.data('url')+ '\n', ''));
                }
            }
        });
    })
    //Шаги формы
    function switchStep(step){
        $('#part-1, #part-2, #part-3').css('display','none');
        $('.form-step-wrapper').each(function () {
            if(parseInt($(this).children('.btn-step').attr('data-step'))>step) $(this).removeClass('active');
        });
        $('i.btn-step[data-step*='+step+']').parent().addClass('active');
        $('#part-'+step).show();
    }
    $('.btn-step').each(function () {
        $(this).click(function(){
            var step = parseInt($(this).attr('data-step'));
            console.log(step+' шаг');
            switch (step){
                case 1:
                    switchStep(1);
                    break;
                case 2:
                    switchStep(2);
                    break;
                case 3:
                    switchStep(3);
                    break;
            }

        });
    });

    //Показываем поля доставки при выбранном пункте
    function switchDelivery() {
        if (DEBUG) console.log('function run');

        var $form_delivery = $('#form_delivery'),
            $form_contacts = $('#form_contacts');
        if(calcProp.user_delivery == 'Новая Почта'){
            console.log('111');
            $form_delivery.hide();
            $form_contacts.show();
        }
        else if(calcProp.user_delivery == 'Доставка по Одессе'){
            $form_delivery.show();
            $form_contacts.show();
        } else if (calcProp.user_delivery == 'Самовывоз'){
            $form_delivery.hide();
            $form_contacts.hide();
        }
    }

    // Переключаем скрытые поля у радиобаттонов, при их выборе

    $("#form-calculator #part-2 .frm_opt_container > .col-sm-4 .designselector").click(function(){
        var $this = $(this);

        $('#form-calculator #part-2 .frm_opt_container > .col-sm-4 .designselector').not($this).each(function(){
            var $other = $(this);
            $other.removeClass('active');
        });

        $this.addClass('active');
    });


    //notification if something goes wrong
    function notifyme(Calc) {
        var $calc = Calc;
        if($calc.form == 'Прямоугольная' && ($calc.width >308 || $calc.height > 438)){
            console.log(Calc);
            $.notify("Размер наклеек прямоугольной формы не может превышать 438х308мм", "warn",{position:"top left"});
        }
        if(($calc.form == 'Простая форма' || $calc.form == 'Сложная форма') && ($calc.width > 278 || $calc.height > 378)){
            $.notify("Размер наклеек простой и сложной формы не может превышать 378х278мм. Попрбуйте прямоугольные наклейки", "warn", {position:"top left"});
        }
    }



}

export default calc;