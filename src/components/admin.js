import React, { Component } from 'react';
import api from "../utils/api";
import ManageStore from './manage-store';

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
                <h1>Add New Store</h1>
                <ManageStore />
                <h1>Stores List</h1>
                <ul>
                    {this.renderStoreList()}
                </ul>
            </div>
        )
    }
}

export default Admin;