import api from './api';

export function fetchStores() {
    return api.fetchAllStores()
}

export function removeStore(id) {
    return api.deleteStore(id)
}

export function updateStore(id, store) {
    if (id) return api.updateStore(id, store);
    return api.addStore(store)
}