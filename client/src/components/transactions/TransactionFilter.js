import { connect } from 'react-redux';
import React, { useRef, useEffect } from 'react';
import {filterTransactions, clearFilter} from '../../actions/transactions';

const TransactionFilter = ({transactions, filterTransactions, clearFilter}) => {
    const text = useRef('');

    useEffect(() => {
        if(transactions.filtered === null){
            text.current.value = '';
        }
    });

    const onChange = e => {
        if(text.current.value !== ''){
            filterTransactions(e.target.value);
        }else{
            clearFilter();
        }
    }

    return (
        <form>
            <input ref={text} type='text' placeholder='Filter Transactions...' onChange={onChange} />
        </form>
    )
}

const mapStateToProps = state => ({
    transactions: state.transactions
})

export default connect(mapStateToProps,{filterTransactions, clearFilter})(TransactionFilter);
