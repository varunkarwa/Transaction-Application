import { connect } from 'react-redux';
import React, { useRef, useEffect } from 'react';
import {filterAccounts, clearFilter} from '../../actions/accounts';

const AccountFilter = ({accounts, filterAccounts, clearFilter}) => {
    const text = useRef('');

    useEffect(() => {
        if(accounts.filtered === null){
            text.current.value = '';
        }
    });

    const onChange = e => {
        if(text.current.value !== ''){
            filterAccounts(e.target.value);
        }else{
            clearFilter();
        }
    }

    return (
        <form>
            <input ref={text} type='text' placeholder='Filter Accounts...' onChange={onChange} />
        </form>
    )
}

const mapStateToProps = state => ({
    accounts: state.accounts
})

export default connect(mapStateToProps,{filterAccounts, clearFilter})(AccountFilter)
