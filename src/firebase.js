import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

  let firebaseConfig = {
    apiKey: "AIzaSyAd5WzjAqFysVhmZ_q0YV-F5HqgSBuP3bk",
    authDomain: "blog-lunaticos.firebaseapp.com",
    databaseURL: "https://blog-lunaticos.firebaseio.com",
    projectId: "blog-lunaticos",
    storageBucket: "blog-lunaticos.appspot.com",
    messagingSenderId: "132135957734",
    appId: "1:132135957734:web:178dacf4c282e3298e7727",
    measurementId: "G-RM8Z5GRSNT"
    };
  

class Firebase {

  constructor() {
    // Initialize Firebase
    app.initializeApp(firebaseConfig);

    // Referenciando a database para acessar em outros locais
    this.app = app.database();

    this.storage = app.storage();
  }

  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  logout() {
    return app.auth().signOut();
  }

  async register(nome, email, password) {
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    })
  }

  isInitialized() {
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve);
    })
  }

  getCurrent() {
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid() {
    return app.auth().currentUser && app.auth().currentUser.uid;
  }

  async getUserName(callback) {
    if(!app.auth().currentUser) {
      return null;
    }

    const uid = app.auth().currentUser.uid;

    await app.database().ref('usuarios').child(uid)
    .once('value').then(callback);
  
  }


}

export default new Firebase;