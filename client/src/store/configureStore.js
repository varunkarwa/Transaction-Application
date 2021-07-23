import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import alertsReducer from '../reducers/alerts';
import authsReducer from '../reducers/auths';
import accountsReducer from '../reducers/accounts';
import transactionsReducer from '../reducers/transactions';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
        alerts: alertsReducer,
        auths: authsReducer,
        accounts: accountsReducer,
        transactions: transactionsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
