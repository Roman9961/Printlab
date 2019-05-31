import React from 'react';
import PropTypes from 'prop-types';

class SectionPrint extends React.Component{
    render(){
        const ImgExampleContent = this.props.state.Print.map( (item, index) => {
            return (
                <div key={index} className="col-sm-4 rule-item">
                    <div className="single-image"><img src={item.imgSrc} /></div>
                    <h4>{item.title}</h4>
                    <p>{item.txt}</p>
                </div>
            )
        });
        return (
            <section className = "row-print">
                <div className="wrapper-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-sm-offset-right-0 col-md-2 col-md-offset-right-1">
                                <div className="row visible-sm">
                                    <div className="col-sm-4">
                                        <h2>Требования к макетам</h2>
                                        <p>Чтобы наклейки получились классные, а главное соответствовали ожиданиям, соблюдайте наши требования к макетам</p>
                                    </div>
                                    <div className="col-sm-4 col-sm-offset-4">
                                        <p className="with-arrow"><b>Полный список требований</b><br />pdf, 61.4 Кб</p>
                                        <a className="btn btn-primary requirements" target="_blank" download="" href="/img/trebovaniya-k-maketam-nakleyki-na.pdf">Скачать</a>
                                        <div className="info-block">В любом случае бояться нечего, мы вам поможем ;)</div>
                                    </div>
                                </div>
                                <div className="hidden-sm">
                                    <h2>Требования к&nbsp;макетам</h2>
                                    <p>Чтобы наклейки получились классные, а главное соответствовали ожиданиям, соблюдайте наши требования к макетам</p>
                                    <hr />
                                    <p className="with-arrow">Полный список требований</p>
                                    <p>pdf, 10 Кб</p>
                                    <a className="btn btn-block btn-primary requirements" target="_blank" download="" href="/img/trebovaniya-k-maketam-nakleyki-na.pdf">Скачать</a>
                                    <div className="info-block">В любом случае бояться нечего, мы вам поможем ;)</div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-9">
                                <div className="row">{ImgExampleContent}</div>
                                <div className="row">
                                    <div className="col-sm-5">
                                        <p className=""><b>Форматы файлов с которыми мы работаем:</b></p>
                                        <div className="row">
                                            <div className="col-xs-6">
                                                <p>CDR<br />PDF<br />AI</p>
                                            </div>
                                            <div className="col-xs-6">
                                                <p>EPS<br />TIFF<br />PSD</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-3 text-center">
                                        <img className="img-kontur" src="./images/print/contur-porezki.svg"/>
                                    </div>
                                    <div className="col-sm-4 col-xs-9">
                                        <p className="with-pink-arrow"><b><span className="pink">Контур</span> порезки наклеек</b></p>
                                        <p>Для того чтобы плоттер порезал наклейки, ему необходима траектория движения ножа. Это должен быть замкнутый контур, который размещён на отдельном слое или в отдельном файле.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default SectionPrint;