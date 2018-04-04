import React from 'react';
import SectionGallery from './SectionGallery';
import SectionPrint from './SectionPrint';
import Section from './Section';



class PageContent extends React.Component{


    render(){

        return (
            <div id = 'firstpart'>
            <div>
                <Section data={this.props.state.my_section} state = {this.props.state} />
                <SectionGallery />
                <SectionPrint state = {this.props.state}/>
            </div>
            </div>
        )
    }
}

export default PageContent;