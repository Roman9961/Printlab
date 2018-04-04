import React from 'react';

const Footer = e => (
    <footer>
        <div className="wrapper-container">
            <div className="container">
                <div className="row">
                    <div className="col-sm-3 col-xs-5">
                        <a href="javascript:;" rel="nofollow" data-scrollto="header" className="logo"><img
                            alt="Порезка плоттером" title="Порезка плоттером" src="images/nakleyki-logo-footer.svg"/></a>
                    </div>
                    <div className="col-sm-7 col-md-6 col-xs-6 col-xs-offset-1 col-sm-offset-0">
                        <div className="row">
                            <div className="col-sm-5 col-sm-offset-1 col-md-5 col-md-offset-1 hidden-xs lg-alignright  contact-wrapper">
                            <span className="phone" data-href="tel:+380988802388">
                                <span className="icon-call"></span><i>(098) 880-23-88</i>
                            </span>
                                <a className="mail" rel="nofollow" href="mailto:zakaz@nakleyki-na.com.ua">
                                    <i>zakaz@nakleyki-na.com.ua</i>
                                </a>
                            </div>
                            <div className="col-sm-5 col-sm-offset-1 col-lg-4 col-lg-offset-2 ">
                                <a href="javascript:;" rel="nofollow"
                                   className="btn btn-block btn-bordered btn-bordered-yellow btn-sm btn-form-contact btn-form-popup indexphp">Хочу наклейки</a>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 visible-xs clear-xs-left">
                    <span className="phone" data-href="tel:+380988802388">
                        <span className="icon-call"></span><i>(098) 880-23-88</i>
                    </span>
                    <a className="mail" rel="nofollow" href="mailto:zakaz@nakleyki-na.com.ua">
                        <span className="icon-mail"></span><i>zakaz@nakleyki-na.com.ua</i>
                    </a>
                </div>
                <div className="col-sm-2 col-md-3 col-xs-6">
                    <div className="social-ico-wrapper">
                        <a rel="nofollow" className="social-ico fb" href="https://www.facebook.com/nakleykina" target="_blank"></a>
                        <a rel="nofollow" className="social-ico instagram" href="https://www.instagram.com/nakleyki_na" target="_blank"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </footer>
    );

export default Footer;