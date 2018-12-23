import firebase from 'firebase';

export const appName = 'goparrot-a0fa4';

const firebaseConfig = {
    apiKey: 'AIzaSyD6IoVgfmIaKNfV_BUq-pQFBV8AW0sJKgw',
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: '796223806995'
};

firebase.initializeApp(firebaseConfig);
