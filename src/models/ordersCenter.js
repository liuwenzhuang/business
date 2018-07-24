import { pageModel } from './common';
import modelExtend from 'dva-model-extend';
import { commonGet } from '../services/api';
import { Api } from '../config';
import { DATA, PLANE } from '../routes/OrdersCenter/Constants';

export default modelExtend(pageModel, {

  namespace: 'ordersCenter',

  state: {
    type: PLANE,
    isSearchCardExpand: true,
    searchTypes: [...DATA[PLANE]['SEARCH_TYPES']],
    columns: [...DATA[PLANE]['COLUMNS']],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(({ pathname, search }) => {
        if (pathname === '/orderscenter') {
          dispatch({
            type: 'query'
          });
        }
      });
    },
  },

  effects: {
    *query({ payload = { url: Api.ORDERSCENTER.QUERY }}, { put, call }) {
      const { success, information, pagination } = yield call(commonGet, payload);
      if(success) {
        yield put({
          type: 'querySuccess',
          payload: {list: information, pagination}
        });
      }
    }
  }
});
