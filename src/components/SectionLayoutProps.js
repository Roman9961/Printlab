import React from 'react';
import Scroll from 'react-scroll-to-element';

const translations = {
    ua:{
        'title': 'Вимоги до макетів',
        'write':[
            'Якщо будуть питання -',
            'напишіть',
            'нам'
        ],
        'formats': 'Формати файлів, з якими ми працюємо:',
        'fon': 'Фон більше на 1 мм',
        'fon_desc': 'Додаткові вильоти фону потрібні для правильної обрізки готового виробу.',
        'profile': 'Кольоровий профіль - СMYK',
        'profile_desc': 'Щоб готовий виріб вийшов таким, як ви його задумали, обов\'язково використовуйте колірний профіль CMYK.',
        resolution: 'Розширення макета - 300 dpi',
        resolution_desc: 'Розмір має значення. Менше розширення − менш чітке зображення на печатці. Для чіткого, різкого зображення, розширення макета має бути не менше 300 dpi (точок на дюйм)',
        'contur': 'Контур порізки наклейок',
        'contur_desc': 'Щоб вирізати наклейку, потрібен контур. Контур − це замкнута фігура, яка спрямовує ніж ріжучої машини по папері. Контур повинен бути розміщений в окремому прошарку макета або прикладений до макету в окремому файлі.',

    },
    ru:{
        'title': 'Требования к макетам',
        'write':[
            'Если будут вопросы -',
            'напишите',
            'нам'
        ],
        'formats': 'Форматы файлов, с которыми мы работаем:',
        'fon': 'Фон больше на 1 мм',
        'fon_desc': 'Дополнительные вылеты фона нужны для правильной обрезки готового изделия.',
        'profile': 'Цветовой профиль - СMYK',
        'profile_desc': 'Чтобы готовое изделие получилось таким, как вы его задумали, обязательно используйте цветовой профиль CMYK.',
        resolution: 'Разрешение макета – 300 dpi',
        resolution_desc: 'Размер имеет значение. Меньше разрешение - менее четкое изображение на печати. Для четкого, резкого изображения, разрешение макета должно быть не менее 300 dpi (точек на дюйм)',
        'contur': 'Контур порезки наклеек',
        'contur_desc': 'Чтобы вырезать наклейку, нужен контур. Контур - это замкнутая фигура, направляющая нож режущей машины по бумаге. Контур должен быть размещен в отдельном слое макета или приложен к макету в отдельном файле.',

    }
}

const SectionLayoutProps = (props)=>{

    const  getTranslation = () => {
        return translations[props.locale]
    }

           return (
               <section>
                   <div className="container requairements">
                       <div className="section-container section-container--layout-props">
                           <h1 className="section__title">{getTranslation().title}</h1>
                           <div className="section-block__container section-block__container--layout-props">
                               <div className="section-block section-block--layout-props left">
                                   <div className="layout-props__side-content">
                                       <div><a href="/images/printlab_requirements.pdf"  rel="nofollow" className="button button--pdf" download >{getTranslation().title}</a></div>
                                       <div>{getTranslation().write[0]} <Scroll type="class" element="section-container--feedback"><a href="javascript:;">{getTranslation().write[1]}</a></Scroll> {getTranslation().write[2]}</div>
                                   </div>
                                   <div className="layout-props__side-content layout-props__side-content--gray">
                                       <div className="section-block__header">
                                           <div className="section-block__title layout-props__side-content__title">
                                               <div>{getTranslation().formats}</div>
                                           </div>
                                       </div>
                                       <div className="section-block__content">
                                           <div className="section-block__item">CDR</div>
                                           <div className="section-block__item">PDF</div>
                                           <div className="section-block__item">AI</div>
                                           <div className="section-block__item">EPS</div>
                                           <div className="section-block__item">TIFF</div>
                                           <div className="section-block__item">PSD</div>
                                       </div>
                                   </div>
                               </div>
                               <div className="section-block section-block--layout-props">
                                   <div className="layout-props__block">
                                       <div className="layout-props__block__icon">
                                           <img src="images/layout-props_1.svg" alt=""/>
                                       </div>
                                       <div className="layout-props__block__content">
                                           <div className="layout-props__block__content__title">{getTranslation().fon}</div>
                                           <div className="layout-props__block__content__description">{getTranslation().fon_desc}</div>
                                       </div>
                                   </div>
                                   <div className="layout-props__block">
                                       <div className="layout-props__block__icon layout-props__block__icon--cmyk">
                                           <img src="images/layout-props_2.svg" alt=""/>
                                       </div>
                                       <div className="layout-props__block__content">
                                           <div className="layout-props__block__content__title">{getTranslation().profile}</div>
                                           <div className="layout-props__block__content__description">{getTranslation().profile_desc}</div>
                                       </div>
                                   </div>
                                   <div className="layout-props__block">
                                       <div className="layout-props__block__icon">
                                           <img src="images/layout-props_3.svg" alt=""/>
                                       </div>
                                       <div className="layout-props__block__content">
                                           <div className="layout-props__block__content__title">{getTranslation().resolution}</div>
                                           <div className="layout-props__block__content__description">{getTranslation().resolution_desc}</div>
                                       </div>
                                   </div>
                                   <div className="layout-props__block">
                                       <div className="layout-props__block__icon">
                                           <img src="images/layout-props_4.svg" alt=""/>
                                       </div>
                                       <div className="layout-props__block__content">
                                           <div className="layout-props__block__content__title">{getTranslation().contur}</div>
                                           <div className="layout-props__block__content__description">{getTranslation().contur_desc}</div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </section>
           )
}

export default SectionLayoutProps;