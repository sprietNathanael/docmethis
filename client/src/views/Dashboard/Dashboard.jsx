import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withTranslation } from 'react-i18next';

const styles = (theme) => ({});

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { classes, t } = this.props;

		return <div>Test</div>;
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
	logger: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
};

export default withTranslation()(withStyles(styles, { withTheme: true })(Dashboard));
