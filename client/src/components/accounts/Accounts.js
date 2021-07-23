import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AccountItem from './AccountItem';
import Spinner from '../layout/Spinner';
import {getAccounts} from '../../actions/accounts';
import {connect} from 'react-redux';

const Accounts = ({accs, history, getAccounts}) => {
    const {accounts, filtered, loading} = accs;
    useEffect(() => {
        getAccounts();
        //eslint-disable-next-line
    }, []);
    
    if(accounts !== null && accounts.length === 0 && !loading){
        return <h4>Please open an account in Bank!</h4>
    }
    return (
        <Fragment>
            {accounts !== null && !loading ? ( 
                <TransitionGroup>
                    {filtered !== null
                        ? filtered.map(account => (
                        <CSSTransition key={account._id} timeout={500} classNames='item'>
                            <AccountItem  account={account} history={history}/>
                        </CSSTransition> )) 
                        : accounts.map(account => (
                            <CSSTransition key={account._id} timeout={500} classNames='item'>
                                <AccountItem  account={account} history={history}/>
                            </CSSTransition>
                            ))}
                </TransitionGroup> 
            ) : <Spinner />}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    accs: state.accounts
})

export default connect(mapStateToProps,{getAccounts})(Accounts);