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
                <Schedule schedule={this.props.schedule} timeZone={this.props.timeZone} />
                <div>{this.props.timeZone}</div>
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
    schedule: PropTypes.shape({}),
    timeZone: PropTypes.string,
};

export default Store;

