const initialState = {
    transactions: null,
    filtered: null,
    error: null
};

// eslint-disable-next-line
export default (state=initialState, action) => {
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                transactions: action.payload,
                loading: false
            };
        case 'ADD_TRANSACTION':
            return{
                ...state,
                transactions: [
                    action.payload,
                    ...state.transactions
                ],
                loading: false
            }
        case 'CLEAR_TRANSACTIONS':
            return{
                ...state,
                transactions: null,
                filtered: null,
                error: null
            };
        case 'FILTER_TRANSACTIONS':
            return {
                ...state,
                filtered: state.transactions.filter(transaction => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return String(transaction.amount).match(regex) || String(transaction.accountNo).match(regex) || transaction.type.match(regex) ;
                })
            };
        case 'CLEAR_FILTER': 
            return{
                ...state,
                filtered: null
            };
        case 'TRANSACTION_ERROR': 
            return{
                ...state,
                error: action.payload
            }
        default: 
          return state;  
    }
}