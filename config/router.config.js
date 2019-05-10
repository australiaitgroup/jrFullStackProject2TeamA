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
			{ path: '/', redirect: '/leave-detail' },
			{
				path: '/leave-application',
				name: 'leaveapplication',
				icon: 'form',
				component: './Leave/LeaveApplication',

			},
			{
				path: '/leave-management',
				name: 'Leave Management',
				icon: 'solution',
				routes: [
					{
						path: '/leave-management',
						redirect: '/leave-management/leaverequest',
					},
					{
						path: '/leave-management/leaverequest',
						component: './Leave/LeaveRequest',
					},
					 {
						path: '/leave-management/leaveapproved',
						component: './Leave/LeaveApproved',
					}
				]
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
				path: '/personal',
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
