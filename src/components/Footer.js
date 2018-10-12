import React from 'react';
import Scroll from 'react-scroll-to-element';
import { Link } from 'react-router-dom';

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
                    <div className="footer__terms">
                        <span className="terms"><Link to="/terms" target="_blank" >Договор оказания услуг</Link></span>
                        <img alt="Наклейки" title="Наклейки" src="images/visa_logo2.svg"/>
                    </div>
                </div>
            </div>
    </div>
    </footer>
    );

export default Footer;