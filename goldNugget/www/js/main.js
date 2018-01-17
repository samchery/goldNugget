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
        
        // par default

        this.showMySection();
        
    } else {
        // not connected
        var app = document.getElementById('app');
        app.className = "notConnected";
        app.innerHTML = '<button class="signIn" id="sign-in-google">Connexion avec G+</button><div class="connected-border"></div>';

        document.querySelector('#sign-in-google').addEventListener('click', this.signInGoogle.bind(this));
    }
};

AppMobile.prototype.showMySection = function(){
    var app = document.getElementById('app');
    app.className = "inspire";

    var header = '<header class="container-header"><img class="link-logo" src="img/perle.png" alt="logo">';
    header += '<div id="inspire" class="active">Partager</div><div id="discover">Explorer</div>';
    header += '<button id="sign-out">Déconnexion</button></header>';

    var contentStart = '<div class="discover">';
    var contentForm = '<div class="container-add-article"><div class="onglet-add"><img src="img/bouton.png" alt="bouton image d\'ajout" class="image-add" /><p class="text-add">Ajouter</p></div></div>';
    var contentArticle = '<div class="container-all-articles clearfix"><h2>Révélez vos idées ... de la ville de <span class="choose-city">Paris</span></h2><p class="info-goldn">J\'habite <span class="choose-city">Paris</span>, et je veux faire profiter aux visiteurs le charme de ma ville. Ici, comme d\'autres habitants de <span class="choose-city">Paris</span>, j\’ajoute mes coups de coeur et mes idées découverte pour les partager aux visiteurs curieux !</p><div id="wrap-articles"></div></div>';
    var contentEnd = '</div>';

    app.innerHTML = header + contentStart + contentForm + contentArticle + contentEnd;
    
        // Shortcuts to DOM Elements.
    this.signOutButton = document.querySelector('#sign-out');
    this.createArticleButton = document.querySelector('.container-add-article .onglet-add');
    this.form = document.querySelector('.container-add-article');

    // EventListener
    this.signOutButton.addEventListener('click', this.signOut.bind(this));
    this.createArticleButton.addEventListener('click', this.createFormArticle.bind(this));

    // ACTION CHANGE SECTION
    this.discoverButton = document.getElementById('discover');
    this.discoverButton.addEventListener('click', this.showTouristSection.bind(this));

    // Action
    this.loadArticles('paris'); 
}

AppMobile.prototype.showTouristSection = function(){
    var app = document.getElementById('app');
    app.className = "explore";

    var header = '<header class="container-header"><img class="link-logo" src="img/perle.png" alt="logo">';
    header += '<div id="inspire">Partager</div><div id="discover" class="active">Explorer</div>';
    header += '<button id="sign-out">Déconnexion</button></header>';

    var contentStart = '<div class="explore">';
    var contentFiltre = '<div class="container-filtre"><div class="onglet-filtre"><img src="img/bouton.png" alt="bouton image d\'ajout" class="image-add" /><p class="text-filtre">Filtrer</p></div></div>';
    var contentArticle = '<div class="container-all-articles clearfix"><h2>Vous aussi, profitez des perles de la ville de <span class="choose-city">Paris</span></h2><div id="wrap-infos-explorer">';
    var contentEnd = '<div class="wrapper-info-explorer"><p class="info-goldn-explorer">Je visite</p><input type="text" name="city-name" class="city-name" id="search-bar"><ul class="results-autocomplete"></ul><p class="info-goldn-explorer">,<br>  je veux découvrir ses charmes !</p></div><div id="wrap-articles"></div></div></div></div>';

    app.innerHTML = header + contentStart + contentFiltre + contentEnd;

    // filtre
    this.filtre = document.querySelector('.text-filtre');
    this.filtre.addEventListener('click', this.createFiltreArticle.bind(this));

    this.loadAutocomplete();

    // en dur
    this.loadArticles('marseille'); 

    // ACTION CHANGE SECTION
    this.inspireButton = document.getElementById('inspire');
    this.inspireButton.addEventListener('click', this.showMySection.bind(this));
}


