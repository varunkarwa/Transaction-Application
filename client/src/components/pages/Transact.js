import React,{ Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Timer from '../layout/Timer';
import { setAlert } from '../../actions/alerts';
import {loadUser} from '../../actions/auths';
import {setCurrent, updateAccount, clearCurrent} from '../../actions/accounts';
import {addTransaction} from '../../actions/transactions';

const Transact = ({history, loadUser, setAlert, updateAccount, clearCurrent, addTransaction, match, accounts}) => {
    useEffect(() => {
        if(current===null){setAlert('You Refreshed the Page!','danger');
        history.push('/');}
        loadUser();
        // eslint-disable-next-line
    }, []);
    const {current} = accounts;
    const [transaction, setTransaction] = useState({
        accountNo: current !== null ? current.accountNo : 0,
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
        if(current!==null && account.amount!==current.amount){
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
                // eslint-disable-next-line
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
        <Fragment>
        {current &&
        <div style={{'height': 1000}}>
            <Timer history={history}/>
            <form onSubmit={onSubmit} >
                <h2 className='text-primary'>{type+" "} Money</h2>
                <h2>Account Number:{" "+current.accountNo}</h2>
                <h2>Ammount Left in Account: {" "+current.amount}</h2>
                <div style={{'marginLeft': 'auto', 'marginRight':'auto'}}><h2>Amount: <input 
                    type='number'
                    placeholder='Amount'
                    name='amount'
                    value={amount}
                    onChange={onChange}
                /></h2></div>
                <div style={{'display': 'flex', 'justifyContent': 'center', 'marginLeft': 'auto', 'marginRight':'auto'}}>
                    <input 
                        type='submit' 
                        value={type}
                        onClick={onSubmit}
                        className='btn btn-primary'
                    />
                </div> 
                    <div style={{'display': 'flex', 'justifyContent': 'center', 'marginLeft': 'auto', 'marginRight':'auto'}}>
                        <button className='btn btn-primary' onClick={() => {
                            history.push('/')
                            clearAll();
                        }}>Select Another Account</button>
                    </div>
            </form>
        </div>
        }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    accounts: state.accounts
})
export default connect(mapStateToProps,{setAlert, setCurrent, loadUser, updateAccount, clearCurrent, addTransaction})(Transact);