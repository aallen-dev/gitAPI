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
        {url: "./bower_components/lodash/dist/lodash.min.js"}
        // {url: "./bower_components/backbone/backbone.js"}
    ).then(function(){
        document.querySelector("html").style.opacity = 1;
        // start app?
        var getPath = function(obj) {
            var gitAPIs = {
                "current_user_url": "https://api.github.com/user",
                "current_user_authorizations_html_url": "https://github.com/settings/connections/applications/" + obj.client_id,
                "authorizations_url": "https://api.github.com/authorizations",
                "code_search_url": "https://api.github.com/search/code?q={query}{&page,per_page,sort,order}",
                "emails_url": "https://api.github.com/user/emails",
                "emojis_url": "https://api.github.com/emojis",
                "events_url": "https://api.github.com/events",
                "feeds_url": "https://api.github.com/feeds",
                "following_url": "https://api.github.com/user/following/" + obj.target,
                "gists_url": "https://api.github.com/gists/" + obj.gist_id,
                "hub_url": "https://api.github.com/hub",
                "issue_search_url": "https://api.github.com/search/issues?q={query}{&page,per_page,sort,order}",
                "issues_url": "https://api.github.com/issues",
                "keys_url": "https://api.github.com/user/keys",
                "notifications_url": "https://api.github.com/notifications",
                "organization_repositories_url": "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}",
                "organization_url": "https://api.github.com/orgs/{org}",
                "public_gists_url": "https://api.github.com/gists/public",
                "rate_limit_url": "https://api.github.com/rate_limit",
                "repository_url": "https://api.github.com/repos/" + obj.owner + "/" + obj.repo ,
                "repository_search_url": "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}",
                "current_user_repositories_url": "https://api.github.com/user/repos{?type,page,per_page,sort}",
                "starred_url": "https://api.github.com/user/starred/" + obj.owner + "/" + obj.repo ,
                "starred_gists_url": "https://api.github.com/gists/starred",
                "team_url": "https://api.github.com/teams",
                "user_url": "https://api.github.com/users/" + obj.user ,
                "user_organizations_url": "https://api.github.com/user/orgs",
                "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
                "user_search_url": "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}"
            };

            return gitAPIs[obj.url]
        };
        var template = [
             '<img class="avatar" src="<%= avatar_url %>">' ,
             '<div class="name"> <%= login %> </div>' ,
             '<hr>' ,
             '<div> joined: <%= created_at %> </div>' ,
        ].join('');
        var repoTemplate = '<div class="repo"> <%=name%> </div>';

        var getUser =  function(userName) {            

            var userURL = getPath({url:'user_url' , user:userName}) ,
                formatTime = function(date , formatter){

                    // I'm not going to do a parseing... but here is a few use cases
                    var date = new Date(date) ,
                        format = {
                            'hhmmss' : [date.getHours(), date.getMinutes(), date.getSeconds()].join(':') ,
                            'mmddyy' : [date.getMonth()+1 , date.getDate() , date.getFullYear()].join('/')
                        };

                    return format[formatter];
                };

            $.getJSON(userURL ).then(function(userInfo) {
                $.getJSON(userInfo.repos_url).then(function(repoList) {
                    
                    // reformat date
                    userInfo.created_at = formatTime(userInfo.created_at , 'mmddyy');
                    
                    $('#userInfo').html( _.template(template , userInfo) );
                        
                    $('#repoList').html('Users Repositories' + repoList.map(function(repo) {
                        return _.template(repoTemplate , repo);
                    }).join(''));

                    $('.repo').each(function(i) {
                        i % 2===0 && $(this).css({background:'#fff'});
                    });

                });
            });

        };

        $('.user').click(function(){

            getUser(this.name)
        });

    });

};


















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