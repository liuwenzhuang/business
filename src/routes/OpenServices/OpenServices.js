import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Table, Select } from 'antd';
import { Api, serverUrl } from '../../config';
import YBZModal from './YBZModal';
import CtripModal from './CtripModal';

const Option = Select.Option;

const SERVICE_MAPPING = {
  CTRIP: 'ctripSme',
  RTPNR: 'rtpnr',
};

const OpenServices = ({ dispatch, service, loading }) => {
  const {
    data,
    rtpnrIsOpen,
    orgpk,
    isYBZModalVisible,
    isCtripModalVisible,
    isCtripAccountBinding,
    isCtripAdjustPreApprove,
  } = service;
  const { ctripSme, rtpnr, tenantInfo } = data;
  const { isPreApprove } = ctripSme;
  const { tenantName, adminPhone, tenantId, adminName } = tenantInfo;

  // 操作列动作映射
  const APPLY_FUNCTION_MAPPING = {
    [`apply${SERVICE_MAPPING.CTRIP}`](record) {
      dispatch({
        type: 'service/updateState',
        payload: {
          isCtripModalVisible: true,
        },
      });
    },
    [`apply${SERVICE_MAPPING.RTPNR}`](record) {
      dispatch({
        type: 'service/updateState',
        payload: {
          isYBZModalVisible: true,
        },
      });
    },
  };

  // 开通状态列 渲染映射
  const IS_OPEN_RENDER_MAPPING = {
    /* eslint-disable */
    [`render${SERVICE_MAPPING.CTRIP}`](record) {
      return <a href="javascript: void(0);">{record.isOpen ? '已开通' : '未开通'}</a>;
    },
    [`render${SERVICE_MAPPING.RTPNR}`](record) {
      let { orgs } = rtpnr;
      let defaultValue = orgs.length ? orgs[0]['id'] : '';
      return (
        <Fragment>
          {defaultValue ? (
            <Select
              style={{ width: '100px', marginRight: '12px' }}
              defaultValue={defaultValue}
              onChange={handleOrgChange}
            >
              {orgs.map(org => (
                <Option key={org.id} value={org.id} isOpen={org.isOpen}>
                  {org.name}
                </Option>
              ))}
            </Select>
          ) : null}
          <a href="javascript: void(0);">{rtpnrIsOpen ? '已开通' : '未开通'}</a>
        </Fragment>
      );
    },
    /* eslint-enable */
  };

  // 后台设置列 渲染映射
  const SET_FUNCTION_MAPPING = {
    [`set${SERVICE_MAPPING.CTRIP}`](record) {
      return (
        <Fragment>
        <Button
          disabled={!record.isOpen}
          type="primary"
          href={`${serverUrl}${Api.SMECTRIP.SSOLOGIN}`}
          target={'_blank'}
        >
          后台设置
        </Button>
        {
          record.isOpen && (
            <Button
              type="primary"
              onClick={handleCtripAdjustPreApproveMode}
              style={{marginLeft: 12}}
            >
              预定前审批调整
            </Button>
          )
        }
        </Fragment>
      );
    },
    [`set${SERVICE_MAPPING.RTPNR}`](record) {
      return (
        <Button type="primary" disabled={!record.isOpen} onClick={handleRtpnrServerSet}>
          后台设置
        </Button>
      );
    },
  };

  /**
   * 携程预定前审批调整
   */
  const handleCtripAdjustPreApproveMode = () => {
    dispatch({
      type: 'service/updateState',
      payload: { isCtripModalVisible: true, isCtripAdjustPreApprove: true }
    });
  };

  /**
   * 友报账商旅行 后台设置
   */
  const handleRtpnrServerSet = () => {
    dispatch({
      type: 'service/rtpnrServerSet',
      payload: {
        url: Api.SERVICE.RTPNR_SERVER_SET,
        tenantId,
        orgpk,
        adminPhone,
      },
    });
  };

  /**
   * 友报账商旅行 组织切换时间
   * @param {*} value
   * @param {*} option
   */
  const handleOrgChange = (value, option) => {
    const isOpen = option.props.isOpen;
    dispatch({
      type: 'service/updateState',
      payload: {
        rtpnrIsOpen: isOpen,
        orgpk: value,
      },
    });
  };

  const dataSource = [
    {
      key: SERVICE_MAPPING['CTRIP'],
      serviceProvider: '携程商旅',
      isOpen: ctripSme.isOpen,
    },
    {
      key: SERVICE_MAPPING['RTPNR'],
      serviceProvider: '友报账商旅',
      isOpen: rtpnrIsOpen,
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
      render: (text, record) => IS_OPEN_RENDER_MAPPING[`render${record.key}`](record),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <Button
          disabled={record.isOpen}
          type="primary"
          onClick={() => APPLY_FUNCTION_MAPPING[`apply${record.key}`](record)}
        >
          申请开通
        </Button>
      ),
    },
    {
      title: '设置',
      dataIndex: 'set',
      key: 'set',
      render: (text, record) => SET_FUNCTION_MAPPING[`set${record.key}`](record),
    },
  ];

  const modalProps = {
    destroyOnClose: true,
    loading,
    tenantName,
    adminPhone,
    adminName,
  };

  const YBZModalProps = {
    ...modalProps,
    visible: isYBZModalVisible,
    loading: loading.effects['service/applyAccountBind'],
    onCancel() {
      dispatch({
        type: 'service/updateState',
        payload: {
          isYBZModalVisible: false,
        },
      });
    },
    onAccountBind(values) {
      dispatch({
        type: 'service/applyAccountBind',
        payload: {
          ...values,
          tenantName,
          adminPhone,
          orgpk,
          url: Api.SERVICE.OPEN_RTPNR,
        },
      });
    },
  };

  let CtripModalProps = {
    ...modalProps,
    visible: isCtripModalVisible,
    isAccountBinding: isCtripAccountBinding,
    isAdjustPreApprove: isCtripAdjustPreApprove,
    isPreApprove,
    onSwitchToBind() {
      dispatch({
        type: 'service/updateState',
        payload: {
          isCtripAccountBinding: true,
        },
      });
    },
    onSwitchToCreate() {
      dispatch({
        type: 'service/updateState',
        payload: {
          isCtripAccountBinding: false,
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'service/updateState',
        payload: {
          isCtripModalVisible: false,
          isCtripAccountBinding: false,
          isCtripAdjustPreApprove: false,
        },
      });
    },
    onCreateCompanyAccount(values) {
      dispatch({
        type: 'service/ctripCreateCompanyAccount',
        payload: {
          ...values,
          url: Api.SMECTRIP.REGISTER_COMPANY,
        }
      });
    },
    onBindCompanyAccount(values) {
      dispatch({
        type: 'service/ctripBindCompanyAccount',
        payload: {
          ...values,
          url: Api.SMECTRIP.BIND_COMPANY,
        }
      });
    },
    onAdjustPreApproveMode({isPreApprove}) {
      dispatch({
        type: 'service/ctripAdjustPreApproveMode',
        payload: {
          authorizeType: isPreApprove,
          url: Api.SMECTRIP.CHANGE_AUTHORIZE_TYPE
        }
      })
    }
  };

  return (
    <Fragment>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <YBZModal {...YBZModalProps} />
      <CtripModal {...CtripModalProps} />
    </Fragment>
  );
};

export default connect(({ service, loading }) => ({ service, loading }))(OpenServices);
