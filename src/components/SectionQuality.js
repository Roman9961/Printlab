import React from 'react';

const translations = {
    ua:{
        'title': 'Гарантія якості',
        'subtitle': 'Гарантуємо повернення грошей, якщо вас не влаштує якість.',
        'list_1': 'Наші наклейки не стираються',
        'list_2': 'Наклейки на плівці не бояться води',
        'list_3': 'Легко відклеюються від основи',
    },
    ru:{
        'title': 'Гарантия качества',
        'subtitle': 'Гарантируем возврат денег, если вас не устроит качество.',
        'list_1': 'Наши наклейки не стираются',
        'list_2': 'Наклейки на пленке не боятся воды',
        'list_3': 'Легко отклеиваются от основы',
    }
}

const SectionQuality = (props)=>{

    const  getTranslation = () => {
        return translations[props.locale]
    }

    return (
        <section>
            <div className="container">
                <div className="section-container quality-container">

                    <div className="section-block__container">
                        <div className="section-block quality-block mobile-hidden">
                            <img src="images/recommended.svg" alt=""/>
                        </div>
                        <div className="section-block quality-block">
                            <div className="section-block__header quality-block__header">
                                <h1 className="section__title quality__title">{getTranslation().title}</h1>
                                <h2 className="section__subtitle quality__subtitle">{getTranslation().subtitle}</h2>
                            </div>
                            <div className="section-block__content">
                                <div className="section-block__item">{getTranslation().list_1}</div>
                                <div className="section-block__item">{getTranslation().list_2}</div>
                                <div className="section-block__item">{getTranslation().list_3}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
};

export default SectionQuality;