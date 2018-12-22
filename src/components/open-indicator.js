import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isInWorkingHours } from '../utils';

class OpenIndicator extends Component {
    render() {
        return (
            <span>{isInWorkingHours(this.props.schedule) ? 'open' : 'closed, will open '}</span>
        );
    }
}

OpenIndicator.defaultProps = {
    schedule: {}
}

OpenIndicator.propTypes = {
    schedule: PropTypes.shape({}),
};

export default OpenIndicator;