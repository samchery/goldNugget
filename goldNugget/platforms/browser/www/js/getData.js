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