// Display form
AppMobile.prototype.createFiltreArticle = function() {
    if(null == document.querySelector('#filtre')){
        var filtre = document.createElement('div');
        filtre.setAttribute('id', '#filtre');
        filtre.innerHTML = 'ici ul li ce que tu veux';
        this.filtre.appendChild(filtre);
        
    } else{
        document.querySelector('#filtre').remove();
    }
};