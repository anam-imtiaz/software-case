const controller = require("../app/controllers/todo.controller");

module.exports = function(app) {

 app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    app.post("/api/todo", controller.create);
    app.get("/api/todo/all", controller.findAll);
    app.post("/api/todo/delete/:id", controller.delete);
    app.post("/api/todo/update/:id", controller.update);

};

