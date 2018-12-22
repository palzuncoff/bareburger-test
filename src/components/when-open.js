import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getHumanReadableNextWorkingHours } from '../utils';

class WhenOpen extends Component {
    render() {
        const { schedule } = this.props;
        return (
            <span>{getHumanReadableNextWorkingHours(schedule)}</span>
        );
    }
}

WhenOpen.propTypes = {
    schedule: PropTypes.shape({}),
}

export default WhenOpen;