import React from 'react';
import ReactDOM from 'react-dom';

import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';

import indexRoutes from './routes/index.jsx';
import './index.css';
import './i18n';

// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider } from '@material-ui/core/styles';

import RouteWrapper from 'utils/RouteWrapper.jsx';

import globalTheme from './globalTheme';
import reportWebVitals from './reportWebVitals';

const hist = createBrowserHistory();

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			themeType: 'light',
		};
	}

	switchTheme = (themeType) => {
		this.setState({ themeType: themeType });
	};

	render() {
		return (
			<ThemeProvider theme={globalTheme(this.state.themeType)}>
				<Router history={hist}>
					<Switch>
						{indexRoutes.map((prop, key) => {
							return (
								<RouteWrapper
									path={prop.path}
									Component={prop.component}
									key={key}
									passedProps={{ currentTheme: this.state.themeType, switchTheme: this.switchTheme }}
								/>
							);
						})}
					</Switch>
				</Router>
			</ThemeProvider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
