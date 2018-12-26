import React, { Component } from 'react';
import Store from './store';
import { fetchStores } from "../utils/apiUtils";

class StoresList extends Component {
    state = {
        stores: [],
        error: null,
    }
    componentDidMount() {
        return fetchStores()
            .catch(e => this.setState({ error: e }))
            .then(res => {
                const resArray = Object.entries(res)
                return this.setState({ stores: resArray })
            })
    }
    renderStores = () => {
        return this.state.stores.map(store => <Store
            key={store[0]}
            name={store[1].name}
            schedule={store[1].schedule}
            timeZone={store[1].timeZone}
            />
        )
    };
    render() {
        return (
            <ul>
                {this.renderStores()}
            </ul>
        );
    }
}

export default StoresList;