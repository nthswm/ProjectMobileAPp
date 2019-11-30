import * as firebase from 'firebase';
import '@firebase/firestore';

const config = {
  apiKey: "AIzaSyD2vP3kMyOpSwqOI1p1oV5PfFBjreFNbmY",
    authDomain: "mobileapp-12bef.firebaseapp.com",
    databaseURL: "https://mobileapp-12bef.firebaseio.com",
    projectId: "mobileapp-12bef",
    storageBucket: "mobileapp-12bef.appspot.com",
    messagingSenderId: "501441169422",
    appId: "1:501441169422:web:7aa1d58092a7ae76f0545f",
    measurementId: "G-L1RMYG5X5L"
}

class Database{

  constructor() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
          console.log("firebase apps initializeApp");
    } else {
        console.log("firebase apps already running...");
    }
  }

  //
  async putBmi(bmi,time,uid,add_Bmi_success,add_Bmi_fail)
  {
    firebase.firestore().collection("Bmi").add({
      bmi:bmi,
      time:time,
      uid:uid,
    }).then(ref=>{add_Bmi_success(ref.id)},add_Bmi_fail);
  }

  async UserSignOut()
  {
    firebase.auth().signOut();
  }

  async readBmi(uid,read_Bmi_success,read_Bmi_fail)
  {
    let getDoc = firebase.firestore().collection("Bmi").where("uid", "==", uid)
    .get()
    .then(
      snapshot => {
        if (snapshot.empty) {
          read_Bmi_fail();
          return;
        }

        snapshot.forEach(doc => {
          console.log(doc.data());
          read_Bmi_success(doc.data());
        })

      }).catch(read_Bmi_fail());
  }

  //
  getAccount=async()=>{
    firebase.firestore().collection('Account').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      }).catch(err => {
        console.log('Error getting documents', err);
      });
  }

  

  async readOnce(id,read_Account_success,read_Account_fail)
  {
    let getDoc = firebase.firestore().collection("Account").doc(id).get().then(doc=>{
      if(doc.exists)
      {
        read_Account_success(doc.data());
      }else {
        read_Account_fail();
      }
    }).catch(read_Account_fail());
  }

  async readAll(id,read_Account_success,read_Account_fail)
  {
    let getDoc = firebase.firestore().collection("Account").where("email", "==", id).get().then(
      snapshot => {
        if (snapshot.empty) {
          read_Account_fail();
          return;
        }
        snapshot.forEach(doc => {
          read_Account_success(doc.data());
        })

      }).catch(read_Account_fail());
  }

  async readListening(read_Account_success,read_Account_fail)
  {
    let getDoc = firebase.firestore().collection("Account").onSnapshot(
      snapshot => {
        if (snapshot.empty) {
          read_Account_fail();
          return;
        }
        snapshot.forEach(doc => {
          read_Account_success(doc.data());
        })

      }).catch(read_Account_fail());
  }

  async deleteAccount(id,delete_Account_success,delete_Account_fail)
  {
    try {
        firebase.firestore().collection('Account').doc(id).delete();
        delete_Account_success();
    } catch (e) {
        delete_Account_fail();
    }
  }
  async changePWD(account,newpass){
    console.log(newpass)
    firebase.auth().currentUser.updatePassword(newpass);
    firebase.firestore().collection('Account').doc(account.uid).update({
        password:newpass
    });
  }
  async updateAccount(account,update_Account_success,update_Account_fail)
  {
    try {            
        firebase.firestore().collection('Account').doc(account.uid).update({
            firstName: account.firstName,
            lastName: account.lastName,
            url:account.uri
          });
        update_Account_success();
    } catch (e) {
        update_Account_fail();
    }
  }

  async createAccount(Account,uid,add_Account_success,add_Account_fail)
  {
    firebase.firestore().collection("Account").doc(uid).set({
      firstName:Account.firstName,
      lastName:Account.lastName,
      email:Account.email,
      password:Account.password,
      uid:uid,
      url:Account.url
    }).then(ref=>{add_Account_success(ref.id)},add_Account_fail);
  }

  async createAccount2(Account,add_Account_success,add_Account_fail)
  {
    firebase.firestore().collection("Account").doc("t1").set(Account).then(ref=>{add_Account_success(ref.id)},add_Account_fail);
  }

///////////
  async addMessage(message,add_Message_success,add_Message_fail)
  {
    firebase.firestore().collection("Message").add(message).then(ref=>{add_Message_success(ref.id)},add_Message_fail);
  }

  async readMessageListening(read_Message_success,read_Message_fail)
  {
    let getDoc = firebase.firestore().collection("Message").orderBy("time").onSnapshot(
      snapshot => {
        if (snapshot.empty) {
          read_Message_fail();
          return;
        }

        snapshot.forEach(doc => {
          read_Message_success(doc.data());
        })

      }).catch(read_Message_fail());
  }

  ///////////////////////////

  async createAut(account,createAut_success,createAut_fail)
  {
    
    firebase.auth().createUserWithEmailAndPassword(account.email, account.password)
    .then(()=>{
      createAut_success();
    })
    .catch(function(error){
      createAut_fail(error);
    });

  }

  login = async(account, success_callback, failed_callback) => {
    await firebase.auth().signInWithEmailAndPassword(account.email,account.password)
    .then(function() {
      success_callback();
    })
    .catch(function (error) {
      failed_callback(error.message);
    })
  }

  async uploadImage(account, uri, success_callback, fail_callback,uploading_callback)
  {
      const response = await fetch(uri);
      const blob = await response.blob();

      var uploadTask = firebase.storage().ref("avatar").child(account.firstName).put(blob);

      uploadTask.on('state_changed' , function(snapshot){

          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          uploading_callback(progress)
      },
      function(error) {
        fail_callback(error.message);
      },
      async() => {
          uploadTask.snapshot.ref.getDownloadURL().then(function(getDownloadURL) {
              success_callback(getDownloadURL)
          });
      });
  }

}

////////////////

const database = new Database();
export default database;
