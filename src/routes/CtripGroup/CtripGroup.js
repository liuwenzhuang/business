import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Table, Modal, Divider, Input, Popconfirm, Form } from 'antd';
import FooterToolbar from '../../components/FooterToolbar';
import TriggerInput from '../../components/TriggerInput';
import CtripGroupUser from './components/CtripGroupUser';
import { Api } from '../../config';
import { actionCreator } from '../../utils/utils';
import styles from './index.less';

const FormItem = Form.Item;

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    ) : (
      value
    )}
  </div>
);

class CtripGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isManagerEditable: false,
      selectedRowKeys: [],
      isUserPage: false, // 是否在人员页面
      isAddModal: false,
    };
    this.openUserPage = this.openUserPage.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUserPageReturn = this.handleUserPageReturn.bind(this);
    this.handleConfirmManager = this.handleConfirmManager.bind(this);
    this.handleAddGroup = this.handleAddGroup.bind(this);
    this.handleCancelAddGroup = this.handleCancelAddGroup.bind(this);

    this.singleSelectRow = null;
    this.cacheGroupsData = [];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps['ctripGroup'] && nextProps['ctripGroup']['cacheGroupsData']) {
      this.cacheGroupsData = nextProps['ctripGroup']['cacheGroupsData'].map(item => ({ ...item }));
    }
  }

  /**
   * 查询分组
   */
  queryGroups = () => {
    const { dispatch } = this.props;
    dispatch(actionCreator('ctripGroup/queryGroups'));
  }

  /**
   * 修改客户经理
   * @param {*} value
   */
  handleConfirmManager(value) {
    const { dispatch } = this.props;
    const action = actionCreator('ctripGroup/effectPostWithSucessModal', {
      info: value,
      url: Api.CTRIPGROUP.ADD_MANAGER,
    });
    dispatch(action).then(data => {
      this.setState({ isManagerEditable: false });
      const queryAction = actionCreator('ctripGroup/queryCtripClientManager');
      dispatch(queryAction);
    });
  }

  /**
   * 表格项修改事件
   * @param {*} e
   */
  openUserPage(record) {
    this.singleSelectRow = record;
    this.setState({
      isUserPage: true,
    });
  }

  /**
   * 选择行的回调事件
   * @param {*} selectedRowKeys 已选择的行
   */
  handleSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  /**
   * 删除
   */
  handleDelete() {
    const { selectedRowKeys } = this.state;
    const { dispatch } = this.props;
    if (!selectedRowKeys || !selectedRowKeys.length) {
      Modal.warn({
        title: '提示',
        content: '请选择分组后操作',
        onOk() {},
      });
      return;
    }
    const deleteAction = actionCreator('ctripGroup/effectPostWithSucessModal', {
      gId: selectedRowKeys,
      url: Api.CTRIPGROUP.DELETE_GROUP,
    });
    dispatch(deleteAction).then(() => {
      this.queryGroups();
    });
  }

  /**
   * 新增
   */
  handleAdd() {
    this.setState({ isAddModal: true });
  }

  /**
   * 处理用户子页面的返回按钮
   */
  handleUserPageReturn() {
    this.setState({
      isUserPage: false,
    });
  }

  handleEditableCellChange = (value, id, column) => {
    const {
      ctripGroup: { groups },
      dispatch,
    } = this.props;
    const newData = [...groups];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target[column] = value;
      dispatch({
        type: 'ctripGroup/save',
        payload: {
          groups: newData,
        },
      });
    }
  };

  editTableRow = id => {
    const {
      ctripGroup: { groups },
      dispatch,
    } = this.props;
    const newData = [...groups];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      dispatch({
        type: 'ctripGroup/save',
        payload: {
          groups: newData,
        },
      });
    }
  };

  saveTableRow = id => {
    const {
      ctripGroup: { groups },
      dispatch,
    } = this.props;
    const newData = [...groups];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      const { name, note, id } = target;
      dispatch(
        actionCreator('ctripGroup/effectPostWithSucessModal', {
          gName: name,
          gNote: note,
          gId: id,
          url: Api.CTRIPGROUP.UPDATE_GROUP,
        })
      ).then(() => {
        this.queryGroups();
      });
    }
  };

  cancelEditTableRow = id => {
    const {
      ctripGroup: { groups },
      dispatch,
    } = this.props;
    const newData = [...groups];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      Object.assign(target, this.cacheGroupsData.filter(item => id === item.id)[0]);
      delete target.editable;
      dispatch({
        type: 'ctripGroup/save',
        payload: {
          groups: newData,
        },
      });
    }
  };

  renderColumns = (text, record, column) => {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleEditableCellChange(value, record.id, column)}
      />
    );
  };

  generateColumns = () => {
    let columns = [
      {
        title: '分组名称',
        dataIndex: 'name',
        render: (text, record) => this.renderColumns(text, record, 'name'),
      },
      {
        title: '备注',
        dataIndex: 'note',
        render: (text, record) => this.renderColumns(text, record, 'note'),
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {editable ? (
                <span>
                  <a onClick={() => this.saveTableRow(record.id)} style={{ marginRight: '8px' }}>
                    保存
                  </a>
                  <Popconfirm
                    title="确定取消?"
                    onConfirm={() => this.cancelEditTableRow(record.id)}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.editTableRow(record.id)}>修改</a>
              )}
              <Divider type="vertical" />
              {
                <span>
                  人员（<a onClick={() => this.openUserPage(record.id)}>{record.num}</a>）
                </span>
              }
            </div>
          );
        },
      },
    ];
    return columns;
  };

  handleAddGroup() {
    const { form, dispatch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const { groupName, groupNote } = fieldsValue;
      dispatch(
        actionCreator('ctripGroup/effectPostWithSucessModal', {
          gName: groupName,
          gNote: groupNote,
          url: Api.CTRIPGROUP.ADD_GROUP
        })
      ).then(data => {
        this.setState({ isAddModal: false });
        this.queryGroups();
      });
    });
  }

  handleCancelAddGroup() {
    this.setState({ isAddModal: false });
  }

  generateAddModal = () => {
    const { isAddModal } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <Modal
        visible={isAddModal}
        title="新增分组"
        destroyOnClose={true}
        onOk={this.handleAddGroup}
        onCancel={this.handleCancelAddGroup}
      >
        <Form onSubmit={this.handleAddGroup} layout="horizontal">
          <FormItem label="分组名称" {...formItemLayout}>
            {getFieldDecorator('groupName', {
              rules: [
                {
                  required: true,
                  message: '请输入分组名称',
                },
              ],
            })(<Input placeholder="请输入分组名称" />)}
          </FormItem>
          <FormItem label="分组备注" {...formItemLayout}>
            {getFieldDecorator('groupNote')(
              <Input.TextArea rows={4} placeholder="请输入分组备注" />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  };

  render() {
    const {
      ctripGroup: { groups, manager },
      loading,
    } = this.props;
    const { selectedRowKeys, isUserPage, isManagerEditable } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectChange,
    };
    let columns = this.generateColumns();
    const addModal = this.generateAddModal();
    let content = !isUserPage ? (
      <div className={styles.ctripGroup}>
        <TriggerInput
          buttonText="客户经理维护"
          onConfirm={this.handleConfirmManager}
          editable={isManagerEditable}
          defaultValue={manager.info}
        />
        <Table
          columns={columns}
          dataSource={groups}
          rowSelection={rowSelection}
          rowKey={record => record.id}
          pagination={false}
          loading={loading.effects['ctripGroup/queryGroups']}
        />
        <FooterToolbar>
          <Button type="primary" onClick={this.handleDelete}>
            删除
          </Button>
          <Button type="primary" onClick={this.handleAdd}>
            新增
          </Button>
        </FooterToolbar>
        {!!addModal && addModal}
      </div>
    ) : (
      <CtripGroupUser
        group={this.singleSelectRow}
        groups={groups}
        onReturnButton={this.handleUserPageReturn}
      />
    );
    return content;
  }
}

export default connect(({ ctripGroup, loading }) => ({
  ctripGroup,
  loading,
}))(Form.create()(CtripGroup));
