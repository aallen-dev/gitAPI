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
        {url: "./js/GithubClient.js"}
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
                $('.user').each(function(){

                    Users[this.name] = new User(this)
                    Users[this.name].init();
                });
// alert(2)
                // Users['aallen-dev'].display()//} , 1000)

            });


    });

};

// branch test
















                        // repoList.forEach(function(repo , i) {    // cash my list for later.
                            
                        //     var repo = $('<div>' + repo.name + '</div>').appendTo('#repoList').attr('class','repo');
                            
                        //     i % 2===0 && repo.css({background:'#fff'});
                        // });

                    // $('<img>')
                    //     .appendTo(userContainer)
                    //     .attr({src: userInfo.avatar_url , 'class':'avatar'})
                    //     // .css({width:'100px'});      // this wasn't working in the css...

                    // userContainer.append('<div>' + userInfo.login + '</div>')
                    //              .append('<hr>')
                    //              .append('joined ' + formatTime(userInfo.created_at , 'mmddyy'))