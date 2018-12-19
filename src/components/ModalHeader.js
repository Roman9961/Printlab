import React from 'react';
import {Transition} from 'react-transition-group'

const ModalHeader = (props)=> {

        return (
            <div className="wrapper-container wrapper-container--modal-header">
                <div className="container container--modal-header">
                    <div  className="header">
                        <div className="header__logo footer__logo">
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
                            <div className="modal-header__bookmarks__item__title active">Печать и основа</div>
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
                                        <div className={`modal-header__bookmarks__item__title ${status}`}>Дизайн и макет</div>
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
                                        <div className={`modal-header__bookmarks__item__title ${status}`}>Оплата и доставка</div>
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