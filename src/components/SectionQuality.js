import React from 'react';

const SectionQuality = ()=>{
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
                                <h1 className="section__title quality__title">Гарантия качества</h1>
                                <h2 className="section__subtitle quality__subtitle">Гарантируем возврат денег, если вас не устроит качество.</h2>
                            </div>
                            <div className="section-block__content">
                                <div className="section-block__item">Наши наклейки не стираются</div>
                                <div className="section-block__item">Наклейки на пленке не боятся воды</div>
                                <div className="section-block__item">Легко отклеиваются от основы</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
};

export default SectionQuality;