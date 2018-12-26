import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { DAYS } from '../constants';

class ManageSchedule extends Component {
    handleOnTime = (e, day, index, option) => {
        const val = e.target.value;
        this.props.handleTime(val, day, index, option)
    };

    renderTime = (timeArr, day) => {
        return timeArr && timeArr.map((time, i) => (
            <div key={`${i}-day`}>
                <span>from: <input
                    type="text"
                    value={time.from}
                    onChange={e => this.handleOnTime(e, day, i, 'from')}
                /></span>
                <span>to: <input
                    type="text"
                    value={time.to}
                    onChange={e => this.handleOnTime(e, day, i, 'to')}
                /></span>
                <button onClick={() => this.props.handleRemoveTime(day, i)}>remove time</button>
            </div>
        ))
    };

    render() {
        const { schedule, handleDay } = this.props;
        return (
            <ul>
                {DAYS.map(day => (
                        <li key={day}>
                            <button
                                onClick={() => handleDay(day)}
                                style={{ backgroundColor: schedule[day] ? 'gray' : 'white' }}
                            >
                                {day}
                            </button>
                            {this.renderTime(schedule[day], day)}
                            <button onClick={() => this.props.handleNewTime(day)}>add time</button>
                        </li>
                    )
                )}
            </ul>
        );
    }
}

ManageSchedule.propTypes = {
    schedule: PropTypes.shape({}),
    handleTime: PropTypes.func,
    handleDay: PropTypes.func,
    handleNewTime: PropTypes.func,
    handleRemoveTime: PropTypes.func,
};

export default ManageSchedule;