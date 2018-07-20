import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'dva';
import { PLANE, HOTEL, TRAIN, CAR, OTHER, DATA } from './Constants';
import QueryCard from './QueryCard';
import ResultTable from './ResultTable';
import styles from './index.less';

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

  const { isSearchCardExpand, searchTypes, columns, list, pagination } = ordersCenter;

  const handleTabsChange = key => {
    dispatch({
      type: 'ordersCenter/updateState',
      payload: {searchTypes: DATA[key]['SEARCH_TYPES']},
    });
  };

  const queryCardProps = {
    searchTypes,
    isSearchCardExpand,
    onFormReset() {
      console.log('form reset');
    },
    onExpand() {
      dispatch({
        type: 'ordersCenter/updateState',
        payload: {isSearchCardExpand: true},
      });
    },
    onShrink() {
      dispatch({
        type: 'ordersCenter/updateState',
        payload: {isSearchCardExpand: false},
      });
    },
    onSearch(values) {
      console.log('查询操作', values);
    }
  };

  const tableProps = {
    columns,
    list,
    pagination,
  };

  return (
    <div className={styles.ordersCenter}>
      <Tabs defaultActiveKey={PLANE} onChange={handleTabsChange}>
        {ORDER_TYPES.map(type => {
          const { tab, key } = type;
          return (
            <TabPane tab={tab} key={key}>
              <QueryCard
                type={key}
                {...queryCardProps}
              />
              <ResultTable {...tableProps} />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default connect(({ ordersCenter, loading }) => ({ ordersCenter, loading }))(OrdersCenter);
