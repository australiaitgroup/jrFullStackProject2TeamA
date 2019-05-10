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
		component: '../layouts/BasicLayout',
		routes: [
			{ path: '/', redirect: '/personal' },
			{
				path: '/leave-application',
				name: 'leaveapplication',
				icon: 'form',
				component: './Leave/LeaveApplication',
				Routes: ['src/pages/Authorized'],
				authority: ['staff'],
			},
			
			{
				path: '/leave-history',
				name: 'leavestatus',
				component: './Leave/LeaveDetail',
				icon: 'profile',
				Routes: ['src/pages/Authorized'],
				authority: ['staff'],
			},
			{
				path: '/leave-management',
				name: 'leavemanagement',
				icon: 'solution',
				Routes: ['src/pages/Authorized'],
				authority: ['admin'],
				routes: [
					{
						path: '/leave-management',
						redirect: '/leave-management/leave-request',
					},
					{
						path: '/leave-management/leave-request',
						component: './Leave/LeaveRequest',
					},
					 {
						path: '/leave-management/leave-approved',
						component: './Leave/LeaveApproved',
					}
				]
			},
			{
				path: '/users',
				name: 'usermanagement',
				icon: 'usergroup-add',
				component: './Users/List/Allusers',
				Routes: ['src/pages/Authorized'],
				authority: ['admin'],
			},
			{
				path: '/personal',
				name: 'personalsetting',
				icon: 'user',
				component: './Users/Info/Infos',
			},
		],
	},
];
