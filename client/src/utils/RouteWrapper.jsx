import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class RouteWrapper extends React.Component {
	render() {
		var { Component, path, passedProps } = this.props;
		return <Route path={path} render={(props) => <Component {...props} {...passedProps} />} />;
	}
}

RouteWrapper.propTypes = {
	Component: PropTypes.func.isRequired,
	path: PropTypes.string.isRequired,
	passedProps: PropTypes.object.isRequired,
};

export default RouteWrapper;
