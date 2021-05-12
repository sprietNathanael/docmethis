import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withTranslation } from 'react-i18next';

import pathUtils from 'path';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Card,
	CardContent,
	Grid,
	Typography,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableHead,
} from '@material-ui/core';
import { ChevronDown, MenuDown, MenuRight } from 'mdi-material-ui';
import CollapsibleSection from 'components/CollapsibleSection/CollapsibleSection';
import classNames from 'classnames/bind';
import { typeLinks, extensionMapping } from 'utils/typeLinks';

let methodOrder = ['GET', 'POST', 'PUT', 'DELETE'];

const styles = (theme) => ({
	containerNoMargin: {
		margin: 'initial',
		width: 'initial',
		padding: '0px!important',
	},
	itemNoPadding: {
		padding: '0px!important',
	},
	summary: {
		fontFamily: 'monospace',
		fontWeight: 'bold',
		color: '#676767',
	},
	accordion: {
		border: '2px solid',
		boxShadow: 'initial',
	},
	accordionGET: {
		borderColor: '#49cc90',
	},
	accordionSummaryGET: {
		backgroundColor: 'rgba(73,204,144,.1)',
	},
	accordionPOST: {
		borderColor: '#61affe',
	},
	accordionSummaryPOST: {
		backgroundColor: 'rgba(97,175,254,.1)',
	},
	accordionPUT: {
		borderColor: '#fca130',
	},
	accordionSummaryPUT: {
		backgroundColor: 'rgba(252,161,48,.1)',
	},
	accordionDELETE: {
		borderColor: '#f93e3e',
	},
	accordionSummaryDELETE: {
		backgroundColor: 'rgba(249,62,62,.1)',
	},
	methodCase: {
		textAlign: 'center',
		borderRadius: '4px',
		color: 'white',
	},
	methodCaseGET: {
		backgroundColor: '#49cc90',
	},
	methodCasePOST: {
		backgroundColor: '#61affe',
	},
	methodCasePUT: {
		backgroundColor: '#fca130',
	},
	methodCaseDELETE: {
		backgroundColor: '#f93e3e',
	},
	codeFormat: {
		fontFamily: 'monospace',
	},
	mandatoryParam: {
		fontWeight: 'bold',
	},
	optionalParam: {
		fontStyle: 'italic',
	},
	paramCell: {
		padding: '3px 24px 3px 6px',
	},
	indentSpace: {
		width: '15px',
	},
	deIndent: {
		marginLeft: '-16px',
	},
	clickable: {
		cursor: 'pointer',
	},
	routesContainer: {
		maxWidth: '1200px',
		margin: 'auto',
	},
	typeLink: {
		color: 'inherit',
	},
});

