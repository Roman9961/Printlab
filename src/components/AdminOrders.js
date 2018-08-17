import React from 'react';
import {render} from 'react-dom';
import firebase from 'firebase';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import {Icon} from 'react-fa';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import base from '../base';
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

class AdminOrders extends React.Component{

    state = {
        orders : {
        },
        files:{
            files:null,
            path:null
        },
        trans:{
            wait: 'Ожидает оплаты',
            failure: 'Ошибка',
            invoice_wait:'Ожидает оплаты через invoice',
            processing:'В работе',
            accepted:'Принят',
            done:'Готов',
            white:'Белая',
            transparent:'Прозрачная',
            simple:'Простой',
            hard:'Сложный',
            rectangle:'Прямоугольная',
            'design-none':'Заказан дизайн',
            'design-outline':'Макет заказчика, заказан только контур',
            'design-all':'Дизайн и контур заказчика',
            star:'"Звезда"',
            circle:'"Круг"',
            ellipse:'"Эллипс"',
            radius100:'"Радиус 10мм"',
            radius50:'"Радиус 5мм"',
            radius35:'"Радиус 3,5мм"',
            chopped:'"Рубленый"',
            cloud:'"Облако"',
            accent:'"Акцент"',
            name:'Имя',
            phone:'Телефон',
            city:'Город',
            method:'Способ доставки',
            kiev:'по Киеву',
            np:'на отделение Новой Почты',
            warehouse: 'отделение №',
            self:'Самовывоз',
            'liq-pay':'liqPay',
            cashless:'Безналичный расчет'
        },
        uid: null,
        admin: null,
        users: null

    };

