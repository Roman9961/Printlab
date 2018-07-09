import React from 'react';
import {updateTooltip} from '../tooltip';

class SectionBase extends React.Component{
    state = {
    };
    handleToolTip(selector) {

        if(this.state.selector!==selector) {
            updateTooltip(selector);
            this.setState(()=> ({
                selector
            }));
        }
    }
    render() {
       if(Object.keys(this.props.state.SectionBase).length>0) {
           return (
               <section>
                   <div className="side-img side-img--left side-img--left--base">
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
                                       <div className="section-block" key={key} onMouseEnter={()=>{this.handleToolTip(Section.toLowerCase())}}>
                                           <div className="section-block__header">
                                               <div className="section-block__title">
                                                   <img src={`images/base-${Section.toLowerCase()}.svg`} alt=""/>
                                                   <div>{this.props.state.SectionBase[Section].title}</div>
                                               </div>

                                               <div
                                                   className={`info info--${Section.toLowerCase()}`}
                                                   data-description={this.props.state.SectionBase[Section].description}
                                                   title=""
                                               >
                                               </div>
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