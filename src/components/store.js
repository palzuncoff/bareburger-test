import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Schedule from './schedule';
import OpenIndicator from './open-indicator'

class Store extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <div>Store is <OpenIndicator schedule={this.props.schedule}/> will open in 20 min</div>
                <ul>
                    {<Schedule schedule={this.props.schedule}/>}
                </ul>
            </div>
        )
    }
}

Store.defaultProps = {
    name: 'Aero Pops',
    schedule: {
        mon: [{ from: '10:00', to: '23:00' }],
        tue: [{ from: '10:00', to: '23:00' }],
        wed: [{ from: '09:00', to: '13:30' }, { from: '14:00', to: '22:00' }],
        thu: [{ from: '11:00', to: '23:00' }],
        fri: [{ from: '12:00', to: '23:00' }],
    },
};

Store.propTypes = {
    name: PropTypes.string,
    schedule: PropTypes.shape({
        mon: PropTypes.arrayOf(PropTypes.shape({})),
        tue: PropTypes.arrayOf(PropTypes.shape({})),
        wed: PropTypes.arrayOf(PropTypes.shape({})),
        thu: PropTypes.arrayOf(PropTypes.shape({})),
        fri: PropTypes.arrayOf(PropTypes.shape({})),
        sat: PropTypes.arrayOf(PropTypes.shape({})),
        sun: PropTypes.arrayOf(PropTypes.shape({})),
    })
};

export default Store;

