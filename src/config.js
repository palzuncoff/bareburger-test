import firebase from 'firebase/app';

export const appName = 'goparrot-a0fa4';

export const firebaseConfig = {
    apiKey: 'AIzaSyD6IoVgfmIaKNfV_BUq-pQFBV8AW0sJKgw',
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: '796223806995'
};

firebase.initializeApp(firebaseConfig);
