import React from 'react';
import PropTypes from 'prop-types';

class SectionGallery extends React.Component{
    render(){
        return (

            <section className = "row-gallery">
                <div className="wrapper-container">
                    <div className="container visible">
                        <div className = "col-sm-4 col-xs-8 gallery-item">
                            <div><img src = "./images/gallery/gallery-item-1.jpg" alt="1"/></div>
                        </div>
                        <div className = "col-sm-4 col-xs-8 gallery-item">
                            <div><img src = "./images/gallery/gallery-item-2.jpg" alt="1"/></div>
                        </div>
                        <div className = "col-sm-4 hidden-xs gallery-item">
                            <div><img src = "./images/gallery/gallery-item-3.jpg" alt="1"/></div>
                        </div>
                        <div className = "col-sm-4 hidden-xs gallery-item">
                            <div><img src = "./images/gallery/gallery-item-4.jpg" alt="1"/></div>
                        </div>
                        <div className = "col-sm-4 col-xs-12 gallery-item gallery-info-block">
                            <div>
                                <div className = "bg-gradient"></div>
                                <div className="wrapper">
                                    <h2>Дизайн</h2>
                                    <p className = "text-18">Мы делаем <br className = "hidden-sm" />отличный дизайн наклеек.<br />Стоимость индивидуального дизайна от 400грн, в зависимости от уровня сложности работы.</p>
                                    <a className = "btn btn-bordered btn-form-contact btn-form-popup" href="javascript:;"  rel="nofollow" >Заказать</a>
                                </div>
                            </div>
                        </div>
                        <div className = "col-sm-4 col-xs-4 gallery-item gallery-logo-block">
                            <div><img src = "./images/nakleyki-logo-header.svg" alt="1"/></div>
                        </div>
                        <div className = "col-sm-4 col-xs-4 gallery-item">
                            <div><img src = "./images/gallery/gallery-item-5.jpg" alt="1"/></div>
                        </div>
                        <div className = "col-sm-4 col-xs-8 gallery-item">
                            <div><img src = "./images/gallery/gallery-item-6.jpg" alt="1"/></div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default SectionGallery;