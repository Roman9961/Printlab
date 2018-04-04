import React from 'react';
import SectionStructure from './SectionStructure';
import PropTypes from 'prop-types';


class Section extends React.Component{
    render(){
        const data = this.props.data;
        const sectionTemplate = data.map((item, index) =>{
            return (
                <section key={index} className = {item.wrapClass}>
                    <div className="wrapper-container">
                        <div className="container visible">
                            <SectionStructure data={item} state = {this.props.state}/>
                        </div>
                    </div>
                </section>
            )
        })
        return (
            <div>{sectionTemplate}</div>
        );
    }
}

export default Section;