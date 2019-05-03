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
        // *fetch({ payload: { page = 1 } }, { call, put }) {
        //     const data = yield call(queryAllUsers, page);
        //     yield put({
        //         type: 'save',
        //         payload: {
        //             data,
        //             total: parseInt(headers['x-total-count'], 10),
        //             page: parseInt(page, 10),
        //         },
        //     });
        // },
        // *remove({ payload: id }, { call, put }) {
        //     yield call(usersService.remove, id);
        //     yield put({ type: 'reload' });
        // },
        // *patch({ payload: { id, values } }, { call, put }) {
        //     yield call(usersService.patch, id, values);
        //     yield put({ type: 'reload' });
        // },
        // *create({ payload: values }, { call, put }) {
        //     yield call(usersService.create, values);
        //     yield put({ type: 'reload' });
        // },
        // *reload(action, { put, select }) {
        //     const page = yield select(state => state.users.page);
        //     yield put({ type: 'fetch', payload: { page } });
        // },
        *getAllUsers(action, { put, call, select }) {
            console.log('getallusers')
            const list = yield call(queryAllUsers);
            yield put({ type: 'save', payload: { list } });
        },
        *queryUser({ payload: { email } }, { put, call }) {
            const user = yield call(queryUser, { email })
            if (user) {
                yield put({ type: 'save', payload: { list: [user] } });
            } else {
                yield put({ type: 'save', payload: { list: [] } });
            }

        },
        *updateUser({ payload }, { put, call }) {
            yield call(updateUser, payload)
            yield put({ type: 'getAllUsers' })
        },
        *deleteUser({ payload: { id } }, { put, call }) {
            yield call(deleteUser, id);
            yield put({ type: 'getAllUsers' })
        },
        *addUser({ payload }, { put, call }) {
            console.log(222)
            yield call(addUser, payload)
            console.log(333)
            yield put({ type: 'getAllUsers' })
        },



    },

};
