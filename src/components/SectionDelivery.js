import React from 'react';

const translations = {
    ua:{
        'title': 'Оплата і доставка',
        'pay_methods': 'Способи оплати',
        'pay_method_1': 'Безготівковий розрахунок ФОП і ТОВ (+ 5% до вартості)',
        'pay_method_2': 'На карту Приватбанку',
        'pay_method_3': 'Оплата LiqPay',
        'pay': '100% предоплата.',
        'delivery_methods': 'Вартість доставки',
        'delivery_method_1': 'По Києву кур\'єром 50 грн',
        'delivery_method_2': 'При замовленні від 1000 грн - доставка безкоштовна',
        'delivery_method_3': 'По Україні кур\'єрською службою «Нова Пошта»',
    },
    ru:{
        'title': 'Оплата и доставка',
        'pay_methods': 'Способы оплаты',
        'pay_method_1': 'Безналичный расчет ФОП и ТОВ (+5% к стоимости)',
        'pay_method_2': 'На карту Приватбанка',
        'pay_method_3': 'Оплата LiqPay',
        'pay': '100% передоплата.',
        'delivery_methods': 'Стоимость доставки',
        'delivery_method_1': 'По Киеву курьером 50 грн',
        'delivery_method_2': 'При заказе от 1000 грн – доставка бесплатная',
        'delivery_method_3': 'По Украине курьерской службой «Новая Почта»',
    }
}

const SectionDelivery = (props)=>{

    const  getTranslation = () => {
        return translations[props.locale]
    }
           return (
               <section className="section-top delivery__top">
                   <div className="side-img side-img--right side-img--right--base">
                       <img alt="Наклейки" title="Наклейки" src="images/delivery.svg"/>
                   </div>
                   <div className="container">
                       <div className="section-container delivery-container">
                           <h1 className="section__title">{getTranslation().title}</h1>
                           <div className="section-block__container delivery-block__container">
                               <div className="section-block delivery-block">
                                   <div className="section-block__header">
                                       <div className="section-block__title">
                                           <img src="images/payment-icon.svg" alt=""/>
                                           <div>{getTranslation().pay_methods}</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                           <div className="section-block__item">{getTranslation().pay_method_1}</div>
                                           <div className="section-block__item">{getTranslation().pay_method_2}</div>
                                           <div className="section-block__item">{getTranslation().pay_method_3}</div>
                                            <div className="section-block__item__no__dot">{getTranslation().pay}</div>
                                   </div>
                               </div>
                               <div className="section-block delivery-block">
                                   <div className="section-block__header">
                                       <div className="section-block__title">
                                           <img src="images/payment-icon.svg" alt=""/>
                                           <div>{getTranslation().delivery_methods}</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                           <div className="section-block__item">{getTranslation().delivery_method_1}</div>
                                           <div className="section-block__item">{getTranslation().delivery_method_2}</div>
                                           <div className="section-block__item">{getTranslation().delivery_method_3}</div>
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