import firebase from 'firebase/app';
import firebaseAuth from 'firebase/auth';
import firebaseDatabase from 'firebase/database';

export function initDb (config) {
    firebase.initializeApp(config);
}

export function getDb() {
    return firebase.database();
}
