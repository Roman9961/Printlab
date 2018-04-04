import React from 'react';

const Header = e => (
    <header>
        <div className="wrapper-container">
            <div className="container visible">
                <div className="row">
                    <div className="col-sm-2 col-xs-4">
                        <div className="logo"><img alt="Наклейки" title="Наклейки" src="images/nakleyki-logo-header.svg"/></div>
                    </div>
                    <div className="col-md-5 col-sm-6 col-sm-push-0 col-xs-4 col-xs-push-4">
                        <div className="row"><div className="menu-icon"><i></i></div>
                            <ul className="menu">
                                <li className="col-sm-3"><a href="javascript:;" data-scrollto=".row-example">Цены</a></li>
                                <li className="col-sm-3"><a href="javascript:;" data-scrollto=".row-print">Требования <br className="hidden-xs"/>к макетам</a></li>
                                <li className="col-sm-3"><a href="javascript:;" data-scrollto=".row-gallery">Дизайн</a></li>
                                <li className="col-sm-3"><a href="javascript:;" data-scrollto=".row-with-us">Оплата <br className="hidden-xs"/>и доставка</a></li>
                            </ul></div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-sm-pull-0 col-xs-4 col-xs-pull-4">
                        <div className="wrapper-flex">
                            <div className="social_btns_wrap">
                                <span className="phone"  data-href="tel:+380988802388" ><span className="icon-call"></span><i>(098) 880-23-88</i></span>
                                <span className="header_telegram_wrap">
                                <a title="Telegram" href="tg://resolve?domain=Nakleyki_Na">
                                    <img src="images/social/telegram.svg" alt="Telegram"/>
                                </a>
                            </span>

                                <span className="header_viber_wrap">
                                <a title="Viber" href="viber://add?number=380988802388">
                                    <img src="images/social/viber.svg" alt="Viber"/>
                                </a>
                            </span>
                            </div>

                            <a className="mail" rel="nofollow" href="mailto:zakaz@nakleyki-na.com.ua"><i>zakaz@nakleyki-na.com.ua</i></a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                        <h1 className="header-title">Печатаем наклейки</h1>

                        <div className="row row-centered">
                            <div className="col-xs-4 col-xs-offset-0">
                                <div className="single-image header-cut-img"><img alt="Принты" title="Принты" src="images/header-shapes.gif"/></div>
                            </div>
                            <div className="col-xs-8">
                                <p className="text-24 header-cut">и вырезаем их по контуру любой формы</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">

                    <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                        <a href="javascript:;" rel="nofollow" className="btn btn-default btn-block btn-form-calculator btn-form-full btn-form-popup">Посчитать цену</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="sticky-header ">
            <div className="container">
                <div className="row">
                    <div className="col-md-2 col-sm-3">
                        <a href="javascript:;" rel="nofollow" data-scrollto="header" className="logo"><img
                            alt="Цифровая печать" title="Цифровая печать" src="images/nakleyki-logo-footer.svg"/></a>
                    </div>
                    <div className="col-md-6 col-md-offset-1 col-sm-7 col-sm-offset-0">
                        <div className="wrapper-flex">
                            <span className="phone"  data-href="tel:+380988802388" ><span className="icon-call" ></span><i>(098) 880-23-88</i></span>
                            <a href="javascript:;"  rel="nofollow" className="btn btn-form-calculator btn-form-popup btn-bordered hidden-xs">Посчитать наклейки</a>
                        </div>                </div>
                    <div className="col-md-3 col-sm-2">
                        <div className="menu-icon"><i></i></div>
                        <ul className="menu">
                            <li className="col-sm-3"><a href="javascript:;" data-scrollto=".row-example">Цены</a></li>
                            <li className="col-sm-3"><a href="javascript:;" data-scrollto=".row-print">Требования <br className="hidden-xs"/>к макетам</a></li>
                            <li className="col-sm-3"><a href="javascript:;" data-scrollto=".row-gallery">Дизайн</a></li>
                            <li className="col-sm-3"><a href="javascript:;" data-scrollto=".row-with-us">Оплата <br className="hidden-xs"/>и доставка</a></li>
                        </ul>                </div>
                </div>
            </div>
        </div> 
    </header>
    );

export default Header;