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
        console.log(user);
        // change CSS btn
        this.signOutButton.removeAttribute('hidden');
        this.signInGoogleButton.setAttribute('hidden', 'true');

        // Action
        this.loadArticles();

    } else {
        console.log("log out");
        this.signOutButton.setAttribute('hidden', 'true');
        this.signInGoogleButton.removeAttribute('hidden');
    }
};

// Sign in Firebase using popup auth and Google as the identity provider.
AppMobile.prototype.signInGoogle = function() {
    console.log('log in');
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
};

// Sign out of Firebase.
AppMobile.prototype.signOut = function() {
    console.log('log out');
    this.auth.signOut();
};

AppMobile.prototype.loadArticles = function() {
    console.log('article');
    this.articlesRef = this.database.ref('articles');
    // Make sure we remove all previous listeners.
    this.articlesRef.off();

    // Loads the last 12 articles
    var setArticle = function(data) {
        var val = data.val();
        this.displayArticle(data.key, val.title, val.description, val.address, val.category);
    }.bind(this);

    this.articlesRef.limitToLast(12).on('child_added', setArticle);
    this.articlesRef.limitToLast(12).on('child_changed', setArticle);
};

// Displays a Article in the UI.
AppMobile.prototype.displayArticle = function(key, title, description, address, category) {
    var div = document.getElementById(key);

    // If an element for that article does not exists yet we create it.
    if (!div) {
      var container = document.createElement('div');
      container.innerHTML = '<p class="message-container"><h3>' + title + '</h3>';
      container.innerHTML += '<h4>' + address + '</h4><span>' + category + '</span><p>' + description + '</p>';
      container.setAttribute('id', key);
      console.log(container);
      this.articleList.appendChild(container);
    }
};

window.onload = function() {
    window.appMobile = new AppMobile();
  };
