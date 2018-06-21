import React from 'react';

const SectionLayoutProps = ()=>{
           return (
               <section>
                   <div className="container">
                       <div className="section-container section-container--layout-props">
                           <h1 className="section__title">Требования к макетам</h1>
                           <div className="section-block__container section-block__container--layout-props">
                               <div className="section-block section-block--layout-props left">
                                   <div className="layout-props__side-content">
                                       <div>Чтобы наклейки получились классные, а главное соответствовали ожиданиям, соблюдайте наши требования к макетам</div>
                                       <div><a href="javascript:;"  rel="nofollow" className="button button--pdf">Скачать PDF</a></div>
                                       <div>В любом случае бояться нечего, мы вам поможем ;)</div>
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
                                           <div className="layout-props__block__content__title">Делайте фон больше</div>
                                           <div className="layout-props__block__content__description">Фон большего размера нужен для того чтобы не обрезать лишнего. Делайте фон больше, чем готовая наклейка минимум на 1 мм с каждой стороны.</div>
                                       </div>
                                   </div>
                                   <div className="layout-props__block">
                                       <div className="layout-props__block__icon layout-props__block__icon--cmyk">
                                           <img src="images/layout-props_2.svg" alt=""/>
                                       </div>
                                       <div className="layout-props__block__content">
                                           <div className="layout-props__block__content__title">Используйте CMYK</div>
                                           <div className="layout-props__block__content__description">Цветовую модель CMYK (цмик) используют печатные машины, они понимают только этот язык цвета. Обязательно переводите ваш макет в CMYK, если не хотите видеть вашего попугая грязным и блёклым.</div>
                                       </div>
                                   </div>
                                   <div className="layout-props__block">
                                       <div className="layout-props__block__icon">
                                           <img src="images/layout-props_3.svg" alt=""/>
                                       </div>
                                       <div className="layout-props__block__content">
                                           <div className="layout-props__block__content__title">Разрешение макета – 300 dpi</div>
                                           <div className="layout-props__block__content__description">Для качественной печати разрешение вашего макета должно быть 300 dpi. Чем меньше точек на дюйм, тем более размытое изображение получается. Корректируйте ваш макет, используйте файлы с достаточным разрешением, если не хотите размытую белочку.</div>
                                       </div>
                                   </div>
                                   <div className="layout-props__block">
                                       <div className="layout-props__block__icon">
                                           <img src="images/layout-props_4.svg" alt=""/>
                                       </div>
                                       <div className="layout-props__block__content">
                                           <div className="layout-props__block__content__title">Контур порезки наклеек</div>
                                           <div className="layout-props__block__content__description">Для того чтобы плоттер порезал наклейки, ему необходима траектория движения ножа. Это должен быть замкнутый контур, который размещён на отдельном слое или в отдельном файле.</div>
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