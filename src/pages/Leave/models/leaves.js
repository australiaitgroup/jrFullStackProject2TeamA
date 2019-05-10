import { addLeave, getLeave, getLeaves, deleteLeave } from '@/services/leaves';
import { getLeaveRequest, approveLeave, getLeavesByUser, getLeaveApprove, getLeaveReject } from '../services/leaves';
import { notification } from 'antd';
import router from 'umi/router'

export default {
	namespace: 'leaves',
	state: {
		allMLeaves: [],
		leave: {},
		list: [],
		total: null,
		page: null,
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
		*addNewLeave({ payload }, { call }) {
			yield call(addLeave, payload);
			notification.success({
				message: `Add New Leave Successfully`,
			})
			router.replace('/leave-detail')
		},
		*getLeaveRequest(action, { put, call }) {
			const list = yield call(getLeaveRequest);
			yield put({ type: 'save', payload: { list } });
		},
		*getLeaveApproved(action, { put, call }) {
			const listApprove = yield call(getLeaveApprove);
			const listReject = yield call(getLeaveReject);
			const list = [
				...listApprove,
				...listReject
			];
			yield put({ type: 'save', payload: { list } });
		},
		*approveLeave({ payload }, { put, call }) {
			console.log(payload);
			yield call(approveLeave, payload);
			notification.success({
				message: `${payload.action} Successfully`,
			})
			yield put({ type: 'getLeaveRequest' });
		},
		*getLeavesByUser(action, { put, call }) {
			const userId = localStorage.getItem('userId')
			const list = yield call(getLeavesByUser, { userId });
			yield put({ type: 'save', payload: { list } })
		}
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
		save(state, { payload: { list, total, page } }) {
			return { ...state, list, total, page };
		},
	},
};