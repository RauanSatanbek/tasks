var mongoose = require("../libs/mongoose.js");
var Schema = mongoose.Schema;

var schema = new Schema({
	userId: String,
	postId: String,
	text: String,
	date: String
});

exports.Comments = mongoose.model("comments", schema);
// console.log("Mongoose");