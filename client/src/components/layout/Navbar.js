import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {logout} from '../../actions/auths';
import {clearAccounts} from '../../actions/accounts';
import { connect } from 'react-redux';

const Navbar = ({ auths, logout, clearAccounts, title, icon}) => {
    const { isAuthenticated, user } = auths;
    const onLogout = () => {
        logout();
        clearAccounts();
    };

    const authLinks = (
        <Fragment>
            <li>Hello { user && user.name }</li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className='fas fa-sign-out-alt'></i> <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <p>Login To Proceed!</p>
            </li>
        </Fragment>
    );

    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

Navbar.defaultProps = {
    title: 'Transactions App',
    icon: 'fas fa-wallet'
}

const mapStateToProps = state => ({
    auths: state.auths
})

export default connect(mapStateToProps,{logout, clearAccounts})(Navbar);
