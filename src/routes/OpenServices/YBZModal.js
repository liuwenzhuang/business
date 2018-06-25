import React from 'react';
import { Form, Modal, Input, Radio, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './YBZModal.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const YBZModal = ({
  onAccountBind,
  loading,
  tenantName = '',
  adminPhone = '',
  form,
  ...modalProps
}) => {
  const { getFieldDecorator } = form;
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
    form.validateFields((err, values) => {
      if (!err) {
        onAccountBind(values);
      }
    });
  };

  return (
    <Modal {...modalProps} title="第三方开通配置" footer={null} wrapClassName={styles.modal}>
      <Form onSubmit={event => handleSubmit(event)}>
        <FormItem {...formItemLayout} label="企业公钥(EntPubKey):">
          {getFieldDecorator('pubKey', {
            rules: [
              {
                required: true,
                message: '请输入企业公钥(EntPubKey)!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="企业编号(EntID):">
          {getFieldDecorator('entID', {
            rules: [
              {
                required: true,
                message: '请输入企业编号(EntID)!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="功能代码(FunCode):">
          {getFieldDecorator('funCode', {
            rules: [
              {
                required: true,
                message: '请输入功能代码(FunCode)!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="友报账租户全称:">
          <span className="ant-form-text">{tenantName}</span>
        </FormItem>
        <FormItem {...formItemLayout} label="联系人手机号:">
          <span className="ant-form-text">{adminPhone}</span>
        </FormItem>
        <FormItem {...formItemLayout} label="预定前审批:">
          {getFieldDecorator('isPreApprove', {
            initialValue: '0',
          })(
            <RadioGroup>
              <Radio value="0">否</Radio>
              <Radio value="1">是</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit" loading={loading}>
            绑定企业账户
          </Button>
        </FormItem>
        <FormItem>
          <span className="ant-form-text">
            以上信息一旦提交，无法修改，如需变更，请联系友报账客服。
          </span>
        </FormItem>
      </Form>
    </Modal>
  );
};

YBZModal.propTypes = {
  onAccountBind: PropTypes.func.isRequired,
  tenantName: PropTypes.string,
  loading: PropTypes.bool,
};

export default Form.create()(YBZModal);
