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
		routes: [
			{ path: '/', redirect: '/dashboard', authority: ['admin', 'user'] },
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
		// dashboard
			{
				icon: 'user',
				path: '/account/settings',
				name: 'settings',
				component: './Account/Settings/Info',
				routes: [
					{
						path: '/account/settings',
						redirect: '/account/settings/base',
					},
					{
						path: '/account/settings/base',
						component: './Account/Settings/BaseView',
					},
					{
						path: '/account/settings/security',
						component: './Account/Settings/SecurityView',
					},
				],
			},
			{
				component: '404',
			},
		],
	},
];
