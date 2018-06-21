import React from 'react';

class SectionDesign extends React.Component{
    render() {
           return (
               <section>
                   <div className="container">
                       <div className="section-container section-container--design">
                           <div className="design-img-container">
                           <img className="desing-img" src="images/design_bg_1.png" alt=""/>
                           <img className="desing-img desing-img--middle" src="images/design_bg_2.png" alt=""/>
                           <img className="desing-img desing-img--last" src="images/design_bg_3.png" alt=""/>
                           <img className="desing-img desing-img--last desing-img--path" src="images/design_bg_4.svg" alt=""/>
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