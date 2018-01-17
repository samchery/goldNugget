AppMobile.prototype.loadArticles = function() {
    this.articlesRef = this.database.ref('articles'); // recup données de BDD
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

// Display an Article in the UI.
AppMobile.prototype.displayArticle = function(key, title, description, address, category, img) {
    var div = document.getElementById(key);

    // If an element for that article does not exists yet we create it.
    if (!div) {
        var container = document.createElement('div');
        container.className = "wrap-articles clearfix";
        container.innerHTML = '<div class="article-detail"><h3>' + title + '</h3><p class="info-city">' + description + '</p><div class="container-address"><p class="street-address">' + address + '</p></div></div>';
        container.innerHTML += '<div class="article-detail"><div class="img-article-detail"><img id="img_' +  key + '" src="" /></div><div class="container-advice"><div class="approve"><p>J\'approuve</p></div><div class="dislike"><img src="img/dislike.svg" alt="dislike image"></div></div></div>';

        container.setAttribute('id', key);
        this.articleList.appendChild(container);

        firebase.storage().ref(img).getDownloadURL().then(function(url) {
          var img = document.getElementById('img_' + key);
          img.src = url;
        });
    }
};

// Display form
AppMobile.prototype.createArticle = function() {
      var form = document.createElement('form');
      form.innerHTML = '<label class=""> Le nom de votre perle</label>';
      form.innerHTML += '<input type="text" name="title" value="" class="form-title"/>';
      form.innerHTML += '<label class=""> Décrivez votre perle</label>';
      form.innerHTML += '<textarea class="form-content" name="describe" rows="8" cols="80"></textarea>';
      form.innerHTML += '<label class=""> L\'adresse de votre perle</label>';
      form.innerHTML += '<input type="text" name="adress" class="form-adress" value=""/>';
      form.innerHTML += '<input id="img" type="file" class="form-image"/>';
      form.innerHTML += '<button type="button" name="button" class="form-button"/>OK</button>';

      this.form.appendChild(form);
      this.addArticleButton = document.querySelector('#form .form-button');
      this.addArticleButton.addEventListener('click', this.addArticle.bind(this));
};

//
AppMobile.prototype.upload = function(){

    console.log(selectedFile);



}

// Get created article in data
AppMobile.prototype.addArticle = function() {
    if(form){
        console.log('y a')
        var title = document.querySelector('.form-title').value;
        var content = document.querySelector('.form-content').value;
        var address = document.querySelector('.form-adress').value;
        var selectedFile = document.getElementById('img').files[0];

        if('undefined' != selectedFile){
            var storageRef = firebase.storage().ref(selectedFile.name);
            storageRef.put(selectedFile).then(function(snapshot) {
                if (title != "" && content !="" && address !=""){
                    var newArticleId = firebase.database().ref().child('articles').push().key;
                    firebase.database().ref('articles/' + newArticleId).set({
                        title: title,
                        description: content,
                        address : address,
                        img: selectedFile.name
                    });
                }
            });
        }


    }
};
