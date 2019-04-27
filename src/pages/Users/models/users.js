import { addUser, queryAllUsers, queryUser, deleteUser, updateUser } from '../services/users'

export default {
    namespace: 'users',
    state: {
        list: [],
        total: null,
        page: null,
    },
    reducers: {
        save(state, { payload: { list, total, page } }) {
            return { ...state, list, total, page };
        },
    },
    effects: {
        *fetch({ payload: { page = 1 } }, { call, put }) {
            const data = yield call(queryAllUsers, page);
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *remove({ payload: id }, { call, put }) {
            yield call(usersService.remove, id);
            yield put({ type: 'reload' });
        },
        *patch({ payload: { id, values } }, { call, put }) {
            yield call(usersService.patch, id, values);
            yield put({ type: 'reload' });
        },
        *create({ payload: values }, { call, put }) {
            yield call(usersService.create, values);
            yield put({ type: 'reload' });
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.users.page);
            yield put({ type: 'fetch', payload: { page } });
        },
        *getAllUsers(action, { put, call, select }) {
            const list = yield call(queryAllUsers);
            yield put({ type: 'save', payload: { list } });
        },
        *getUser(action, { put, select }) {
            const page = yield select(state => state.users.page);
            yield put({ type: 'fetch', payload: { page } });
        },
        *updateUser(action, { put, select }) {
            const page = yield select(state => state.users.page);
            yield put({ type: 'fetch', payload: { page } });
        },
        *deleteUser(action, { put, select }) {
            const page = yield select(state => state.users.page);
            yield put({ type: 'fetch', payload: { page } });
        },
        *addUser({ payload }, { put, call }) {
            const page = yield select(state => state.users.page);
            yield call(addUser, payload)
            yield put({ type: 'fetch', payload: { page } });
        },



    },

};
