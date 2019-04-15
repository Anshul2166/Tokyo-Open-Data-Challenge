import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormGroup, FormControl } from "@material-ui/core";
import FacebookIcon from "mdi-react/FacebookIcon";
import GoogleIcon from "mdi-react/GoogleIcon";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

class Signup extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="border-box center-box">
        <Typography
          variant="display1"
          component="h1"
          className="form-center center-text"
        >
          <b className="heading-form">Signup to the app</b>
        </Typography>
        <div className="center-div-user">
          <form className={classes.container} noValidate autoComplete="off">
            <FormGroup className="form-center">
              <FormControl>
                <TextField
                  required
                  id="standard-required"
                  label="Username"
                  margin="small"
                  className={classes.textField + " textfield"}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  id="standard-password-input"
                  label="Password"
                  className={classes.textField + " textfield"}
                  type="password"
                  autoComplete="current-password"
                  margin="small"
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="standard-required"
                  label="Email"
                  className={classes.textField + " textfield"}
                  type="email"
                  autoComplete="email"
                  margin="small"
                />
              </FormControl>
            </FormGroup>
          </form>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Signup with username
          </Button>
          <Divider />
          <SocialNetworkLogIn classes={classes} />
        </div>
      </div>
    );
  }
}

const SocialNetworkLogIn = props => (
  <div className="social-network-login">
    <Button
      variant="contained"
      color="primary"
      className={props.classes.button}
      onClick={() => alert("Please use google login for now")}
    >
      <FacebookIcon />
      Signup with facebook
    </Button>
    <a href="api/users/auth/google">
      <Button
        variant="contained"
        color="primary"
        className={props.classes.button}
      >
        <GoogleIcon />
        Signup with google
      </Button>
    </a>
  </div>
);

/*This returns the divider ----OR---- */
const Divider = props => (
  <div className="section">
    <div className="divider">
      <span className="divider_content">OR</span>
    </div>
  </div>
);

export default Signup;
