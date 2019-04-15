import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Login from "./Login/Login";
import "./Users.css";
import Signup from "./Signup/Signup";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: "block"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 250
  },
  button: {
    margin: theme.spacing.unit,
    width: 250,
    textTransform:"unset",
    fontSize:"1rem"
  }
});

class User extends Component {
  state = {
    age: "",
    name: "hai",
    labelWidth: 0
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="user">
        <Grid container spacing={24} className="user center-box">
          <Signup classes={classes} />
        </Grid>
      </div>
    );
  }
}



export default withStyles(styles)(User);
