import React from 'react';

class Row extends React.Component{
    render(){

        return (
            <tr>
                <td>{this.props.kolvo}</td><td>{this.props.pricePaper}</td><td>{this.props.pricePlast}</td>
            </tr>
        );
    }
}

export default Row;