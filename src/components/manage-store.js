import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import ManageSchedule from './manage-schedule';
import { DEFAULT_TIME } from '../constants';
import { updateStore, removeStore } from '../utils/apiUtils'

const getTZOptions = () => moment.tz.names().map(tz => <option key={tz} value={tz}>{tz}</option> );

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
                    [day]: [DEFAULT_TIME]
                }
            })
        } else {
            delete schedule[day];

            this.setState({ schedule })
        }
    };

    handleNewTime = day => {
        const { schedule } = this.state;

        schedule[day].push(DEFAULT_TIME);

        this.setState({ schedule })
    };

    handleRemoveTime = (day, index) => {
        const { schedule } = this.state;
        const filterDay = this.state.schedule[day].filter((_, i) => i !== index);

        schedule[day] = filterDay;

        if (filterDay.length < 1) delete schedule[day];

        this.setState({ schedule })
    };

    handleDeleteStore = id => removeStore(id).catch(e => console.log(e));

    handleSaveStore = id => updateStore(id, this.state).catch(e => console.log(e));

    render() {
        const { name, schedule, timeZone } = this.state;
        return (
            <li style={{ marginBottom: '20px', padding: '20px', borderStyle: 'solid', width: '630px'}}>
                <input onChange={this.handleName} value={name}/>
                <ManageSchedule
                    schedule={schedule}
                    handleTime={this.handleTime}
                    handleDay={this.handleDay}
                    handleNewTime={this.handleNewTime}
                    handleRemoveTime={this.handleRemoveTime}
                />
                <select
                    onSelect={this.handleTimeZone}
                    name="time-zone"
                    id="time-zone-select"
                    defaultValue={timeZone}
                >
                    {getTZOptions()}
                </select>
                <button onClick={() => this.handleSaveStore(this.props.id)} >Save</button>
                {this.props.id && <button onClick={() => this.handleDeleteStore(this.props.id)}>Delete</button>}
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