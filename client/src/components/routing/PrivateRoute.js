import { connect } from 'react-redux';
import React from 'react';
import { Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, auths, ...rest}) => {
    return (
        <Route {...rest} render={props=> 
            !auths.isAuthenticated && !auths.loading ? (
                <Redirect to='/login' />
            ) : (
                <Component {...props} />
            )
        }/>
    )
}

const mapStateToProps = state => ({
    auths: state.auths
})

export default connect(mapStateToProps)(PrivateRoute);