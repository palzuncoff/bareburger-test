import firebase from 'firebase/app'
import 'firebase/database'

class ApiService {
    fb = firebase;

    fetchAllStores = () =>
        this.fb
            .database()
            .ref('stores')
            .once('value')
            .then((res) => res.val());

    addStore = (store) =>
        this.fb
            .database()
            .ref('stores')
            .push(store);

    updateStore = (id, store) =>
        this.fb
            .database()
            .ref(`stores/${id}`)
            .set(store);

    deleteStore = (id) =>
        this.fb
            .database()
            .ref(`stores/${id}`)
            .remove()
}

export default new ApiService()
