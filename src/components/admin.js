import React, { Component } from 'react';
import { DAYS } from '../constants';

const hours = Array(24).fill(null).map((_, i) => i < 10 ? `0${1}` : `${i}`);
const minutes = Array(60).fill(null).map((_, i) => i < 10 ? `0${1}` : `${i}`);

class Admin extends Component {
    state = {
        name: '',
        schedule: {}
    };
    handleName = e => {
        this.setState({ name: e.target.value })
    }
    render() {
        return (
            <div>
                <input type="text" value={this.state.name} onChange={this.handleName}/>
                <ul>
                    {DAYS.map(day => (
                        <li key={day}>
                            <span>{day}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Admin;