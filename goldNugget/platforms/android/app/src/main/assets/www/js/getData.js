AppMobile.prototype.loadArticles = function(city) {
    console.log(city);
    this.articlesRef = this.database.ref('articles').orderByChild("ville").equalTo(city); // recup données de BDD
    // Make sure we remove all previous listeners.
    this.articlesRef.off(); //remove previous listener

    // Loads the last 12 articles
    var setArticle = function(data) { // dans articlesRef
        var val = data.val();
        this.displayArticle(data.key, val.title, val.description, val.address, val.category, val.img);
    }.bind(this);

    this.articlesRef.limitToLast(12).on('child_added', setArticle); // tant que pas 12, on rajoute dans setArticle
    this.articlesRef.limitToLast(12).on('child_changed', setArticle);
};


AppMobile.prototype.loadArticlesByCat = function(city, category) {
    this.articlesRef = this.database.ref('articles').orderByChild("ville").equalTo(city); // recup données de BDD
    // Make sure we remove all previous listeners.
    this.articlesRef.off(); //remove previous listener

    // Loads the last 12 articles
    var setArticle = function(data) { // dans articlesRef
        var val = data.val();
        console.log(val.category);
        if(val.category == category){
            console.log('oui');
            this.displayArticle(data.key, val.title, val.description, val.address, val.category, val.img);
        }
    }.bind(this);   

    this.articlesRef.limitToLast(12).on('child_added', setArticle); // tant que pas 12, on rajoute dans setArticle
    this.articlesRef.limitToLast(12).on('child_changed', setArticle);
};


// Display an Article in the UI.
AppMobile.prototype.displayArticle = function(key, title, description, address, category, img) {
    var div = document.getElementById(key);

    // If an element for that article does not exists yet we create it.
    if (!div) {
        var container = document.createElement('div');
        container.className = "wrap-articles clearfix";
        container.innerHTML = '<div class="article-detail"><h3>' + title + '</h3><p class="info-city">' + description + '</p><div class="container-address"><p class="street-address">' + address + '</p></div></div>';
        container.innerHTML += '<div class="article-detail"><div class="img-article-detail"><img id="img_' +  key + '" src="" /></div><div class="container-advice"><div class="approve"><p>J\'approuve</p></div><div class="dislike"><img src="img/dislike.svg" alt="dislike image"></div></div>';
        container.setAttribute('id', key);

        var articleList = document.getElementById('wrap-articles');
        articleList.appendChild(container);

        firebase.storage().ref(img).getDownloadURL().then(function(url) {
          var img = document.getElementById('img_' + key);
          img.src = url;
        });
    }

    this.favoriteArticle();
};

// Display form
AppMobile.prototype.createFormArticle = function() {
    if(null == document.querySelector('.container-add-article form')){
        var form = document.createElement('form');
        form.className = 'add-article';
        form.innerHTML = '<label class="label-form">Le nom de votre perle</label>';
        form.innerHTML += '<input required="required" type="text" value="" class="title-input-add input-form"/>';
        form.innerHTML += '<label class="label-form">Décrivez votre perle</label>';
        form.innerHTML += '<textarea required="required" class="form-content" rows="3"></textarea>';
        form.innerHTML += '<label class="label-form">L\'adresse de votre perle</label>';
        form.innerHTML += '<input required="required" type="text" class="form-adress input-form" value=""/>';
        form.innerHTML += '<input required="required" id="img" type="file" class="form-image"/>';
        form.innerHTML += '<label class="label-form">Sélectionner une catégorie</label>';
        form.innerHTML += '<select required="required" class="select-form"><option value="Culture">Culture</option><option value="Prommenade">Prommenade</option><option value="Restaurant">Restaurant</option></select>';
        form.innerHTML += '<button type="button" class="form-button button-add-article"/>OK</button>';
        this.form.appendChild(form);
        this.addArticleButton = document.querySelector('.container-add-article .form-button');
        this.addArticleButton.addEventListener('click', this.addArticle.bind(this));
    } else{
        document.querySelector('.container-add-article form').remove();
    }
};


// Get created article in data
AppMobile.prototype.addArticle = function() {
   
    var title = document.querySelector('.title-input-add').value;
    var content = document.querySelector('.form-content').value;
    var address = document.querySelector('.form-adress').value;
    var select = document.querySelector('.select-form').value;
    var selectedFile = document.getElementById('img').files[0];

    var storageRef = firebase.storage().ref(selectedFile.name);
    storageRef.put(selectedFile).then(function(snapshot) {
        if (title != "" && content !="" && address !=""){
            var newArticleId = firebase.database().ref().child('articles').push().key;
            firebase.database().ref('articles/' + newArticleId).set({
                title: title,
                description: content,
                address : address,
                img: selectedFile.name,
                category: select
            });
        }
    });
};
