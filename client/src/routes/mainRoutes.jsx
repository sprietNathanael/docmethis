import DashboardPage from 'views/Dashboard/Dashboard.jsx';
import RestRoutesPage from 'views/RestRoutes/RestRoutes.jsx';

// Views to use for each routes

const dashboardRoutes = [
	{
		path: '/dashboard',
		component: DashboardPage,
	},
	{
		path: '/restRoutes',
		component: RestRoutesPage,
	},
	{
		redirect: true,
		path: '/',
		to: '/dashboard',
	},
];

export default dashboardRoutes;
