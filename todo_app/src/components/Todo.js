
import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TodoService from "../services/todo.service";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";


class Todo extends Component {

    constructor(props) {
      super(props);
      this.onChangeTask = this.onChangeTask.bind(this);
      this.onChangeStatus = this.onChangeStatus.bind(this);
      this.saveTask = this.saveTask.bind(this);
      this.allTasks = this.allTasks.bind(this);
      this.UpdateTaskStatus = this.UpdateTaskStatus.bind(this);
      this.DeleteTask = this.DeleteTask.bind(this);
      this.state = {
        tasks: [],
        currentTask: null,
        currentIndex: -1,
        currentStatus:0
      };
    }
  	
  	componentDidMount() {this.allTasks();}

      allTasks() {
        TodoService.getAll()
          .then(response => {
            this.setState({
              tasks: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      onChangeTask(e) {
        this.setState({  task: e.target.value});
      }

      onChangeStatus(id) { this.UpdateTaskStatus(id);}

      saveTask() {
          var data = { task: this.state.task,};
          this.setState({ message: ''});
          if(this.state.task !== ""){
            TodoService.create(data)
              .then(response => {
                this.allTasks();
              })
              .catch(e => {
                console.log(e);
              });
          }else{
            this.setState({message: 'Please enter the task'});
          }
        }

        DeleteTask(id) {
          var data = {id: id};
          this.setState({message: ''});
          TodoService.delete(data.id)
            .then(response => {
              this.allTasks();
            })
            .catch(e => {});
        }
  
        UpdateTaskStatus(id) {
          var data = {id: id};
          this.setState({message: ''});
          TodoService.update(data.id)
            .then(response => {
              this.allTasks();
            })
            .catch(e => {});
        }
  
      render() {	
        const { user: currentUser } = this.props;
        if (!currentUser) {
          return <Redirect to="/login" />;
        }
        return (
        <section className="vh-100 todo_background" >
          <div className="container py-5 h-100" >
            <div className="row d-flex justify-content-center align-items-center h-100" >
              <div className="col col-xl-10">
                <div className="card todo_border" >
                  <div className="card-body p-5">
                    <h6 className="mb-3">Awesome Todo List</h6>
			 	 					 <form className="d-flex justify-content-center align-items-center mb-4">
						              <div className="form-outline flex-fill">
						               <input required
						                value={this.state.task}
						                onChange={this.onChangeTask}
						              className="form-control form-control-lg" id="form1" type="text" placeholder="Create Tasks" />
						              </div>
						              <button type="button" onClick={this.saveTask} className="btn btn-primary btn-lg ms-2">Add</button>
						            </form>
						             {this.state.message && (
							            <div className="form-group">
							              <div className="alert alert-danger" role="alert">
							                {this.state.message}
							              </div>
							            </div>
							          )}
						            <ul className="list-group mb-0">
						            		{this.state.tasks &&
									              this.state.tasks.map((task, index) => (
									                <li
									                  className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
									                  key={index}
									                >
									                <div className="d-flex align-items-center">
									                  <input onChange={()=>this.onChangeStatus(task.id)}  defaultChecked= { task.status === 2 ? true : false } className="form-check-input me-2" type="checkbox" value="" aria-label="..." />
									                  { task.status === 2 ? ( <s>{task.title}</s> ) : task.title}
									                  </div>
									                   <a href="#!" data-mdb-toggle="tooltip" onClick={()=>{ this.DeleteTask(task.id)}} title="Remove item">
									              	 <FontAwesomeIcon icon={faTrash } />
									                </a>
									                </li>
									              ))}
						             </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
		      );	
		   }
   }
  function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user,
    };
  }

  export default connect(mapStateToProps)(Todo);