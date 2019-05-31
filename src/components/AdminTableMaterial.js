import React from 'react';

class AdminTableMaterial extends React.Component{
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
            _profit : 'Наценка на стоимость в гривнах',
            rectlistparams :'Размеры листа под гильотину',
            circuitlistparams : 'Размеры листа под плоттерную порезку',
            colorfularr : 'Price for print in colors', //
            monochromearr : 'Price for print in monochrome',
            rollparams: 'Параметры рулонной печати',
            clear: 'Стоимость лака',
            colorprint:'Стоимость 4+0',
            colorprintwhite:'Стоимость 5+0',
            monochromeprint:'Стоимость 2+0',
            width:'Ширина рапорта',
            height:'Высота рапорта',
            min : 'min',
            max : 'max',
            price : 'price',
            add : 'add'
        }
    };

    render(){
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <td colSpan="2" style={{textAlign:'center'}}>
                        Цена материалов
                    </td>
                </tr>
                <tr>
                    <td  style={{textAlign:'center'}}>
                        Бумага
                    </td>
                    <td  style={{textAlign:'center'}}>
                        Пленка
                    </td>
                </tr>
                </thead>
                <tbody>
                {
                    (
                        Object.keys(this.props.table).map((object, key)=>
                       <React.Fragment key={key+'b'}>
                           <tr key={key+'a'}><td colSpan="2" style={{textAlign:'center'}}>{this.state.trans[object]}</td></tr>
                            <tr key={key}>
                                <td  style={{textAlign:'center'}}>
                                    <input type="number" value={this.props.table[object].paper}
                                           onChange={(event)=>this.props.updateTable(this.props.tableName, object,'paper', event)} />
                                </td>
                                <td  style={{textAlign:'center'}}>
                                    <input type="number" value={this.props.table[object].plastic}
                                           onChange={(event)=>this.props.updateTable(this.props.tableName, object,'plastic', event)} />
                                </td>
                            </tr>
                           </React.Fragment>
                        )

                    )

                }
                </tbody>
            </table>
        )
    }
}
export default AdminTableMaterial;