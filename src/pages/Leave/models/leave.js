import { addLeave, getLeave, getLeaves, deleteLeave } from '@/services/leaves';

export default {
	namespace: 'leaves',
	state: {
		allMLeaves: [],
		leave: {},
	},

	effects: {
		*fetchLeaves(_, { call, put }) {
			const response = yield call(getLeaves);
			yield put({
				type: 'listLeaves',
				payload: response.data,
			});
			
		},
		*fetchLeaveById({ payload }, { call, put }) {
			const response = yield call(getLeave, payload.id);
			yield put({
				type: 'getCurrentLeave',
				payload: response.data,
			});
        },
        *addNewLeave( {payload},{ call }) {	
            console.log('aaa');
			yield call(addLeave, payload);
		},
	},

	reducers: {
		listLeaves(state, action) {
			const result = {
				...state,
				allLeaves: action.payload.data
			};
			return result;
		},
		
		getCurrentLeave(state, action) {
			const result = {
				...state,
				mentor: action.payload,
			};
			return result;
		},
	},
};