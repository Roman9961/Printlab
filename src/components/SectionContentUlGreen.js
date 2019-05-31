import React from 'react';

class SectionContentUlGreen extends React.Component{
    render(){
        return (
            <div className="col-sm-6 col-lg-5 first-ul-list">
                <h3 className="ultitle"><span className="icon-tree green" />Бумажная основа</h3>
                <ul className="ul-green">
                    {
                            this.props.state.Section_ul.filter(el => el.liGreen).map(
                                (el, index) => <li key={index}>{el.liGreen}</li>
                            )
                    }
                </ul>
            </div>
        )
    }
}

export default SectionContentUlGreen;