import React from 'react';
import { Tabs, Modal } from 'antd';
import { connect } from 'dva';
import { PLANE, HOTEL, TRAIN, CAR, OTHER, DATA } from './Constants';
import QueryCard from './QueryCard';
import ResultTable from './ResultTable';
import styles from './index.less';
import ColumnsModal from './ColumnsModal';
import { serverUrl, Api } from '../../config';
import { stringify } from 'querystring';

const TabPane = Tabs.TabPane;
const ORDER_TYPES = [
  {
    key: PLANE,
    tab: '机票',
  },
  {
    key: HOTEL,
    tab: '酒店',
  },
  {
    key: TRAIN,
    tab: '火车',
  },
  {
    key: CAR,
    tab: '用车',
  },
  {
    key: OTHER,
    tab: '其他',
  },
];

const OrdersCenter = ({ dispatch, ordersCenter, loading }) => {
  const {
    type,
    isSearchCardExpand,
    searchTypes,
    searchValues,
    menuOptions,
    columns,
    list,
    pagination,
    modalVisible,
  } = ordersCenter;

  const handleTabsChange = key => {
    dispatch({
      type: 'ordersCenter/updateState',
      payload: {
        type: key,
        searchTypes: [...DATA[key]['SEARCH_TYPES']],
        columns: [...DATA[key]['COLUMNS']],
      },
    });
    dispatch({ type: 'ordersCenter/queryTable' });
  };

  const queryCardProps = {
    searchTypes,
    isSearchCardExpand,
    menuOptions,
    onFormReset() {
      console.log('form reset');
    },
    onExpand() {
      dispatch({
        type: 'ordersCenter/updateState',
        payload: { isSearchCardExpand: true },
      });
    },
    onShrink() {
      dispatch({
        type: 'ordersCenter/updateState',
        payload: { isSearchCardExpand: false },
      });
    },
    onSearch(values) {
      console.log('查询操作', values);
      dispatch({
        type: 'ordersCenter/updateState',
        payload: { searchValues: values },
      });
      dispatch({
        type: 'ordersCenter/queryTable',
        payload: {
          type,
          current: 1,
          pageSize: 10,
          ...values,
        },
      });
    },
  };

  const tableProps = {
    columns: [...columns].filter(item => item.checked),
    list,
    pagination,
    loading: loading.effects['ordersCenter/queryTable'],
    onChange: pagination => {
      const { current, pageSize } = pagination;
      dispatch({
        type: 'ordersCenter/queryTable',
        payload: {
          type,
          current,
          pageSize,
          ...searchValues,
        },
      });
    },
    onDownload() {
      const url = `${serverUrl}${Api.ORDERSCENTER.EXPORT_ORDER}?${encodeURI(stringify({
        type,
        ...searchValues,
      }))}`;
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
    },
    onTableManage() {
      dispatch({
        type: 'ordersCenter/showModal',
      });
    },
  };

  const modalProps = {
    visible: modalVisible,
    title: '请勾选需要在列表中显示的订单明细',
    destroyOnClose: true,
    width: '90%',
    columns,
    onOK(columns) {
      dispatch({
        type: 'ordersCenter/updateState',
        payload: {
          columns,
          modalVisible: false,
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'ordersCenter/hideModal',
      });
    },
  };

  return (
    <div className={styles.ordersCenter}>
      <Tabs defaultActiveKey={PLANE} onChange={handleTabsChange}>
        {ORDER_TYPES.map(type => {
          const { tab, key } = type;
          return (
            <TabPane tab={tab} key={key} disabled={key !== PLANE}>
              <QueryCard type={key} {...queryCardProps} />
              <ResultTable {...tableProps} />
            </TabPane>
          );
        })}
      </Tabs>
      <ColumnsModal {...modalProps} key={type} />
    </div>
  );
};

export default connect(({ ordersCenter, loading }) => ({ ordersCenter, loading }))(OrdersCenter);
