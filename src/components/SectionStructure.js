import React from 'react';
import SectionContentUlGreen from './SectionContentUlGreen';
import SectionContentUlBlue from './SectionContentUlBlue';
import SectionContentUlDelivery from './SectionContentUlDelivery';
import SectionContentUlPay from './SectionContentUlPay';
import SectionContent1 from './SectionContent1';
import SectionContent4 from './SectionContent4';
import PropTypes from 'prop-types';

class SectionStructure extends React.Component{
    render(){
        var title = this.props.data.title,
            btnValue = this.props.data.btnValue,
            btn, ico,
            textTemplate, contentTemplate, contentTemplateDescr,
            btnClass = "",
            id = this.props.data.id;
        if(id === 2){
            {/* Формирование части под <h2> в первом столбце { textTemplate} */}
            textTemplate = <div className="title-part"><p>Самоклеящаяся бумага или пластик (винил, oracal, teslin).</p></div>
            {/*  вывод значка после кнопки в первую колонку*/}
            ico = <hr className="bg-black h-9" />
            {/* Формирование контента справа {contentTemplate} */}
            contentTemplateDescr = <div className="col-sm-12 col-md-9">
                <div className="row">
                    <div className="col-sm-12">
                        <p className="text-16 p-bottom-24">Структура у всех наклеек одинаковая — это клеевой слой и слой-носитель информации на котором можно печатать. Основа у наклеек может быть разная - бумажная или виниловая (пластиковая). От основы и способа печати зависит сфера применения этих наклеек. Нельзя сказать, что какая-то основа хуже, а какая-то лучше. Каждый вид хорош по своему, главное — правильно подобрать тип основы, в зависимости от назначения наклейки.</p>
                        <p className="separator-with-txt text-24"><span>Особенности:</span></p>
                    </div>
                </div>
                <div className="row">
                    <SectionContentUlGreen state = {this.props.state} />
                    <SectionContentUlBlue state = {this.props.state} />
                </div>
            </div>
        }
        if(id === 3){
            {/* Формирование части под <h2> в первом столбце { textTemplate} */}

            textTemplate =
                <div className="title-part">
                    <p><span className="icon-circle-arrow"/><span>Принимаем заказы от 50шт. до бесконечности</span></p>
                    <p><span className="icon-too-much"/><span>Делаем до 15 000 шт. в день или 200 листов</span></p>
                </div>
            {/* Формирование контента справа {contentTemplate} */}
            contentTemplateDescr = <div className="col-sm-12 col-md-9">
                <div className="row">
                    <SectionContentUlPay state = {this.props.state} />
                    <SectionContentUlDelivery state = {this.props.state} />
                </div>
            </div>
        }
        if(id === 4){
            contentTemplateDescr = <div className="col-sm-12 col-md-9"><SectionContent4 state = {this.props.state} /></div>
            btnClass = "m-bottom-0";
        }
        if(id === 1){
            textTemplate = <div className="title-part">
                <p>Посмотрите в таблице цены для наклеек на бумажной основе, размером 60 х 60мм. Тиражи от 100 до 5000 шт. Цена на момент заказа может отличаться от указанной в таблице, т.к. цены мы меняем вручную.</p>
                <p className="bold">Для просчета наклеек индивидуального размера и формы воспользуйтесь формой просчета или напишите нам!</p>
            </div>
            contentTemplateDescr = <div className = "col-sm-12 col-md-9"><SectionContent1 state = {this.props.state} /></div>
        }
        if (btnValue === 'Хочу!') {
            btn = <a href="javascript:;" rel="nofollow"
                     className={"btn btn-block btn-primary btn-form-contact btn-form-popup " + btnClass}>{btnValue}</a>
        } else if(btnValue) {
            btn = <a href="javascript:;" rel="nofollow"
                     className={"btn btn-block btn-primary btn-form-calculator btn-form-popup " + btnClass}>{btnValue}</a>
        }
        return (
            <div className="row">
                <div className="col-sm-12 col-sm-offset-right-0 col-md-2 col-md-offset-right-1">
                    <div className="row visible-sm">
                        <div className="col-sm-4"><h2>{title}</h2></div>
                        <div className="col-sm-4">{textTemplate}</div>
                        <div className="col-sm-4">{btn}{ico}</div>
                    </div>
                    <div className="hidden-sm">
                        <h2>{title}</h2>
                        {textTemplate}
                        {btn}{ico}
                    </div>
                </div>
                {contentTemplateDescr}
            </div>
        )
    }
}

export default SectionStructure;