import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Schedule from './schedule';
import OpenIndicator from './open-indicator'
import WhenOpen from './when-open';

class Store extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <div>Store
                    <OpenIndicator schedule={this.props.schedule} timeZone={this.props.timeZone}/>
                    <WhenOpen schedule={this.props.schedule} timeZone={this.props.timeZone}/>
                </div>
                <Schedule schedule={this.props.schedule} />
                <div>{this.props.timeZone}</div>
            </div>
        )
    }
}

Store.propTypes = {
    name: PropTypes.string,
    schedule: PropTypes.shape({}),
    timeZone: PropTypes.string,
};

export default Store;

