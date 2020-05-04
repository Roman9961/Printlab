import React from 'react';
import Modal from 'react-modal';


class ModalCall1 extends React.Component{
    state = {
        modalCallActive:false,
        countdown:false,
        time: 30,
        millisec: 99,
        result: false,
        translations:{
            ua:{
                placeholder: 'Номер телефону',
                button: 'Чекаю на дзвінок!',
                wait_message: 'Передзвонимо Вам за 30 секунд!',
                success_message: 'Наш оператор скоро з Вами зв\'яжеться. Дякуємо за дзвінок!',
                time_message: 'На жаль зараз не робочий час, але ми зв\'яжемся з Вами як можно скоріше. Дякуємо!',
                phone_error: 'Можливо ви помилились при введенні номера? Перевірте та спробуйте ще раз',
                server_error: 'Щось пішло не так :( Спробуйте ще раз.',
                many_calls: 'Спробуйте ще раз, але трохи пізніше'
            },
            ru: {
                placeholder: 'Номер телефона',
                button: 'Жду звонка!',
                wait_message: 'Перезвоним Вам за 30 секунд!',
                success_message: 'Наш оператор скоро с Вами свяжется. Спасибо за звонок!',
                time_message: 'К сожалению, сейчас не рабочее время, но мы свяжемся с Вами как можно скорее. Спасибо!',
                phone_error: 'Возможно вы ошиблись при вводе номера? Проверьте и попробуйте еще раз',
                server_error: 'Что-то пошло не так :( Попробуйте еще раз.',
                many_calls: 'Попробуйте еще раз, но немного попозже'
            }
        }
    }

    getTranslation(){
        return this.state.translations[this.props.locale]
    }

    handleCall = (e) => {
        e.preventDefault();
        this.setState({countdown:true});
        this.countdown();
        const data = new FormData(event.target);
        fetch(`/server/callback?phone=${data.get('phone')}`)
          .then(response => response.json())
          .then(response=>{
              this.setState({countdown:false})
              if(response.status !== undefined){
              switch(response.status){
                  case "ok":
                  this.setState({result:this.getTranslation().success_message});
                  break;
                  case "number accepted":
                  this.setState({result:this.getTranslation().time_message});
                  break;
              }
            }else{
                switch(response.error){
                    case "Error. Empty params.":
                    this.setState({result:this.getTranslation().phone_error});
                    break;
                    case "Error. Many calls.":
                    this.setState({result:this.getTranslation().many_calls});
                    break;
                }
            } 
          })
          .catch(error => {
            this.setState({countdown:false})
            this.setState({result:this.getTranslation().server_error});
          });
    }

    countdown = () => {
			let time = 30;		
			const mils = setInterval(()=>{
				this.setState(state => ({...state, millisec:state.millisec-1}))
				if (this.state.millisec == 0) {
                    this.setState({millisec:99})
				}
			}, 10);
			const cdw = setInterval(()=>{
				this.setState(state => ({...state, time:state.time-1}))

				if (this.state.time == 0 || !this.state.countdown) {
                    clearInterval(cdw);
                    clearInterval(mils);
                    this.setState(state => ({...state, millisec:99, time:30}))
				}
			}, 1000);
		
	}


    render() {

        return (
        <Modal
            isOpen={true}
            closeTimeoutMS={300}
            className={`modal-call1`}
            overlayClassName="modal-call-overlay"
        >
            <div className={`ring ${this.state.modalCallActive&&'active'}`} onClick={()=>{
                document.getElementsByClassName('amo-button-holder')[0].classList.add('up');
                this.setState({modalCallActive:true})
            }}>
            <div className="widget-close" onClick={(e)=>{
                document.getElementsByClassName('amo-button-holder')[0].classList.remove('up');
                e.stopPropagation();
                this.setState(state=>({...state, modalCallActive:false, result:false}))
            }}></div>
            <form className={`form ${this.state.result?'inactive':''}`} onSubmit={this.handleCall}>
                    <label>
                        <span>{this.getTranslation().wait_message}</span>	
                    </label>
                    <input className="phone form-control" name="phone" type="tel" placeholder={this.getTranslation().placeholder}/>
                    {!this.state.countdown&&<button className="btn btn-success" type="submit">{this.getTranslation().button}</button>}
                    {this.state.countdown&&<div className="countdown"><span><b>{this.state.time>10?this.state.time:`0${this.state.time}`}</b><small>:{this.state.millisec>10?this.state.millisec:`0${this.state.millisec}`}</small></span></div>}              
			</form>
            <div className={`result ${this.state.result?'active':''}`} onClick={()=>this.setState({result:false})}>{this.state.result}</div>
                <div className="header__contacts__phone__icon">
                    <div className="phone-container">
                        <img className="phone" alt="Наклейки" title="Наклейки" src="images/call.svg"/>
                    </div>
                </div>
            </div>
        </Modal>
        
        )
    }
};

export default ModalCall1;