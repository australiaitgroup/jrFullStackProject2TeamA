import React from 'react';
import Redirect from 'umi/redirect';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';

function AuthComponent({ children, location, routerData, status }) {
  const isLogin = status === 'ok';
console.log(location);
  const getRouteAuthority = (pathname, routeData) => {
    console.log(pathname);
    console.log(routerData)
    const routes = routeData.slice(); // clone

    const getAuthority = (routeDatas, path) => {
      let authorities;
      routeDatas.forEach(route => {
        // check partial route
        if (pathToRegexp(`${route.path}(.*)`).test(path)) {
          if (route.authority) {
            //add authorities to all path,all routes
            authorities = route.authority;
          }
          // is exact route?
          if (!pathToRegexp(route.path).test(path) && route.routes) {
            authorities = getAuthority(route.routes, path);
          }
        }
      });
      return authorities;
    };

    return getAuthority(routes, pathname);
  };
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routerData)}
      // noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user/login" />}
      noMatch={<Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
}
export default connect(({ menu: menuModel, login: loginModel }) => ({
  routerData: menuModel.routerData,
  status: loginModel.status,
}))(AuthComponent);
