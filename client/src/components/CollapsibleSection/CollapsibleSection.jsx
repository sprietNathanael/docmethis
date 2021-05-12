import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withTranslation } from 'react-i18next';

import { Typography } from '@material-ui/core';

import { MenuRight, MenuDown } from 'mdi-material-ui';

const styles = (theme) => ({
	titleComponent: {
		display: 'flex',
		alignItems: 'center',
		color: '#797979',
		cursor: 'pointer',
	},
	titleName: {
		paddingRight: '10px',
		fontWeight: 'bold',
	},
	titleBar: {
		flexGrow: 1,
		borderBottom: '1px solid #b5b5b5a1',
	},
	indentSpace: {
		width: '15px',
	},
});

class CollapsibleSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
		};
	}

	collapseHandler = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<div key={this.props.title}>
				<div className={classes.titleComponent} onClick={this.collapseHandler}>
					{[...Array(this.props.level).keys()].map((level) => (
						<div className={classes.indentSpace}></div>
					))}
					{this.state.collapsed ? <MenuRight /> : <MenuDown />}
					<Typography className={classes.titleName}>{this.props.title}</Typography>
					<span className={classes.titleBar}></span>
				</div>
				{!this.state.collapsed && <div>{this.props.children}</div>}
			</div>
		);
	}
}

CollapsibleSection.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	level: PropTypes.number.isRequired,
	children: PropTypes.array,
};

export default withTranslation()(withStyles(styles, { withTheme: true })(CollapsibleSection));
