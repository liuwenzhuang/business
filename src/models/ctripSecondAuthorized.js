import {
  getOrgs,
  getUserTable,
  getDeptTable,
  updateDeptAuth,
  updateUserAuth,
} from '../services/ctrip';

export default {
  namespace: 'ctrip',

  state: {
    orgs: [],
    deptTable: {
      list: [],
      pagination: {},
    },
    userTable: {
      list: [],
      pagination: {},
    },
    authorizedUserTable: {
      list: [],
      pagination: {},
    },
    modalVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(({ pathname, search }) => {
        if (pathname === '/ctripsecondauthorized') {
          dispatch({
            type: 'queryOrgs',
            payload: {},
          });
          dispatch({
            type: 'queryDeptTable',
            payload: {
              current: 1,
              pageSize: 10,
            },
          });
          dispatch({
            type: 'queryUserTable',
            payload: {
              current: 1,
              pageSize: 10,
            },
          });
        }
      });
    },
  },

  effects: {
    *queryOrgs({ payload }, { call, put }) {
      const response = yield call(getOrgs);
      const { success } = response;
      if (!success) return;
      yield put({
        type: 'save',
        payload: { orgs: response.information },
      });
    },

    *queryDeptTable({ payload }, { call, put }) {
      const response = yield call(getDeptTable, payload);
      const { success } = response;
      if (!success) return;
      yield put({
        type: 'save',
        payload: {
          deptTable: {
            list: response.information,
            pagination: response.pagination,
          },
        },
      });
    },

    *queryUserTable({ payload }, { call, put }) {
      const response = yield call(getUserTable, payload);
      const { success } = response;
      if (!success) return;
      yield put({
        type: 'save',
        payload: {
          userTable: {
            list: response.information,
            pagination: response.pagination,
          },
        },
      });
    },

    *queryAuthorizerTable({ payload }, { call, put }) {
      const response = yield call(getUserTable, payload);
      const { success } = response;
      if (!success) return;
      yield put({
        type: 'save',
        payload: {
          authorizedUserTable: {
            list: response.information,
            pagination: response.pagination,
          },
        },
      });
    },

    *updatedeptauth({ payload }, { call, put }) {
      const response = yield call(updateDeptAuth, payload);
      const { success } = response;
      if (!success) throw response;
      yield put({
        type: 'hideModal',
      });
    },

    *updateuserauth({ payload }, { call, put }) {
      const response = yield call(updateUserAuth, payload);
      const { success } = response;
      if (!success) throw response;
      yield put({
        type: 'hideModal',
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    hideModal(state) {
      return {
        ...state,
        modalVisible: false,
      };
    },

    showModal(state) {
      return {
        ...state,
        modalVisible: true,
      };
    },
  },
};
