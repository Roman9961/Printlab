import React from 'react';
import Modal from 'react-modal';
import ModalHeaderDesign from './ModalHeaderDesign';
import ModalBlockInfo from './ModalBlockInfo';
import ModalBlockForm from './ModalBlockForm';
import SectionDesignOnly from './SectionDesignOnly';

Modal.setAppElement('.bod');


class ModalDesign extends React.Component{

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
               <ModalHeaderDesign handleModal={this.props.handleModal}/>
                {/*<ModalBlockInfo/>*/}
                {/*<ModalBlockForm/>*/}
                <SectionDesignOnly
                    handleModal = {this.props.handleModal}
                    locale={ this.props.locale }
                />
            </Modal>
        )
    }
};

export default ModalDesign;