    componentDidMount(){

       base.listenTo('orders',{
            context: this,
            asArray: true,
           then(orders){
               this.setState({orders});
           }
        });

       base.listenTo('users',{
            context: this,
            asArray: true,
            then (users) {
                this.setState({
                    users,
                })
            }
        });

        base.listenTo('Stickers/admin',{
            context: this,
            asArray: true,
            then (admin) {
                this.setState({
                    admin,
                })
            }
        });
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(

            (user) => {
                if (user) {
                    const uid = user.email?user.email:user.phoneNumber;
                    this.setState({
                        uid,
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
        this.forceUpdate();
    }



    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    handleFileupload = (e, data)=>{
        let files = this.state.files.files
        data.result.files.map((file, k)=>{
            files.push(file);
        });
        base.post(this.state.files.path, {
            data: {...files},
        });
    };

    handleFiles = (e)=>{

        jQuery(e.currentTarget).fileupload({
            context:this,
            url: '/server/php/index.php',
            singleFileUploads: false,
            dataType: 'json',
            done: this.handleFileupload,
            error: function(e, data){
                console.log(e, data);
            }
        })
    };
    handleH = (files)=>{
            this.setState({files});
    }



    render() {
        const deleteFile = (params)=>{
            fetch(
                params.deleteUrl,
                {
                    method: "DELETE"
                }
            );
            base.post(params.path, {
                data: params.files,
            });
        }
        const logOut = <button onClick={this.logOut}>Logout</button>
        const startLogin = ()=>{
            return  firebase.auth().signInWithPopup(googleAuthProvider);
        };
        const isAdmin = this.state.admin!=null &&this.state.admin.includes(this.state.uid);
        const isUser = this.state.users!=null &&this.state.users.some(e => e.email === this.state.uid);
        const isManager = this.state.users!=null &&this.state.users.some(e => e.email === this.state.uid&&e.type==='manager');
     if (
         this.state.uid &&
         ( this.state.admin&&((!isAdmin||!isManager) && this.props.match.id =='orders') ||
             this.state.users&&(!isUser && this.props.match.params.id =='works') ||
             this.state.users&&(isUser && !isManager && this.props.match.params.id =='orders')
         )
     ){
            return(
                <Redirect to="/"/>
            )
        }
        else if(this.state.uid && (isAdmin||isUser)) {
         const columns = [{
             dataField: 'calcProp.print_time',
             text: '',
             headerFormatter: (column, colIndex) => <Icon size="lg" name="clock-o" />,
             formatter: (cell,row)=>{
                 return cell==2?
                     <React.Fragment><Icon size="lg" style={{color:'red'}} name="exclamation-circle" /> >2 дней</React.Fragment>
                     :'';
             },
             headerStyle: (cell, row, rowIndex, colIndex) => {
                 const width = '60px';
                 const textAlign = 'center';
                 return { width,textAlign };
             },
             style: (cell, row, rowIndex, colIndex) => {
                 const textAlign = 'center';
                 return { textAlign };
             },
             editable:false,
             sort: true
         }, {
             dataField: 'dateCreate',
             text: 'Date',
             editable:false,
             sort: true
         }, {
             dataField: 'status',
             text: 'Status',
             sort: true,
             formatter: (cell,row)=>trans[cell],
             editor: {
                 type: Type.SELECT,
                 options: [{
                     value: 'wait',
                     label: 'Ожидает оплаты'
                 }, {
                     value: 'invoice_wait',
                     label: 'Ожидает оплаты через invoice'
                 }, {
                     value: 'failure',
                     label: 'Ошибка'
                 }, {
                     value: 'accepted',
                     label: 'Принят'
                 }, {
                     value: 'processing',
                     label: 'В работе'
                 }, {
                     value: 'done',
                     label: 'Готов'
                 }]
             }
         }];
         const expandRow = {
             renderer: row =>{
                 const rowFiles = row.files!==undefined?Object.values(row.files):[];
                 const files = {
                     files:rowFiles,
                     path:`orders/${row.key}/files`
                 };


                 return(
                     <div>
                         <p><b>Тип печати: </b>{ row.calcProp.print_type }</p>
                         <p><b>Основа: </b> {row.calcProp.basis} / {trans[row.calcProp.basis_param]} </p>
                         <p><b>Контур порезки: </b>{trans[row.calcProp.cut_form] }</p>
                         <p><b>Дизайн: </b>{
                             row.calcProp.design=='design-outline'?
                             trans[row.calcProp.design]+' '+ (trans[row.calcProp.outline]!==undefined?trans[row.calcProp.outline]:"Прямоугольная"):
                                 trans[row.calcProp.design]
                         }</p>
                         <p><b>Тираж: </b>{row.calcProp.quantity }шт.</p>
                         <p><b>Размеры: </b>{  row.calcProp.height }мм/{ row.calcProp.width }мм (высота/ширина) <span style={{color:'red'}}>!важно при рулонной печати</span></p>
                         <div><b>Прикрепленные файлы: </b> <div className="file-container">{ rowFiles.map(function (file, i) {

                             return <div className="file-self"  key={i}>
                                 <div>
                                 <a href={file.url} target="_blank" download>
                                     <img src={file.thumbnailUrl!==undefined?file.thumbnailUrl:'/images/default.png'} style={{width:50+'px'}} alt=""/>
                                 </a>
                                 </div>
                                 <Icon size="lg" name="times-circle" className="file-delete" onClick={()=>{delete rowFiles[i]; deleteFile({deleteUrl:file.deleteUrl,path:`orders/${row.key}/files`,files:rowFiles})}}/>
                                 </div>;
                         }) }</div>
                             <label htmlFor="upload1" className="file-upload" onClick={()=>{this.handleH(files)}}>
                                 <div className="fileform">
                                     <div className="button button--design">
                                         <span>Загрузить макет</span>
                                     </div>
                                     <input className="upload23"  id="upload1" type="file" name="files[]" multiple onClick={this.handleFiles} />
                                 </div>
                             </label>
                         </div>
                         <p><b>Кол-во листов/раппортов: </b>{  row.calcProp.numberoflist }</p>
                         <p><b>Стоимость: </b>{  row.calcProp.price } грн.</p>
                         <p><b>Способ оплаты: </b>{  trans[row.user.payment_method] }</p>
                         <p><b>Печать: </b>{  row.calcProp.type }</p>
                         <div><b>Доставка: </b><div style={{backgroundColor:'grey'}}>{  Object.keys(row.delivery).map(function (key,i) {
                             return <React.Fragment key={i}><p><b>{trans[key]}: </b> {trans[row.delivery[key]]!==undefined?trans[row.delivery[key]]:row.delivery[key]}</p></React.Fragment>
                         }) }</div></div>

                     </div>
                 )
             }
         };
         const rowClasses = (row, rowIndex) => {
             let classes = null;
             if (row.status == 'failure') {
                 classes = 'row-failure';
             }
             if (row.status == 'wait') {
                 classes = 'row-wait';
             }
             if (row.status == 'done') {
                 classes = 'row-done';
             }

             return classes;
         };
         const {trans} = this.state;
         let data = this.state.orders.sort(function (a,b) {
             if(a.calcProp.print_time == b.calcProp.print_time){
                 return (a.dateCreate < b.dateCreate) ? 1 : (a.dateCreate > b.dateCreate) ? -1 : 0;
             }else {
                 return a.calcProp.print_time - b.calcProp.print_time
             }
         });
         if(this.props.match.params.id =='works'){
             // data = data.filter(order=>order.status=='invoice_wait');
         }
            return (

                <div style={{padding:20+'px'}}>
                    <h2>Admin</h2>
                    {logOut}

                    <div>
                        <span>Заказы</span>
                    </div>



                    <BootstrapTable
                        keyField='key'
                        data={ data }
                        columns={ columns }
                        cellEdit={ cellEditFactory({
                            mode: 'click',
                            blurToSave: true,
                            afterSaveCell: (oldValue, newValue, row, column) => {
                                base.update(`orders/${row.key}`, {
                                    data: { status: row.status },
                                });
                            }
                        }) }
                        expandRow={ expandRow }
                        pagination={ paginationFactory()}
                        rowClasses={ rowClasses }
                    />

                </div>
            );
        }
        else if (this.state.uid===false) {

            return (
                <div className="box-layout">
                    <div className="box-layout__box">
                        <h1 className="box-layout__title">Printlab</h1>
                        <button className="button" onClick={startLogin}>Login with Google</button>
                    </div>
                </div>
            );
        }

        return (
            <div>
            </div>
        );

    }
}

export default AdminOrders;