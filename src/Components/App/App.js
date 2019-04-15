import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Form from "../Form/Form";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Form} />
          <Route exact path="/form" component={Form} />
        </Switch>
      </div>
    );
  }
}
export default App;
