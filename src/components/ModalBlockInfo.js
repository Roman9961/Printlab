import React from 'react';

const ModalBlockInfo = (props)=> {

        return (
            <div className="wrapper-container wrapper-container--modal">
                <div className="container container--modal-info">
                        <div>Укажите, на что хотите печатать наклейки:</div>
                        <div><input className="modal-info__field" type="text" maxLength={50} placeholder="на банки" /></div>
                </div>
            </div>
        )
};

export default ModalBlockInfo;