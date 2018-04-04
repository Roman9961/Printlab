import React from 'react';


class SectionContentUlBlue extends React.Component{
    render(){
        return (
            <div className="col-sm-6 col-md-offset-0 col-lg-5 col-lg-offset-1">
                <h3 className="ultitle"><span className="icon-drop blue-dark" /><span>(пластиковая)</span>Виниловая основа</h3>
                <ul className="ul-blue-dark">
                    {
                        this.props.state.Section_ul.filter(el => el.liBlue).map(
                                (el, index) => <li key={index}>{el.liBlue}</li>
                        )


                    }
                </ul>
            </div>
        )
    }
}

export default SectionContentUlBlue;