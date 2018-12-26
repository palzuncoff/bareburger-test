import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import ManageSchedule from './manage-schedule';

class ManageStore extends Component {
    state = {
        name: this.props.name,
        schedule: this.props.schedule,
        timeZone: this.props.timeZone,
    };

    handleName = e => this.setState({ name: e.target.value });
    handleTimeZone = e => this.setState({ timeZone: e.target.value });
    handleTime = (val, day, index, option) => {
        this.setState({
            schedule: {
                ...this.state.schedule,
                [day]: this.state.schedule[day].map((time, i) => {
                    if (i === index) {
                        return {...time, [option]: val}
                    }
                    return time
                })
            }
        })
    };
    handleDay = day => {
        const { schedule } = this.state;
        if (!schedule[day]) {
            this.setState({
                schedule: {
                    ...schedule,
                    [day]: [{ from: '00', to: '23:59'}]
                }
            })
        } else {
            delete schedule[day];
            this.setState({ schedule })
        }
    };

    getTZOptions = () => moment.tz.names().map(tz => <option key={tz} value={tz}>{tz}</option> );

    render() {
        const { name, schedule, timeZone } = this.state;
        return (
            <li style={{ paddingBottom: '20px', borderStyle: 'solid', width: '30%'}}>
                <input onChange={this.handleName} value={name}/>
                <ManageSchedule schedule={schedule} handleTime={this.handleTime} handleDay={this.handleDay}/>
                <select
                    onSelect={this.handleTimeZone}
                    name="time-zone"
                    id="time-zone-select"
                    defaultValue={timeZone}
                >
                    {this.getTZOptions()}
                </select>
                <button>Save</button>
                {this.props.id && <button>Delete</button>}
            </li>
        );
    }
}

ManageStore.defaultProps = {
    id: '',
    name: 'Store',
    schedule: {
        mon: [{ from: '10:00', to: '23:00' }],
        tue: [{ from: '10:00', to: '23:00' }],
        wed: [{ from: '09:00', to: '13:30' }],
        thu: [{ from: '11:00', to: '23:00' }],
        fri: [{ from: '12:00', to: '23:00' }],
    },
    timeZone: 'Europe/Chisinau',
};

ManageStore.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    schedule: PropTypes.shape({}),
    timeZone: PropTypes.string,
};

export default ManageStore;