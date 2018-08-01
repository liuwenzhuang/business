import React, { Fragment } from 'react';
import { Form, Modal, Input, Radio, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './Modal.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const CtripModal = ({
  onCreateCompanyAccount,
  onBindCompanyAccount,
  onAdjustPreApproveMode,
  onSwitchToBind,
  onSwitchToCreate,
  loading,
  tenantName = '',
  adminName = '',
  adminPhone = '',
  isAccountBinding = false, // 是否是点击绑定
  isAdjustPreApprove = false, // 预定前审批调整，只有预定前审批可以编辑
  isPreApprove = '0',
  appKey = '',
  appSecurity = '',
  form: { getFieldDecorator, validateFields },
  ...modalProps
}) => {
  const createCompanyAccount = !isAccountBinding && !isAdjustPreApprove; // 创建企业账户状态
  const bindCompanyAccount = isAccountBinding && !isAdjustPreApprove; // 绑定企业账户状态
  const adjustPreApproveMode = isAdjustPreApprove; // 预定前审批调整状态

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      span: 24,
      offset: 0,
    },
  };

  const handleSubmit = event => {
    event.preventDefault();
    let fieldNames = [];
    // 不同状态下需要校验的表单不同
    if (createCompanyAccount) fieldNames = ['email', 'password', 'isPreApprove'];
    if (bindCompanyAccount) fieldNames = ['appKey', 'appSecurity', 'ctripCorpID', 'isPreApprove'];
    if (adjustPreApproveMode) fieldNames = ['isPreApprove'];
    validateFields(fieldNames, (err, values) => {
      if (!err) {
        createCompanyAccount && onCreateCompanyAccount(values);
        bindCompanyAccount && onBindCompanyAccount(values);
        adjustPreApproveMode && onAdjustPreApproveMode(values);
      }
    });
  };

  return (
    <Modal {...modalProps} title="第三方开通配置" footer={null} wrapClassName={styles.modal}>
      <Form onSubmit={event => handleSubmit(event)}>
        <FormItem {...formItemLayout} label="企业全称:">
          <span className="ant-form-text">{tenantName}</span>
        </FormItem>
        <FormItem {...formItemLayout} label="联系人:">
          <span className="ant-form-text">{adminName}</span>
        </FormItem>
        <FormItem {...formItemLayout} label="手机号:">
          <span className="ant-form-text">{adminPhone}</span>
        </FormItem>
        {createCompanyAccount ? (
          <Fragment>
            <FormItem {...formItemLayout} label="邮箱:">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: createCompanyAccount,
                    message: '请输入邮箱!',
                  },
                  {
                    type: 'email',
                    message: '请输入正确的邮箱!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="密码设置:">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: createCompanyAccount,
                    message: '请输入密码!',
                  },
                ],
              })(<Input type="password" />)}
            </FormItem>
          </Fragment>
        ) : null}
        {bindCompanyAccount ? (
          <Fragment>
            <FormItem {...formItemLayout} label="App Key:">
              {getFieldDecorator('appKey', {
                rules: [
                  {
                    required: bindCompanyAccount,
                    message: '请输入App Key!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="App Security:">
              {getFieldDecorator('appSecurity', {
                rules: [
                  {
                    required: bindCompanyAccount,
                    message: '请输入App Security!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="携程公司ID:">
              {getFieldDecorator('ctripCorpID', {
                rules: [
                  {
                    required: bindCompanyAccount,
                    message: '请输入携程公司ID!',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Fragment>
        ) : null}
        <FormItem {...formItemLayout} label="预定前审批:">
          {getFieldDecorator('isPreApprove', {
            initialValue: isPreApprove,
          })(
            <RadioGroup>
              <Radio value="0">否</Radio>
              <Radio value="1">是</Radio>
            </RadioGroup>
          )}
        </FormItem>
        {createCompanyAccount ? (
          <Fragment>
            <FormItem {...tailFormItemLayout}>
              <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                创建企业账户
              </Button>
            </FormItem>
            <FormItem>
              <span className="ant-form-text">企业已拥有友报账商旅账户，请</span>
              {
                // eslint-disable-next-line
                <a href="javascript:void(0)" onClick={onSwitchToBind}>
                  点击绑定
                </a>
              }
            </FormItem>
          </Fragment>
        ) : null}
        {bindCompanyAccount ? (
          <Fragment>
            <FormItem {...tailFormItemLayout}>
              <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                绑定企业账户
              </Button>
            </FormItem>
            <FormItem>
              <span className="ant-form-text">
                以上信息一旦提交，无法修改，如需变更，请联系友报账客服。
              </span>
              {
                // eslint-disable-next-line
                <a href="javascript:void(0)" onClick={onSwitchToCreate}>
                  返回申请开通
                </a>
              }
            </FormItem>
          </Fragment>
        ) : null}
        {adjustPreApproveMode ? (
          <Fragment>
            <FormItem {...tailFormItemLayout}>
              <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                调整企业账户预定审批模式
              </Button>
            </FormItem>
            <FormItem>
              <span className="ant-form-text">
                以上信息一旦提交，无法修改，如需变更，请联系友报账客服。
              </span>
            </FormItem>
          </Fragment>
        ) : null}
      </Form>
    </Modal>
  );
};

CtripModal.propTypes = {
  onCreateCompanyAccount: PropTypes.func,
  onBindCompanyAccount: PropTypes.func,
  onAdjustPreApproveMode: PropTypes.func,
  onSwitchToBind: PropTypes.func,
  onSwitchToCreate: PropTypes.func,
  tenantName: PropTypes.string,
  adminName: PropTypes.string,
  adminPhone: PropTypes.string,
  appKey: PropTypes.string,
  appSecurity: PropTypes.string,
  loading: PropTypes.object,
  isAccountBinding: PropTypes.bool,
  isAdjustPreApprove: PropTypes.bool,
};

export default Form.create()(CtripModal);
