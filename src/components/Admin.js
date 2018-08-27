import React from 'react';
import {render} from 'react-dom';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import base from '../base';
import AdminTable from './AdminTable';
import AdminTableMaterial from './AdminTableMaterial';

class Admin extends React.Component{

    state = {
        stickers : {
            Section_ul : [],
            Print : [],
            my_section :[],
            price : [],
            SectionBetterStick : [],
        },
        calculator : {
        },
        uid: null,
        admin: null,
        trans:{
            _exchangeRate: 'Курс доллара',
            _defectiveSheets : 'Листов на брак', //
            _cutpriceRect : 'Цена за порезку прямоугольных наклеек', //
            _cutpriceSimplecircuit : 'Цена за порезку наклеек простой формы', //
            _cutpriceHardcircuit : 'Цена за порезку наклеек сложной формы', //
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
            colorfularr : 'Price for print in colors', //
            monochromearr : 'Price for print in monochrome',
            rollparams: 'Параметры рулонной печати',
            clear: 'Стоимость лака',
            colorprint:'Стоимость 4+0',
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
        }

    };

    componentDidMount(){
        this.ref = base.syncState('Stickers/calculator',{
            context: this,
            state: 'calculator'
        });
        this.ref = base.listenTo('Stickers/admin',{
            context: this,
            asArray: true,
            then (admin) {
                console.log(admin);
                this.setState({
                    admin,
                })
            }
        });
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(

            (user) => {
                if (user) {
                    this.setState({
                        uid: user.phoneNumber,
                    })
                }else{
                    this.setState({
                        uid:false,
                    })
                }
            }
        );
    }



    logOut = async () =>{
        await  firebase.auth().signOut();
        this.setState({uid:false});
    }


    updateTable = (event) =>{
        const calculator = {...this.state.calculator};
        calculator[event.currentTarget.name] = event.currentTarget.value;
        this.setState({calculator});
    }

    updateTable2 = (col, position,col2, event) =>{
        const calculator = {...this.state.calculator};
        calculator[col][position][col2] = parseFloat(event.currentTarget.value);
        this.setState({calculator});
    }
    updateTable3 = (col, col2, event) =>{
        const calculator = {...this.state.calculator};
        calculator[col][col2] = event.currentTarget.value;
        this.setState({calculator});
    }

    addNew = (table) =>{
        const count = this.state.calculator[table].length;
        base.post(`Stickers/calculator/${table}/${count}`, {
            data: {
                min:0,
                max:0,
                price:0
            },
        })
    }
    remoweRow = (row, key)=>{
        const calculator = {...this.state.calculator};
        calculator[row][key] = null;
        this.setState({calculator});
    }
    // Configure FirebaseUI.
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',

        // We will display Google and Facebook as auth providers.
        signInOptions: [{
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            defaultCountry: 'UA'
        }
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccess: () => false
        }
    };



    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        const logOut = <button onClick={this.logOut}>Logout</button>
     if (this.state.uid && this.state.admin && !this.state.admin.includes(this.state.uid)){
            return(
                <Redirect to="/"/>
            )
        }
        else if(this.state.uid && this.state.admin && this.state.admin.includes(this.state.uid)) {
            return (

                <div style={{padding:20+'px'}}>
                    <h2>Admin</h2>
                    {logOut}

                    <div>
                        <span>Курс доллара</span>
                        <div>
                            <input name={'_exchangeRate'} type="number" value={this.state.calculator._exchangeRate}
                                   onChange={this.updateTable} />
                        </div>
                    </div>

                    <AdminTable remoweRow = {this.remoweRow} newRow = {this.addNew} table={this.state.calculator._cutpriceRect} tableName='_cutpriceRect' updateTable = {this.updateTable2}/>
                    <AdminTable remoweRow = {this.remoweRow} newRow = {this.addNew} table={this.state.calculator._cutpriceSimplecircuit} tableName='_cutpriceSimplecircuit' updateTable = {this.updateTable2}/>
                    <AdminTable remoweRow = {this.remoweRow} newRow = {this.addNew} table={this.state.calculator._cutpriceHardcircuit} tableName='_cutpriceHardcircuit' updateTable = {this.updateTable2}/>
                    <AdminTable remoweRow = {this.remoweRow} newRow = {this.addNew} table={this.state.calculator._profit} tableName='_profit' updateTable = {this.updateTable2}/>
                    <AdminTable remoweRow = {this.remoweRow} newRow = {this.addNew} table={this.state.calculator._profitRoll} tableName='_profitRoll' updateTable = {this.updateTable2}/>
                    <AdminTable remoweRow = {this.remoweRow} newRow = {this.addNew} table={this.state.calculator.colorfularr} tableName='colorfularr' updateTable = {this.updateTable2}/>
                    <AdminTable remoweRow = {this.remoweRow} newRow = {this.addNew} table={this.state.calculator.monochromearr} tableName='monochromearr' updateTable = {this.updateTable2}/>
                    <AdminTable remoweRow = {this.remoweRow} newRow = {this.addNew} table={this.state.calculator.laminationGloss} tableName='laminationGloss' updateTable = {this.updateTable2}/>
                    <AdminTable remoweRow = {this.remoweRow} newRow = {this.addNew} table={this.state.calculator.laminationMatt} tableName='laminationMatt' updateTable = {this.updateTable2}/>
                    <AdminTableMaterial table={this.state.calculator._materialPrice} tableName='_materialPrice' updateTable = {this.updateTable2}/>

                </div>
            );
        }
        else if (this.state.uid===false) {
            return (
                <div>
                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                </div>
            );
        }

        return (
            <div>
            </div>
        );

    }
}

export default Admin;