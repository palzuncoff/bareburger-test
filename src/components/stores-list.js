import React, { Component } from 'react';
import Store from './store';

const stores = [{}, {}];

class StoresList extends Component {
    renderStores = () => {
        return stores.map(store => <Store />)
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