import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isInWorkingHours, convertSchedule } from '../utils';

class OpenIndicator extends Component {
    render() {
        return (
            <span>{isInWorkingHours(convertSchedule(this.props.schedule, this.props.timeZone)) ? ' is open' : ' will open '}</span>
        );
    }
}

OpenIndicator.defaultProps = {
    schedule: {}
}

OpenIndicator.propTypes = {
    schedule: PropTypes.shape({}),
    timeZone: PropTypes.string,
};

export default OpenIndicator;