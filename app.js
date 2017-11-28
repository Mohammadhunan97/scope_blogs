const express 	   = require('express'), 
	app 	  	   = express(),
	mongoose  	   = require('mongoose'),
	passport  	   = require('passport'),
	bodyParser	   = require('body-parser'),
	session 	   = require('express-session'),
	ejs			   = require('ejs'),
	fs 			   = require('fs');

const localRoutes  = require('./routes/local.routes'),
	googleRoutes   = require('./routes/google.routes'),
	facebookRoutes = require('./routes/facebook.routes'),
	userRoutes 	   = require('./routes/user.routes'),
	baseRoutes     = require('./routes/base.routes'),
	postRoutes 	   = require('./routes/post.routes');

const key 	  	   = require('./key'),
	db			   = key.db.remoteURL || 'mongodb://localhost/'+key.db.name,
	port		   = process.env.PORT || 3000;

mongoose.connect(db);



app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: key.session.secret }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth/facebook/',facebookRoutes);
app.use('/auth/google/', googleRoutes);
app.use('/auth/local/',localRoutes);
app.use('/user/',userRoutes);
app.use('/post/',postRoutes);
app.use('/',baseRoutes);

app.use(express.static('public'));



app.get('*',(req,res) => {
	res.redirect('/');
})

app.listen(port,(error)=>{
	if(error){
		console.log(error);
	}else if(port === 3000){
		console.log('listening on http://localhost:' + port);
	}else{
		console.log('listening on port', port);
	}
});