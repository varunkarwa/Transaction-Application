const initialState = {
    accounts: null,
    current: null,
    filtered: null,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'GET_ACCOUNTS':
            return {
                ...state,
                accounts: action.payload,
                loading: false
            };
        case 'UPDATE_ACCOUNT':
            return {
                ...state,
                accounts: state.accounts.map(account => account._id === action.payload._id ? action.payload : account),
                loading: false
            };
        case 'CLEAR_ACCOUNTS':
            return{
                ...state,
                accounts: null,
                filtered: null,
                error: null,
                current: null
            };
        case 'SET_CURRENT':
            return{
                ...state,
                current: action.payload
            };
        case 'CLEAR_CURRENT':
            return{
                ...state,
                current: null
            };
        case 'FILTER_ACCOUNTS':
            return {
                ...state,
                filtered: state.accounts.filter(account => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return String(account.accountNo).match(regex) || account.name.match(regex) || account.type.match(regex);
                })
            };
        case 'CLEAR_FILTER': 
            return{
                ...state,
                filtered: null
            };
        case 'ACCOUNT_ERROR': 
            return{
                ...state,
                error: action.payload
            }
        default: 
          return state;  
    }
}