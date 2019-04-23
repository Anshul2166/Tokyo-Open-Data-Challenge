import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Login from './Login/Login';
import './Users.css';
import Signup from './Signup/Signup';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		display: 'block',
	},
	dense: {
		marginTop: 19,
	},
	menu: {
		width: 250,
	},
	button: {
		margin: theme.spacing.unit,
		width: 250,
		textTransform: 'unset',
		fontSize: '1rem',
	},
});

function TabContainer(props) {
	return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

class User extends Component {
	state = {
		value: 0,
		switchText: 'Signup instead?',
	};

	changeValue = () => {
		let { value } = this.state;
		let switchText = '';
		if (value === 0) {
			value = 1;
			switchText = 'Login instead?';
		} else {
			value = 0;
			switchText = 'Signup instead?';
		}
		this.setState({ value, switchText });
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;
		const { value, switchText } = this.state;
		return (
			<div className="user">
				<Paper className={classes.root + ' tabs-login-signup'}>
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="Login" />
						<Tab label="Signup" />
					</Tabs>
				</Paper>
				{value === 0 && (
					<TabContainer>
						<Login classes={classes} />
					</TabContainer>
				)}
				{value === 1 && (
					<TabContainer>
						<Signup classes={classes} />
					</TabContainer>
				)}
				<div className="signup-link-text center-text">
					<Link onClick={this.changeValue}>{switchText}</Link>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(User);
