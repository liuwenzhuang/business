import modelExtend from 'dva-model-extend';
import { Modal } from 'antd';
import { commonPost } from '../services/api';

const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },

  effects: {
    *effectPostWithSucessModal({ payload }, { call, put }) {
      const { success, information } = yield call(commonPost, payload);
      console.log(success, information);
      if (!success) throw information;
      Modal.info({
        title: '提示',
        content: information,
      });
      return information;
    },

    *showSuccessModal({ payload }) {
      const { title = '提示', content = '操作成功' } = payload;
      Modal.info({
        title,
        content,
      });
      yield true;
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { list, pagination } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      };
    },
  },
});

export { model, pageModel };
