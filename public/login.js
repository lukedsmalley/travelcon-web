
firebase.initializeApp({
  apiKey: "AIzaSyBnhD0aEcyrYihvzkfdvD9eSQUBRaT83sE",
  authDomain: "doorstuck-5f216.firebaseapp.com",
  databaseURL: "https://doorstuck-5f216.firebaseio.com",
  projectId: "doorstuck-5f216",
  storageBucket: "doorstuck-5f216.appspot.com",
  messagingSenderId: "58993520234"
})

let ui = new firebaseui.auth.AuthUI(firebase.auth())
ui.start('.firebaseui-auth-container', {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      if (firebase.auth().currentUser) {
        localStorage.setItem('travelcon_uid', firebase.auth().currentUser.uid)
        window.location.href = './dashboard.html'
      }
    }
  },
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  tosUrl: './terms.html',
  privacyPolicyUrl: './terms.html'
})