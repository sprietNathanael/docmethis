import { createMuiTheme } from '@material-ui/core/styles';
import { red, purple, lightBlue } from '@material-ui/core/colors/';

export default function globalTheme(theme) {
	return createMuiTheme({
		palette: {
			type: theme,
			primary: {
				main: purple[600],
			},
			secondary: {
				main: lightBlue['500'],
				// main: orange['A400'],
			},
			// secondary: amber[500],
			error: red,
			// Used by `getContrastText()` to maximize the contrast between the background and
			// the text.
			contrastThreshold: 3,
			// Used to shift a color's luminance by approximately
			// two indexes within its tonal palette.
			// E.g., shift from Red 500 to Red 300 or Red 700.
			tonalOffset: 0.2,
		},
		typography: {
			useNextVariants: true,
			fontFamily: ['Roboto', 'sans-serif'].join(','),
			h1: {
				fontSize: '2rem',
			},
			h2: {
				fontSize: '1.5rem',
			},
			h3: {
				fontSize: '1.2rem',
			},
			h4: {
				fontSize: '1rem',
			},
			h5: {
				fontSize: '0.9rem',
			},
			body1: {
				fontSize: '0.85rem',
			},
			body2: {
				fontSize: '0.70rem',
			},
		},
	});
}
