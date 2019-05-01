import { fakeRegister } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { addUser } from '../../Users/services/users'

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(addUser, payload);
      if (response.status == 200) {
        window.g_app._store.dispatch({
          type: 'login/login',
          payload:{
            ...payload,
            userName:payload.email,
          },
        })
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('staff');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
