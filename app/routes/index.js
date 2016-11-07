var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var fs = require("fs");
var path = require("path");
var app = express();
app.use(cors());
app.use(bodyParser());
app.engine("ejs", require("ejs-locals"));
app.set("view engine", "ejs");

var months = ['Январья', 'Февралья', 'Марта', 'Апрелья', 'Майа', 'Июнья', 'Июлья', 'Августа', 'Сентябрья', 'Октябрья', 'Ноябрья', 'Декабрья'];
var date = new Date();
var month = months[date.getMonth()];
var day = date.getDate();
var year = date.getFullYear();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();
var now_date = day + " " + month + " " + year + " в " + hour + ":" + minute + ":" + second;

var Comments = require("./models/comments.js").Comments;
var Posts = require("./models/posts.js").Posts;
var Users = require("./models/user.js").Users;

app.post("/getUser", function(req, res) {
	console.log(req.body);
	Users.findOne({_id: req.body.userId}, function(err, result) {
		if(err) {
			res.statusCode = 500;
			res.send("error");
		} else {
			res.send(result);
		}
	});
});
// addComment
app.post("/addComment", function(req, res) {
	var text = req.body.text;
	var postId = req.body.postId;
	var userId = req.body.userId;
	console.log(postId, userId);
	var comment = new Comments({
		userId: userId,
		postId: postId,
		text: text,
		date: getDate(2)
	});
	comment.save(function(err, affected) {
		if(err) {
			res.statusCode = 500;
			res.send("Error");
		} else {
			res.send("success");
		}
	});
});
// getPost
	app.post("/getPost", function(req, res) {
		Posts.findOne({_id: req.body.id}, function(err, result) {
			if(err) {
				res.statusCode = 500;
				res.send("Error");
			} else {
				res.send(result);
			}
		});
	});
// getPosts
	app.get("/getPosts", function(req, res) {
		Posts.find(function(err, result) {
			if(err) {
				res.statusCode = 500;
				res.send("Error");
			} else {
				res.send(result);
			}
		});
	});
// addPost
	app.post("/addPost", function(req, res) {
		var tema = req.body.tema;
		var text = req.body.text;
		var post = new Posts({
			tema: tema,
			text: text,
			date: getDate(1),
			answer: "",
			creater: "Rauan Satanbek"
		});

		post.save(function(err, affected) {
			if(err) {
				res.statusCode = 500;
				res.send("Error");
			} else {
				Posts.find(function(err, result) {
					if(err) {
						res.statusCode = 500;
						res.send("Error");
					} else {
						res.send(result);
					}
				});
			}
		});
		
	});

function getDate(bool) {
	var months = ['Январья', 'Февралья', 'Марта', 'Апрелья', 'Майа', 'Июнья', 'Июлья', 'Августа', 'Сентябрья', 'Октябрья', 'Ноябрья', 'Декабрья'];
	var date = new Date();
	var month = months[date.getMonth()];
	var day = date.getDate();
	var year = date.getFullYear();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	// var now_date = day + " " + month + " " + year + " в " + hour + ":" + minute + ":" + second;
	var now_date = day + " " + month + " " + year;
	if(bool == 1) return now_date;
	now_date = now_date + " в " + hour + ":" + minute + ":" + second;
	return now_date;
}
// var name = ['Аэлита Кулагинa', 'Андрей Павлов', 'Коля Павлов'];
// var avatar = ['https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS7XmgLfLPpB2aO_I4-7ir7KkZfz4hUMXSuAgPdJ44eFGWm31E-', 
// 			'https://s3.eu-central-1.amazonaws.com/image.weloverussia.ru/img/users/s/2015/09/09/97a126c5b2834d4eb8755714fba2bcee.jpg',
// 			'http://litanons.ru/vk/img.php?url=http://cs630921.vk.me/v630921507/339ca/LCqxUyIWzcE.jpg'];
// for (var i = 0; i < 3; i++){
// 	var user = new Users({
// 		name: name[i],
// 		avatar: avatar[i]
// 	});

// 	user.save(function(err, affected) {
// 		if(err) console.log(err);
// 	});
// }

// var comment = new Comments({
// 	userId: "9",
// 	postId: "3",
// 	text: "Могут обнаружить, поэтому измерять скорость базовых операций JavaScript («проводить микробенчмаркинг») до того, как вы изучите внутренности JavaScript-интерпретаторов и поймёте, что они реально делают на таком коде, не рекомендуется.",
// 	date: now_date
// });

// comment.save(function(err, affected) {
// 	if(err) {
// 		console.log("Error");
// 	}
// });

// Comments.find(function(err, result) {
// 	if(err) {
// 		console.log("comments not found");
// 	} else {
// 		console.log(result);
// 	}

// });

// Posts.update({_id: "581f51f99d22da14f0dc643a"}, {
// 	    date: getDate(1)
// 	}, function(err, numberAffected, rawResponse) {
// 		if(err) console.log("error");
// 	    else console.log("success");
// 	})
app.get("/", function(req, res, next) {
	res.render("index.ejs");
});

app.listen(3000, function() {
	console.log("Backend Started");
});

