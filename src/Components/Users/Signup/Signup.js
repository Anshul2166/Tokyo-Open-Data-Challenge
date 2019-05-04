import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormGroup, FormControl } from '@material-ui/core';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GoogleIcon from 'mdi-react/GoogleIcon';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../actions/userActions';
import { withRouter } from 'react-router-dom';

class Signup extends Component {
	state = {
		username: '',
		password: '',
		email: '',
	};

	changeUsername = event => {
		this.setState({ username: event.target.value });
	};

	changePassword = event => {
		this.setState({ password: event.target.value });
	};

	changeEmail = event => {
		this.setState({ email: event.target.value });
	};

	submitSignupForm = e => {
		console.log('Method called');
		let { username, password, email } = this.state;
		let credentials = {
			username: username,
			password: password,
			email: email,
		};
		if (email && password && username) {
			this.props.userActions.localSignup(credentials, this.redirectOnSuccess);
		}
	};

	redirectOnSuccess = () => {
		this.props.history.push('/dashboard');
	};

	isFormInvalid = () => {
		let { email, password, username } = this.state;
		if (password.length < 5 && password.length > 15) {
			return true;
		}
		if (username.length > 5 && username.length > 15) {
			return true;
		}
		return !this.validateEmail(email);
	};

	validateEmail = mail => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
			return true;
		}
		return false;
	};

	render() {
		const { classes } = this.props;
		let { username, password, email } = this.state;
		return (
			<div className="border-box center-box">
				<Typography variant="headline" component="h1" className="form-center center-text">
					<b className="heading-form">Signup to the app</b>
				</Typography>
				<div className="center-div-user">
					<form className={classes.container}>
						<FormGroup className="form-center">
							<FormControl>
								<TextField
									required
									id="standard-required"
									label="Username"
									className={classes.textField + ' textfield'}
									value={username}
									onChange={e => this.changeUsername(e)}
								/>
							</FormControl>
							<FormControl>
								<TextField
									required
									id="standard-password-input"
									label="Password(min 5 chars)"
									className={classes.textField + ' textfield'}
									type="password"
									autoComplete="current-password"
									value={password}
									onChange={e => this.changePassword(e)}
								/>
							</FormControl>
							<FormControl>
								<TextField
									id="standard-required"
									label="Email*"
									className={classes.textField + ' textfield'}
									type="email"
									autoComplete="email"
									value={email}
									onChange={e => this.changeEmail(e)}
								/>
							</FormControl>
						</FormGroup>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}
							onClick={this.submitSignupForm}
							disabled={this.isFormInvalid()}
						>
							Signup with username
						</Button>
					</form>

					<Divider />
					<SocialNetworkLogIn classes={classes} />
				</div>
			</div>
		);
	}
}

const SocialNetworkLogIn = ({ facebookLogin, googleLogin, classes }) => (
	<div className="social-network-login">
		<a href="api/users/auth/facebook">
			<Button variant="contained" color="primary" className={classes.button}>
				<FacebookIcon />
				Signup with facebook
			</Button>
		</a>
		<a href="api/users/auth/google">
			<Button variant="contained" color="primary" className={classes.button}>
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

const mapStateToProps = state => {
	return {
		users: state.users.users,
	};
};

const mapActionsToProps = dispatch => {
	return {
		userActions: bindActionCreators(userActions, dispatch),
	};
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withRouter(Signup));
