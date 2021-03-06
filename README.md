# Scope Blogs Secure Blogging With Node.js


## Routes:

  ROUTE ACTION |    PATHNAME   | USAGE   
| ------------- |:-------------:| -----:|
GET | '/' | if(!session user): renders login form 
GET | '/' | if(session user): renders private profile
GET | '/signup/' | if(!session user): renders signup form + signup with facebook/google buttons
| | |
GET | '/signup/' | if(session user): redirects '/'
GET | '/post/dashboard'/ | renders all session user's followers posts
GET | 'post/search/:query/' | renders all posts based on query
GET | '/post/new/' | renders new_post layout (form to create a new post)
POST | '/post/new/' | creates a new post in database
DELETE | '/post/delete/:id/' | deletes post with the params.id
PUT | '/post/update/:id/' | updates a post with the params.id
GET | '/post/update/:id/' | renders an update post layout based on the information of the post with the params.id
POST | '/post/reblog/:id/' | reblogs post with params.id and adds it to session user's posts 
| | |
GET | '/user/profile/:id/' | renders public profile for req.params.id
GET | '/user/profile/settings/' | renders private profile for session user
PUT | '/user/follower/new/' | update session user to creates a new follower for the session user
PUT | '/user/follower/:id/' | update session user to removes a follower from session user's document based on params.id 
| | |
POST | '/auth/facebook/new/' | creates a new facebook user in database
POST | '/auth/google/new/' | creates a new google user in database
POST | '/auth/local/new/' | creates a new facebook user in database
POST | '/auth/facebook/login/' | creates a facebook user session
POST | '/auth/google/login/' | creates a google user session
POST | '/auth/local/login/' | creates a local user session


## Models: 

### Local User
  
  NAME  |    .   |    DATA TYPE
| ------------- |:-------------:| -----:|
email | . | string
username | . | string
password | . | string
profilepic | . | string
lastupdated | . | Date.now()


### Facebook User
  
  NAME  |    .   |    DATA TYPE
| ------------- |:-------------:| -----:|
facebookid | . |  profile.id
email | . |  profile.email ? (unique)
username | . |  profile.displayName (unique)
profile_pic | . | profile.image
lastupdated | . | Date.now()


### Google User
  
  NAME  |    .   |    DATA TYPE
| ------------- |:-------------:| -----:|
googleid | . |  profile.id
email | . | profile.email?
username | . | profile.displayName?
profile_pic | . | profile.img?
lastupdated | . | Date.now()


### POST 
  NAME  |    .   |    DATA TYPE
| ------------- |:-------------:| -----:|
  title | . | string
  description | . | string
  image | . | string
  original_poster | . | ref('User')
  tags | . |[String]
  lastupdated | . | Date.now()
