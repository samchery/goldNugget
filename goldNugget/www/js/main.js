function AppMobile() {
    // Shortcuts to DOM Elements.
    this.articleList = document.getElementById('wrap-article');
    this.signInGoogleButton = document.querySelector('#sign-in-google');
    this.signOutButton = document.querySelector('#sign-out');

    // EventListener
    this.signOutButton.addEventListener('click', this.signOut.bind(this));
    this.signInGoogleButton.addEventListener('click', this.signInGoogle.bind(this));

    this.initFirebase();
  }

// Sets up shortcuts to Firebase features and initiate firebase auth.
AppMobile.prototype.initFirebase = function() {
    // Shortcuts to Firebase SDK features.
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();

    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Triggers when the auth state change
AppMobile.prototype.onAuthStateChanged = function(user) {
    if (user) {
        document.getElementById('message').html = user;
        console.log(user);
        // change CSS btn
        this.signOutButton.removeAttribute('hidden');
        this.signInGoogleButton.setAttribute('hidden', 'true');

        // Action
        this.loadArticles();
  
    } else {
        document.getElementById('message').html = "log out";
        console.log("log out");
        this.signOutButton.setAttribute('hidden', 'true');
        this.signInGoogleButton.removeAttribute('hidden');
    }
};

// Sign in Firebase using popup auth and Google as the identity provider.
AppMobile.prototype.signInGoogle = function() {
    console.log('log in');
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(function() {
        return firebase.auth().getRedirectResult();
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    //this.auth.signInWithPopup(provider);
};

// Sign out of Firebase.
AppMobile.prototype.signOut = function() {
    console.log('log out');
    this.auth.signOut();
};

window.onload = function() {
    window.appMobile = new AppMobile();
  };