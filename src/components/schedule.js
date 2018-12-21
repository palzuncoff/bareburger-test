import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getHumanReadableSchedule } from '../utils';

class Schedule extends Component {
    renderSchedule = () => {
        const { schedule } = this.props;
        const humanReadable = getHumanReadableSchedule(schedule)
        if (!humanReadable) return 'MON-SUN: not working'
        if (typeof humanReadable === 'string') {
            return <p>{humanReadable}</p>
        }
        if (Array.isArray(humanReadable)) {
            return (
                <ul>
                    {humanReadable.map(schedule => (
                        <li>{schedule}</li>
                    ))}
                </ul>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderSchedule()}
            </div>
        );
    }
}

Schedule.defaultProps = {
    schedule: {}
}

Schedule.propTypes = {
    schedule: PropTypes.shape({})
};

export default Schedule;