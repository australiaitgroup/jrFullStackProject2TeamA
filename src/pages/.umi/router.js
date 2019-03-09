import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/jracademy/Documents/FullStackProject/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__UserLayout" */'../../layouts/UserLayout'),
  LoadingComponent: require('/Users/jracademy/Documents/FullStackProject/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "name": "login",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'/Users/jracademy/Documents/FullStackProject/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__Login" */'../User/Login'),
  LoadingComponent: require('/Users/jracademy/Documents/FullStackProject/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register",
        "name": "register",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'/Users/jracademy/Documents/FullStackProject/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__Register" */'../User/Register'),
  LoadingComponent: require('/Users/jracademy/Documents/FullStackProject/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "name": "register.result",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'/Users/jracademy/Documents/FullStackProject/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__RegisterResult" */'../User/RegisterResult'),
  LoadingComponent: require('/Users/jracademy/Documents/FullStackProject/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/jracademy/Documents/FullStackProject/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  LoadingComponent: require('/Users/jracademy/Documents/FullStackProject/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
    "routes": [
      {
        "path": "/leave-application",
        "name": "leaveapplication",
        "icon": "form",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Leave__LeaveApplication" */'../Leave/LeaveApplication'),
  LoadingComponent: require('/Users/jracademy/Documents/FullStackProject/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/leave-list",
        "name": "leavelist",
        "icon": "solution",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Leave__LeaveList" */'../Leave/LeaveList'),
  LoadingComponent: require('/Users/jracademy/Documents/FullStackProject/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/leave-detail",
        "name": "leavedetail",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Leave__LeaveDetail" */'../Leave/LeaveDetail'),
  LoadingComponent: require('/Users/jracademy/Documents/FullStackProject/src/components/PageLoading/index').default,
}),
        "hideInMenu": true,
        "exact": true
      },
      {
        "icon": "user",
        "path": "/account/settings",
        "name": "settings",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'/Users/jracademy/Documents/FullStackProject/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Account__Settings__Info" */'../Account/Settings/Info'),
  LoadingComponent: require('/Users/jracademy/Documents/FullStackProject/src/components/PageLoading/index').default,
}),
        "routes": [
          {
            "path": "/account/settings",
            "redirect": "/account/settings/base",
            "exact": true
          },
          {
            "path": "/account/settings/base",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'/Users/jracademy/Documents/FullStackProject/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Account__Settings__BaseView" */'../Account/Settings/BaseView'),
  LoadingComponent: require('/Users/jracademy/Documents/FullStackProject/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/account/settings/security",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'/Users/jracademy/Documents/FullStackProject/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__Account__Settings__SecurityView" */'../Account/Settings/SecurityView'),
  LoadingComponent: require('/Users/jracademy/Documents/FullStackProject/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/jracademy/Documents/FullStackProject/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__404" */'../404'),
  LoadingComponent: require('/Users/jracademy/Documents/FullStackProject/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/jracademy/Documents/FullStackProject/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/jracademy/Documents/FullStackProject/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
