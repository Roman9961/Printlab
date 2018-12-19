import React from 'react';
import Scroll from 'react-scroll-to-element';

const SectionLayoutProps = ()=>{
           return (
               <section>
                   <div className="container requairements">
                       <div className="section-container section-container--layout-props">
                           <h1 className="section__title">Требования к макетам</h1>
                           <div className="section-block__container section-block__container--layout-props">
                               <div className="section-block section-block--layout-props left">
                                   <div className="layout-props__side-content">
                                       <div><a href="/images/printlab_requirements.pdf"  rel="nofollow" className="button button--pdf" download >Требования к макетам</a></div>
                                       <div>Если будут вопросы - <Scroll type="class" element="section-container--feedback"><a href="javascript:;">напишите</a></Scroll> нам</div>
                                   </div>
                                   <div className="layout-props__side-content layout-props__side-content--gray">
                                       <div className="section-block__header">
                                           <div className="section-block__title layout-props__side-content__title">
                                               <div>Форматы файлов, с которыми мы работаем:</div>
                                           </div>
                                       </div>
                                       <div className="section-block__content">
                                           <div className="section-block__item">CDR</div>
                                           <div className="section-block__item">PDF</div>
                                           <div className="section-block__item">AI</div>
                                           <div className="section-block__item">EPS</div>
                                           <div className="section-block__item">TIFF</div>
                                           <div className="section-block__item">PSD</div>
                                       </div>
                                   </div>
                               </div>
                               <div className="section-block section-block--layout-props">
                                   <div className="layout-props__block">
                                       <div className="layout-props__block__icon">
                                           <img src="images/layout-props_1.svg" alt=""/>
                                       </div>
                                       <div className="layout-props__block__content">
                                           <div className="layout-props__block__content__title">Фон больше на 1 мм</div>
                                           <div className="layout-props__block__content__description">Дополнительные вылеты фона нужны для правильной обрезки готового изделия.</div>
                                       </div>
                                   </div>
                                   <div className="layout-props__block">
                                       <div className="layout-props__block__icon layout-props__block__icon--cmyk">
                                           <img src="images/layout-props_2.svg" alt=""/>
                                       </div>
                                       <div className="layout-props__block__content">
                                           <div className="layout-props__block__content__title">Цветовой профиль - СMYK</div>
                                           <div className="layout-props__block__content__description">Чтобы готовое изделие получилось таким, как вы его задумали, обязательно используйте цветовой профиль CMYK.</div>
                                       </div>
                                   </div>
                                   <div className="layout-props__block">
                                       <div className="layout-props__block__icon">
                                           <img src="images/layout-props_3.svg" alt=""/>
                                       </div>
                                       <div className="layout-props__block__content">
                                           <div className="layout-props__block__content__title">Разрешение макета – 300 dpi</div>
                                           <div className="layout-props__block__content__description">Размер имеет значение. Меньше разрешение - менее четкое изображение на печати.
                                               Для четкого, резкого изображения, разрешение макета должно быть не менее 300 dpi (точек на дюйм)</div>
                                       </div>
                                   </div>
                                   <div className="layout-props__block">
                                       <div className="layout-props__block__icon">
                                           <img src="images/layout-props_4.svg" alt=""/>
                                       </div>
                                       <div className="layout-props__block__content">
                                           <div className="layout-props__block__content__title">Контур порезки наклеек</div>
                                           <div className="layout-props__block__content__description">Чтобы вырезать наклейку, нужен контур.
                                               Контур - это замкнутая фигура, направляющая нож режущей машины по бумаге.
                                               Контур должен быть размещен в отдельном слое макета или приложен к макету в отдельном файле.</div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </section>
           )
}

export default SectionLayoutProps;