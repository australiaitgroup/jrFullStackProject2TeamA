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
			// { path: '/', redirect: '/dashboard', authority: ['admin', 'staff'], },
			{
				path: '/leave-application',
				name: 'leaveapplication',
				icon: 'form',
				component: './Leave/LeaveApplication',

			},
			{
				path: '/leave-list',
				name: 'leavelist',
				icon: 'solution',
				component: './Leave/LeaveList',
			},
			{
				path: '/leave-detail',
				name: 'leavedetail',
				component: './Leave/LeaveDetail',
				hideInMenu: true,
			},
			// Users
			{
				path: '/userinfo',
				name: 'UserInfo',
				icon: 'form',
				component: './Users/Info/Infos',

			},
			{
				path: '/allUsers',
				name: 'Allusers',
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
