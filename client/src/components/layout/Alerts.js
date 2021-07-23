import { connect } from 'react-redux';
import React from 'react';

const Alerts = ({alerts}) => {
    return (
        alerts.length > 0 &&
        alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className='fas fa-info-circle'/> {alert.msg}
            </div>
        ))   
    );
};

const mapStateToProps = state =>({
    alerts: state.alerts
})

export default connect(mapStateToProps)(Alerts);
