export default [
	// user
	{
		path: '/user',
		component: '../layouts/UserLayout',
		routes: [
			{ path: '/user', redirect: '/user/login' },
			{ path: '/user/login', name: 'login', component: './User/Login' },
			{ path: '/user/register', name: 'register', component: './User/Register' },
			{
				path: '/user/register-result',
				name: 'register.result',
				component: './User/RegisterResult',
			},
		],
	},
	// app

	{
		path: '/',
		component: '../layouts/BasicLayout',
		Routes: ['src/pages/Authorized'],
		authority: ['admin', 'staff'],
		routes: [
			// { path: '/', redirect: '/allusers', authority: ['admin'], },
			{
				path: '/leave-application',
				name: 'leaveapplication',
				icon: 'form',
				component: './Leave/LeaveApplication',

			},
			{
				path: '/leave-list',
				name: 'Leave Management',
				icon: 'solution',
				component: './Leave/LeaveList',
			},
			{
				path: '/leave-detail',
				name: 'Leave Status',
				component: './Leave/LeaveDetail',
				icon: 'form',
				// hideInMenu: true,
			},
			// Users
			{
				path: '/userinfo',
				name: 'Personal Setting',
				icon: 'form',
				component: './Users/Info/Infos',

			},
			{
				path: '/users',
				name: 'User Management',
				icon: 'form',
				component: './Users/List/Allusers',
				// authority: ['admin']
			},
			{
				component: '404',
			},
		],
	},
];
