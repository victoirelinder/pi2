var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Film = require('./api/models/mailModel'),
bodyParser = require('body-parser');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
Film = mongoose.model('Mail');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ENRON');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('queries'));
//routes to js files  &html files
app.get('/public/javascript/index.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"index.js");
})
app.get('/public/javascript/query.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"query.js");
})
app.get('/public/javascript/upload.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"teacheradd.js");
})
app.get('/public/javascript/login.js',function(req,res){
	res.sendFile( __dirname +"/public/javascript/" +"login.js");
})

app.get('/login',function(req,res){
	res.sendFile( __dirname +"/public/" +"login.html");
})

app.get('/admin',function(req,res){
	res.sendFile( __dirname +"/public/" +"teacheradd.html");
})
app.get('/login',function(req,res){
	res.sendFile( __dirname +"/public/" +"index.html");
})

  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  
app.post('/login', function(req, res){  //fct to log in as a teacher
	var true_username = "teacher";
	var true_password = "teacher";

	var username = req.body.username;
	var password = req.body.password;

	if(username == true_username && password == true_password){
		res.end('true');
	}
	else{
		res.end('false');
	}
});

  form.on('end', function() {
	
		var items = [];
			fs.readFile('enron.json', 'utf8', function (err, data) {
					if(err) throw err
					var lines = data.split('\n');
					var idx = 0;

					lines.forEach(function(line){
							var line = line.replace( "{ \"_id\" : { \"$oid\" :" , "{ \"_id\" :" );
							var line = line.replace( " }," , "," );
							var line = line.replace( "\n" , "" );
							obj = JSON.parse(line);
							var item = new Mail(obj);
							item.save(function(err, data) {
								if (err){
									res.end('error');
								}
								else{
									res.end('success');
								}
							});

						idx++;
					})
			});
	});
	  form.parse(req);
});
app.post('/addquery', function(req, res){
	var queryReceived = req.body.query.replace(/\n/g,'');
	var queryTitle = req.body.name;
	var jsonString = "";

	function read(filePath, cb){
	  var str = '';
	  fs.readFile(filePath, 'utf8', function(err, data){
	    if(err) throw err;
	    cb(data);
	  });
	}

	read('queries\\queries.json', function(data) {
		var Obj = JSON.parse(data);

		var newquery = {
				title: queryTitle,
				query: queryReceived
		};

		Obj.push(newquery);
		jsonString = JSON.stringify(Obj, null, 2);

		fs.writeFile("queries\\queries.json", jsonString, 'utf8', function (err) {
	    if (err) {
	      console.log(err);
				res.end('false');
	    }
			else {
				console.log("JSON file has been saved.");
				res.end('true');
			}
		});
	});
});


//Routes for the mongoDB API
var routes = require('./api/routes/filmRoutes'); //importing route
routes(app); //register the route

//Start the server
app.listen(port);

console.log('Server started on port ' + port);