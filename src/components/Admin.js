import React from 'react';
import {render} from 'react-dom';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import base from '../base';

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
            _paperlist : 'Цена за лист бумаги', //
            _plasticlist : 'Цена за лист пластика', //
            _delivery : 'Доставка', //
            _postprint : 'Постпечатная подгодовка', //
            _profit : 'Наценка на стоимость в гривнах',
            rectlistparams :'Размеры листа под гильотину',
            circuitlistparams : 'Размеры листа под плоттерную порезку',
            colorfularr : 'Price for print in colors', //
            monochromearr : 'Price for print in monochrome',
            min : 'min',
            max : 'max',
            price : 'price',
            add : 'add'
        }

    };

    componentDidMount(){
        this.ref = base.syncState('Stickers/calculator',{
            connumber: this,
            state: 'calculator',
        });
        this.ref = base.syncState('Stickers/admin',{
            connumber: this,
            state: 'admin',
            then () {
                this.setState({
                    admin: this.state.admin,
                })
            }
        });
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(

            (user) => {
                if (user) {
                    this.setState({
                        uid: user.phoneNumber,
                    })
                }
            }
        );
    }



    logOut = async () =>{
        await  firebase.auth().signOut();
        this.setState({uid:null});
    }


    updateTable = (event) =>{
        const calculator = {...this.state.calculator};
        calculator[event.currentTarget.name] = event.currentTarget.value;
        this.setState({calculator});
    }

    updateTable2 = (col, position,col2, event) =>{
        const calculator = {...this.state.calculator};
        calculator[col][position][col2] = event.currentTarget.value;
        this.setState({calculator});
    }
    updateTable3 = (col, col2, event) =>{
        const calculator = {...this.state.calculator};
        calculator[col][col2] = event.currentTarget.value;
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

                <div>
                    <h2>Admin</h2>
                    {logOut}

                    {

                        Object.keys(this.state.calculator).map((col, index) =>
                            <table className="table table-striped" key={index}>
                                <thead>
                                <tr>
                                    <td>
                                        {this.state.trans[col]}
                                    </td>
                                </tr>

                                    {

                                        (typeof this.state.calculator[col][0] === 'object')?
                                            <tr>
                                                {(Object.keys(this.state.calculator[col][0]).map((key, index) =>
                                                <td key={index}>{this.state.trans[key]}</td>
                                            ))}</tr>:
                                            (typeof this.state.calculator[col] !== 'object')?false:
                                                <tr>{(Object.keys(this.state.calculator[col]).map((key, index) =>
                                                    <td key={index}>{this.state.trans[key]}</td>
                                                ))}</tr>
                                    }

                                </thead>
                                <tbody>
                                {

                                    (typeof this.state.calculator[col][0] === 'object')?
                                        (Object.keys(this.state.calculator[col]).map((key, index) =>
                                           <tr key={index}>
                                               {
                                                   Object.keys(this.state.calculator[col][key]).map((col2, index) =>

                                                       <td key={index}><input type="number" value={this.state.calculator[col][key][col2]}
                                                                              onChange={(event)=>this.updateTable2(col, key,col2, event)} /></td>
                                                   )

                                               }
                                           </tr>
                                        )):
                                        (typeof this.state.calculator[col] !== 'object')?
                                            <tr><td key={index}><input name={col} type="number" value={this.state.calculator[col]}
                                                                   onChange={this.updateTable} /></td></tr>:
                                            <tr>
                                                {
                                                (Object.keys(this.state.calculator[col]).map((key, index) =>

                                                        <td key={index}><input type="number" value={this.state.calculator[col][key]}
                                                                               onChange={(event)=>this.updateTable3(col, key, event)} /></td>

                                                ))
                                                }
                                            </tr>
                                }
                                </tbody>
                            </table>
                        )

                        }
                </div>
            );
        }
        else if (!this.state.uid) {
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