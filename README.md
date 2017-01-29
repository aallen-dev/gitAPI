# gitAPI

[GH-Pages](http://aallen-dev.github.io/gitAPI/)  
I can't load the access token to GH, it gets automatically revoked.  
So this runs without authentication, meaning only 60 req/hr. 60 req gets exhausted *very* quickly with so little info
returned on each request. Looking to host this elswhere soon, so check back.


- nightmare mode? i think... it has a custom router, albiet a rudimentary one
- 2 tier routing. state is maintained for the user selected as well as when the branches are expanded
- all branches are queried for all reopsitories
- optional link to gh pages (only if exists)
- custom events for custom objects (onload added to each user obj so that a callback can be applied to display even before data is pulled. this made the router setup more simplified)
