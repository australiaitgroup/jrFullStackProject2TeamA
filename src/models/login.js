import { Router,routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha, accountLogin } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import router from 'umi/router'

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *loginOrigin({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log(response)
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logoutOrigin(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
    *logout(_, { put }) {
      yield put({
        type: 'loginStatus',
        payload: {
          status: false,
          payload: {
            role:'guest'},
        },
      })
      localStorage.removeItem('Jr-token')
      router.replace('/user/login')

    },
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'loginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status == '200') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        const defaultRedirect = response.payload.role==="admin"
        ?'/leave-management'
        :'/leave-history';
        // yield put(routerRedux.replace(redirect || '/'));
        yield put(routerRedux.replace(defaultRedirect));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    loginStatus(state, { payload }) {
      console.log(payload.payload.role)
      setAuthority(payload.payload.role);
      localStorage.setItem('userId',payload.payload.userId)
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
