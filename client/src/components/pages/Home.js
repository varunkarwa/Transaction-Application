import React, { useEffect } from 'react';
import Accounts from '../accounts/Accounts';
import AccountFilter from '../accounts/AccountFilter';
import Transactions from '../transactions/Transactions';
import TransactionFilter from '../transactions/TransactionFilter';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/auths';

const Home = ({history, loadUser}) => {
    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);
    
    return (
        <div style={{'height': '1000'}} className='grid-2'>
            <div>
                <AccountFilter />
                <Accounts history={history}/>
            </div>
            <div>
                <TransactionFilter />
                <Transactions />
            </div>
        </div>
    )
};

export default connect(null,{loadUser})(Home);
