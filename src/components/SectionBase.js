import React from 'react';
import ReactTooltip from 'react-tooltip';

class SectionBase extends React.Component{
    state = {
    };
    render() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
       if(Object.keys(this.props.state.SectionBase).length>0) {
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
                           <h1 className="section__title">Основа наклейки</h1>
                           <div className="section-block__container">

                               {
                                   Object.keys(this.props.state.SectionBase).map((Section, key)=>(
                                       <div className="section-block" key={key} >
                                           <div className="section-block__header">
                                               <div className="section-block__title">
                                                   <img src={`images/base-${Section.toLowerCase()}.svg`} alt=""/>
                                                   <div>{this.props.state.SectionBase[Section].title}</div>
                                               </div>

                                               <a className={`info info--${Section.toLowerCase()}`} data-for={Section.toLowerCase()} data-tip />
                                               <ReactTooltip className="tooltip_custom" id={Section.toLowerCase()} type="light" globalEventOff={ isMobile ? 'touchstart' : undefined }>
                                                   <div className="tooltip__container">
                                                       <div className="tooltip__description">{this.props.state.SectionBase[Section].description}</div>
                                                   </div>
                                               </ReactTooltip>

                                           </div>
                                           <div className="section-block__content">
                                               {
                                                   this.props.state.SectionBase[Section].content.map((content, key)=>(
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