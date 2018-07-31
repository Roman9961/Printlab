import React from 'react';

const SectionDelivery = ()=>{
           return (
               <section className="section-top delivery__top">
                   <div className="side-img side-img--right side-img--right--base">
                       <img alt="Наклейки" title="Наклейки" src="images/delivery.svg"/>
                   </div>
                   <div className="container">
                       <div className="section-container delivery-container">
                           <h1 className="section__title">Оплата и доставка</h1>
                           <div className="section-block__container delivery-block__container">
                               <div className="section-block delivery-block">
                                   <div className="section-block__header">
                                       <div className="section-block__title">
                                           <img src="images/payment-icon.svg" alt=""/>
                                           <div>Способы оплаты</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                           <div className="section-block__item">Безналичный расчет ФОП и ТОВ (+5% к стоимости)</div>
                                           <div className="section-block__item">Оплата на карту Приватбанка</div>
                                           <div className="section-block__item">Оплата LiqPay</div>
                                            <div className="section-block__item__no__dot">Мы работаем по 100% предоплате.</div>
                                   </div>
                               </div>
                               <div className="section-block delivery-block">
                                   <div className="section-block__header">
                                       <div className="section-block__title">
                                           <img src="images/payment-icon.svg" alt=""/>
                                           <div>Стоимость доставки</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                           <div className="section-block__item">по Киеву курьером 50 грн</div>
                                           <div className="section-block__item">при заказе от 1000 грн – доставка бесплатная</div>
                                           <div className="section-block__item">по Украине курьерской службой «Новая Почта»</div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="section-bg__top delivery__bg"></div>
               </section>

           )
};

export default SectionDelivery;