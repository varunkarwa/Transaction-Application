import React,{useContext, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Timer from '../layout/Timer';
import { setAlert } from '../../actions/alerts';
import {loadUser} from '../../actions/auths';
import {updateAccount, clearCurrent} from '../../actions/accounts';
import {addTransaction} from '../../actions/transactions';

const Transact = ({history, loadUser, setAlert, updateAccount, clearCurrent, addTransaction, match, accounts}) => {
    var min = localStorage.getItem('min') ? localStorage.getItem('min') : 5;
    var sec = localStorage.getItem('sec') ? localStorage.getItem('sec') : 0;
    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);
    var {current} = accounts;
    if(current===null){
        current = JSON.parse(localStorage.getItem('current'));
    }
    const [transaction, setTransaction] = useState({
        accountNo: current.accountNo,
        amount: 0,
        type: match.params.type
    })
    const [account, setAccount] = useState(current);
    const {amount, type} = transaction;
    const onChange = e => setTransaction({
        ...transaction,
        amount:e.target.value
    });

    //eslint-disable-next-line
    useEffect(() => {
        if(account.amount!==current.amount){
            updateAccount(account);
            addTransaction(transaction);
            setTimeout(() => {
                history.push('/');
                clearAll();
            }, 1000);
        }
    },[account]);
    const onSubmit = e => {
        e.preventDefault();
        if(type==='Withdraw' && account.amount<amount){
            setAlert('There is not enough amount to Withdraw', 'danger')
        }
        else{
            if(type==='Withdraw'){
                var a = account.amount-amount;
            }
            else{
                var a = parseInt(account.amount)+parseInt(amount)
            }
            setAccount({
                ...account,
                amount:a
            })
        }    
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <div style={{'height': 1000}}>
            <Timer history={history} min={min} sec={sec}/>
            <form onSubmit={onSubmit} >
                <h2 className='text-primary'>{type+" "} Money</h2>
                <h2>Account Number:{" "+current.accountNo}</h2>
                <h2>Ammount Left in Account: {" "+current.amount}</h2>
                <div style={{'margin-left': 'auto', 'margin-right':'auto'}}><h2>Amount: <input 
                    type='number'
                    placeholder='Amount'
                    name='amount'
                    value={amount}
                    onChange={onChange}
                /></h2></div>
                <div style={{'display': 'flex', 'justifyContent': 'center', 'margin-left': 'auto', 'margin-right':'auto'}}>
                    <input 
                        type='submit' 
                        value={type}
                        onClick={onSubmit}
                        className='btn btn-primary'
                    />
                </div>
                {current && 
                    <div style={{'display': 'flex', 'justifyContent': 'center', 'margin-left': 'auto', 'margin-right':'auto'}}>
                        <button className='btn btn-primary' onClick={() => {
                            history.push('/')
                            clearAll();
                        }}>Select Another Account</button>
                    </div>
                }
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    accounts: state.accounts
})
export default connect(mapStateToProps,{setAlert, loadUser, updateAccount, clearCurrent, addTransaction})(Transact);