// Display form
AppMobile.prototype.createFiltreArticle = function() {
    if(null == document.querySelector('#filtre')){
        var filtre = document.createElement('div');
        filtre.setAttribute('id', '#filtre');
        filtre.innerHTML = '<ul class="filter-container"><li class="list-filter">Restaurant</li><li class="list-filter">Promenade</li><li class="list-filter">Culture</li></ul>';
        this.filtre.appendChild(filtre);
        
    } else{
        document.querySelector('#filtre').remove();
    }
};