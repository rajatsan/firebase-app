import app from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";

const config = require('../../config');


class Firebase {
  constructor() {
    app.initializeApp(config);

    app.auth().useDeviceLanguage();

    app.auth().setPersistence(app.auth.Auth.Persistence.LOCAL)
      .catch(function(error) {
        console.log('error');
      });
      
    this.auth = app.auth();
  }

  getInvitedMembers = () => {
    return app.firestore().collection("approved_users").get().then((querySnapshot) => {
      return querySnapshot.docs;
    });
  }

  signOut = () => {
    this.auth.signOut();
  }

  onAuthStateChanged = callback => {console.log('called'); this.auth.onAuthStateChanged(callback); }

  doCreateUserWithPhoneNumber = (phoneNumber) => {
    console.log('this', phoneNumber)
    window.recaptchaVerifier = new app.auth.RecaptchaVerifier('sign-in', {
      'size': 'invisible',
      'callback': function(response) {
        console.log('recaptcha solved!');
        document.getElementById('code-div').style.display = 'unset'
      }
    });
    
    
    this.auth.signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      console.log('got res', confirmationResult)
      
    }).catch(function (error) {
      // Error; SMS not sent
      // Or, if you haven't stored the widget ID:
      console.log('error', error)
        window.recaptchaVerifier.render().then(function(widgetId) {
          window.grecaptcha.reset(widgetId);
        })

    });

  }

  enterCode = (number, code) => {
    window.confirmationResult.confirm(code).then(function (result) {
      // User signed in successfully.
      var user = result.user;
      console.log('signed in ', result)
      // ...
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log('something wrong enter code', error)
    });
    
  }

  getApprovedUsers = () => {
    app.firestore().collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  }

  addUser = k => {
    app.firestore().collection("users").add({
      first: "Ada",
      last: "Lovelace",
      born: 1815,
      number: k
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  
  }

}

export default Firebase;
