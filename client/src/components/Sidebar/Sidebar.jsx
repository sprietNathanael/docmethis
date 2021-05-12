import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';

import { withStyles, Badge, List, ListItem, ListItemIcon, Drawer, ListItemText } from '@material-ui/core';

import { ViewDashboard, Routes } from 'mdi-material-ui';

import classNames from 'classnames';

const styles = (theme) => ({
	toolbar: theme.mixins.toolbar,
	drawer: {
		overflowX: 'hidden',
		width: '70px',
		flexShrink: 0,
	},
	drawerPaper: {
		overflowX: 'hidden',
		width: '70px',
		flexShrink: 0,
		transition: 'width .2s linear',
		'&:hover': {
			width: '170px',
			transitionDelay: '100ms',
			transition: 'width .2s linear',
		},
	},
	listItem: {
		margin: '5px 10px 0px',
		padding: '10px',
		textAlign: 'right',
		overflow: 'hidden',
		width: 'inherit',
		borderRadius: '3px',
	},
	itemSelected: {
		backgroundColor: theme.palette.secondary.main,
		color: 'white',
		'& svg': {
			color: 'white',
		},
		'&:hover': {
			backgroundColor: theme.palette.secondary.main,
		},
	},
	listIcon: {
		minWidth: '0',
		width: '30px',
		marginRight: '10px',
	},
	listIconContainer: {
		minWidth: '0px',
	},
});

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	//======================= UI Callback ========================

	changePage = (path) => (event) => {
		this.props.history.push(path);
	};

	//======================= Page Render ========================

	render() {
		const { classes, t } = this.props;

		return (
			<Drawer
				variant="permanent"
				className={classes.drawer}
				classes={{
					paper: classes.drawerPaper,
				}}
				open={true}
			>
				<div className={classes.toolbar} />
				<List>
					<ListItem
						className={classNames(
							classes.listItem,
							[/^\/$/, /^\/dashboard$/].some((route) => route.test(this.props.currentLocation))
								? classes.itemSelected
								: undefined
						)}
						button
						key={t('sidebar.dashboard')}
						onClick={this.changePage('/')}
					>
						<ListItemIcon className={classes.listIconContainer}>
							<ViewDashboard className={classes.listIcon} />
						</ListItemIcon>
						<ListItemText primary={t('sidebar.dashboard')} />
					</ListItem>
					<ListItem
						className={classNames(
							classes.listItem,
							[/^\/restRoutes$/].some((route) => route.test(this.props.currentLocation))
								? classes.itemSelected
								: undefined
						)}
						button
						key={t('sidebar.restRoutes')}
						onClick={this.changePage('/restRoutes')}
					>
						<ListItemIcon className={classes.listIconContainer}>
							<Routes className={classes.listIcon} />
						</ListItemIcon>
						<ListItemText primary={t('sidebar.restRoutes')} />
					</ListItem>
				</List>
			</Drawer>
		);
	}
}

Sidebar.propTypes = {
	currentLocation: PropTypes.string.isRequired,
	history: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

export default withTranslation()(withStyles(styles, { withTheme: true })(Sidebar));
