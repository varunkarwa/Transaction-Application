import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const TransactionItem = ({ transaction }) => {

    const { _id, accountNo, amount, type, date} = transaction;

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {_id}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' + 
                        (type === 'Deposit' ? 'badge-success':'badge-danger')
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {accountNo && (<li style={{display: 'flex'}}>
                    <p>Account Number:</p>
                    {accountNo}
                </li>)}
                {amount && (<li style={{display: 'flex'}}>
                    <p>Amount {type+(type === 'Deposit' ? 'ed' : 'n')}:</p> {amount}
                </li>)}
                {date && (
                    <li style={{'display':'flex'}}>
                    <p >Transaction occured on:</p>{" " +format(new Date(date), 'yyyy/MM/dd kk:mm:ss')}
                    </li>
                )}
            </ul>
        </div>
    )
};

TransactionItem.protoTypes = {
    transaction: PropTypes.object.isRequired
}

export default TransactionItem;