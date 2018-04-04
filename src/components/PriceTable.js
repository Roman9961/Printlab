import React from 'react';
import Row from './Row';

class PriceTable extends React.Component{
    render(){

        const id = this.props.id,
            /*show = this.state.show, */
            rows = this.props.price.map(function(elem, index){
                if(id === 1){ return( <Row key={index} kolvo={elem.priceKol} pricePaper={elem.pricePaper1} pricePlast = {elem.pricePlast1}/> )}
                if(id === 2){ return( <Row key={index} kolvo={elem.priceKol} pricePaper={elem.pricePaper2} pricePlast = {elem.pricePlast2}/> )}
                if(id === 3){ return( <Row key={index} kolvo={elem.priceKol} pricePaper={elem.pricePaper3} pricePlast = {elem.pricePlast3}/> )}
            });
        return (

            /*<button onClick={this.showPrice} className={'btn btn-primary ' + (show ? 'show-price' : '')}>{show ? 'скрыть цены' : 'показать цены'}</button>*/
            <div className="example-stick-item-table">
                <table>
                    <thead><tr>
                        <td>Количество<br/>шт</td>
                        <td>Бумажная<br/>основа</td>
                        <td>Пластиковая<br/>основа</td>
                    </tr></thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default PriceTable;