import React, { useState, useEffect } from 'react';
import { login, clearErrors } from '../../actions/auths';
import { setAlert } from '../../actions/alerts';
import { connect } from 'react-redux';

const Login = ({auths, login, clearErrors, setAlert, history}) => {

    const [user,setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if(auths.isAuthenticated){
            history.push('/');
        } else if(auths.error === 'Invalid Credentials'){
           setAlert(auths.error, 'danger');
           clearErrors(); 
        }
        // eslint-disable-next-line
    }, [auths.error, auths.isAuthenticated, history]);

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        console.log(email);
        e.preventDefault();
        if(email === '' || password === ''){
            setAlert('Please fill in all fields', 'danger');
        } else{
            login({
                email, 
                password
            });
        }
    };

    return (
        <div style={{'height': 1000}} className='form-container'>
            <h1>Account <span className='text-primary'>Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' name='email' value={email} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} required/>
                </div>
                <input type='submit' value='Login' className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

const mapStatetoProps = state => ({
    auths: state.auths
})

export default connect(mapStatetoProps,{setAlert, login, clearErrors})(Login);
