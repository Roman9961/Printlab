import React from 'react';
import Scroll from 'react-scroll-to-element';

const Footer = e => (
    <footer>
        <div className="wrapper-container">
            <div className="container">
                <div  className="header">
                    <div className="header__logo footer__logo">
                    </div>
                    <div className="header__menu">
                        <Scroll type="class" element="prices"><div className="header__menu__item">Цены</div></Scroll>
                        <Scroll type="class" element="requairements"><div className="header__menu__item">Требования к макетам</div></Scroll>
                        <Scroll type="class" element="delivery__top"><div className="header__menu__item">Оплата и доставка</div></Scroll>
                    </div>
                    <div className="header__contacts">
                        <div className="header__contacts__phone">
                            <div className="header__contacts__phone__icon">
                                <img alt="Наклейки" title="Наклейки" src="images/call.svg"/>
                            </div>
                            <div className="header__contacts__phone__block">
                                <span>(067) 828 32 12</span>
                                <span>(044) 232 10 88</span>
                            </div>
                        </div>
                        <span>zakaz@okprint.com.ua</span>
                    </div>
                </div>
            </div>
    </div>
    </footer>
    );

export default Footer;