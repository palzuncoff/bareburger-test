import React, { Component } from 'react';
import { DAYS } from '../constants';
import api from "../utils/api";
import ManageStore from './manage-store';
import Store from "./stores-list";

const hours = Array(24).fill(null).map((_, i) => i < 10 ? `0${1}` : `${i}`);
const minutes = Array(60).fill(null).map((_, i) => i < 10 ? `0${1}` : `${i}`);

class Admin extends Component {
    state = {
        stores: [],
        error: null,
    }
    componentDidMount() {
        return api.fetchAllStores()
            .catch(e => this.setState({ error: e }))
            .then(res => {
                const resArray = Object.entries(res)
                return this.setState({ stores: resArray })
            })
    }

    renderStoreList = () => {
        return this.state.stores.map(store => <ManageStore
            key={store[0]}
            id={store[0]}
            name={store[1].name}
            schedule={store[1].schedule}
            timeZone={store[1].timeZone}
        />)
    }
    render() {
        return (
            <div>
                <ManageStore />
                <ul>
                    {this.renderStoreList()}
                </ul>
            </div>
        )
    }
}

export default Admin;