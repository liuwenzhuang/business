import '@babel/polyfill';
import dva from 'dva';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';

import './index.less';

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(error) {
    console.error(error);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/ctrip').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
