import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

class ManageStore extends Component {
    state = {
        name: this.props.name,
        schedule: this.props.schedule,
        timeZone: this.props.timeZone,
    };

    handleName = e => {
        this.setState({ name: e.target.value })
    };
    getTZOptions = () => moment.tz.names().map(tz => <option value={tz}>{tz}</option> )
    render() {
        const { name, schedule, timeZone } = this.state;
        return (
            <li>
                <input onChange={this.handleName} value={name}/>
                <select name="time-zone" id="time-zone-select">
                    {this.getTZOptions()}
                </select>
                <button>Save</button>
                <button>Delete</button>
            </li>
        );
    }
}

ManageStore.defaultProps = {
    id: 'djhkgsldhgvihdvgadshf',
    name: 'Store',
    schedule: {
        mon: [{ from: '10:00', to: '23:00' }],
        tue: [{ from: '10:00', to: '23:00' }],
        wed: [{ from: '09:00', to: '13:30' }, { from: '14:00', to: '22:00' }],
        thu: [{ from: '11:00', to: '23:00' }],
        fri: [{ from: '12:00', to: '23:00' }],
    },
    timeZone: 'Asia/Shanghai',
};

ManageStore.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    schedule: PropTypes.shape({}),
    timeZone: PropTypes.string,
};

export default ManageStore;