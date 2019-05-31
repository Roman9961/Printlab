import React from 'react';
import PriceTable from './PriceTable';

class SectionContent1 extends React.Component{
    render(){
        return (
            <div className = "row">
                {
                    this.props.state.SectionBetterStick.map( (elem, index) => {
                        return(
                            <div className = "col-sm-3 col-sm-offset-right-1 wrapper-example-stick-item" key = {index}>
                                <div className = "single-image stick-example-img"><img className = {elem.sect4imgClass} src = {elem.sect4imgSrc} alt="1"/></div>
                                <div className = "example-stick-item">
                                    <div className="stick-example-img-hover"><img src = {elem.sect4imgSrcHover} alt="1"/></div>
                                    <h3 className="title-with-arrow">{elem.sect4title}</h3>
                                    <p>{elem.sect4subtitle}</p>
                                    <p className="example-stick-item-txt">{elem.sect4txt}</p>
                                    <div className="m-bottom-6"><b>Основа: </b>бумажная</div>
                                    <div className="m-bottom-6"><b>Размер: </b>60мм × 60мм</div>
                                    <div className="m-bottom-6"><b>Количество: </b>{elem.sect4amount}</div>
                                    <div className="text-30 m-top-bottom-36">{elem.sect4price}</div>
                                    <button className='btn btn-primary'><span>показать цены</span><span>скрыть цены</span></button>
                                    <PriceTable price={this.props.state.price} id={index + 1}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SectionContent1;