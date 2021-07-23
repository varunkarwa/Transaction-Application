import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrent } from '../../actions/accounts';

const AccountItem = ({ account, setCurrent, history }) => {
    const { _id, name, accountNo, amount, type} = account;

    const onDeposit = () => {
        setCurrent(account);
        localStorage.setItem('current', JSON.stringify(account));
        history.push(`/${_id}/Deposit`)
    }

    const onWithdraw = () => {
        setCurrent(account);
        localStorage.setItem('current', JSON.stringify(account));
        history.push(`/${_id}/Withdraw`)
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {accountNo}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' + 
                        (type === 'Saving' ? 'badge-success':'badge-primary')
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {name && (<li style={{display: 'flex'}}>
                    <p>Account Holder Name:</p>
                    {name}
                </li>)}
                {amount && (<li style={{display: 'flex'}}>
                    <p>Amount in Account:</p> {amount}
                </li>)}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm' onClick={onDeposit}>Deposit</button>
                <button className='btn btn-dark btn-sm' onClick={onWithdraw}>Withdraw</button>
            </p>
        </div>
    )
};

AccountItem.protoTypes = {
    account: PropTypes.object.isRequired
}

export default connect(null, {setCurrent})(AccountItem);