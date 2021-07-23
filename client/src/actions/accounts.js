import axios from 'axios';

export const getAccounts = () => async dispatch => {
    try {
        const res = await axios.get('/api/accounts');
        
        dispatch({ 
            type: 'GET_ACCOUNTS', 
            payload: res.data 
        });   
    } catch (err) {
        dispatch({ 
            type: 'ACCOUNT_ERROR',
            payload: err.response.msg
        });
    }
}

 //Update Contact
 export const updateAccount = account => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.put(`/api/accounts/${account._id}`, account, config);
        
        dispatch({ 
            type: 'UPDATE_ACCOUNT', 
            payload: res.data 
        });   
    } catch (err) {
        dispatch({ 
            type: 'ACCOUNT_ERROR',
            payload: err.response.msg
        });
    }
    
    dispatch({ type: 'UPDATE_ACCOUNT', payload: account });
};

//Clear Accounts
export const clearAccounts = () => dispatch => {
    dispatch({ type: 'CLEAR_ACCOUNTS' });
}

//Set Current Account
export const setCurrent = account => dispatch =>  {
    dispatch({ type: 'SET_CURRENT', payload: account });
}

//Clear Current Account
export const clearCurrent = account => dispatch => {
    dispatch({ type: 'CLEAR_CURRENT' });
}

//Filter Accounts
export const filterAccounts = text => dispatch => {
    dispatch({ type: 'FILTER_ACCOUNTS', payload: text });
}

//Clear Filter
export const clearFilter = () => dispatch =>  {
    dispatch({ type: 'CLEAR_FILTER' });
}