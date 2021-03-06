import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import styles from './index.less';

const { ConnectedRouter } = routerRedux;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

const Routers = function({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/Exception/404'),
  });
  const routes = [
    {
      path: '/ctripsecondauthorized',
      models: () => [import('./models/ctripSecondAuthorized')],
      component: () => import('./routes/CtripSecondAuthorized'),
    },
    {
      path: '/ctripgroup',
      models: () => [import('./models/ctripGroup')],
      component: () => import('./routes/CtripGroup'),
    },
    {
      path: '/openservices',
      models: () => [import('./models/openServices')],
      component: () => import('./routes/OpenServices'),
    },
    {
      path: '/orderscenter',
      models: () => [import('./models/ordersCenter')],
      component: () => import('./routes/OrdersCenter'),
    },
  ];

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/ctripsecondauthorized" />} />
            {routes.map(({ path, ...dynamics }, key) => (
              <Route
                key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))}
            <Route component={error} />
          </Switch>
        </div>
      </LocaleProvider>
    </ConnectedRouter>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;
