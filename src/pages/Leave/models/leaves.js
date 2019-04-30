import { getLeaveRequest } from '../services/leaves'

export default {
    namespace: 'leaves',
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
        *getLeaveRequest(action, { put, call}) {
            console.log('get leave request')
            const list = yield call(getLeaveRequest);
            console.log(list)
            yield put({ type: 'save', payload: { list } });
        },
        // *queryUser({payload:{email}}, { put, call }) {
        //     const user = yield call(queryUser,{email})
        //     if(user){
        //         yield put({ type: 'save', payload: { list:[user] } });
        //     }else{
        //         yield put({ type: 'save', payload: { list:[] } });
        //     }

        // },
        // *updateUser({payload}, { put, call }) {
        //     console.log(payload);
        //     yield call(updateUser, payload)            
        //     yield put({type:'getAllUsers'})
        // },
        // *deleteUser({payload:{id}}, { put, call }) {
        //     yield call(deleteUser,id);
        //     yield put({type:'getAllUsers'})
        // },
        // *addUser({ payload }, { put, call }) {
        //     yield call(addUser, payload)            
        //     yield put({type:'getAllUsers'})
        // },



    },

};
