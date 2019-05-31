import React from 'react';
import Modal from 'react-modal';
import base from '../base';
import {Transition} from 'react-transition-group'



Modal.setAppElement('.bod');


class ModalComment extends React.Component{


    save = ()=>{
        if(this.props.managerComment ) {
            base.post(`orders/${this.props.currentOrder.key}/manager_comment`, {
                data: this.props.managerComment
            }).then(()=> {
                const uuidv4 = require('uuid/v4');
                base.post(`ordersVersion/${this.props.currentOrder.key}/ver`, {
                    data: uuidv4(),
                });

                base.post('versionAdmin', {
                    data: uuidv4(),
                });
            })
        }
    }

    render() {

        return (
            <Transition in={this.props.isOpen} timeout={300}>
                {status=> {
                    return (
                        <Modal
                            isOpen={this.props.isOpen}
                            onRequestClose={this.props.handleModal}
                            contentLabel="Error"
                            closeTimeoutMS={300}
                            className={`modal-error modal-call ${status}`}
                            overlayClassName="modal-error-overlay"
                        >

                            <div className="modal-error__message">
                                {this.props.currentOrder&&<h2>Заказ №{this.props.currentOrder.orderId}</h2>}
                                <textarea maxLength="200" type="text" value={this.props.managerComment} onChange={this.props.handleComment}/>
                                <button onClick={()=>{
                                    this.save();
                                    this.props.handleModal()
                                }}>Save</button>
                            </div>
                        </Modal>
                    )
                }
                }
            </Transition>
        )
    }
};

export default ModalComment;