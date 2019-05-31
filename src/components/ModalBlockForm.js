import React from 'react';

const ModalBlockForm = (props)=> {

        return (
            <div className="wrapper-container wrapper-container--modal-grey">
                <div className="container container--modal-info">
                        <div className="modal-block">
                                <div className="modal-block__title">Форма наклейки:</div>
                                        <div className="modal-block__content">
                                                <label htmlFor="form-rectangle">
                                                        <div className="modal-block__content__item">
                                                                <div className="modal-block__content__item__icon">

                                                                </div>
                                                                <div className="frm_radio">
                                                                        <input type="radio" name="form" id="form-rectangle" value="Прямоугольная" />
                                                                        <div className="shape-wrapper">
                                                                                <svg className="sprite-icon icon-shape">
                                                                                        {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#shape-rect"></use>*/}
                                                                                </svg>
                                                                                <i className="icon-check"></i>
                                                                        </div>
                                                                        <span>Прямоугольная(без скругления)</span>
                                                                </div>
                                                        </div>
                                                </label>
                                         </div>
                                </div>
                </div>
            </div>
        )
};

export default ModalBlockForm;