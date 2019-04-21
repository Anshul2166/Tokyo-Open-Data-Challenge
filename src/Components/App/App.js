import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Form from "../Form/Form";
import Users from "../Users/Users";
import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer autoClose={112000} />
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/form" component={Form} />
        </Switch>
      </div>
    );
  }
}
export default App;
