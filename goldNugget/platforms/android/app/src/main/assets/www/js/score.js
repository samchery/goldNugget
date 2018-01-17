AppMobile.prototype.favoriteArticle = function(){
    var approve = document.querySelectorAll('.approve');
    var dislike = document.querySelectorAll('.dislike');
    for (let i = 0; i < approve.length; i++){
        approve[i].addEventListener('click', function(){
            this.classList.add("is-selected");
            this.innerHTML= "voté";
            dislike[i].style.display = "none";
        })
    }
    for (let j = 0; j < dislike.length; j++){
        dislike[j].addEventListener('click', function(){
            this.classList.add("is-selected");
            this.innerHTML= "voté";
            approve[j].style.display = "none";
        })
    }
}