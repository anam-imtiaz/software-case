const db = require("../models");
const todo = db.todo;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body.task) {
    res.status(400).send({ message: "Task cannot be empty!" });
    return;
  }
  const objTask = new todo({
    title: req.body.task,
    status:1
  });

  objTask
    .save(objTask)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tasks."
      });
    });
};


exports.findAll = (req, res) => {
  todo.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tasks."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
 	 todo.findOne({_id:id})
    .then(data => {
    	console.log(data.status);
       if(data.status == 1){
       	 	todo.findByIdAndUpdate(id, {'status':2}, { useFindAndModify: false })
		    .then(data => {
		      if (!data) {
		        res.status(404).send({
		          message: `Cannot update task with id=${id}. !`
		        });
		      } else res.send({ status:2});
		    })
		    .catch(err => {
		      res.status(500).send({
		        message: "Error updating task with id=" + id
		      });
		    });
         }else{
         	todo.findByIdAndUpdate(id, {'status':1}, { useFindAndModify: false })
		    .then(data => {
		      if (!data) {
		        res.status(404).send({
		          message: `Cannot update task with id=${id}.!`
		        });
		      } else res.send({ status:1});
		    })
		    .catch(err => {
		      res.status(500).send({
		        message: "Error updating task with id=" + id
		      });
		    });
         }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tasks."
      });
    });

 

exports.delete = (req, res) => {
  const id = req.params.id;
 	
  todo.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Task with id=${id}.`
        });
      } else {
        res.send({
          message: "Task was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id
      });
    });
};


