import { pageModel } from './common';
import modelExtend from 'dva-model-extend';
import { commonGet, commonPost } from '../services/api';
import { Modal } from 'antd';
import React from 'react';
import { Api } from '../config';

export default modelExtend(pageModel, {
  namespace: 'service',

  state: {
    data: {
      tenantInfo: {
        tenantName: '',
        tenantId: '',
        adminName: '',
        adminPhone: '',
      },
      ctripSme: {
        isOpen: false,
        isPreApprove: '0',
      },
      rtpnr: {
        orgs: [],
      },
    },
    rtpnrIsOpen: false,
    orgpk: '',
    isYBZModalVisible: false,
    isCtripModalVisible: false,
    isCtripAccountBinding: false,
    isCtripAdjustPreApprove: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(({ pathname, search }) => {
        if (pathname === '/openservices') {
          dispatch({
            type: 'query',
            payload: {
              url: Api.SERVICE.QUERY,
            },
          });
        }
      });
    },
  },

  effects: {
    *query({ payload = { url: Api.SERVICE.QUERY } }, { call, put }) {
      const { success, data } = yield call(commonGet, payload);
      if (success) {
        let rtpnrIsOpen = false;
        let orgpk = '';
        const { rtpnr } = data;
        let orgs = rtpnr && rtpnr.orgs ? rtpnr.orgs : [];
        if (orgs.length) {
          rtpnrIsOpen = orgs[0]['isOpen'];
          orgpk = orgs[0]['id'];
        }
        yield put({
          type: 'updateState',
          payload: { data, rtpnrIsOpen, orgpk },
        });
      }
    },

    /**
     * 携程开通相关操作之后的操作
     */
    *ctripCommon({ payload }, { put }) {
      const { information } = payload;
      // 关闭弹窗
      yield put({
        type: 'updateState',
        payload: {
          isCtripModalVisible: false,
          isCtripAccountBinding: false,
          isCtripAdjustPreApprove: false,
        },
      });
      // 成功提示
      yield put({
        type: 'showSuccessModal',
        payload: { title: '提示', content: information },
      });
      // 重新加载列表
      yield put({ type: 'query' });
    },

    /**
     * 创建企业账户
     */
    *ctripCreateCompanyAccount({ payload }, { call, put }) {
      const { success, information } = yield call(commonGet, payload);
      if (success) {
        yield put({
          type: 'ctripCommon',
          payload: { information },
        });
      }
    },

    /**
     * 绑定企业账户
     */
    *ctripBindCompanyAccount({ payload }, { call, put }) {
      const { success, information } = yield call(commonPost, payload);
      if (success) {
        yield put({
          type: 'ctripCommon',
          payload: { information },
        });
      }
    },

    /**
     * 调整预定审批模式
     */
    *ctripAdjustPreApproveMode({ payload }, { call, put }) {
      const { success, information } = yield call(commonGet, payload);
      if (success) {
        yield put({
          type: 'ctripCommon',
          payload: { information },
        });
      }
    },

    *applyAccountBind({ payload }, { call, put }) {
      const { success, information } = yield call(commonPost, payload);
      if (success) {
        // 关闭弹窗
        yield put({
          type: 'updateState',
          payload: { isYBZModalVisible: false },
        });
        // 成功提示
        yield put({
          type: 'showSuccessModal',
          payload: { title: '提示', content: information },
        });
        // 重新加载列表
        yield put({ type: 'query' });
      }
    },

    *rtpnrServerSet({ payload }, { call }) {
      const { success, data } = yield call(commonPost, payload);
      if (success) {
        const { url } = data;
        let isUrlBlock = false;
        try {
          const winRef = window.open(url, '_blank');
          if (!winRef) isUrlBlock = true;
        } catch (e) {
          isUrlBlock = true;
        }
        if (isUrlBlock) {
          Modal.warn({
            title: '提示',
            content: React.createElement('div', null, [
              `检测到浏览器拦截了弹出窗口，请允许此页面弹出窗口或`,
              React.createElement('a', { target: '_blank', href: url, key: url }, '直接进入'),
            ]),
          });
        }
      }
    },
  },
});
