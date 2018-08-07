import { pageModel } from './common';
import modelExtend from 'dva-model-extend';
import { commonPost } from '../services/api';
import { Api } from '../config';
import { DATA, PLANE, DATE_FORMAT } from '../routes/OrdersCenter/Constants';
import moment from 'moment';

const beginOrder = moment().subtract(1, 'months').format(DATE_FORMAT);
const endOrder = moment().format(DATE_FORMAT);

export default modelExtend(pageModel, {
  namespace: 'ordersCenter',

  state: {
    type: PLANE,
    isSearchCardExpand: true,
    searchTypes: [...DATA[PLANE]['SEARCH_TYPES']],
    menuOptions: {
      payType: [],
      fromType: [],
      orderStatus: [],
      payWay: [],
      isDomc: [],
    },
    searchValues: {
      beginOrder,
      endOrder,
    },
    columns: [...DATA[PLANE]['COLUMNS']],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(({ pathname, search }) => {
        if (pathname === '/orderscenter') {
          dispatch({ type: 'queryMenuOptions' });
          const payload = {
            url: Api.ORDERSCENTER.QUERY_ORDER_INFOS,
            current: 1,
            pageSize: 10,
            beginOrder,
            endOrder,
          };
          dispatch({
            type: 'queryTable',
            payload,
          });
        }
      });
    },
  },

  effects: {
    *queryMenuOptions(_, { put, call, select }) {
      const { type } = yield select(state => state['ordersCenter']);
      const { success, information } = yield call(commonPost, {
        url: Api.ORDERSCENTER.QUERY_MENU_OPTIONS,
        type,
        key: 'all',
      });
      if (success) {
        yield put({
          type: 'updateState',
          payload: { menuOptions: information },
        });
      }
    },
    *queryTable({ payload }, { put, call, select }) {
      const { type } = yield select(state => state['ordersCenter']);
      const { success, information, pagination } = yield call(commonPost, {
        ...payload,
        url: Api.ORDERSCENTER.QUERY_ORDER_INFOS,
        type,
      });
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: { list: information, pagination },
        });
      }
    },
  },
});
