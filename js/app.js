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
        
        // only get the templates once when we load the page.
        $.when($.get('./templates/userInfo.tmpl') ,
               $.get('./templates/userRepo.tmpl') ,
               $.get('./templates/branches.tmpl'))
            .then(function(p1 , p2 ,p3) {
                
                // now create our objects
                ["aallen-dev","Jrharper0592","cjros","pmarsh41","bmagnantb","firehawk09","dorshinho","arbolkiri","kawill","maprules1000",'matthiasak','TIY-Houston-Front-End-Engineering']
                    .forEach(function(name) {

                        Users[name] = new User(name);

                        Users[name].addTemplate(p1[0])
                                   .addTemplate(p2[0])
                                   .addTemplate(p3[0])
                                   .init();
                    });

                // load default if nothing is in the hash
                if(!location.hash.substr(1).split('/')[0] || !Users[location.hash.substr(1).split('/')[0]])
                    Router.route('aallen-dev');

                addEventListener('hashchange' , Router.route );
                Router.route();

            });
    });

};










