import React from 'react';

class AdminTable extends React.Component{
    state = {
        trans:{
            _exchangeRate: 'Курс доллара',
            _defectiveSheets : 'Листов на брак', //
            _cutpriceRect : 'Цена за порезку прямоугольных наклеек за лист в $', //
            _cutpriceSimplecircuit : 'Цена за порезку наклеек простой формы за лист в $', //
            _cutpriceHardcircuit : 'Цена за порезку наклеек сложной формы за лист в $', //
            _stampingprice : 'Цена за тиснение', //
            _varnishprice : 'Цена покрытия уф-лаком', //
            _laminationprice : 'Цена ламинации за лист', //
            _materialPrice : 'Цена материалов', //
            digit:"Цифровая печать",
            roll:"Рулонная печать",
            paper : 'Цена за лист бумаги', //
            plastic : 'Цена за лист пластика', //
            _paperlist : 'Цена за лист бумаги', //
            _plasticlist : 'Цена за лист пластика', //
            _delivery : 'Доставка', //
            _postprint : 'Постпечатная подгодовка', //
            _profit : 'Наценка на стоимость цифровой печати в гривнах',
            _profitRoll : 'Наценка на стоимость рулонной печати в гривнах',
            rectlistparams :'Размеры листа под гильотину',
            circuitlistparams : 'Размеры листа под плоттерную порезку',
            colorfularr : 'Стоимость цветной печати (за лист)', //
            monochromearr : 'Стоимость ч/б печати (за лист)',
            rollparams: 'Параметры рулонной печати',
            clear: 'Стоимость лака',
            colorprint:'Стоимость 4+0',
            fastprint:'Стоимость Fastprint',
            colorprintwhite:'Стоимость 5+0',
            monochromeprint:'Стоимость 2+0',
            laminationGloss:'Глянцевая ламинация',
            laminationMatt:'Матовая ламинация',
            width:'Ширина рапорта',
            height:'Высота рапорта',
            min : 'min',
            max : 'max',
            price : 'price',
            add : 'add'
        },
        table : []
    };

    componentDidMount(){

    }

    render(){
        const sort = ()=>{
            this.props.table.sort(function(a, b) {
                return a.min - b.min;
            });
            this.forceUpdate()
        }
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <td colSpan="3">
                        {this.state.trans[this.props.tableName]} <button onClick={sort}>Sort</button>
                    </td>
                </tr>
                <tr>
                    <td>Min</td>
                    <td>Max</td>
                    <td>Price</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {
                    (
                        this.props.table.map((object, key)=>
                            <tr key={key}>
                                <td>
                                    <input type="number" value={object.min}
                                           onChange={(event)=>this.props.updateTable(this.props.tableName, key,'min', event)} />
                                </td>
                                <td>
                                    <input type="number" value={object.max}
                                           onChange={(event)=>this.props.updateTable(this.props.tableName, key,'max', event)} />
                                </td>
                                <td>
                                    <input type="number" value={object.price}
                                           onChange={(event)=>this.props.updateTable(this.props.tableName, key,'price', event)} />
                                </td>
                                <td><button  onClick={()=>{this.props.remoweRow(this.props.tableName,key)}}>Remove</button></td>
                            </tr>
                        )


                    )

                }
                <tr><td colSpan="4"><button style={{width:100+'%'}} onClick={()=>{this.props.newRow(this.props.tableName)}}>Add</button></td></tr>
                </tbody>
            </table>
        )
    }
}
export default AdminTable;