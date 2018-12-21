import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DAYS } from '../constants'

function renderWorkTime({ from, to }) {
    return <p>from: {from} - to: {to}</p>;
}

class Store extends Component {
    renderSchedule = () => {
        const { schedule } = this.props;
        return DAYS.map(day => {
            if (schedule[day]) {
                return (
                    <li>
                        <p><span>{day}:</span> {schedule[day].map(renderWorkTime)}</p>
                    </li>
                )
            }
            return (
                <li>
                    <p>{day}: not working</p>
                </li>
            )
        })
    }
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <div>Store is open / will open in 20 min</div>
                <ul>
                    {this.renderSchedule()}
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

