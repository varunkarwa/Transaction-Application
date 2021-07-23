import React from 'react';
import {connect} from 'react-redux';
import { useState, useEffect } from 'react';
import {setAlert} from '../../actions/alerts';

const Timer = ({history, setAlert}) => {
    const [ minutes, setMinutes ] = useState(5);
    const [seconds, setSeconds ] =  useState(0);
    const [color, setColor] = useState('Black');
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
                if(minutes===0){
                    setColor(seconds%2===0? 'Red':'Black')
                }
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setAlert('Sorry Timeout!', 'danger');
                    clearInterval(myInterval)
                    history.push('/');
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? null
            : <h1 style={{color: `${color}`}}><i className="far fa-clock"></i>Time Left: {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default connect(null, {setAlert})(Timer);