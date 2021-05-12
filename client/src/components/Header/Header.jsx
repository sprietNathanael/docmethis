import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';

import { withStyles, AppBar, Toolbar, Typography, Button, IconButton, MenuItem, Menu, Grid } from '@material-ui/core';

import { Home, Translate, ChevronDown, Lightbulb, LightbulbOutline } from 'mdi-material-ui';

const styles = (theme) => ({
	appBarTitle: {
		flexGrow: 1,
	},
	userMenu: {
		zIndex: 5,
	},
	translateButton: {
		color: 'white',
		textTransform: 'none',
	},
	leftIcon: {
		marginRight: theme.spacing(),
	},
	rightIcon: {
		marginLeft: theme.spacing(),
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
});

const languageNames = {
	en: 'English',
	fr: 'Français',
};

/**
 * @category	ReactClient
 * @subcategory	Components
 * @class
 * @component
 */
class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			translateMenu_state: null,
		};
	}

	//======================= UI Callback ========================

	translateMenu_open = (event) => {
		this.setState({ translateMenu_state: event.currentTarget });
	};

	translateMenu_close = () => {
		this.setState({ translateMenu_state: null });
	};

	home_click = () => {
		this.props.history.push('/');
	};

	changeLanguage = (language) => (event) => {
		this.props.i18n.changeLanguage(language);
		this.translateMenu_close();
	};

	switchTheme_click = (theme) => (event) => {
		this.props.switchTheme(theme);
	};

	//======================= Page Render ========================

	render() {
		const { classes, t } = this.props;
		return (
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" color="inherit" className={classes.appBarTitle}>
						DocMeThis
					</Typography>
					<div>
						<Grid container spacing={2} alignItems="center">
							<Grid item>
								<Button
									aria-controls="translateMenu"
									aria-haspopup="true"
									onClick={this.translateMenu_open}
									className={classes.translateButton}
								>
									<Translate className={classes.leftIcon} />
									<Typography variant="h6">{languageNames[this.props.i18n.language]}</Typography>
									<ChevronDown className={classes.rightIcon} />
								</Button>
								<Menu
									id="translateMenu"
									anchorEl={this.state.translateMenu_state}
									open={Boolean(this.state.translateMenu_state)}
									onClose={this.translateMenu_close}
								>
									{Object.keys(languageNames).map((language) => (
										<MenuItem key={language} onClick={this.changeLanguage(language)}>
											{languageNames[language]}
										</MenuItem>
									))}
								</Menu>
							</Grid>
							<Grid item>
								{this.props.currentTheme === 'light' ? (
									<IconButton color="inherit" onClick={this.switchTheme_click('dark')}>
										<LightbulbOutline color="inherit" />
									</IconButton>
								) : (
									<IconButton color="inherit" onClick={this.switchTheme_click('light')}>
										<Lightbulb color="inherit" />
									</IconButton>
								)}
							</Grid>
							<Grid item>
								<IconButton color="inherit" onClick={this.home_click}>
									<Home color="inherit" />
								</IconButton>
							</Grid>
						</Grid>
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

Header.propTypes = {
	history: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
	i18n: PropTypes.object.isRequired,
	currentTheme: PropTypes.string.isRequired,
	switchTheme: PropTypes.func.isRequired,
};

export default withTranslation()(withStyles(styles, { withTheme: true })(Header));
