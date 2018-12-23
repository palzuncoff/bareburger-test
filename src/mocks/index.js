import stores from './stores';
import firebase from 'firebase';

export function saveStoresToFB() {
    const storesRef = firebase.database().ref('/stores');
    stores.forEach((store) => storesRef.push(store));
}

window.saveStoresToFB = saveStoresToFB;
