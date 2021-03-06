import jQuery from 'jquery';


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
        laminationMatt = state.calculator.laminationMatt,
        laminationGloss = state.calculator.laminationGloss,
        _materialPrice = state.calculator._materialPrice,
        rollparams = state.calculator.rollparams,
        _delivery =  parseInt( state.calculator._delivery),                // Доставка
        _postprint = parseInt(state.calculator._postprint),                // Постпечатная подгодовка
        _profit = state.calculator._profit,                // Навар :)
        _profitRoll = state.calculator._profitRoll,
        calcProp = state.calcProp,
        rectlistparams = state.calculator.rectlistparams,
        colorfularr = state.calculator.colorfularr, //Price for print in colors
        monochromearr = state.calculator.monochromearr, // Price for print in monochrome
        fastprintarr = state.calculator.fastprintarr;
    let circuitlistparams = state.calculator.circuitlistparams;
    var formCalc = $('#sendorder'); //Form object






    /**
     *
     * @param element - jquery object
     *
     * Add or update propery in calcProp object
     */

    function calculateTotal() {
        var totalprice, totalpricehrn, totalpriceprofit, totalpricehrncom, totalpriceonesticker, pricewithlamination, print, adjustment, base, cut;
        print = calculatePrint();
        adjustment = printAdjustment();
        base = calculateBasis();
        cut = calculateCut();
        totalprice = print + cut +adjustment+ base + _delivery + _postprint;
        totalprice = totalprice+calculateLamination();
        if(calcProp.print_type === 'Рулонная'){
            totalprice = totalprice+(print+base+adjustment)*0.1;
        }
        totalprice = printUrgency(totalprice);
        totalpricehrn = totalprice * _exchangeRate;
        totalpriceprofit = addProfit(totalpricehrn);
        totalpricehrncom = totalpriceprofit + ((totalpriceprofit / 100) * 3);
        
        if(calcProp.user_delivery_district){
            totalpricehrncom = totalpricehrncom + calculateDelivery();
        }

        totalpriceonesticker = totalpricehrncom / calcProp.quantity;

        function printResults() {
            if(DEBUG){
                console.log('Кол-во наклеек на листе:' + calcProp.stickersonlist);
                console.log('Стоимость материала в у.е:' + base);
                console.log('Стоимость печати в у.е:' + print);
                console.log('Стоимость порезки в у.е:' + cut);
                console.log('Количество листов в печать:' + calcProp.numberoflist);
                console.log('Окончательная цена в у.е:' + totalprice.toFixed(2));
                console.log('Окончательная цена в грн.:' + totalpricehrn.toFixed(2));
                console.log('Окончательная цена в грн + надбавка:' + totalpriceprofit.toFixed(2));
                console.log('Окончательная цена +надбавка +3%:' + totalpricehrncom.toFixed(2));
                console.log('Окончательная цена за наклейку:' + totalpriceonesticker.toFixed(2));

            }
            if(isNaN(totalpricehrncom) || totalpricehrncom === Number.POSITIVE_INFINITY || totalpricehrncom === Number.NEGATIVE_INFINITY) totalpricehrncom = 0;
                if(calcProp.delivery && totalpricehrncom>0)
                    totalpricehrncom += 50;
            if((calcProp.outline=='cloud'|| calcProp.outline=='chopped'||calcProp.outline=='accent')&& totalpricehrncom>0)
                totalpricehrncom += 100;
                return Math.ceil(totalpricehrncom);
        }

        return printResults();
    }

    //Функция добавления стоимости на приладку

    function printAdjustment(){
        var price = 0;
        if(calcProp.print_type === 'Рулонная'){
            var basis =_materialPrice.roll.paper;
            switch (calcProp.basis) {
                case 'Бумажная':
                        basis = calcProp.numberoflist * _materialPrice.roll.paper
                    break;
                case 'Пластиковая':
                        basis = calcProp.numberoflist * _materialPrice.roll.plastic
                    break;
            }
            price = 2.4+basis/calcProp.numberoflist*numberAdjustment();

        }
        return price;
    }
    function numberAdjustment(){
        return 6;
    }
    //Функция добавления стоимости за срочность заказа

    function printUrgency(price){
        if( parseInt(calcProp.print_time) === 2){
            return price + (price*0.2);
        } else{
            return price;
        }
    }
    // Функция добавления наценки
    function addProfit(price) {
        var profitarray = [];
        if(price){
            price = parseFloat(price.toFixed(2));
        }
        if(calcProp.print_type == 'Рулонная'){
            profitarray = _profitRoll;
        }else {
            profitarray = _profit;
        }
            for (var i = 0; i < profitarray.length; i++) {
                var obj = profitarray[i];
                if (price >= obj.min && price <= obj.max) {
                    price = price * obj.price;
                    break;
                }
            }
            return price;

    }

    //Функция расчета стоимости ламинации
    function calculateLamination(){
        if(calcProp.lamination){
            var laminationPrice = 0;

            if(calcProp.print_type === 'Листовая') {
                $('#laminationprice').html('Стоимость ламинации:' + calcProp.numberoflist * _laminationprice);
                switch (calcProp.lamination) {
                    case 'matt':
                        for (let i = 0; i < laminationMatt.length; i++) {
                            let obj = laminationMatt[i];
                            if (obj && calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                                laminationPrice =  calcProp.numberoflist * obj.price;
                                break;
                            }
                        }
                        break;
                    case 'gloss':
                        for (let i = 0; i < laminationGloss.length; i++) {
                            let obj = laminationGloss[i];
                            if (obj && calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                                laminationPrice =  calcProp.numberoflist * obj.price;
                                break;
                            }
                        }
                        break;
                }
            }else{
                laminationPrice = calculateBasis(true);
            }
            return laminationPrice;
        }
        else return 0;
    }

    // Функция расчета количества наклеек, помещаемых в лист
    function calculateStickersOnList() {
        if (!calcProp.width || !calcProp.height) {
            return;
        }
        if(calcProp.basis_param == 'transparent') {
            circuitlistparams = rectlistparams;
        }
        if(calcProp.print_type === 'Листовая') {
            if (calcProp.width < 30 || calcProp.height < 30) {
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
        }else if(calcProp.print_type === 'Рулонная'){
            calcProp.stickersonlist = calculateFigures(rollparams, calcProp);
        }
    }

    //Функция расчета цены печати
    function calculatePrint() {
        var printtotal = 0,
            numberoflist = 0,
            printpricelist = 0;
        if(calcProp.print_type === 'Листовая') {
            calcProp.numberoflist = Math.ceil(parseInt(calcProp.quantity) / calcProp.stickersonlist);
        }else if (calcProp.print_type === 'Рулонная'){
                calcProp.numberoflist = Math.ceil(parseInt(calcProp.quantity) / calcProp.stickersonlist);
            }

            //добавим ещё дополнительные листы на брак
            if(calcProp.print_type === 'Листовая') {
                for (let i = 0; i < _defectiveSheets.length; i++) {
                    let obj = _defectiveSheets[i];
                    if (calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                        calcProp.numberoflist += obj.add;
                        $('#deffective').html('Брак составил: ' + obj.add + ' листов');
                        break;
                    }
                }
            }

            

            if (calcProp.type === 'Цветная') {
                for (let i = 0; i < colorfularr.length; i++) {
                    let obj = colorfularr[i];
                    if (calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                        printpricelist = obj.price;
                        break;
                    }
                }
                if(calcProp.print_type === 'Рулонная') {
                    printpricelist = rollparams.colorprint+rollparams.clear;
                    if(calcProp.basis_param==='transparent'){
                        printpricelist = rollparams.colorprintwhite+rollparams.clear;
                    }
                }

            }
            else if (calcProp.type === 'Черно-белая') {
                for (let i = 0; i < monochromearr.length; i++) {
                    let obj = monochromearr[i];
                    if (calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                        printpricelist = obj.price;
                        break;
                    }
                }
                if(calcProp.print_type === 'Рулонная') {
                    printpricelist = rollparams.monochromeprint+rollparams.clear;
                }

            }
            if (calcProp.basis_param == 'transparent') {
                for (let i = 0; i < fastprintarr.length; i++) {
                    let obj = fastprintarr[i];
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
        if(calcProp.print_type === 'Листовая') {
            if (calcProp.width < 30 || calcProp.height < 30) {
                switch (calcProp.form) {
                    case 'Прямоугольная':
                        for (let i = 0; i < _cutpriceRect.length; i++) {
                            let obj = _cutpriceRect[i];
                            if (obj && calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                                return calcProp.numberoflist * obj.price;
                                break;
                            }
                        }
                        break;
                    case 'Простая форма':
                        for (let i = 0; i < _cutpriceSimplecircuit.length; i++) {
                            let obj = _cutpriceSimplecircuit[i];
                            if (obj && calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                                return calcProp.numberoflist * obj.price;
                                break;
                            }
                        }
                        break;
                    case 'Сложная форма':
                        for (let i = 0; i < _cutpriceHardcircuit.length; i++) {
                            let obj = _cutpriceHardcircuit[i];
                            if (obj && calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                                return calcProp.numberoflist * obj.price;
                                break;
                            }
                        }
                        break;
                }
            } else {
                switch (calcProp.form) {
                    case 'Прямоугольная':
                        for (let i = 0; i < _cutpriceRect.length; i++) {
                            let obj = _cutpriceRect[i];
                            if (obj && calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                                return calcProp.numberoflist * obj.price;
                                break;
                            }
                        }
                        break;
                    case 'Простая форма':
                        for (let i = 0; i < _cutpriceSimplecircuit.length; i++) {
                            let obj = _cutpriceSimplecircuit[i];
                            if (obj && calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                                return calcProp.numberoflist * obj.price;
                                break;
                            }
                        }
                        break;
                    case 'Сложная форма':
                        for (let i = 0; i < _cutpriceHardcircuit.length; i++) {
                            let obj = _cutpriceHardcircuit[i];
                            if (obj && calcProp.numberoflist >= obj.min && calcProp.numberoflist <= obj.max) {
                                return calcProp.numberoflist * obj.price;
                                break;
                            }
                        }
                        break;
                }
            }
        }else if (calcProp.print_type === 'Рулонная'){
            if (calcProp.cut_form ==='hard' || calcProp.width < 20 && calcProp.height < 20){
                return ((calcProp.numberoflist+numberAdjustment()) * 7 +33)/29;
            }else{
                return ((calcProp.numberoflist+numberAdjustment()) * 1.25 +33)/29;
            }

        }
    }

    // Функция расчета цены основы
    function calculateBasis(lamination = false) {
      var priceBasis =0;
        switch (calcProp.basis) {
            case 'Бумажная':
                if (calcProp.print_type === 'Листовая') {
                    priceBasis = calcProp.numberoflist * _materialPrice.digit.paper;
                }else{
                    priceBasis = calcProp.numberoflist * _materialPrice.roll.paper
                }
                return priceBasis;
                break;
            case 'Пластиковая':
                if (calcProp.print_type === 'Листовая') {
                    priceBasis = calcProp.numberoflist * _materialPrice.digit.plastic;
                }else{
                    priceBasis = calcProp.numberoflist * _materialPrice.roll.plastic
                }
                return priceBasis;
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
        let total1 = 0,
            total2 = 0,
            FigureB = {};
        if(calcProp.print_type === 'Листовая') {
            FigureB.width = parseInt(list.width) + list.margin/2;
            FigureB.height = parseInt(list.height) + list.margin/2;
            if(parseInt(list.width)== parseInt(FigureA.width)){
                FigureB.width = parseInt(list.width)
            }
            if(parseInt(list.height)== parseInt(FigureA.height)){
                FigureB.height = parseInt(list.height)
            }
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
        }else if(calcProp.print_type === 'Рулонная'){
            var amount = 0;
            var amount1 = 0;
            var marginWidth = Math.floor(FigureA.width/parseInt(list.width))===1?0:parseInt(list.margin);
            var marginHeight = Math.floor(parseInt(FigureA.height)/(parseInt(list.height)+parseInt(list.margin)))<2?(parseInt(FigureA.height)-parseInt(list.height))/2:parseInt(list.margin);
                total1 = Math.floor(FigureA.width/(parseInt(parseInt(list.width))+marginWidth));
                total2 = Math.floor(FigureA.height/(parseInt(list.height)+marginHeight));
             amount = Math.ceil(total1*total2);
            return amount;
        }
    }

    calculateStickersOnList();
    return calculateTotal();

}

export default calc;