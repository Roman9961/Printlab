import React from 'react';

const Header = e => (
    <header>
        <div className="wrapper-container">
            <div className="container">
                <div  className="header">
                    <div className="header__logo">
                        <img alt="Наклейки" title="Наклейки" src="images/logo.svg"/>
                    </div>
                    <div className="header__menu">
                        <div className="header__menu__item"><a href="javascript:;" data-scrollto=".menu-example">Цены</a></div>
                        <div className="header__menu__item"><a href="javascript:;" data-scrollto=".menu-print">Требования к макетам <br className="hidden-xs"/></a></div>
                        <div className="header__menu__item"><a href="javascript:;" data-scrollto=".row-with-us">Оплата и доставка</a></div>
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
            <div className="side-img side-img--right">
                <img alt="Наклейки" title="Наклейки" src="images/side-image-1.svg"/>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h1 className="header__title">Печатаем наклейки</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="header__subtitle">Не стираются, любой формы, гарантируем
                            качество. Изготовим за 1–3 рабочих дня.
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="side-img side-img--left">
                        <img alt="Наклейки" title="Наклейки" src="images/orange_path.svg"/>
                    </div>
                    <div className="col-md-6">
                        <a href="javascript:;" rel="nofollow" className="button button--calculator">Посчитать цену</a>
                    </div>
                </div>
            </div>

        </div>
        <div className="sticky-header  js-sticky-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-2 col-sm-3">
                        <a href="javascript:;" rel="nofollow" data-scrollto="header" className="logo"><img
                            alt="Цифровая печать" title="Цифровая печать" src="images/logo.svg"/></a>
                    </div>
                    <div className="col-md-6 col-md-offset-1 col-sm-7 col-sm-offset-0">
                        <div className="wrapper-flex">
                            <span className="phone"  data-href="tel:+380678283212" ><span className="icon-call" ></span><i>(067) 828 32 12</i></span>
                            <a href="javascript:;"  rel="nofollow" className="button">Посчитать наклейки</a>
                        </div>                </div>
                    <div className="col-md-3 col-sm-2">
                        <div className="menu-icon"><i></i></div>
                        <div className="header__menu sticky-header--menu">
                            <div className="header__menu__item"><a href="javascript:;" data-scrollto=".row-example">Цены</a></div>
                            <div className="header__menu__item"><a href="javascript:;" data-scrollto=".row-print">Требования к макетам</a></div>
                            <div className="header__menu__item"><a href="javascript:;" data-scrollto=".row-gallery">Дизайн</a></div>
                            <div className="header__menu__item"><a href="javascript:;" data-scrollto=".row-with-us">Оплата и доставка</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default Header;
