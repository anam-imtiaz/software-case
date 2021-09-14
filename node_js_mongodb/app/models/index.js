const dbConfig = require("../../config/db");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.todo = require("./todo.model.js")(mongoose);
db.user = require("./user.model.js")(mongoose);

module.exports = db;