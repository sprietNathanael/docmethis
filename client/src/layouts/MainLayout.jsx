import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';

import { Switch, Redirect } from 'react-router-dom';
import RouteWrapper from 'utils/RouteWrapper.jsx';

import { withStyles, Typography } from '@material-ui/core';

import Logger from 'utils/logger.js';

import mainRoutes from 'routes/mainRoutes.jsx';

import GoTopButton from 'components/Navigation/GoTopButton.jsx';
import Sidebar from 'components/Sidebar/Sidebar.jsx';
import Header from 'components/Header/Header.jsx';

const styles = (theme) => {
	return {
		app: {
			display: 'flex',
			backgroundColor: theme.palette.background.default,
			height: '100vh',
		},
		footer: {
			backgroundColor: theme.palette.secondary.main,
			zIndex: theme.zIndex.drawer + 1,
			position: 'fixed',
			bottom: 0,
			textAlign: 'center',
			width: '100%',
		},
		toolbar: theme.mixins.toolbar,
		mainPage: {
			padding: '1.5vh',
			flexGrow: 1,
			paddingBottom: 0,
			height: '96vh',
			overflowY: 'auto',
		},
	};
};

/**
 * @category	ReactClient
 * @class
 * @component
 */
class MainLayout extends React.Component {
	constructor(props) {
		super(props);
		this.logger = new Logger();

		this.props.history.listen((location, action) => {});

		this.state = {
			restRoutes: null,
		};
		this.preferences = {};
		this.scrollWrapperRef = React.createRef();
	}

	componentDidMount = () => {
		this.getPreferencesFromLocal();
		fetch('/build.json')
			.then((response) => response.json())
			.then((data) => {
				this.setState({ restRoutes: this.parseRestDocumentation(data.restRoutes) });
			});
	};

	parseRestDocumentation = (restRoutes) => {
		let res = {
			name: '',
			entries: [],
			routes: {},
		};
		for (let route of restRoutes) {
			let pathSplitted = route.path.split('/').slice(1);
			let currentRoute = res;
			for (let pathElement of pathSplitted) {
				if (!currentRoute.routes[pathElement]) {
					currentRoute.routes[pathElement] = {
						name: pathElement,
						entries: [],
						routes: {},
					};
				}
				currentRoute = currentRoute.routes[pathElement];
			}
			currentRoute.entries.push(route);
		}

		res = this.flattenRoutesObject(res);
		return res;
	};

	flattenRoutesObject = (route) => {
		let currentRoute = route;
		if (route.entries.length === 0 && Object.keys(route.routes).length <= 1) {
			let newRoute = this.flattenRoutesObject(route.routes[Object.keys(route.routes)[0]]);
			let newName = currentRoute.name + '/' + newRoute.name;
			currentRoute = newRoute;
			currentRoute.name = newName;

			return currentRoute;
		} else if (Object.keys(route.routes).length > 0) {
			for (let interRoute in route.routes) {
				let newRoute = this.flattenRoutesObject(route.routes[interRoute]);
				delete route.routes[interRoute];
				route.routes[newRoute.name] = newRoute;
			}
		}
		return currentRoute;
	};

	getPreferencesFromLocal = () => {
		this.preferences = JSON.parse(localStorage.getItem('preferences'));
		if (!this.preferences) {
			this.preferences = {};
		}
		if (this.preferences.theme) {
			this.props.switchTheme(this.preferences.theme);
		}
	};

	changeUserPreference = (key, value) => {
		this.preferences[key] = value;
		localStorage.setItem('preferences', JSON.stringify(this.preferences));
	};

	switchRoutes = (passedProps) => {
		let toReturn = (
			<Switch>
				{mainRoutes.map((prop, key) => {
					if (prop.redirect) {
						return <Redirect from={prop.path} to={prop.to} key={key} />;
					}
					return (
						<RouteWrapper path={prop.path} Component={prop.component} key={key} passedProps={passedProps} />
					);
				})}
			</Switch>
		);
		return toReturn;
	};

	switchTheme = (theme) => {
		this.props.switchTheme(theme);
		this.changeUserPreference('theme', theme);
	};

	//======================= Page Render ========================

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.app}>
				<Header
					history={this.props.history}
					headerName={this.state.headerName}
					logger={this.logger}
					currentTheme={this.props.currentTheme}
					switchTheme={this.switchTheme}
				/>
				{/* <LoadingDialog open={this.state.loadingDialog_state} /> */} */}
				<React.Fragment>
					<Sidebar currentLocation={this.props.location.pathname} history={this.props.history} />

					<div className={classes.mainPage} ref={this.scrollWrapperRef}>
						<div className={classes.toolbar} />
						{this.switchRoutes({
							history: this.props.history,
							logger: this.logger,
							currentTheme: this.props.currentTheme,
							restRoutes: this.state.restRoutes,
						})}
						<GoTopButton scrollWrapperRef={this.scrollWrapperRef} />
					</div>
				</React.Fragment>
				<footer className={classes.footer}>
					<Typography>Doc Me This - {process.env.REACT_APP_VERSION}</Typography>
				</footer>
			</div>
		);
	}
}

MainLayout.propTypes = {
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
	i18n: PropTypes.object.isRequired,
	switchTheme: PropTypes.func.isRequired,
	currentTheme: PropTypes.string.isRequired,
};

export default withTranslation()(withStyles(styles, { withTheme: true })(MainLayout));
