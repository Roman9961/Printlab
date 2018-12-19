import React from 'react';
import {render} from 'react-dom';
import firebase from 'firebase';
import BootstrapTable from 'react-bootstrap-table-next';
import ModalCalculator from './ModalCalculator';
import ModalComment from './ModalComment';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import {Icon} from 'react-fa';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import base from '../base';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-dates/lib/css/_datepicker.css'

class AdminOrders extends React.Component{

    state = {
        orders : {
        },
        ordersData : [],
        files:{
            files:null,
            path:null
        },
        trans:{
            wait: 'Ожидает оплаты',
            wait_c:'Ожидает подтверждения',
            success: 'Оплачен',
            failure: 'Ошибка',
            invoice_wait:'Ожидает оплаты через invoice',
            processing:'В работе',
            accepted:'Принят',
            done:'Готов',
            white:'Белая',
            comment: 'Комментарий',
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
            gloss:"глянцевая",
            matt:"матовая",
            name:'Имя',
            phone:'Телефон',
            city:'Город',
            method:'Способ доставки',
            kiev:'по Киеву',
            np:'на отделение Новой Почты',
            warehouse: 'отделение №',
            self:'Самовывоз',
            'liq-pay':'liqPay',
            cashless:'Безналичный расчет',
            error:'Неуспешный платеж',
            reversed:'Платеж возвращен',
            sandbox:'Тестовый платеж',
            '3ds_verify':'Требуется 3DS верификация',
            captcha_verify:'Ожидается подтверждение captcha',
            cvv_verify:'Требуется ввод CVV карты отправителя',
            ivr_verify:'Ожидается подтверждение звонком ivr',
            otp_verify:'Требуется OTP подтверждение клиента',
            password_verify:'Ожидается подтверждение пароля Приват24',
            phone_verify:'Ожидается ввод телефона клиентом',
            pin_verify:'Ожидается подтверждение pin-code',
            receiver_verify:'Требуется ввод данных получателя',
            sender_verify:'Требуется ввод данных отправителя',
            senderapp_verify:'Ожидается подтверждение в SENDER',
            wait_qr:'Ожидается сканирование QR-кода клиентом',
            wait_sender:'Ожидается подтверждение оплаты клиентом в приложении Privat24/SENDER',
            cash_wait:'Ожидается оплата наличными в ТСО',
            hold_wait:'Сумма успешно заблокирована на счету отправителя',
            prepared:'Платеж создан, ожидается его завершение отправителем',
            wait_accept:'Деньги с клиента списаны, но магазин еще не прошел проверку',
            wait_card:'Не установлен способ возмещения у получателя',
            wait_compensation:'Платеж успешный, будет зачислен в ежесуточной проводке',
            wait_lc:'Аккредитив',
            wait_reserve:'wait_reserve',
            wait_secure:'Платеж на проверке',
            in_processing:'В работе',
            canceled: 'Отменен'
        },
        modalComment: false,
        managerComment: '',
        currentOrder: null,
        calendarFocused: null,
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        filter:false,
        uid: null,
        admin: null,
        users: null,
        workers: null,
        modal:false,
        editOrder:{}

    };

