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
        "user_repositories_url": "https://api.github.com/users/"+ obj.user +"/repos",//{?type,page,per_page,sort}",
        "user_search_url": "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}"
    };

    return gitAPIs[obj.url]
};

var userTemplate ,
    repoTemplate ,
    Users = {} ,
    formatTime = function(date , formatter) {

        // I'm not going to do a parseing... but here is a few use cases
        var date = new Date(date) ,
            format = {
                'hhmmss' : [date.getHours(), date.getMinutes(), date.getSeconds()].join(':') ,
                'mmddyy' : [date.getMonth()+1 , date.getDate() , date.getFullYear()].join('/')
            };

        return format[formatter];
    };

var User =  function(user) {            
    this.token = '?access_token=da91b62f9b9ec436a94c07fdfe8059532315d356'
    this.templates = [userTemplate , repoTemplate] ,
    // get paths for user data from git API
    this.userURL   = getPath({url:'user_url' , user:user.name}) + this.token ,
    this.repoURL   = getPath({url:'user_repositories_url' , user:user.name}) + this.token ,
    // prevent certain funcionality until data is loaded
    this.ready     = false,
    this.user      = user;


};
{
    // https://api.github.com/repos/aallen-dev/gitAPI/branches

    User.prototype.onload = function(callback){
        this.onloadEvent = callback
    }

    User.prototype.getUserInfo = function() {
        if(this.ready)
        return this.info;//$.get("http://api.github.com/users/"+this.username+"?access_token="+this.token)
    };

    User.prototype.getReposInfo = function() {
        if(this.ready)
        return this.repos;//$.get("http://api.github.com/users/"+this.username+"/repos?access_token="+this.token)
    };

    User.prototype.getTemplate1 = function() {
        if(this.ready)
        return this.templates[0];//$.get("./templates/1.html")
    };

    User.prototype.getTemplate2 = function() {
        if(this.ready)
        return this.templates[1];//$.get("./templates/2.html")
    };

    User.prototype.getAllData = function(){
        if(this.ready)
        return [this.info , this.repos].concat(this.templates)//$.when(this.getUserInfo(), this.getReposInfo(), this.getTemplate1(), this.getTemplate2())
    };
    User.prototype.getBranches = function(routedRepo) {

        var self = this

        this.repos.forEach(function(repo){

            var pullBranches = function(branches) {

                var buildBranchList = [];

                branches.forEach(function(branch) {

                    buildBranchList.push([
                        '<div><a' ,
                          ' href="https://github.com/' , repo.full_name , '/tree/' , branch.name ,'"',
                          ' class="branchLink">' ,
                           ' - ' + branch.name ,
                        '</a></div>'
                    ].join(''));
                })

                buildBranchList.join('')=='' &&
                    ($('#container-' + repo.name).css({backgroundColor:'#a00' , color:'#fff'}) ,
                     $('#branches-'   + repo.name).html('no branches pushed'));

                $('#list-' + repo.name).html(buildBranchList.join(''));
            };

            // branch listings won't be pulled until the branch tree is uncollapsed
            var isPulled = false;
            $('#expandRepo-' + repo.name).click(function(){
            // $('#branches-' + repo.name +' .openBranches').click(function(){
                
                $('.repo_List').hide();
                $('#list-' + repo.name).show();

                if (isPulled)   // cache branch data
                    return;

                isPulled = true;

                $.get(repo.branches_url.replace(/{.*}/,'')+self.token)
                    .then(pullBranches);
                    
            });

            if (routedRepo) // called from router
                $('#expandRepo-' + routedRepo).click()

        });
    };
    User.prototype.init = function(){
        
        var self       = this;
        
        // pull user data
        $.when($.getJSON(this.userURL) , $.getJSON(this.repoURL)).then(function(p1 ,p2) {

            self.info   = p1[0];
            self.repos  = p2[0];
            self.ready  = true;
            self.avatar = self.info.avatar_url;
        
            // reformat date
            self.info.created_at = formatTime(self.info.created_at , 'mmddyy');

            $(self.user)
                .css({display:'inline-block'})
               // .click(function(){self.display()})  // this was moved to the router...
            if(self.onloadEvent && typeof self.onloadEvent == 'function')
            self.onloadEvent();

        });
    };
    
}
User.prototype.display = function(){
// alert()
    var self = this;
    if(this.ready){

        $('#userInfo').html( _.template(userTemplate , this.info) );

        $('.avatar').attr('src' , this.avatar);

        $('#repoList').html('&nbsp;&nbsp;Users Repositories  <small>select title to view branches</small>' + this.repos.map(function(repo) {
            repo.gh_pages_url = 'http://' + self.info.login + '.github.io/' + repo.name + '/'
            return _.template(repoTemplate , repo);
        }).join(''));

        // this.getBranches();  // this was moved to the router...

        // $('.repo').each(function(i) {  // this was moved to the router...
        //     i % 2===0 && $(this).css({background:'#fff'});
        // });
    }
    else console.log('not ready')
};



// http://localhost:3000/this.avatar
