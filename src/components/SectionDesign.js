import React from 'react';

class SectionDesign extends React.Component{
    render() {
           return (
               <section>

                   <div className="container">
                       <div className="section-container section-container--design">
                           <div className="design-img-container">
                           </div>
                           <div className="section-block__container section-block__container--design">
                               <div className="section-block section-block--design">
                                   <div className="section-block__header section-block__header--design">
                                       <div className="section-block__title section-block__title--design">
                                           <div>Дизайн</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content section-block__content--design">
                                       <div>Для вас мы разработаем индивидуальный дизайн наклеек.</div>
                                       <div>Стоимость дизайна начинается от 300 грн, зависит от уровня сложности.</div>
                                       <a href="javascript:;"  rel="nofollow" className="button button--design">Заказать</a>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </section>
           )
        }
}

export default SectionDesign;