    componentDidMount(){
        this.ref = base.listenTo('versionAdmin', {
            context: this,
        then(versionAdmin) {

            let versionAdminStorage = JSON.parse(localStorage.getItem("versionAdminStorage"));
            if(localStorage.getItem("orders") === null || versionAdminStorage!=versionAdmin) {
                if(localStorage.getItem("orders") === null){
                    base.fetch('ordersVersion', {
                        context: this,
                        asArray: true,
                        then(ov){
                            base.fetch('orders', {
                                context: this,
                                asArray: true,
                                then(orders){
                                    window.localStorage.setItem("orders", JSON.stringify(orders));
                                    window.localStorage.setItem("versionAdminStorage", JSON.stringify(versionAdmin));
                                    window.localStorage.setItem("versionOrdersStorage", JSON.stringify(ov));
                                    let ordersData = this.sortOrders(orders);
                                    this.setState(state=>({...state, orders, ordersData}));
                                }
                            });
                        }
                    });
                }else{
                        let orders = JSON.parse(localStorage.getItem("orders"));
                        const operation = (list1, list2, isUnion = false) =>
                            list1.filter( a => isUnion === list2.some( b => a.key === b.key && a.ver === b.ver ) );

                        const sameOrders = (list1, list2) => operation(list1, list2, true),
                            inFirstOnly = operation,
                            changedOrders = (list1, list2) => inFirstOnly(list2, list1);

                        base.fetch('ordersVersion', {
                            context: this,
                            asArray: true,
                            then(ov){

                                const orderVersions = localStorage.getItem("versionOrdersStorage")?JSON.parse(localStorage.getItem("versionOrdersStorage")):orders;

                                const same = sameOrders(orderVersions, ov);
                                const changed = changedOrders(orderVersions, ov);
                                const sameOrder = orders.map(a => {if(false !== same.some( b => a.key === b.key )){return a}}).filter(a=> a !== undefined);

                                async function update(changed, sameOrder) {
                                    for (let chOrder of changed) {
                                        await base.fetch(`orders/${chOrder.key}`, {
                                            context: this,
                                            then(order){
                                                order.key = chOrder.key;
                                                sameOrder.push(order);
                                            }
                                        });
                                    }

                                    return sameOrder;
                                }
                                update(changed, sameOrder).then(res=>{
                                    orders = res;
                                    let ordersData = this.sortOrders(orders);

                                    window.localStorage.setItem("orders", JSON.stringify(orders));
                                    window.localStorage.setItem("versionAdminStorage", JSON.stringify(versionAdmin));
                                    window.localStorage.setItem("versionOrdersStorage", JSON.stringify(versionAdmin));
                                    window.localStorage.setItem("versionOrdersStorage", JSON.stringify(ov));
                                    this.setState(state=>({...state, orders, ordersData}));
                                }) ;

                            }
                        });
                    }
            }else{
                let orders = JSON.parse(localStorage.getItem("orders"));
                let ordersData = this.sortOrders(orders);

                this.setState(state=>({...state, orders, ordersData}));
            }
        }
        });


       base.listenTo('users',{
            context: this,
            asArray: true,
            then (users) {
                this.setState({
                    users,
                });
                const workers = users.filter((user)=>user.type=='worker');
                this.setState({
                    workers,
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

    sortOrders = (orders)=>{
        let ordersData = orders.filter((order)=> {
            return moment(order.dateCreate).isAfter(this.state.startDate) && moment(order.dateCreate).isBefore(this.state.endDate);
        });
        ordersData = ordersData.sort(function (a,b) {
            let atime = parseInt(a.calcProp.print_time);
            let  btime = parseInt(b.calcProp.print_time);
            return atime > btime;
        });
        ordersData = ordersData.sort(function (a,b) {
            var ORDER = { done: 1 };
            return (ORDER[a.status] || 0) - (ORDER[b.status] || 0);
        });
        return ordersData;
    }
    handleComment = (event)=>{
        let managerComment = event.currentTarget.value;
        this.setState(state=>({
            ...state,
            managerComment
        }))
    }

    handleCommentlModal = ()=> {
        this.setState(state=>({
            ...state,
            modalComment: !state.modalComment
        }));
    }

    logOut = async () =>{
        await  firebase.auth().signOut();
        this.setState({uid:false});
        this.forceUpdate();
    }



    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }

    onDatesChange = ({ startDate, endDate }) => {
        const ordersData = this.state.orders.filter((order)=>{
            return  moment(order.dateCreate).isAfter(startDate)&&moment(order.dateCreate).isBefore(endDate);
        })

        this.setState(state=>({
            ...state,
            startDate,
            endDate,
            ordersData
        }));
    };

    handleFileupload = (e, data)=>{
        let files = this.state.files.files
        data.result.files.map((file, k)=>{
            files.push(file);
        });
        base.post(this.state.files.path, {
            data: {...files},
        });
        const uuidv4 = require('uuid/v4');
        base.post(this.state.files.order, {
            data:{ver:uuidv4()}
        });
        base.post('versionAdmin', {
            data: uuidv4(),
        });
    };

    handleFiles = (e)=>{

        jQuery(e.currentTarget).fileupload({
            context:this,
            url: 'https://printlab.net.ua',
            singleFileUploads: false,
            dataType: 'json',
            add:(e, data)=>{
                var uploadErrors = [];
                let totalSize=0;
                const errorMessage ='Размер файла(ов) слишком большой, попробуйте уменьшить размер или загрузить файл(ы) на файлообменник и приложить ссылку в комментарии к заказу';
                data.originalFiles.map(file=>{
                    totalSize += file['size'];
                    if(file['size'] > 500000000) {
                        uploadErrors.push('Filesize is too big');
                    }
                });

                if(uploadErrors.length > 0 || totalSize>1000000000) {
                    alert(errorMessage)
                } else {


        
                for (let i = 0; i < data.files.length; i++) {
                    const newPath =data.files[0].name.replace(/[^A-Za-z0-9\.]/g,'_');
                   data.files[i].uploadName =newPath;
                }
                data.submit();
                    data.submit();
                }
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
               
                jQuery(e.target).prev().css(
                    'background',
                   `linear-gradient(to right, #7ba232 0%,#95c241 ${progress}%,transparent ${progress}%,transparent 100%)` 
                );
                jQuery(e.target).prev().css('background-color', '#fbac52')
            },
            done: this.handleFileupload,
            error: function(e, data){
                console.log(e, data);
            }
        })
    };
    handleH = (files)=>{
            this.setState({files});
    }
    handleModal = (editOrder={},isOpen=false)=>{
        if(!this.state.modal){
            document.getElementsByClassName('bod')[0].setAttribute("style", "position:fixed");
        }else{
            document.getElementsByClassName('bod')[0].removeAttribute('style');
        }
        if(isOpen){
            document.getElementsByClassName('bod')[0].removeAttribute('style');
        }
        this.setState(()=>({
            modal: isOpen?false:!this.state.modal,
            editOrder
        }));
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
            }).then(()=>{
                const uuidv4 = require('uuid/v4');
                base.post(params.versionPath, {
                    data:{ver:uuidv4()}
                });
                base.post('versionAdmin', {
                    data: uuidv4(),
                });
            });
        }
        const logOut = <button onClick={this.logOut}>Logout</button>
        const startLogin = ()=>{
            return  firebase.auth().signInWithPopup(googleAuthProvider);
        };
        const isAdmin = this.state.admin!=null &&this.state.admin.includes(this.state.uid);
        const isUser = this.state.users!=null &&this.state.users.some(e => e.email === this.state.uid);
        const isManager = this.state.users!=null &&this.state.users.some(e => e.email === this.state.uid&&e.type==='manager');
        const isWorker = this.state.users!=null &&this.state.users.some(e => e.email === this.state.uid&&e.type==='worker');
        const user = this.state.users?this.state.users.filter(e => e.email === this.state.uid)[0]:{name:'Пользователь'};
     if (
         this.state.uid &&
         ( this.state.admin&&((!isAdmin||!isManager||!isWorker) && this.props.match.id =='orders') ||
             this.state.users&&(!isUser && this.props.match.params.id =='works') ||
             this.state.users&&(!isWorker && !isManager && this.props.match.params.id =='orders')
         )
     ){
            return(
                <Redirect to="/"/>
            )
        }
        else if(this.state.uid && (isAdmin||isUser)&&this.state.users) {
         const workers = this.state.users.filter(user=>user.type=='worker');
         const users = this.state.users;
         let manager ={};
         if(isManager){
              manager =  this.state.users.filter(e => e.email === this.state.uid)[0];
         }
         const options = ()=> {
             let managersOptions = [{
                 value: 'wait_c',
                 label: 'Ожидает подтверждения'
             }];
             let workersOptions = [{
                 value: 'accepted',
                 label: 'Принят'
             }, {
                 value: 'in_processing',
                 label: 'В работе'
             }, {
                 value: 'done',
                 label: 'Готов'
             }];
             return isManager?managersOptions.concat(workersOptions):workersOptions;
         };
         const payOptions = ()=> {
             let managersOptions = [{
                 value: 'wait',
                 label: 'Ожидает оплаты'
             },{
                 value: 'success',
                 label: 'Оплачен'
             },{
                 value: 'canceled',
                 label: 'Отменен'
             }];

             return isManager? managersOptions :[];
         };
         let columns = [{
             dataField: 'orderId',
             text: '№ Заказа',
             editable:false,
             sort: true
         },{
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
             dataField: 'dateUpdate',
             text: 'Date',
             editable:false,
             formatter: (cell,row)=>{

                 return (<React.Fragment><div>{row.dateCreate}</div><div style={{color:'#d8d8d8'}}>{cell}</div></React.Fragment>) ;
             },
             sort: true
         }, {
             dataField: 'status',
             text: 'Status',
             sort: true,
             formatter: (cell,row)=>trans[cell],
             editor: {
                 type: Type.SELECT,
                 options: options()
             }
         }];
         if(isManager) {
             columns.push({
                 dataField: 'pay_status',
                 text: 'Pay Status',
                 sort: true,
                 formatter: (cell,row)=>trans[cell],
                 editor: {
                     type: Type.SELECT,
                     options: payOptions()
                 }
             })
         }
         columns.push({
             dataField: 'user.name',
             text: 'Заказчик',
             sort: true,
             formatter: (cell,row)=>{
                 let thisManager =  users.filter(e => e.email === cell)[0];

                 return typeof  row.user.name !=='undefined' ?`${row.user.name}`:'Не назначен';
             },
             editable:false
         });
         if(isManager){
             columns.push({
                 dataField: 'calcProp.price',
                 text: 'Сумма',
                 sort: true,
                 formatter: (cell,row)=>{
                     let thisManager =  users.filter(e => e.email === cell)[0];

                     return typeof  row.user.name !=='undefined' ?`${row.calcProp.price} грн.`:'--';
                 },
                 editable:false
             });
             columns.push({
                 dataField: 'manager_comment',
                 text: 'Комментарий',
                 sort: true,
                 formatter: (cell,row)=>{
                     let thisManager =  users.filter(e => e.email === cell)[0];

                     return <button  onClick={()=>{
                         this.setState(state=>({
                             ...state,
                             currentOrder: row,
                             managerComment: row.manager_comment
                         }));
                         this.handleCommentlModal()
                     }}>{row.manager_comment ? 'Показать комментарий': 'Добавить комментарий'}</button>;
                 },
                 editable:false
             });
             columns.push({
                 dataField: 'key',
                 text: '',
                 formatter: (cell,row)=>{
                     const worker =  workers.map(e => e.email === cell?e:{name:'Не назначен'});
                     return <div className="order-editing"> <button  onClick={()=>{
                         confirmAlert({
                             title: 'Удалить заказ?',
                             message: `Уверены что хотите удалить заказ №${row.orderId}?`,
                             buttons: [
                                 {
                                     label: 'Да',
                                     onClick: () => {
                                         base.remove(`orders/${cell}`).then(()=>{
                                             base.remove(`ordersVersion/${cell}`);
                                             const uuidv4 = require('uuid/v4');
                                             base.post('versionAdmin', {
                                                 data: uuidv4(),
                                             });
                                         })
                                     }
                                 },
                                 {
                                     label: 'Нет',
                                     onClick: () => {}
                                 }
                             ]
                         })

                     }}>Delete</button>

                     <button onClick={()=>{
                         this.handleModal(row)
                     }}>Edit</button>
                     </div>
                 }
             });
         };
         const expandRow = {
             renderer: row =>{
                 const designOnly = row.hasOwnProperty('designOnly');
                 const rowFiles = row.files!==undefined?Object.values(row.files):[];
                 const files = {
                     files:rowFiles,
                     path:`orders/${row.key}/files`,
                     order:`ordersVersion/${row.key}`
                 };
let mailfiles ='';
 rowFiles.forEach(function (file) {
     mailfiles+= file.url+'\n';
 });
const mail=`
Основа:${row.calcProp.basis}/${trans[row.calcProp.basis_param]}
Порезка: ${row.calcProp.cut_form}
Высота: ${row.calcProp.height}
Ширина: ${row.calcProp.width}
Тираж: ${row.calcProp.quantity}
Печать: ${row.calcProp.type}
Файлы:
${mailfiles}
`
                 return(
                     <div>
                         {(()=>{
                           if(designOnly)
                           {
                               return <React.Fragment>
                                    <p><b>Только ДИЗАЙН!!! </b></p>
                                    <p><b>Заказчик: </b>{  row.user.name }</p>
                                    <p><b>Телефон заказчика: </b>{  row.user.phone }</p>
                                    <p><b>Email заказчика: </b>{  row.user.email }</p>
                                   </React.Fragment>
                           }else{
                               return <React.Fragment>
                                   <p><b>Тип печати: </b>{ row.calcProp.print_type }</p>
                                   <p><b>Основа: </b> {row.calcProp.basis} / {trans[row.calcProp.basis_param]} </p>
                                   <p><b>Контур порезки: </b>{trans[row.calcProp.cut_form] }</p>
                                   {row.calcProp.lamination?<p><b style={{color:'red'}}>Ламинация: </b>{trans[row.calcProp.lamination]}</p>:''}
                                   <p><b>Дизайн: </b>{
                                       row.calcProp.design=='design-outline'?
                                       trans[row.calcProp.design]+' '+ (trans[row.calcProp.outline]!==undefined?trans[row.calcProp.outline]:"Прямоугольная"):
                                           trans[row.calcProp.design]
                                   }</p>
                                   <p><b>Тираж: </b>{row.calcProp.quantity }шт.</p>
                                   <p><b>Размеры: </b>{  row.calcProp.height }мм/{ row.calcProp.width }мм (высота/ширина) <span style={{color:'red'}}>!важно при рулонной печати</span></p>
                               </React.Fragment>
                           }
                         })() }

                         <div><b>Прикрепленные файлы: </b> <div className="file-container">{ rowFiles.map(function (file, i) {

                             return <div className="file-self"  key={i}>
                                 <div className="preview-container">
                                 <a href={file.url} target="_blank" download>
                                     <img src={file.thumbnailUrl!==undefined?file.thumbnailUrl:'/images/default.png'} style={{width:50+'px'}} alt=""/>
                                 </a>
                                 <div style={{textAlign:'center'}}>{i+1}</div>
                                 </div>
                                     {isManager &&<Icon size="lg" name="times-circle" className="file-delete" onClick={()=>{delete rowFiles[i]; deleteFile({deleteUrl:file.deleteUrl,path:`orders/${row.key}/files`,versionPath:`ordersVersion/${row.key}` ,files:rowFiles, })}}/>}
                                 </div>;
                         }) }</div>
                             <label htmlFor="upload1" className="file-upload" onClick={()=>{this.handleH(files)}}>
                                 {isManager && <div className="fileform">
                                 
                                     <div className="button button--design">
                                         <span>Загрузить макет</span>
                                     </div>
                                     <input className="upload23" id="upload1" type="file" name="files[]" multiple
                                            onClick={this.handleFiles}/>
                                 </div>
                                 }
                             </label>
                         </div>
                         {(()=>{
                             if(!designOnly)
                             {
                                 return <React.Fragment>
                                     <p><b>Кол-во листов/раппортов: </b>{  row.calcProp.numberoflist }</p>
                                     <p><b>Стоимость: </b>{  row.calcProp.price } грн.</p>
                                     <p><b>Способ оплаты: </b>{  trans[row.user.payment_method] }</p>
                                     <p><b>Заказчик: </b>{  row.user.name }</p>
                                     <p><b>Телефон заказчика: </b>{  row.user.phone }</p>
                                     <p><b>Email заказчика: </b>{  row.user.email }</p>
                                     <p><b>Печать: </b>{  row.calcProp.type }</p>
                                     <div><b>Доставка: </b><div style={{backgroundColor:'grey'}}>{  Object.keys(row.delivery).map(function (key,i) {
                                         return <React.Fragment key={i}><p><b>{trans[key]}: </b> {trans[row.delivery[key]]!==undefined?trans[row.delivery[key]]:row.delivery[key]}</p></React.Fragment>
                                     }) }</div></div>
                                     {isManager&&<div>
                                         <button onClick={()=>{
                                             window.open(`https://mail.google.com/mail/?su=Заказ&body=${encodeURI(mail)}&view=cm&fs=1&to=partner@domain.com`, '_blank');
                                         }}>send by email</button>
                                     </div>}
                                 </React.Fragment>
                             }
                         })() }
                     </div>
                 )
             }
         };
         const rowClasses = (row, rowIndex) => {
             let classes = 'orders-row ';
             if ( row.pay_status == 'failure' || row.pay_status == 'canceled') {
                 classes += 'row-failure';
             }
             if (row.pay_status == 'success' && row.status=='wait_c') {
                 classes += 'row-wait';
             }
             if (row.status == 'done' && row.pay_status == 'success') {
                 classes += 'row-done';
             }

             return classes;
         };
         const {trans} = this.state;
         let data = this.state.ordersData;

         if(isWorker){
             data = data.filter(order=>(order.worker===this.state.uid&&(order.status=='accepted'||order.status=='processing'))).sort(function(a,b){
                    if( a.status=='accepted' &&  b.status=='accepted'){
                        return a.dateCreate - b.dateCreate;
                    }
                     return a.status=='processing';
             });
         }
            return (

                <div style={{padding:20+'px'}}>
                    <div className="orders-title">
                        <h2>{user.name}</h2>
                        {logOut}
                    </div>
                    <div className="orders-nav">
                    {
                       isManager && <div className="orders-manager">
                            <span>Заказы</span>
                            <button onClick={()=> {
                                this.setState(state=>({
                                    ...state,
                                    filter: !state.filter
                                }))
                            }}>{this.state.filter ? 'Показать все заказы' : 'Показать только мои заказы'}</button>
                        </div>
                    }
                    <div className="orders-date_range">
                        <DateRangePicker
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            startDateId ={'1'}
                            endDateId ={'1'}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                        />
                    </div>
                    </div>

                    <BootstrapTable
                        keyField='key'
                        data={ data }
                        columns={ columns }
                        cellEdit={ cellEditFactory({
                            mode: 'click',
                            blurToSave: true,
                            beforeSaveCell:  (oldValue, newValue, row, column) => {
                                if(!newValue ) return false;
                                if(column.dataField == 'status' && newValue == 'done'){
                                    confirmAlert({
                                        title: 'Отправить смс заказчику?',
                                        message: `Уверены что хотите отправить смс о готовности заказа №${row.orderId} заказчику ${row.user.name} на номер ${row.user.phone}`,
                                        buttons: [
                                            {
                                                label: 'Да',
                                                onClick: () => {
                                                    let url =`/public/server/sms/index.php`;
                                                    let xmlHttp = new XMLHttpRequest();
                                                    xmlHttp.open( "POST", url, true ); // false for synchronous request
                                                    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                                    xmlHttp.onreadystatechange = function(data) {
                                                        if(xmlHttp.readyState == XMLHttpRequest.DONE && xmlHttp.status == 200) {
                                                           console.log(xmlHttp.responseText);
                                                        }
                                                    }

                                                    xmlHttp.send(`phone=${row.user.phone.substr(1)}&id=${row.orderId}`);

                                                }
                                            },
                                            {
                                                label: 'Нет',
                                                onClick: () => {}
                                            }
                                        ]
                                    })
                                }
                                if(oldValue !== newValue) {
                                    let newdata = {};
                                    newdata[column.dataField] = newValue;
                                    const uuidv4 = require('uuid/v4');
                                    newdata['ver'] = uuidv4();
                                    base.update(`orders/${row.key}`, {
                                        data: newdata,
                                    }).then(()=> {
                                        if (isWorker) {
                                            const uuidv4 = require('uuid/v4');

                                            base.post('versionAdmin', {
                                                data: uuidv4(),
                                            });
                                        }
                                        if (isManager) {
                                            base.update(`orders/${row.key}`, {
                                                data: {manager: manager.email},
                                            }).then(()=> {
                                                const uuidv4 = require('uuid/v4');

                                                base.post('versionAdmin', {
                                                    data: uuidv4(),
                                                });
                                            });
                                        }
                                        base.post(`ordersVersion/${row.key}`, {
                                            data:{ver:uuidv4()}
                                        });
                                        base.update(`orders/${row.key}`, {
                                            data: {dateUpdate: moment().format("YYYY-MM-DD HH:mm:ss")},
                                        })
                                    });
                                }
                            }
                        }) }
                        expandRow={ expandRow }
                        pagination={ paginationFactory()}
                        rowClasses={ rowClasses }
                    />
                    <ModalCalculator isOpen = {this.state.modal} handleModal = {this.handleModal} calcProp={{}} editOrder = {this.state.editOrder}/>
                    <ModalComment isOpen = {this.state.modalComment} handleComment = {this.handleComment} handleModal = {this.handleCommentlModal} currentOrder = {this.state.currentOrder} managerComment = {this.state.managerComment}/>
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