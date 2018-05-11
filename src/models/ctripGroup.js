import { pageModel } from './common';
import modelExtend from 'dva-model-extend';

import {
  getGroups,
  getUserTable,
  getCtripClientManager,
  addGroup,
  getGroupUserTable,
  addGroupUsers,
  deleteGroupUsers,
  commonPost,
} from '../services/ctripGroup';

const ctripGroupModel = modelExtend(pageModel, {
  namespace: 'ctripGroup',

  state: {
    groups: [],
    cacheGroupsData: [],
    manager: {
      id: '',
      info: '',
    },
    groupUserTable: {
      list: [],
      pagination: {},
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(({ pathname, search }) => {
        if (pathname === '/ctripgroup') {
          dispatch({
            type: 'queryGroups',
            payload: {},
          });
          dispatch({
            type: 'queryCtripClientManager',
            payload: {},
          });
        }
      });
    },
  },

  effects: {
    *queryCtripClientManager({ payload }, { call, put }) {
      const response = yield call(getCtripClientManager);
      const { success, information } = response;
      if (!success) return;
      yield put({
        type: 'save',
        payload: { manager: information },
      });
    },

    *queryGroups({ payload }, { call, put }) {
      const response = yield call(getGroups);
      const { success, information } = response;
      if (!success) return;
      yield put({
        type: 'save',
        payload: {
          groups: information,
          cacheGroupsData: information.map(item => ({ ...item })),
        },
      });
    },

    *addGroup({ payload }, { call, put }) {
      const response = yield call(addGroup, payload);
      const { success } = response;
      if (!success) throw response;
      yield put({ type: 'queryGroups' });
      return response;
    },

    *queryUserTable({ payload }, { call, put }) {
      const response = yield call(getUserTable, payload);
      const { success, information, pagination } = response;
      if (!success) return;
      yield put({
        type: 'querySuccess',
        payload: {
          list: information,
          pagination,
        },
      });
    },

    *updateNote({ payload }, { call, put }) {
      const { success, information } = yield call(commonPost, payload);
      if (!success) throw information;
      yield put({
        type: 'showSuccessModal',
        payload: {
          title: '提示',
          content: information,
        },
      });
      return information;
    },

    *addGroupUsers({ payload }, { call, put }) {
      const { success, information } = yield call(addGroupUsers, payload);
      if (!success) throw information;
      yield put({
        type: 'showSuccessModal',
        payload: {
          title: '提示',
          content: information,
        },
      });
      return information;
    },

    *queryGroupUserTable({ payload }, { call, put }) {
      const { success, information, pagination } = yield call(getGroupUserTable, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            groupUserTable: {
              list: information,
              pagination,
            },
          },
        });
      }
    },

    *deleteGroupUsers({ payload }, { call, put }) {
      const { success, information } = yield call(deleteGroupUsers, payload);
      if (success) {
        yield put({
          type: 'showSuccessModal',
          payload: {
            title: '提示',
            content: information,
          },
        });
        return information;
      }
    },

    *adjustGroup({ payload }, { call, put }) {
      const { success, information } = yield call(commonPost, payload);
      if (success) {
        yield put({
          type: 'showSuccessModal',
          payload: {
            title: '提示',
            content: information,
          },
        });
        return information;
      }
    },

    *export({ payload }, { call, put }) {
      const response = yield call(commonPost, payload);
      return response;
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export default ctripGroupModel;
