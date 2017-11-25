# Scope Blogs Secure Blogging With Node.js


## Routes:

###### All User Routes (Routes that work for every user, regardless of how they were create [i.e locally or with facebook/google]):

* GET | '/' | Renders layout to login if user in session, or user/profile otherwise
* GET | '/user/profile/:id' | If user in session renders profile layout, or login layout otherwise (same as '/' possibly delete later because this is extraneous)

