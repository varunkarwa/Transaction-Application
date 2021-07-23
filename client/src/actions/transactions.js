import axios from "axios";


export const getTransactions = () => async dispatch => {
    try {
        const res = await axios.get('/api/transactions');
        
        dispatch({ 
            type: 'GET_TRANSACTIONS', 
            payload: res.data 
        });   
    } catch (err) {
        dispatch({ 
            type: 'TRANSACTION_ERROR',
            payload: err.response.msg
        });
    }
}

//Add Transaction
export const addTransaction = transaction => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/transactions', transaction, config);
        
        dispatch({ 
            type: 'ADD_TRANSACTION', 
            payload: res.data 
        });   
    } catch (err) {
        dispatch({ 
            type: 'TRANSACTION_ERROR',
            payload: err.response.msg
        });
    }
}

//Clear Transactions
export const clearTransactions = () => dispatch => {
    dispatch({ type: 'CLEAR_TRANSACTIONS' });
}

//Filter Accounts
export const filterTransactions = text => dispatch => {
    dispatch({ type: 'FILTER_TRANSACTIONS', payload: text });
}

//Clear Filter
export const clearFilter = () => dispatch => {
    dispatch({ type: 'CLEAR_FILTER' });
}