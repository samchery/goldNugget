AppMobile.prototype.loadAutocomplete = function(){

    // variables
    var input = document.querySelector('#search-bar');
    var town = ['paris', 'meaux', 'marseille', 'pau', 'lille', 'anvers'];
    var autocomplete_results = document.querySelector(".results-autocomplete");


    // function
    function autocomplete(val) {
        var town_return = [];
        for (i = 0; i < town.length; i++) {
            if (val === town[i].slice(0, val.length)) {
              town_return.push(town[i]);
            }
        }
        return town_return;
    }

    // events
    input.addEventListener('keyup', function(e){
        input_val = this.value;
        if (input_val.length > 0) {
            var town_to_show = [];
            autocomplete_results = document.querySelector(".results-autocomplete");
            autocomplete_results.innerHTML = '';
            town_to_show = autocomplete(input_val);
            for (i = 0; i < town_to_show.length; i++) {
                autocomplete_results.innerHTML += '<li>' + town_to_show[i] + '</li>';
            }
            autocomplete_results.style.display = 'block';
        } else {
            town_to_show = [];
            autocomplete_results.innerHTML = '';
        }
        checkLi();
    });

    function checkLi(){
        var results = document.querySelectorAll(".results-autocomplete li");
        if (results.length > 0){
            for (let i = 0; i < results.length; i++){
                var current = results[i];
                results[i].addEventListener('click', function(){
                    input_val = this.innerHTML;
                    input.value = input_val;
                    autocomplete_results.style.display = 'none';
                    input.style.fontSize= "20px";
                    input.style.paddingLeft= "10px";
                });

                this.loadArticles('paris'); 
                //1current.addEventListener('click', this.cityRequest.bind(this));
            }
        }
    }
}

AppMobile.prototype.cityRequest = function(){
    console.log('change')
    var city = document.getElementById('search-bar').value;
     
}