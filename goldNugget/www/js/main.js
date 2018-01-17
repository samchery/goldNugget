function AppMobile() {
    this.initFirebase();
}

window.onload = function() {
    window.appMobile = new AppMobile();
};

// Sets up shortcuts to Firebase features and initiate firebase auth.
AppMobile.prototype.initFirebase = function() {     // syntaxe méthode
    // Shortcuts to Firebase SDK features.
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();

    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Sign in Firebase using popup auth and Google as the identity provider.
AppMobile.prototype.signInGoogle = function() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(function() {
        return firebase.auth().getRedirectResult();
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
};

// Sign out of Firebase.
AppMobile.prototype.signOut = function() {
    this.auth.signOut();
};

// Triggers when the auth state change
AppMobile.prototype.onAuthStateChanged = function(user) {
    if (user) {
        var app = document.getElementById('app');
        app.className = "inspire";
 
        var header = '<header class="container-header">HEADER<button hidden id="sign-out">Sign-out</button></header>';

        var contentStart = '<div class="discover">';
        var contentForm = '<div class="container-add-article"><div class="onglet-add"><img src="img/bouton.png" alt="bouton image d\'ajout" class="image-add" /><p class="text-add">Ajouter</p></div></div>';
        var contentArticle = '<div class="container-all-articles clearfix"><h2>Révélez vos idées ... de la ville de <span class="choose-city">Tokyo</span></h2><div id="wrap-articles"></div></div>';
        var contentEnd = '</div>';

        app.innerHTML = header + contentStart + contentForm + contentArticle + contentEnd;
        
         // Shortcuts to DOM Elements.
        this.articleList = document.getElementById('wrap-articles');
        this.signOutButton = document.querySelector('#sign-out');
        this.createArticleButton = document.querySelector('.container-add-article .onglet-add');
        this.form = document.querySelector('.container-add-article');

        // EventListener
        this.signOutButton.addEventListener('click', this.signOut.bind(this));
        this.createArticleButton.addEventListener('click', this.createFormArticle.bind(this));

        // Action
        this.loadArticles(); // cf getData.js
        
    } else {
        // not connected
        var app = document.getElementById('app');
        app.className = "notConnected";
        app.innerHTML = '<button class="signIn" id="sign-in-google">Connexion avec G+</button><div class="connected-border"></div>';

        document.querySelector('#sign-in-google').addEventListener('click', this.signInGoogle.bind(this));
    }
};

