window.onload = app;

// runs when the DOM is loaded
function app(){
    "use strict";

    // load some scripts (uses promises :D)
    loader.load(
        //css
        {url: "./dist/style.css"},
        //js
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/dist/lodash.min.js"},
        {url: "./js/GithubClient.js"} ,
        {url: "./js/router.js"}
        // {url: "./bower_components/backbone/backbone.js"}
    ).then(function(){
        document.querySelector("html").style.opacity = 1;
        // start app?
        // only get the templates once when we load the page.
        $.when($.get('./templates/userInfo.tmpl') , $.get('./templates/userRepo.tmpl'))
            .then(function(p1 , p2){
                
                userTemplate = p1[0] ,
                repoTemplate = p2[0];
                // now create our objects
                ["aallen-dev","Jrharper0592","cjros","pmarsh41","bmagnantb","firehawk09","dorshinho","arbolkiri","kawill","maprules1000"]
                
                .forEach(function(name){
                    $('<a href="#' + name + '" >' + name + '</a>')
                        .appendTo('.users')
                        .attr({'name':name , class:'user' , id:'userButton-' + name});
                });

                $('.user').each(function(){
                    Users[this.name] = new User(this)
                    Users[this.name].init();
                });
                
                // load default if nothing is in the hash
                if(!location.hash.substr(1).split('/')[0])
                    Users['aallen-dev'].onload(function() {
                        this.display();
                    });

                addEventListener('hashchange' , Router.route )
                Router.route()

            });
    });

};










