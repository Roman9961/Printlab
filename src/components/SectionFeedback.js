import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';

let captcha;

const SectionFeedback = ({
    errors,
    values,
    touched,
    submitForm,
    setFieldValue,
    handleModal
})=>{
    const phoneHandleFocus =(e)=>{
        if(!values.phone) {
            setFieldValue("phone", '+380');
        }
    };


    return (
        <section>
            <div className="container">
                <div className="section-container section-container--feedback">
                    <h1 className="section__title">Обратная связь</h1>
                    <div className="section-block__container section-block__container--feedback">
                        <div className="section-block section-block--feedback">
                            <Form className="feedback-form">

                                <div className="feedback-form__input-block">
                                <p className={`${touched.name && errors.name&&'active'}`}>{errors.name}</p>
                                    <label className={`feedback-form__label ${errors.name?'error':''}`} htmlFor="name">Ваше имя:</label>
                                    <Field className={`feedback-form__field ${errors.name?'error':''}`} type="text" id="name" name="name" placeholder="Имя"/>
                                </div>

                                <div className="feedback-form__input-block">
                                    <p className={`${touched.phone && errors.phone&&'active'}`}>{errors.phone}</p>
                                    <label className={`feedback-form__label ${errors.phone?'error':''}`} htmlFor="phone">Ваш телефон:</label>
                                    <Field onFocus={phoneHandleFocus} className={`feedback-form__field ${errors.phone?'error':''}`}  type="text" id="phone" name="phone" placeholder="+389999999999"/>
                                </div>

                                <div className="feedback-form__input-block">
                                    <p className={`${touched.email && errors.email&&'active'}`}>{errors.email}</p>
                                    <label className={`feedback-form__label ${errors.email?'error':''}`} htmlFor="name">Ваш email:</label>
                                    <Field className={`feedback-form__field ${errors.email?'error':''}`} type="text" name="email" placeholder="Email"/>
                                </div>

                                <div className="feedback-form__input-block">
                                    <label className="feedback-form__label" htmlFor="name">Сообщение:</label>
                                    <Field className="feedback-form__field" type="text" name="message" placeholder="Текст"/>
                                </div>
                                <div className="feedback-form__input-block">
                                    <ReCAPTCHA
                                        ref={(el) => { captcha = el; }}
                                        sitekey="6LcyQXEUAAAAAAt3JePBHrbYiPm0V9JtwQZt1ywF"
                                        size="invisible"
                                        onChange={
                                            (response) => {
                                                setFieldValue("recaptcha", response);
                                                handleModal()
                                                submitForm()
                                            }
                                        }
                                    />
                                    {errors.recaptcha
                                     && (
                                        <p>{errors.recaptcha}</p>
                                    )}
                                </div>
                                <div className="feedback-form__input-block feedback-form__button">
                                    <button className="button button--design asdad">Отправить</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )


}

const FormikFeedback = withFormik({
    mapPropsToValues(){
        return {
            name: '',
            phone: '',
            email: '',
            message: '',
            recaptcha: ""
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Обязательное поле'),
        phone: Yup.string().matches(/\+380\d{9}/, 'Неверній номер'),
        email: Yup.string().email().required('Обязательное поле'),
    }),
    handleSubmit(values, {resetForm, setSubmitting}){
        if(values.recaptcha){
            const xhr = new XMLHttpRequest();
            xhr.open("POST", '/server/confirm/index.php', true);

            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function(data) {//Вызывает функцию при смене состояния.
                if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                }
            }
            xhr.send(`question=true&email=${values.email}&name=${values.name}&phone=${values.phone}&message=${values.message}`);

            resetForm();
            setSubmitting(false);
            captcha.reset();
        }else {
            captcha.execute();
        }
    }
})(SectionFeedback);

export default FormikFeedback;