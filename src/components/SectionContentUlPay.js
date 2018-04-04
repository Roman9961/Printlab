import React from 'react';


class SectionContentUlPay extends React.Component{
    render(){
        return (
            <div className="col-sm-6 col-lg-5 first-ul-list">
                <h4 className="ultitle"><span className="icon-wallet" />Оплата</h4>
                <p className="text-16 m-bottom-36">Мы работаем по 100% предоплате.</p>
                <p className="text-16 bold">Способы оплаты:</p>
                <ul className = "text-16">
                    {
                        this.props.state.Section_ul.filter(el => el.liPay).map(
                                (el, index) => <li key={index}>{el.liPay}</li>
                            )
                    }
                </ul>
                <hr className = "bg-yellow" />
                <p className = "text-16">После согласования стоимости заказа мы выставим счет на оплату. Пожалуйста, сообщите нам об оплате любым удобным способом - так заказ уйдет в работу быстрее!</p>
            </div>
        )
    }
}

export default SectionContentUlPay;