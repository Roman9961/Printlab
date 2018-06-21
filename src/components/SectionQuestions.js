import React from 'react';

class SectionQuestions extends React.Component{
    state = {
        open:false
    };
    handleRollup = (selector)=>{
        if(this.state.open===selector){
            this.setState(()=>({open:false}))
        }else {
            this.setState(()=>({open: selector}))
        }
    };

    render() {
           return (
               <section className="section-top postprint__top">
                   <div className="container">
                       <div className="section-container">
                           <h1 className="section__title">Часто задаваемые вопросы</h1>
                           <div className="section-block__container section-block__container__question">
                               <div className={`section-block section-block--question ${this.state.open===1?'open':'closed'}`}>
                                   <div className={`section-block__header section-block__header__question ${this.state.open===1?'':'closed'}`} onClick={()=>{this.handleRollup(1)}}>
                                       <div className={`open-icon ${this.state.open===1?'up':''}`} >
                                           <div className={`arrows down ${this.state.open===1?'up':''}`}></div>
                                       </div>
                                       <div className="section-block__title section-block__title__postprint">
                                           <div>Что такое СМYК?</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                       <div className={`section-block__item__description section-block__item__description--question ${this.state.open===1?'open':'closed'}`}>
                                           При выборе квадратных или прямоугольных наклеек размером больше, чем 40х40 мм порезка осуществляем на гильотине, поэтому вы получите стопку наклеек.
                                           Если размер меньше 40х40 мм или форма не квадратная, мы будем резать наклейки на плоттере. В нашей типографии есть вариант цифровой планшетной высечки, вы сможете получить наклейки как на листе формата SRA3 (32х45см) так и каждую наклейку отдельно.

                                       </div>
                                   </div>
                               </div>

                               <div className={`section-block section-block--question ${this.state.open===2?'open':'closed'}`}>
                                   <div className={`section-block__header section-block__header__question ${this.state.open===2?'':'closed'}`} onClick={()=>{this.handleRollup(2)}}>
                                       <div className={`open-icon ${this.state.open===2?'up':''}`} >
                                           <div className={`arrows down ${this.state.open===2?'up':''}`}></div>
                                       </div>
                                       <div className="section-block__title section-block__title__postprint">
                                           <div>Какой у вас вид печати?</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                       <div className={`section-block__item__description section-block__item__description--question ${this.state.open===2?'open':'closed'}`}>
                                           При выборе квадратных или прямоугольных наклеек размером больше, чем 40х40 мм порезка осуществляем на гильотине, поэтому вы получите стопку наклеек.
                                           Если размер меньше 40х40 мм или форма не квадратная, мы будем резать наклейки на плоттере. В нашей типографии есть вариант цифровой планшетной высечки, вы сможете получить наклейки как на листе формата SRA3 (32х45см) так и каждую наклейку отдельно.

                                       </div>
                                   </div>
                               </div>

                               <div className={`section-block section-block--question ${this.state.open===3?'open':'closed'}`}>
                                   <div className={`section-block__header section-block__header__question ${this.state.open===3?'':'closed'}`} onClick={()=>{this.handleRollup(3)}}>
                                       <div className={`open-icon ${this.state.open===3?'up':''}`} >
                                           <div className={`arrows down ${this.state.open===3?'up':''}`}></div>
                                       </div>
                                       <div className="section-block__title section-block__title__postprint">
                                           <div>В каком виде я получу наклейки?</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                       <div className={`section-block__item__description section-block__item__description--question ${this.state.open===3?'open':'closed'}`}>
                                           При выборе квадратных или прямоугольных наклеек размером больше, чем 40х40 мм порезка осуществляем на гильотине, поэтому вы получите стопку наклеек.
                                           Если размер меньше 40х40 мм или форма не квадратная, мы будем резать наклейки на плоттере. В нашей типографии есть вариант цифровой планшетной высечки, вы сможете получить наклейки как на листе формата SRA3 (32х45см) так и каждую наклейку отдельно.

                                       </div>
                                   </div>
                               </div>

                               <div className={`section-block section-block--question ${this.state.open===4?'open':'closed'}`}>
                                   <div className={`section-block__header section-block__header__question ${this.state.open===4?'':'closed'}`} onClick={()=>{this.handleRollup(4)}}>
                                       <div className={`open-icon ${this.state.open===4?'up':''}`} >
                                           <div className={`arrows down ${this.state.open===4?'up':''}`}></div>
                                       </div>
                                       <div className="section-block__title section-block__title__postprint">
                                           <div>Можно ли напечатать на клеевой основе наклейки?</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                       <div className={`section-block__item__description section-block__item__description--question ${this.state.open===4?'open':'closed'}`}>
                                           При выборе квадратных или прямоугольных наклеек размером больше, чем 40х40 мм порезка осуществляем на гильотине, поэтому вы получите стопку наклеек.
                                           Если размер меньше 40х40 мм или форма не квадратная, мы будем резать наклейки на плоттере. В нашей типографии есть вариант цифровой планшетной высечки, вы сможете получить наклейки как на листе формата SRA3 (32х45см) так и каждую наклейку отдельно.

                                       </div>
                                   </div>
                               </div>

                               <div className={`section-block section-block--question ${this.state.open===5?'open':'closed'}`}>
                                   <div className={`section-block__header section-block__header__question ${this.state.open===5?'':'closed'}`} onClick={()=>{this.handleRollup(5)}}>
                                       <div className={`open-icon ${this.state.open===5?'up':''}`} >
                                           <div className={`arrows down ${this.state.open===5?'up':''}`}></div>
                                       </div>
                                       <div className="section-block__title section-block__title__postprint">
                                           <div>Как быстро вы изготовите мой заказ?</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                       <div className={`section-block__item__description section-block__item__description--question ${this.state.open===5?'open':'closed'}`}>
                                           При выборе квадратных или прямоугольных наклеек размером больше, чем 40х40 мм порезка осуществляем на гильотине, поэтому вы получите стопку наклеек.
                                           Если размер меньше 40х40 мм или форма не квадратная, мы будем резать наклейки на плоттере. В нашей типографии есть вариант цифровой планшетной высечки, вы сможете получить наклейки как на листе формата SRA3 (32х45см) так и каждую наклейку отдельно.

                                       </div>
                                   </div>
                               </div>

                               <div className={`section-block section-block--question ${this.state.open===6?'open':'closed'}`}>
                                   <div className={`section-block__header section-block__header__question ${this.state.open===6?'':'closed'}`} onClick={()=>{this.handleRollup(6)}}>
                                       <div className={`open-icon ${this.state.open===6?'up':''}`} >
                                           <div className={`arrows down ${this.state.open===6?'up':''}`}></div>
                                       </div>
                                       <div className="section-block__title section-block__title__postprint">
                                           <div>А какое поле запечатки для плоттерной порезки?</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                       <div className={`section-block__item__description section-block__item__description--question ${this.state.open===6?'open':'closed'}`}>
                                           При выборе квадратных или прямоугольных наклеек размером больше, чем 40х40 мм порезка осуществляем на гильотине, поэтому вы получите стопку наклеек.
                                           Если размер меньше 40х40 мм или форма не квадратная, мы будем резать наклейки на плоттере. В нашей типографии есть вариант цифровой планшетной высечки, вы сможете получить наклейки как на листе формата SRA3 (32х45см) так и каждую наклейку отдельно.

                                       </div>
                                   </div>
                               </div>

                               <div className={`section-block section-block--question ${this.state.open===7?'open':'closed'}`}>
                                   <div className={`section-block__header section-block__header__question ${this.state.open===7?'':'closed'}`} onClick={()=>{this.handleRollup(7)}}>
                                       <div className={`open-icon ${this.state.open===7?'up':''}`} >
                                           <div className={`arrows down ${this.state.open===7?'up':''}`}></div>
                                       </div>
                                       <div className="section-block__title section-block__title__postprint">
                                           <div>Если у меня нет макета или он не соответствует вашим требованиям?</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                       <div className={`section-block__item__description section-block__item__description--question ${this.state.open===7?'open':'closed'}`}>
                                           При выборе квадратных или прямоугольных наклеек размером больше, чем 40х40 мм порезка осуществляем на гильотине, поэтому вы получите стопку наклеек.
                                           Если размер меньше 40х40 мм или форма не квадратная, мы будем резать наклейки на плоттере. В нашей типографии есть вариант цифровой планшетной высечки, вы сможете получить наклейки как на листе формата SRA3 (32х45см) так и каждую наклейку отдельно.

                                       </div>
                                   </div>
                               </div>

                               <div className={`section-block section-block--question ${this.state.open===8?'open':'closed'}`}>
                                   <div className={`section-block__header section-block__header__question ${this.state.open===8?'':'closed'}`} onClick={()=>{this.handleRollup(8)}}>
                                       <div className={`open-icon ${this.state.open===8?'up':''}`} >
                                           <div className={`arrows down ${this.state.open===8?'up':''}`}></div>
                                       </div>
                                       <div className="section-block__title section-block__title__postprint">
                                           <div>Есть ли у вас особенные технологии печати?</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                       <div className={`section-block__item__description section-block__item__description--question ${this.state.open===8?'open':'closed'}`}>
                                           При выборе квадратных или прямоугольных наклеек размером больше, чем 40х40 мм порезка осуществляем на гильотине, поэтому вы получите стопку наклеек.
                                           Если размер меньше 40х40 мм или форма не квадратная, мы будем резать наклейки на плоттере. В нашей типографии есть вариант цифровой планшетной высечки, вы сможете получить наклейки как на листе формата SRA3 (32х45см) так и каждую наклейку отдельно.

                                       </div>
                                   </div>
                               </div>

                               <div className={`section-block section-block--question ${this.state.open===9?'open':'closed'}`}>
                                   <div className={`section-block__header section-block__header__question ${this.state.open===9?'':'closed'}`} onClick={()=>{this.handleRollup(9)}}>
                                       <div className={`open-icon ${this.state.open===9?'up':''}`} >
                                           <div className={`arrows down ${this.state.open===9?'up':''}`}></div>
                                       </div>
                                       <div className="section-block__title section-block__title__postprint">
                                           <div>Есть ли у вас доставка по СНГ, миру?</div>
                                       </div>
                                   </div>
                                   <div className="section-block__content">
                                       <div className={`section-block__item__description section-block__item__description--question ${this.state.open===9?'open':'closed'}`}>
                                           При выборе квадратных или прямоугольных наклеек размером больше, чем 40х40 мм порезка осуществляем на гильотине, поэтому вы получите стопку наклеек.
                                           Если размер меньше 40х40 мм или форма не квадратная, мы будем резать наклейки на плоттере. В нашей типографии есть вариант цифровой планшетной высечки, вы сможете получить наклейки как на листе формата SRA3 (32х45см) так и каждую наклейку отдельно.

                                       </div>
                                   </div>
                               </div>

                           </div>
                       </div>
                   </div>
                   <div className="section-bg__top postprint__bg"></div>
               </section>
           )
        }
}

export default SectionQuestions;