import React from 'react';
import ReactTooltip from 'react-tooltip';

class SectionPostPrint extends React.Component{
    state = {
    };

    render() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
           return (
               <section className="section-top postprint__top">
                   <div className="container">
                       <div className="section-container">
                           <div className="section-postprint">
                           <h1 className="section__title">Послепечатная обработка наклеек</h1>
                           <div className="section-block__container section-block__container__postprint">
                               <div className="section-block section-block__postprint">
                                   <div className="section-block__header section-block__header__postprint">
                                       <div className="section-block__title section-block__title__postprint">
                                           <img src="images/lamination-icon.svg" alt=""/>
                                           <div>Ламинация</div>
                                       </div>
                                       <a className="info info--lamination info--postprint" data-for="lamination" data-tip />
                                       <ReactTooltip className="tooltip_custom" id="lamination" type="light" globalEventOff={ isMobile ? 'click' : undefined }>
                                           <div className="tooltip__container">
                                               <div className="tooltip__description">Ламинация – это покрытие листа тонким слоем прозрачной пленки, он соединяется с отпечатанной основой при помощи температуры и давления (горячая ламинация).</div>
                                           </div>
                                       </ReactTooltip>

                                   </div>
                                   <div className="section-block__content ">
                                       <div className="section-block__item__description">
                                       </div>
                                   </div>
                               </div>
                               <div className="section-block section-block__postprint" >
                                   <div className="section-block__header section-block__header__postprint">
                                       <div className="section-block__title section-block__title__postprint">
                                           <img src="images/uv-icon.svg" alt=""/>
                                           <div>УФ-лак</div>
                                       </div>
                                       <a className="info info--uv info--postprint" data-for="uv" data-tip />
                                       <ReactTooltip className="tooltip_custom" id="uv" type="light" globalEventOff={ isMobile ? 'click' : undefined }>
                                           <div className="tooltip__container">
                                               <div className="tooltip__description">По технологии изготовления – это нанесение специального лака с целью придание печатной продукции глянца. Он выполняет одновременно защитную и декоративную функцию.</div>
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
                                           <div>Тиснение</div>
                                       </div>
                                       <a className="info info--emboss info--postprint" data-for="emboss" data-tip />
                                       <ReactTooltip className="tooltip_custom" id="emboss" type="light" globalEventOff={ isMobile ? 'click' : undefined }>
                                           <div className="tooltip__container">
                                               <div className="tooltip__description">Тиснение фольгой – это нанесение блестящей металлической фольги в виде отдельных букв, рисунка или подложкие. Представляет собой процесс переноса на поверхность материала слоя металлической фольги путем штамповки.</div>
                                           </div>
                                       </ReactTooltip>

                                   </div>
                                   <div className="section-block__content">
                                       <div className="section-block__item__description">
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       </div>
                   </div>
                   <div className="section-bg__top postprint__bg"></div>
               </section>
           )
        }
}

export default SectionPostPrint;