import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    if(localStorage.token){;
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type:'USER_LOADED', 
            payload: res.data
        });
    } catch (err) {
        dispatch({type:'AUTH_ERROR'});
    }
} ;


// Login User
export const login = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/auth', formData, config);

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        });

        loadUser();
    } catch (err) {
        dispatch({
            type: 'LOGIN_FAIL',
            payload: err.response.data.msg
        });
    }
};

// Logout
export const logout = () => dispatch => dispatch({type: 'LOGOUT'});

// Clear Errors
export const clearErrors = () => dispatch => dispatch({type: 'CLEAR_ERRORS'});