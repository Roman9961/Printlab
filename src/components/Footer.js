import React from 'react';

const Footer = e => (
    <footer>
        <div className="wrapper-container">
            <div className="container">
                <div  className="header">
                    <div className="header__logo footer__logo">
                    </div>
                    <div className="header__menu">
                        <div className="header__menu__item"><a className="footer__link" href="javascript:;" data-scrollto=".menu-example">Цены</a></div>
                        <div className="header__menu__item"><a className="footer__link" href="javascript:;" data-scrollto=".menu-print">Требования к макетам <br className="hidden-xs"/></a></div>
                        <div className="header__menu__item"><a className="footer__link" href="javascript:;" data-scrollto=".row-with-us">Оплата и доставка</a></div>
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