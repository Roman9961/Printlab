import React from 'react';
import Modal from 'react-modal';
import ModalHeader from './ModalHeader';
import Section1 from './Section1';
import { removePropertiesDeep } from '@babel/types';

Modal.setAppElement('.bod');


class ModalCalculator extends React.Component{
    state ={
        print:true,
        design:false,
        deliver:false,
        calculator : {
            width : null,
            height   : null,
            quantity : null,
            _exchangeRate : null,
        }
    }

    render() {

        const handleBookmark = (state)=>{
            this.setState(()=>(
                state
            ))
        }
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.handleModal}
                contentLabel="Error"
                closeTimeoutMS={200}
                className="modal-calculator"
                overlayClassName = "modal-calculator-overlay"
            >
               <ModalHeader handleModal={this.props.handleModal} bookmarks = {this.state} handleBookmark={handleBookmark} locale={ this.props.locale }/>
                <Section1
                    state = { this.state }
                    editOrder = {this.props.editOrder}
                    calcProp = { this.props.calcProp}
                    handleBookmark={handleBookmark}
                    handleModal = {this.props.handleModal}
                    locale={ this.props.locale }
                />
            </Modal>
        )
    }
};

export default ModalCalculator;