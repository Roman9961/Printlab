import React from 'react';
import Modal from 'react-modal';
import {Transition} from 'react-transition-group'
import customSelect from '../custom_select';
import moment from 'moment';

Modal.setAppElement('.bod');


class ModalCall extends React.Component{
    state ={
        days:[],
        currentDay: {},
        currentHour:null,
        time: moment(),
        secondsLeft: 85000,
        countdown:null
    }

    componentDidMount(){
        this.isWeekday(this.state.time)
    }

    changeNumber =(event)=>{
        let number = event.currentTarget.value;
        this.setState(state=>({
            ...state,
            number
        }));
    }

    changeOperator =(event)=>{
        let operator = event.currentTarget.value;
        this.setState(state=>({
            ...state,
            operator
        }));
    }
    changeDay =(event)=>{
        let id = event.currentTarget.value;
        this.setState(state=>({
            ...state,
            currentDay: {id, ...state.days[id]}
        }));
        setTimeout(()=>{customSelect('hour')},100)
    }
    changeHour =(event)=>{
        let currentHour = event.currentTarget.value;
        this.setState(state=>({
            ...state,
            currentHour
        }));
    }
    callNumber =(event)=>{
        // fetch('http://77.222.152.121:88/call.php?phone='+this.state.operator+this.state.number) // Call the fetch function passing the url of the API as a parameter
        //     .then(function(data) {
        //         console.log(data);
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });

        let secondsLeft = moment(this.state.currentDay.date.format('YYYY-MM-DD ')+this.state.currentHour).unix() - moment().unix();
        this.setState(state=>({
            ...state,
            secondsLeft
        }));
        clearInterval(this.state.countdown);
        this.timer(secondsLeft);
        // console.log(moment(this.state.currentDay.date.format('YYYY-MM-DD ')+this.state.currentHour).unix());
    }

    timer(seconds){
        let countdown;
        const now = moment().unix();
        const then = now + seconds;

        countdown =  setInterval(()=>{
            const secondsLeft = then - moment().unix();
            let duration = moment.utc(moment.duration(secondsLeft,"s").asMilliseconds()).format("HH:mm:ss");

            if(secondsLeft < 0){
                clearInterval(this.state.countdown);
                return;
            }
            this.setState(state=>({
                ...state,
                secondsLeft:duration
            }))
            this.setState(state=>({
                ...state,
                countdown
            }))
        },1000)
    }

    hoursArr (start, momentInst=null){
        let quarterHours = ["00", "15", "30", "45"];
        let times = [];
        for(let i = start; i < 18; i++){
            for(let j = 0; j < 4; j++){
                if(momentInst) {
                    if (i == momentInst.format('HH') && momentInst.format('mm') < quarterHours[j]) {
                        times.push(i + ":" + quarterHours[j]);
                    }else if(i != momentInst.format('HH')){
                        times.push(i + ":" + quarterHours[j]);
                    }
                }else{
                    times.push(i + ":" + quarterHours[j]);
                }
            }
        }
        times.push("18:00");
        return times;
    }

    isWeekday (date) {
        do{

            if(this.state.time.day()!==6&&this.state.time.day()!==0) {
                if(this.state.time.format('L') > moment().format('L')||this.state.time.format('HH')<18 && this.state.time.format('HH')>8) {
                    let times =[];
                    if(this.state.time.format('L') == moment().format('L')){
                        times =  this.hoursArr(moment(this.state.time).format('HH'),moment(this.state.time));
                    }else{
                        times =  this.hoursArr(9);
                    }
                    this.state.days.push({
                        date: moment(this.state.time),
                        times
                    });
                }
            }
            this.state.time.add(1, 'day');
        }while (this.state.days.length<5);

        this.setState(state=>({
            ...state,
            currentDay: {id:0,...state.days[0]},
            currentHour: state.days[0].times[0]
        }));
    }

    render() {

        const handleBookmark = (state)=>{
            this.setState(()=>(
                state
            ))
        }
        return (
            <Transition in={this.props.isOpen} timeout={300}>
                {status=> {
                    return (
                        <Modal
                            isOpen={this.props.isOpen}
                            onRequestClose={()=> {
                                this.props.handleModal();
                            }}
                            contentLabel="Error"
                            closeTimeoutMS={300}
                            className={`modal-error modal-call ${status}`}
                            overlayClassName="modal-error-overlay"
                        >

                            <div className="modal-error__message">
                                <div>
                                    <div className="custom-select call">
                                        <select name="" onChange={this.changeOperator}>
                                            <option value="063">063</option>
                                            <option value="073">073</option>
                                            <option value="093">093</option>
                                            <option value="050">050</option>
                                            <option value="066">066</option>
                                            <option value="095">095</option>
                                            <option value="099">099</option>
                                            <option value="067">067</option>
                                            <option value="068">068</option>
                                            <option value="096">096</option>
                                            <option value="097">097</option>
                                            <option value="098">098</option>
                                        </select>
                                    </div>
                                    <input className="custom-sizes" type="text" onChange={this.changeNumber}/>
                                </div>

                                <div>
                                    <div className="custom-select call">
                                        <select  name="" onChange={this.changeDay}>
                                            { this.state.days.map(function (day, key) {
                                                return  <option key={key}  value={key}>{day.date.locale('ru').format('DD MMMM')}</option>
                                            }) }
                                        </select>
                                    </div>

                                    <div className="custom-select call hour">
                                        <select  name="" onChange={this.changeHour}>
                                            { this.state.currentDay.times&&this.state.currentDay.times.map(function (data, key) {
                                                return  <option  key={key} value={data}>{data}</option>
                                            }) }
                                        </select>
                                    </div>
                                </div>
                                <div onClick={this.callNumber}>Submit</div>
                                <div>{this.state.secondsLeft}</div>

                            </div>
                        </Modal>
                    )
                }
                }
            </Transition>
        )
    }
};

export default ModalCall;