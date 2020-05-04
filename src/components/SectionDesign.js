import React from 'react';
import { Carousel } from "react-responsive-carousel";

class SectionDesign extends React.Component{
    state ={
        translations: {
            ua:{
                'title': 'Дизайн наклейок',
                'subtitle': 'Немає макета? Для вас ми розробимо індивідуальний дизайн наклейок. Ціна - від 400 ₴.',
                'button': 'Замовити',
            },
            ru:{
                'title': 'Дизайн наклеек',
                'subtitle': 'Нет макета? Для вас мы разработаем индивидуальный дизайн наклеек. Цена - от 400 ₴.',
                'button': 'Заказать',
            }
        }
    }
    getTranslation(){
        return this.state.translations[this.props.locale]
    }

    render() {
           return (
               <section>

                   <div className="container design">
                       <div className="section-container section-container--design">
                           <div className="design-img-container">
                               <Carousel
                                   axis="vertical"
                                   verticalSwipe="natural"
                                   emulateTouch
                                   infiniteLoop
                                   transitionTime={1000}
                                   centerMode
                                   autoPlay={true}
                                   showIndicators={false}
                                   showThumbs={false}
                                   showArrows={false}
                                   showStatus={false}
                               >
                                  <img  src="images/design_bg_1.png" alt=""/>
                                   <img   src="images/design_bg_2.png" alt=""/>
                                   <img  src="images/design_bg_3.png" alt=""/>
                               </Carousel>
                                <img className="desing-img desing-img--last desing-img--path" src="images/design_bg_4.svg" alt=""/>
                           </div>
                           <div className="section-block__container section-block__container--design">
                               <div className="section-block section-block--design">
                                   <div className="section-block__header section-block__header--design">
                                       <div className="section-block__title section-block__title--design">
                                           <div className="text-center">{this.getTranslation().title}</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content section-block__content--design">
                                       <div>{this.getTranslation().subtitle}</div>
                                       <a href="javascript:;"  rel="nofollow" className="button button--design" onClick={()=>{gtag('event', 'Отправить', {'event_category': 'Кнопка', 'event_label': 'Заказать дизайн'} ); this.props.handleModal()}}>{this.getTranslation().button}</a>
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