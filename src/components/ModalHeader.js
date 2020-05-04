import React from 'react';
import {Transition} from 'react-transition-group'

const translations = {
    ua:{
        'print': 'Друк і основа',
        'design': 'Дизайн і макет',
        'payment': 'Оплата і доставка',
    },
    ru:{
        'print': 'Печать и основа',
        'design': 'Дизайн и макет',
        'payment': 'Оплата и доставка',
    }
}

const ModalHeader = (props)=> {
        const  getTranslation = () => {
            return translations[props.locale]
        }
        return (
            <div className="wrapper-container wrapper-container--modal-header">
                <div className="container container--modal-header">
                    <div  className="header">
                        <div className="header__logo footer__logo" onClick={()=>(props.handleModal({}))}>
                        </div>

                        <div className="modal-header__close" onClick={()=>(props.handleModal({}))}>
                        </div>
                    </div>
                    <div className="modal-header__bookmarks">
                        <div className="modal-header__bookmarks__item" onClick={()=>{props.handleBookmark({
                            print:true,
                            design:false,
                            deliver:false
                        })}}>
                            <div className="modal__check-icon active"></div>
                            <div className="modal-header__bookmarks__item__title active">{getTranslation().print}</div>
                        </div>
                        <div className="modal-header__bookmarks__item" onClick={()=>{props.handleBookmark({
                            print:false,
                            design:true,
                            deliver:false
                        })}}>
                            <Transition in={(props.bookmarks.design||props.bookmarks.deliver)} timeout={200}>
                                {status=>(
                                    <React.Fragment>
                                        <div className={`modal__check-icon ${status}`}></div>
                                        <div className={`modal-header__bookmarks__item__title ${status}`}>{getTranslation().design}</div>
                                    </React.Fragment>
                                )}
                            </Transition>
                        </div>
                        <div className="modal-header__bookmarks__item" onClick={()=>{props.handleBookmark({
                            print:false,
                            design:false,
                            deliver:true
                        })}}>
                            <Transition in={props.bookmarks.deliver} timeout={200}>
                                {status=>(
                                    <React.Fragment>
                                        <div className={`modal__check-icon ${status}`}></div>
                                        <div className={`modal-header__bookmarks__item__title ${status}`}>{getTranslation().payment}</div>
                                    </React.Fragment>
                                )}
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>
        )
};

export default ModalHeader;