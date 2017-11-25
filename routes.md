


Navigation = if (login) { signup } else { login }
---
login get shows login form and login with fb/google
signup get shows signup form and signup with fb/google

login post allows user session to be created
signup post allows new user to be created
---






main pages:
- login (/user/) []
- signup (/user/) []

- public profile (/user/) []
- private profile (/user/) []
- dashboard (/post/) []
- search (/post/) []





Navigation = dashboard search profile (editable_profile/aka settings . public_profile)
---
search get route sends all posts based on pathname and an input that redirects to the input.values search route
--- 

--- 
new_post get route renders new_post layout (shows form to create a new post)
new_post post route creates a new post
---

--- 
dashboard get route shows all followers posts (and their information) but no follow button
---

--- 
user/profile/:id get route shows public profile (all post information for the user, including followers and following) 
--- 

--- 
/ get route renders login form if !user.loggedIn && if user.loggedIn renders private profile, i.e: all post information for the user (including ability to delete post and update posts, where update button redirects to post/update/:id) and following/following info including ability to unfollow users

--- 
followers/new post route creates a new follower for the session user
followers/delete/:id route deletes a follow from the session user based on the id
---

--- 
post/delete delete route has ability to delete a post
post/update/:id get route renders post_update layout (shows form to update a post);
--- 



main pages:
- public profile (/user/)
- private profile (/user/)
- dashboard (/post/)
- search (/post/)
- login (/user/)
- signup (/user/)

