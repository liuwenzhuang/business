import { pageModel } from './common';
import modelExtend from 'dva-model-extend';
import { commonGet } from '../services/api';
import { Api } from '../config';

export default modelExtend(pageModel, {
  namespace: 'service',

  state: {
    isOpen: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(({ pathname, search }) => {
        if (pathname === '/openservices') {
          dispatch({
            type: 'queryIsOpen',
            payload: {
              url: Api.SMECTRIP.IS_OPEN,
            },
          });
        }
      });
    },
  },

  effects: {
    *queryIsOpen({ payload = { url: Api.SMECTRIP.IS_OPEN } }, { call, put }) {
      const { success, data } = yield call(commonGet, payload);
      if (success) {
        const { isOpen } = data;
        yield put({
          type: 'updateState',
          payload: { isOpen },
        });
      }
    },
  },
});
