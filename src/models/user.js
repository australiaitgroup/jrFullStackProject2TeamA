import { queryUsers, queryCurrent,queryCurrentUser, usersByRole} from '@/services/user';

export default {
	namespace: 'user',

	state: {
		list: [],
		currentUser: {},
		admins:'',
	},

	effects: {
		*fetch(_, { call, put }) {
			const response = yield call(queryUsers);
			yield put({
				type: 'save',
				payload: response,
			});
		},
		*fetchCurrent(_, { call, put }) {
			const response = yield call(queryCurrent);
			yield put({
				type: 'saveCurrentUser',
				payload: response,
			});
		},
		*fetchCurrentUser(_,{call,put}){
			const userId = localStorage.getItem('userId')
			const response = yield call(queryCurrentUser,userId);
			yield put({
				type: 'saveCurrentUser',
				payload: response,
			});
		},
		*fetchAdmins(_, { call, put }) {
			console.log('oo');
			const response = yield call(usersByRole,'admin');
			console.log(response);
			yield put({
				type: 'getAdmins',
				payload: response,
			});
		},
	},
	

	reducers: {
		save(state, action) {
		return {
			...state,
			list: action.payload,
		};
		},
		saveCurrentUser(state, action) {
		return {
			...state,
			currentUser: action.payload || {},
		};
		},
		getAdmins(state, action){
			console.log(action.payload);
			return{
				...state,
				admins: action.payload
			};
		},
		changeNotifyCount(state, action) {
		return {
			...state,
			currentUser: {
			...state.currentUser,
			notifyCount: action.payload.totalCount,
			unreadCount: action.payload.unreadCount,
			},
		};
		},
	},
};
