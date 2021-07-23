import React, { Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TransactionItem from './TransactionItem';
import Spinner from '../layout/Spinner';
import {getTransactions} from '../../actions/transactions';
import { connect } from 'react-redux';

const Transactions = ({trans, getTransactions}) => {
    
    const { transactions, filtered, loading } = trans;

    useEffect(() => {
        getTransactions();
        //eslint-disable-next-line
    }, []);
    
    if(transactions !== null && transactions.length === 0 && !loading){
        return <h4>Please Do A Transaction First!</h4>
    }
    return (
        <Fragment>
            {transactions !== null && !loading ? ( 
                <TransitionGroup>
                    {filtered !== null
                        ? filtered.map(transaction => (
                        <CSSTransition key={transaction._id} timeout={500} classNames='item'>
                            <TransactionItem  transaction={transaction}/>
                        </CSSTransition> )) 
                        : transactions.map(transaction => (
                            <CSSTransition key={transaction._id} timeout={500} classNames='item'>
                                <TransactionItem  transaction={transaction}/>
                            </CSSTransition>
                            ))}
                </TransitionGroup> 
            ) : <Spinner />}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    trans: state.transactions
})

export default connect(mapStateToProps,{getTransactions})(Transactions);