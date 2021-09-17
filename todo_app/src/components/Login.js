import React, { useState, useRef } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login } from "../actions/auth";



const required = (value) => {
  if (!value) {
    return (
	      <div className="alert alert-danger" role="alert">
	        This field is required!
	      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};


const Login = (props) => { 
  
	const form = useRef();
	const checkBtn = useRef();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);



  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();
    
    const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
   const handleLogin = (e) => {
    e.preventDefault();


    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then(() => {
          props.history.push("/todo");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/todo" />;
  }
	return (
		 <section className="vh-100 todo_background" >
			 <div className="container py-5 h-100" >
			 	 <div className="row d-flex justify-content-center align-items-center h-100" >
			 	 	<div className="col col-xl-5">
			 	 		<div className="card todo_border" >
			 	 			<div className="card-body p-5">
			 	 				<h6 className="mb-3">Awesome Todo App</h6>
			 	 					   <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required, validEmail]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
           <br />
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />

        </Form>
			 	 			</div>
			 	 		</div>
			 	 	</div>
			 	 </div>
			 </div>
		 </section>
		);
	}
export default Login;