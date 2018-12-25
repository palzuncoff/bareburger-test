import firebase from 'firebase/app'
import 'firebase/database'

class ApiService {
    fb = firebase

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

    updateStore = (storeId, store) =>
        this.fb
            .database()
            .ref('stores/' + storeId)
            .set(store);
}

export default new ApiService()
