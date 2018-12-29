import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from 'antd';
import moment from 'moment';
import { DAYS, TIME_PICKER_FORMAT } from '../constants';
import 'antd/dist/antd.css';

class ManageSchedule extends Component {
    renderTime = (timeArr, day) => {
        return timeArr && timeArr.map((time, i) => (
            <div key={`${i}-day`}>
                <span>from: <TimePicker
                    defaultValue={moment(`${time.from}`, TIME_PICKER_FORMAT)}
                    format={TIME_PICKER_FORMAT}
                    onChange={(_, time) => this.props.handleTime(time, day, i, 'from')}
                /></span>
                <span>to: <TimePicker
                    defaultValue={moment(`${time.to}`, TIME_PICKER_FORMAT)}
                    format={TIME_PICKER_FORMAT}
                    onChange={(_, time) => this.props.handleTime(time, day, i, 'to')}
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