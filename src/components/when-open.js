import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getHumanReadableNextWorkingHours, convertSchedule } from '../utils';

class WhenOpen extends Component {
    render() {
        const { schedule, timeZone } = this.props;
        return (
            <span>{getHumanReadableNextWorkingHours(convertSchedule(schedule, timeZone))}</span>
        );
    }
}

WhenOpen.propTypes = {
    schedule: PropTypes.shape({}),
    timeZone: PropTypes.string,
}

export default WhenOpen;