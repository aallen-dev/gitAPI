
var Router = {
    
    route : function(fallback) {
        "use strict";
        var hashArray    = location.hash.substr(1).split('/') ,
            CurrentUser  = Users[hashArray[0]] ,
            selectedRepo = hashArray[1] ,
            showSub = function() {
                // a repo has been selected by logging to the url's second hash argument

                $('#list-' + selectedRepo).show();

                $('#container-' + selectedRepo).css({background:'#dfe'});
            } ,
            showUser = function(){

                CurrentUser.display();

                // a user has been selected by logging to the url's first hash argument
                // go through each repo for this user 
                CurrentUser.getBranches();

                $('.repo_List').hide();

                $('.repo').each(function(i) {
                    i % 2===0 && $(this).addClass('highlighted');
                });
                $('.user').removeClass('selected')
                $('#userButton-' + hashArray[0]).addClass('selected')

            } ,
            showNeeded = function() { // split them into 2 units, just cuz I know how much you like your "unit tests" =P
                        
                showUser();

                selectedRepo && showSub();
                
            };

        if(hashArray[0] && CurrentUser) {

            if(CurrentUser.ready)
                showNeeded();

            else// {console.log('load ' + hashArray[0] + 'when ready')
                CurrentUser.onload(showNeeded);

        }
        if (!CurrentUser) {
            $('#repoList').html('&nbsp;&nbsp;user '+ hashArray[0] + ' not found')
            $('#userInfo').html('')
            return
        }

        typeof fallback == 'string' &&
            (hashArray=[fallback], CurrentUser.onload(showNeeded));

    }

};






