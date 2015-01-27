
                var Router = {
                    
                    route : function(fallback) {

                        var hashArray = location.hash.substr(1).split('/');

                        var showSub = function() {console.log('hi')

                            Users[hashArray[0]].getBranches(hashArray[1])

                            $('#container-' + hashArray[1]).css({background:'#dfe'});
                        }
                        var showUser = function(){
                            Users[hashArray[0]].display();

                            $('.repo').each(function(i) {
                                i % 2===0 && $(this).css({background:'#fff'});
                            });
                            $('.user').css({
                                background:'#adf' ,
                                'box-shadow': '3px 3px 5px #bef' ,
                                border:'1px solid #9ce'
                            });
                            $('#userButton-' + hashArray[0]).css({
                                background:'#dfe',
                                'box-shadow': '2px 2px 5px #cfd' ,
                                border:'1px solid #9ce'
                            });

                        }
                        var showNeeded = function() { // split them into 2 units, just cuz I know how much you like your "unit tests" =P
                                    
                            showUser();

                            hashArray[1] && showSub();
                            
                        }

                        if(hashArray[0] && Users[hashArray[0]]) {

                            if(Users[hashArray[0]].ready){
                                showNeeded();
                            }

                            else {console.log('load ' + hashArray[0] + 'when ready')
                                Users[hashArray[0]].onload(showNeeded);
                            }
                        }

                        typeof fallback == 'string' &&
                            (hashArray=[fallback], Users[hashArray[0]].onload(showNeeded));

                    }

                };