class RestRoutes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openParams: [],
		};
	}

	paramClicked = (paramUniqueId) => {
		let openParams = this.state.openParams;
		let paramIndex = openParams.findIndex((param) => param === paramUniqueId);
		if (paramIndex >= 0) {
			openParams.splice(paramIndex, 1);
		} else {
			openParams.push(paramUniqueId);
		}
		this.setState({ openParams: openParams });
	};

	buildRouteParam = (level, param, route, language) => {
		const { classes } = this.props;

		const cx = classNames.bind(classes);
		let type = null;
		if (param.type) {
			type = typeLinks[language][param.type.toLowerCase()];
		}
		let paramUniqueId = route.path + '-' + route.method + '-' + param.name;
		return (
			<React.Fragment>
				<TableRow key={paramUniqueId}>
					<TableCell
						className={classes.paramCell}
						onClick={() => {
							if (param.children.length > 0) {
								this.paramClicked(paramUniqueId);
							}
						}}
						className={cx({
							clickable: param.children.length > 0,
						})}
					>
						<Grid
							container
							alignItems="center"
							className={cx({
								deIndent: param.children.length > 0,
							})}
						>
							{[...Array(level).keys()].map((level) => (
								<div className={classes.indentSpace}></div>
							))}
							{param.children.length > 0 && (
								<Grid item>
									{this.state.openParams.find((param) => param === paramUniqueId) ? (
										<MenuDown />
									) : (
										<MenuRight />
									)}
								</Grid>
							)}

							<Grid item>
								<Typography
									className={cx(classes.codeFormat, {
										mandatoryParam: !param.optional,
										optionalParam: param.optional,
									})}
								>
									{param.name}
									{!param.optional && '\t*'}
								</Typography>
							</Grid>
						</Grid>
					</TableCell>
					<TableCell className={classes.paramCell}>
						{type && type.name ? (
							<a href={type.link} className={classes.typeLink} target="_blank" rel="noreferrer noopener">
								<Typography className={classes.codeFormat}>
									{type.name}
									{param.isArray && '[]'}
								</Typography>
							</a>
						) : (
							<Typography className={classes.codeFormat}>
								{param.type}
								{param.isArray && '[]'}
							</Typography>
						)}
					</TableCell>
					<TableCell className={classes.paramCell}>{param.possibleValues.join(',')}</TableCell>
					<TableCell className={classes.paramCell}>{param.defaultValue}</TableCell>
					<TableCell className={classes.paramCell}>{param.description}</TableCell>
				</TableRow>
				{this.state.openParams.find((param) => param === paramUniqueId) &&
					param.children.map((paramChild) => this.buildRouteParam(level + 1, paramChild, route, language))}
			</React.Fragment>
		);
	};

	buildRouteEntry = (route) => {
		let language = extensionMapping[pathUtils.extname(route.file)];
		return (
			<Grid item xs={12} key={route.path + '-' + route.method}>
				{/* <Card>
					<CardContent>
						{route.path} - {route.method}
					</CardContent>
				</Card> */}
				<Accordion
					className={classNames(this.props.classes.accordion, this.props.classes[`accordion${route.method}`])}
				>
					<AccordionSummary
						className={classNames(
							this.props.classes.summary,
							this.props.classes[`accordionSummary${route.method}`]
						)}
						expandIcon={<ChevronDown />}
					>
						<Grid container spacing={2} alignItems="baseline">
							<Grid
								item
								xs={1}
								className={classNames(
									this.props.classes.methodCase,
									this.props.classes[`methodCase${route.method}`]
								)}
							>
								{route.method}
							</Grid>
							<Grid item>{route.path}</Grid>
							<Grid item>
								<Typography variant="body2">{route.description}</Typography>
							</Grid>
						</Grid>
					</AccordionSummary>
					<AccordionDetails>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell>
										<Typography>{this.props.t('routes.params.name')}</Typography>
									</TableCell>
									<TableCell>
										<Typography>{this.props.t('routes.params.type')}</Typography>
									</TableCell>
									<TableCell>
										<Typography>{this.props.t('routes.params.possibleValues')}</Typography>
									</TableCell>
									<TableCell>
										<Typography>{this.props.t('routes.params.defaultValue')}</Typography>
									</TableCell>
									<TableCell>
										<Typography>{this.props.t('routes.params.description')}</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{route.input.queryParams.map((param) =>
									this.buildRouteParam(0, param, route, language)
								)}
							</TableBody>
						</Table>
					</AccordionDetails>
				</Accordion>
			</Grid>
		);
	};

	buildRoutes = (routes, previousName, level) => {
		console.log(routes);
		let entriesRes = [];
		let routesRes = [];
		let currentPath = pathUtils.join(previousName, routes.name);
		// routesRes.push(<Typography>{currentPath}</Typography>);
		routes.entries.sort((a, b) => {
			let scoreA = methodOrder.findIndex((method) => method === a.method);
			let scoreB = methodOrder.findIndex((method) => method === b.method);

			return scoreA - scoreB || a.name - b.name;
		});
		for (let entry of routes.entries) {
			entriesRes.push(this.buildRouteEntry(entry));
		}
		for (let route in routes.routes) {
			entriesRes = entriesRes.concat(this.buildRoutes(routes.routes[route], currentPath, level + 1));
		}
		routesRes.push(
			<Grid item xs={12} container spacing={2} className={this.props.classes.containerNoMargin}>
				<Grid item xs={12} className={this.props.classes.itemNoPadding}>
					<CollapsibleSection title={currentPath} level={level}>
						<Grid container spacing={1} className={this.props.classes.containerNoMargin}>
							{entriesRes}
						</Grid>
					</CollapsibleSection>
				</Grid>
			</Grid>
		);

		return routesRes;
	};

	render() {
		const { classes } = this.props;
		return (
			<Grid container spacing={2} className={classes.routesContainer}>
				{this.props.restRoutes && this.buildRoutes(this.props.restRoutes, '', 0)}
			</Grid>
		);
	}
}

RestRoutes.propTypes = {
	classes: PropTypes.object.isRequired,
	logger: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
	restRoutes: PropTypes.object,
};

export default withTranslation()(withStyles(styles, { withTheme: true })(RestRoutes));
