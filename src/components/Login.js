import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';


const Login = (props) => (
    <nav className="login">
        <h2>Inventory Login</h2>
        <button className="facebook" onClick={()=>props.authenticate('Facebook')}>Log In With Facebook</button>

    </nav>
);
Login.propTypes = {
    authenticate: PropTypes.func.isRequired
}

export default Login;