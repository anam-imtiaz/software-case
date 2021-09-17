import React,{  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

/***Import Components*****/
import Todo from './components/Todo';
import Login from './components/Login';

/***Import Styles*****/
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";

/****Import Icons***/
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);

function App() {
   const { user: currentUser } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
    useEffect(() => {
      history.listen((location) => {
        dispatch(clearMessage()); // clear message when changing location
      });
    }, [dispatch]);


    useEffect(() => {
      if (currentUser) {
      }
    }, [currentUser]);

   const logOut = () => {
    dispatch(logout());
  };
 
  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/todo"} className="navbar-brand">
              Todo App
            </Link>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/todo"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : ''}
          </nav>
    
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/"]} component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/todo" component={Todo} />
            </Switch>
          </div>
        </div>
    </Router>
  );
};

export default App;
