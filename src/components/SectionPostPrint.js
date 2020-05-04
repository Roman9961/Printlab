import React from 'react';
import ReactTooltip from 'react-tooltip';

class SectionPostPrint extends React.Component{
    state = {
        translations:{
            ua:{
                'title': 'Післядрукарська обробка наклейок',
                'type_1': 'Глянець',
                'type_2': 'Тиснення',
                'type_3': 'Ламінування',
            },
            ru:{
                'title': 'Послепечатная обработка наклеек',
                'type_1': 'Глянец',
                'type_2': 'Тиснение',
                'type_3': 'Ламинирование',

            }
        }
    };

    getTranslation(){
        return this.state.translations[this.props.locale]
    }

    render() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
           return (
               <section className="section-top postprint__top">
                   <div className="container">
                       <div className="section-container">
                           <div className="section-postprint">
                           <h1 className="section__title">{this.getTranslation().title}</h1>
                           <div className="section-block__container section-block__container__postprint">
                               <div className="section-block section-block__postprint" >
                                   <div className="section-block__header section-block__header__postprint">
                                       <div className="section-block__title section-block__title__postprint">
                                           <img src="images/uv-icon.svg" alt=""/>
                                           <div>{this.getTranslation().type_1}</div>
                                       </div>
                                       <a className="info info--uv info--postprint" data-for="uv" data-tip />
                                       <ReactTooltip className="tooltip_custom" id="uv" type="light" globalEventOff={ isMobile ? 'touchstart' : undefined }>
                                           <div className="tooltip__container">
                                               <div className="tooltip__description">Другое название - УФ-лак. Покрытие УФ-лаком может быть полным или выборочным для некоторых элементов на изделии.
                                                   Лак защищает от воды, царапин, украшает или выделяет нужные дизайнерские элементы.
                                                   После нанесения лака на нужные элементы, он твердеет под ультафиолетовой лампой.</div>
                                           </div>
                                       </ReactTooltip>

                                   </div>
                                   <div className="section-block__content">
                                       <div className="section-block__item__description">
                                       </div>
                                   </div>
                               </div>
                               <div className="section-block section-block__postprint" >
                                   <div className="section-block__header section-block__header__postprint">
                                       <div className="section-block__title section-block__title__postprint">
                                           <img src="images/embossing-icon.svg" alt=""/>
                                           <div>{this.getTranslation().type_2}</div>
                                       </div>
                                       <a className="info info--emboss info--postprint" data-for="emboss" data-tip />
                                       <ReactTooltip className="tooltip_custom" id="emboss" type="light" globalEventOff={ isMobile ? 'touchstart' : undefined }>
                                           <div className="tooltip__container">
                                               <div className="tooltip__description">Тиснение делается специальным штампом и металлической фольгой для получения ярких, выделяющихся элементов на изделии.</div>
                                           </div>
                                       </ReactTooltip>

                                   </div>
                                   <div className="section-block__content">
                                       <div className="section-block__item__description">
                                       </div>
                                   </div>
                               </div>
                               <div className="section-block section-block__postprint">
                                   <div className="section-block__header section-block__header__postprint">
                                       <div className="section-block__title section-block__title__postprint">
                                           <img src="images/lamination-icon.svg" alt=""/>
                                           <div>{this.getTranslation().type_3}</div>
                                       </div>
                                       <a className="info info--lamination info--postprint" data-for="lamination" data-tip />
                                       <ReactTooltip className="tooltip_custom" id="lamination" type="light" globalEventOff={ isMobile ? 'touchstart' : undefined }>
                                           <div className="tooltip__container">
                                               <div className="tooltip__description">Ламинирование - это покрытие изделия пленкой. Используется для защиты поверхности от внешних воздействий - царапин, влаги, надписей.
                                                   Главный недостаток этой технологии - нельзя выборочно заламинировать элементы, только все изделие целиком.
                                                   Мы ламинируем наклейки горячим способом с одной или двух сторон.</div>
                                           </div>
                                       </ReactTooltip>

                                   </div>
                                   <div className="section-block__content ">
                                       <div className="section-block__item__description">
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       </div>
                   </div>

               </section>
           )
        }
}

export default SectionPostPrint;