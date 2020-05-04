import React from 'react';
import ReactTooltip from 'react-tooltip';

class SectionBase extends React.Component{
    state = {
        translations:{
            ua:{
                    'title': 'Основа наклейки',
                    'Paper':{
                        'content':[
                            'дешевше плівки',
                            'можна писати олівцем або ручкою',
                            'боїться води',
                            'при знятті клей залишається на поверхні',
                            'легко рветься'
                        ],
                        'description':'',
                        'title': 'Папір'
                    },
                    'Plastic':{
                        'content':[
                            'не розмокає',
                            'виготовлення зворотних стікерів, які клеяться зсередини приміщення',
                            'при проклеюванні клей не залишає слідів',
                            'не вигоряє на сонці',
                            'дорожче паперових наклейок',
                            'важко писати ручкою або олівцем',
                            'є можливість друку на прозорій плівці білим кольором, лаком',
                            'не рветься'
                        ],
                        'description':'',
                        'title': 'Плівка'
                    }
                    
            },
            ru:{
                 'title': 'Основа наклейки',   
                'Paper':{
                    'content':[
                        "дешевле плёнки",
                        "можно писать карандашом или ручкой",
                        "боится воды",
                        "при снятии клей остается на поверхности",
                        "легко рвется"
                    ],
                    'description':"Наклейки по своей структуре одинаковые – это клеевой слой и основа на которой можно печатать. Основа может быть двух видов – бумажная и синтетическая (пластиковая). В зависимости от сферы применения и назначения наклейки выбирают соответствующий вид основы.",
                    'title': "Бумага"
                },
                'Plastic':{
                    'content':[
                        "не размокает",
                        "изготовление обратных стикеров, которые клеятся изнутри помещения",
                        "при поклейке клей не оставляет следов",
                        "не выгорает на солнце",
                        "дороже бумажных наклеек",
                        "тяжело писать ручкой или карандашом",
                        "есть возможность печати на прозрачной пленке белым цветом, лаком, полноцветом",
                        "не рвется"
                    ],
                    'description':"Наклейки по своей структуре одинаковые – это клеевой слой и основа на которой можно печатать. Основа может быть двух видов – бумажная и синтетическая (пластиковая). В зависимости от сферы применения и назначения наклейки выбирают соответствующий вид основы.",
                    'title': "Плёнка"
                }
            }
        },
    };

    getTranslation(){
        return this.state.translations[this.props.locale]
    }
    render() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
       
       if(Object.keys(this.getTranslation()).length>0) {
           return (
               <section>
                   <div className="side-img side-img--left side-img--left--base mobile-hidden">
                       <img alt="Наклейки" title="Наклейки" src="images/side-image-base-left.svg"/>
                   </div>
                   <div className="side-img side-img--right side-img--right--base">
                       <img alt="Наклейки" title="Наклейки" src="images/side-image-base-right.svg"/>
                   </div>
                   <div className="container">
                       <div className="section-container">
                           <h1 className="section__title">{this.getTranslation().title}</h1>
                           <div className="section-block__container">

                               {
                                   Object.keys(this.getTranslation()).map((Section, key)=>(
                                    typeof this.getTranslation()[Section] == 'object' && <div className="section-block" key={key} >
                                           <div className="section-block__header">
                                               <div className="section-block__title">
                                                   <img src={`images/base-${Section.toLowerCase()}.svg`} alt=""/>
                                                   <div>{this.getTranslation()[Section].title}</div>
                                               </div>

                                               <a className={`info info--${Section.toLowerCase()}`} data-for={Section.toLowerCase()} data-tip />
                                               <ReactTooltip className="tooltip_custom" id={Section.toLowerCase()} type="light" globalEventOff={ isMobile ? 'touchstart' : undefined }>
                                                   <div className="tooltip__container">
                                                       <div className="tooltip__description">{this.getTranslation()[Section].description}</div>
                                                   </div>
                                               </ReactTooltip>

                                           </div>
                                           <div className="section-block__content">
                                               {
                                                
                                                typeof this.getTranslation()[Section] == 'object' && this.getTranslation()[Section].content.map((content, key)=>(
                                                       <div className="section-block__item" key={key}>
                                                           {content}
                                                       </div>
                                                   ))
                                                
                                               }
                                           </div>
                                       </div>
                                   ))
                               }


                           </div>
                       </div>

                   </div>
               </section>
           )
       }else{
           return (
               <React.Fragment>
               </React.Fragment>
           )
       }
        }
}

export default SectionBase;