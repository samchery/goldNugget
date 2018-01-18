// Display form
AppMobile.prototype.createFiltreArticle = function() {
    console.log('click');
    if(null == document.querySelector('#filtre')){
        var filtre = document.createElement('div');
        filtre.setAttribute('id', 'filtre');
        filtre.innerHTML = '<ul class="filter-container"><li id="Tout" class="list-filter">Toutes les perles</li><li id="Restaurant" class="list-filter">Restaurant</li><li id="Promenade" class="list-filter">Promenade</li><li id="Culture" class="list-filter">Culture</li></ul>';
        
        var filtrediv = document.querySelector('.container-filtre');
        filtrediv.appendChild(filtre);
        
        // listener on filtre
        document.getElementById('Tout').addEventListener('click', this.showAll.bind(this));
        document.getElementById('Restaurant').addEventListener('click', this.showRestaurant.bind(this));
        document.getElementById('Promenade').addEventListener('click', this.showPromenade.bind(this));
        document.getElementById('Culture').addEventListener('click', this.showCulture.bind(this));

        document.querySelector('.text-filtre').innerHTML = 'Fermer';
    } else{
        document.querySelector('#filtre').remove();
        document.querySelector('.text-filtre').innerHTML = 'Filtrer';
    }
};

AppMobile.prototype.showRestaurant = function() {
    var articleList = document.getElementById('wrap-articles');
    articleList.innerHTML = '';
    this.loadArticlesByCat('marseille', 'Restaurant'); 
};

AppMobile.prototype.showPromenade = function() {
    var articleList = document.getElementById('wrap-articles');
    articleList.innerHTML = '';
    this.loadArticlesByCat('marseille', 'Promenade'); 
};

AppMobile.prototype.showCulture = function() {
    var articleList = document.getElementById('wrap-articles');
    articleList.innerHTML = '';
    this.loadArticlesByCat('marseille', 'Culture'); 
};

AppMobile.prototype.showAll = function() {
    var articleList = document.getElementById('wrap-articles');
    articleList.innerHTML = '';
    this.loadArticles('marseille'); 
};