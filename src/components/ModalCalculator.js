import React from 'react';
import Modal from 'react-modal';
import ModalHeader from './ModalHeader';
import ModalBlockInfo from './ModalBlockInfo';
import ModalBlockForm from './ModalBlockForm';
import Section1 from './Section1';

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
        },
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
            >
               <ModalHeader handleModal={this.props.handleModal} bookmarks = {this.state} handleBookmark={handleBookmark}/>
                {/*<ModalBlockInfo/>*/}
                {/*<ModalBlockForm/>*/}
                <Section1
                    state = { this.state }
                    calcProp = { this.props.calcProp}
                />
            </Modal>
        )
    }
};

export default ModalCalculator;