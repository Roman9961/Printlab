import React from 'react';
import {updateTooltip} from '../tooltip';

class SectionPostPrint extends React.Component{
    state = {
    };
    handleToolTip(selector) {

        if(this.state.selector!==selector) {
            updateTooltip(selector);
            this.setState(()=> ({
                selector
            }));
        }
    }
    render() {
           return (
               <section className="section-top postprint__top">
                   <div className="container">
                       <div className="section-container">
                           <h1 className="section__title">Послепечатная обработка наклеек</h1>
                           <div className="section-block__container section-block__container__postprint">
                               <div className="section-block section-block__postprint" onMouseEnter={()=>{this.handleToolTip('lamination')}}>
                                   <div className="section-block__header section-block__header__postprint">
                                       <div className="section-block__title section-block__title__postprint">
                                           <img src="images/lamination-icon.svg" alt=""/>
                                           <div>Ламинация</div>
                                       </div>

                                       <div
                                           className="info info--lamination"
                                           data-description="Ламинация – это покрытие листа тонким слоем прозрачной пленки, он соединяется с отпечатанной основой при помощи температуры и давления (горячая ламинация)."
                                           title=""
                                       >
                                       </div>
                                   </div>
                                   <div className="section-block__content ">
                                       <div className="section-block__item__description">
                                           Ламинация – это покрытие листа тонким слоем прозрачной пленки, он соединяется с отпечатанной основой при помощи температуры и давления (горячая ламинация).
                                       </div>
                                   </div>
                               </div>
                               <div className="section-block section-block__postprint" onMouseEnter={()=>{this.handleToolTip('uv')}}>
                                   <div className="section-block__header section-block__header__postprint">
                                       <div className="section-block__title section-block__title__postprint">
                                           <img src="images/uv-icon.svg" alt=""/>
                                           <div>УФ-лак</div>
                                       </div>

                                       <div
                                           className="info info--uv"
                                           data-description="По технологии изготовления – это нанесение специального лака с целью придание печатной продукции глянца. Он выполняет одновременно защитную и декоративную функцию."
                                           title=""
                                       >
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                       <div className="section-block__item__description">
                                           По технологии изготовления – это нанесение специального лака с целью придание печатной продукции глянца. Он выполняет одновременно защитную и декоративную функцию.
                                       </div>
                                   </div>
                               </div>
                               <div className="section-block section-block__postprint" onMouseEnter={()=>{this.handleToolTip('emboss')}}>
                                   <div className="section-block__header section-block__header__postprint">
                                       <div className="section-block__title section-block__title__postprint">
                                           <img src="images/embossing-icon.svg" alt=""/>
                                           <div>Тиснение</div>
                                       </div>

                                       <div
                                           className="info info--emboss"
                                           data-description="Тиснение фольгой – это нанесение блестящей металлической фольги в виде отдельных букв, рисунка или подложкие. Представляет собой процесс переноса на поверхность материала слоя металлической фольги путем штамповки."
                                           title=""
                                       >
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                       <div className="section-block__item__description">
                                           Тиснение фольгой – это нанесение блестящей металлической фольги в виде отдельных букв, рисунка или подложкие. Представляет собой процесс переноса на поверхность материала слоя металлической фольги путем штамповки.
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