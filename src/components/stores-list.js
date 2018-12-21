import React, { Component } from 'react';
import Store from './store';

const stores = [{id: 1}, {id: 2}];

class StoresList extends Component {
    renderStores = () => {
        return stores.map(store => <Store key={store.id}/>)
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