import React from 'react';


class SectionContent4 extends React.Component{
    render(){
        return (
            <div className = "row">
                {
                    this.props.state.SectionBetterStick.map( (elem, index) => {
                        return(
                            <div className = "col-sm-4 improving-sticker-item" key = {index}>
                                <h4 className="ultitle"><span className = {elem.sect3icoClass} />{elem.sect3title}</h4>
                                <p className="sticker-item-txt">{elem.sect3txt}<br/></p>
                                <a className="txt-popup" href = {'#txt-lamination-popup' + elem.sect3href} target = "_blank">Подробнее</a>

                                <div id={'txt-lamination-popup' + elem.sect3href} className="mfp-hide">
                                    {/*<div className="row">*/}
                                    <div className="bg-popup">{/*col-sm-6  col-sm-offset-3 col-xs-12 col-xs-offset-0 */}
                                        <div className="wrapepper-popup-content">
                                            <h4 className="ultitle"><span className = {elem.sect3icoClass} />{elem.sect3title}</h4>
                                            <p>{elem.sect3txtFull}</p>
                                        </div>
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SectionContent4;