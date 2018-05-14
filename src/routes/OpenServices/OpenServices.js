import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import { Api, serverUrl } from '../../config';

class OpenServices extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 申请开通
   */
  applyOpen() {
    const { dispatch } = this.props;
    dispatch({
      type: 'service/effectGetWithModal',
      payload: {
        url: Api.SMECTRIP.REGISTER_COMPANY,
      },
    }).then(() => {
      dispatch({
        type: 'service/queryIsOpen',
        payload: {
          url: Api.SMECTRIP.IS_OPEN,
        },
      });
    });
  }

  /**
   * 后台设置
   */
  serverSet() {
    const { dispatch } = this.props;
    dispatch({
      type: 'service/setServers',
      payload: {
        url: Api.SMECTRIP.SSOLOGIN,
      },
    });
  }

  render() {
    const {
      service: { isOpen },
      loading,
    } = this.props;
    const dataSource = [
      {
        key: '001',
        serviceProvider: '携程商旅',
        isOpen,
      },
    ];
    const columns = [
      {
        title: '服务商',
        dataIndex: 'serviceProvider',
        key: 'serviceProvider',
      },
      {
        title: '开通状态',
        dataIndex: 'openStatus',
        key: 'openStatus',
        render: (text, record) => (
          // eslint-disable-next-line
          <a href="javascript: void(0);">{record.isOpen ? '已开通' : '未开通'}</a>
        ),
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => (
          <Button
            disabled={record.isOpen}
            type="primary"
            loading={loading.effects['service/effetcGetWithModal']}
            onClick={this.applyOpen.bind(this, record)}
          >
            申请开通
          </Button>
        ),
      },
      {
        title: '设置',
        dataIndex: 'set',
        key: 'set',
        render: (text, record) => (
          <Button
            disabled={!record.isOpen}
            type="primary"
            href={`${serverUrl}/smeCtrip/ssologin/pc`}
            target={'_blank'}
          >
            后台设置
          </Button>
        ),
      },
    ];
    return (
      <Fragment>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </Fragment>
    );
  }
}

export default connect(({ service, loading }) => ({ service, loading }))(OpenServices);
