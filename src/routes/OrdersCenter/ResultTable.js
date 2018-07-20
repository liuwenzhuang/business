import React, { Fragment } from 'react';
import { Table, Alert } from 'antd';
import PropTypes from 'prop-types';
import styles from './ResultTable.less';

const ResultTable = ({ columns, list, pagination, loading, ...tableProps }) => {
  return (
    <div className={styles.resultTable}>
      <Alert
        message={
          <Fragment>
            共筛选 <a style={{ fontWeight: 600 }}>{pagination.total}</a> 条信息
            <div className={styles.manage}>
              <a>下载</a>
              <a style={{ marginLeft: 16 }}>列表管理</a>
            </div>
          </Fragment>
        }
        type="info"
        showIcon
      />
      <Table
        columns={columns}
        loading={loading}
        dataSource={list}
        pagination={pagination}
        scroll={{x: 8000}}
        {...tableProps}
      />
    </div>
  );
};

ResultTable.propTypes = {
  columns: PropTypes.array,
  list: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
};

export default ResultTable;
