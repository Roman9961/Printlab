import React from 'react';
import {Transition} from 'react-transition-group'

const ModalHeaderDesign = (props)=> {

        return (
            <div className="wrapper-container wrapper-container--modal-header">
                <div className="container container--modal-header">
                    <div  className="header">
                        <div className="header__logo footer__logo">
                        </div>

                        <div className="modal-header__close" onClick={()=>(props.handleModal({}))}>
                        </div>
                    </div>
                </div>
            </div>
        )
};

export default ModalHeaderDesign;