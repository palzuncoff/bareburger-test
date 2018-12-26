import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { DAYS } from '../constants';

class ManageSchedule extends Component {
    renderTime = timeArr => {
        return timeArr && timeArr.map((time, i) => (
            <div key={`${i}-day`}>
                <span>from: <input type="text" value={time.from} /></span>
                <span>to: <input type="text" value={time.to} /></span>
            </div>
        ))
    };
    render() {
        const { schedule } = this.props;
        return (
            <ul>
                {DAYS.map(day => (
                        <li key={day}>
                            <button>{day}</button>
                            {this.renderTime(schedule[day])}
                        </li>
                    )
                )}
            </ul>
        );
    }
}

ManageSchedule.propTypes = {
    schedule: PropTypes.shape({}),
};

export default ManageSchedule;