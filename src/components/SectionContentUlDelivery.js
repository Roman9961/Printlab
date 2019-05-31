import React from 'react';


class SectionContentUlDelivery extends React.Component{
    render(){
        return (
            <div className="col-sm-6 col-md-offset-0 col-lg-5 col-lg-offset-1">
                <h4 className="ultitle"><span className="icon-track" />Доставка</h4>
                <p className="text-16 m-bottom-36">По Одессе возможна адресная доставка курьерской службой. </p>
                <p className="text-16 bold">Стоимость доставки:</p>
                <ul className = "text-16">
                    {
                        this.props.state.Section_ul.filter(el => el.liDelivery).map(
                            (el, index) => <li key={index}>{el.liDelivery}</li>
                        )
                    }
                </ul>
                <hr className = "bg-yellow" />
                <p className = "text-16">По всей Украине отправляем <b>Новой Почтой</b></p>
                <p className = "text-16">В <b>Молдову</b> отправляем рейсовыми автобусами. <br className = "hidden-xs" />В <b>страны СНГ</b> отправляем Укрпочтой.</p>
            </div>
        )
    }
}

export default SectionContentUlDelivery;