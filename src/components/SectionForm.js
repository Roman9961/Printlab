import React from 'react';
import PropTypes from 'prop-types';

class SectionForm extends React.Component{
    render(){
        return (
            <section className = "row-form">
                <i className="icon-mail"></i>
                <i className="icon-mail yellow"></i>
                <div className="wrapper-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-10 col-sm-offset-right-2 col-md-2 col-md-offset-right-1">
                                <div className="row visible-sm">
                                    <div className="col-sm-4"><h2>Обратная связь</h2></div>
                                    <div className="col-sm-8">
                                        <p className="text-24">Напишите ваши данные, напишите описание вашего заказа</p>
                                        <p>Напишите вообще что хотите в рамкам темы о наклейках </p>
                                    </div>
                                </div>
                                <div className="hidden-sm">
                                    <h2>Обратная связь</h2>
                                    <p className="text-24">Напишите ваши данные, напишите описание вашего заказа</p>
                                    <p>Напишите вообще что хотите в рамкам темы о наклейках </p>
                                </div>
                            </div>
                            <div className="col-sm-10 col-sm-offset-0 col-sm-offset-right-2 col-md-7 col-md-offset-0 col-md-offset-right-2">
                                <h2 className="hidden-xs"><span className="inline-block visible-lg visible-md">&nbsp;<br />&nbsp;</span></h2>
                                <form className="sendmessage">
                                    <div className="form-field">
                                        <input type="text" placeholder="Ваше имя" required="required" name="name"/>
                                        <p className="error-msg"></p>
                                        <i className="icon-checkmark"></i>
                                        <i className="icon-cross"></i>
                                    </div>
                                    <div className="form-field">
                                        <input type="tel" placeholder="Ваш телефон" required="required" name="phone"/>
                                        <p className="error-msg"></p>
                                        <i className="icon-checkmark"></i>
                                        <i className="icon-cross"></i>
                                    </div>
                                    <div className="form-field">
                                        <input type="email" placeholder="Ваша@почта.com" name="email"/>
                                        <p className="error-msg"></p>
                                        <i className="icon-checkmark"></i>
                                        <i className="icon-cross"></i>
                                    </div>
                                    <div className="form-field">
                                        <input type="text" placeholder="Какие мне нужны наклейки" name="comment"/>
                                        <p className="error-msg"></p>
                                        <i className="icon-checkmark"></i>
                                        <i className="icon-cross"></i>
                                    </div>
                                    <div className="form-field"><input className="btn btn-primary primary-form" type="submit" value="Отправить" /></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default SectionForm;