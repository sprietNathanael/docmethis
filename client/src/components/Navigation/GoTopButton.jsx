import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, Fab } from '@material-ui/core';

import { ArrowUp } from 'mdi-material-ui';

const styles = {
	button: {
		position: 'absolute',
		bottom: '5%',
		right: '1%',
	},
};

class GoTopButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: false,
		};
		this.scrollAttached = false;
	}

	//======================= Component Lifecycle ========================

	componentDidUpdate(oldProps) {
		if (!this.scrollAttached && this.props.scrollWrapperRef) {
			this.scrollAttached = true;
			this.props.scrollWrapperRef.current.addEventListener('scroll', this.onParentScroll);
		}
	}

	//======================= UI Callback ======================

	onParentScroll = () => {
		if (this.props.scrollWrapperRef.current.scrollTop > 0) {
			this.setState({ display: true });
		} else {
			this.setState({ display: false });
		}
	};

	goToTop = () => {
		this.props.scrollWrapperRef.current.scrollTop = 0;
	};

	//======================= Page Render ========================

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				{this.state.display && (
					<Fab color="secondary" aria-label="add" className={classes.button} onClick={this.goToTop}>
						<ArrowUp />
					</Fab>
				)}
			</React.Fragment>
		);
	}
}

GoTopButton.propTypes = {
	classes: PropTypes.object.isRequired,
	scrollWrapperRef: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(GoTopButton);
