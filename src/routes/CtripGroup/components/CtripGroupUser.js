import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Row, Col, Input, Select, Divider, Modal, Form } from 'antd';
import { connect } from 'dva';
import FooterToolbar from '../../../components/FooterToolbar';
import StandardTable from '../../../components/StandardTable';
import { serverUrl } from '../../../config';
import { stringify } from 'qs';
import styles from './CtripGroupUser.less';

const Option = Select.Option;

class CtripGroupUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      groups: [],
      condition: '',
      idEditNote: false,
      note: '',
      isAddGroupUsers: false,
      groupUserSelectedRows: [],
      isAdjustGroup: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdjustGroup = this.handleAdjustGroup.bind(this);
    this.handleExportGroup = this.handleExportGroup.bind(this);
    this.handleExportSelectedUsers = this.handleExportSelectedUsers.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleViewNote = this.handleViewNote.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleCancelAddNote = this.handleCancelAddNote.bind(this);

    this.groupid = '';
    this.condition = '';
    this.singleSelectRow = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.group) {
      this.setState({
        group: nextProps.group,
      });
    }

    if (nextProps.groups) {
      this.setState({
        groups: nextProps.groups,
      });
    }
  }

  componentDidMount() {
    const { dispatch, group } = this.props;
    this.groupid = group;
    dispatch({
      type: 'ctripGroup/queryUserTable',
      payload: {
        current: 1,
        pageSize: 10,
        groupid: group,
        condition: '',
      },
    });
    dispatch({
      type: 'ctripGroup/queryGroupUserTable',
      payload: {
        current: 1,
        pageSize: 10,
        condition: '',
      },
    });
  }

  /**
   * 搜索
   * @param {*} value 搜索框值
   */
  handleSearch(value) {
    const condition = value ? value.trim() : '';
    const groupid = this.groupid;
    const { dispatch } = this.props;
    dispatch({
      type: 'ctripGroup/queryUserTable',
      payload: {
        current: 1,
        pageSize: 10,
        groupid,
        condition,
      },
    });
  }

  /**
   * 搜索框变化事件
   * @param {*} event
   */
  handleSearchInputChange(event) {
    this.condition = event.target.value;
  }

  /**
   * 分组下拉变化事件
   * @param {*} groupid
   */
  handleGroupChange(groupid) {
    this.groupid = groupid;
    const { dispatch } = this.props;
    let condition = this.condition ? this.condition.trim() : '';
    dispatch({
      type: 'ctripGroup/queryUserTable',
      payload: {
        current: 1,
        pageSize: 10,
        groupid,
        condition,
      },
    });
  }

  /**
   * 表格变化事件，包括分页的变化等
   * @param {*} pagination
   * @param {*} filters
   * @param {*} sorter
   */
  handleTableChange(pagination, filters, sorter) {
    const { current, pageSize } = pagination;
    const { dispatch } = this.props;
    const groupid = this.groupid;
    const condition = this.condition ? this.condition.trim() : '';
    dispatch({
      type: 'ctripGroup/queryUserTable',
      payload: {
        current,
        pageSize,
        groupid,
        condition,
      },
    });
  }

  handleSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  /**
   * 打开添加modal对话框
   */
  openNoteModal = record => {
    const { note = '' } = record;
    this.singleSelectRow = record;
    this.setState({
      isEditNote: true,
      note,
    });
  };

  /**
   * 备注文本框变化时间
   * @param {*} value
   */
  handleChangeNote(e) {
    this.setState({
      note: e.target.value,
    });
  }

  /**
   * 备注Modal的确定事件
   * @param {string} note 之前的备注
   */
  handleAddNote() {
    const { userid } = this.singleSelectRow;
    const { note } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'ctripGroup/updateNote',
      payload: {
        note,
        userid,
        url: '/ctrip/ctripGroupMember/updatenote',
      },
    }).then(data => {
      this.setState({ isEditNote: false });
      const groupid = this.groupid;
      const condition = this.condition ? this.condition.trim() : '';
      dispatch({
        type: 'ctripGroup/queryUserTable',
        payload: {
          current: 1,
          pageSize: 10,
          groupid,
          condition,
        },
      });
    });
  }

  /**
   * 关闭修改备注Modal
   */
  handleCancelAddNote() {
    this.setState({ isEditNote: false });
  }

  /**
   * 查看备注
   * @param {*} note
   */
  handleViewNote(note) {
    Modal.info({
      title: '备注',
      content: note,
    });
  }

  /**
   * 删除人员
   */
  handleDelete() {
    const { selectedRowKeys } = this.state;
    const { dispatch } = this.props;
    if (!selectedRowKeys || !selectedRowKeys.length) {
      Modal.warn({
        title: '提示',
        content: '请选择人员后操作',
        onOk() {},
      });
      return;
    }
    dispatch({
      type: 'ctripGroup/deleteGroupUsers',
      payload: {
        gid: this.groupid,
        userids: selectedRowKeys.map(userid => ({ userid })),
      },
    }).then(data => {
      const groupid = this.groupid;
      const condition = this.condition ? this.condition.trim() : '';
      dispatch({
        type: 'ctripGroup/queryUserTable',
        payload: {
          current: 1,
          pageSize: 10,
          groupid,
          condition,
        },
      });
    });
  }

  /************调整分组**********************/

  generateAdjustGroupModal = () => {
    const { isAdjustGroup } = this.state;
    const {
      groups,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Modal
        visible={isAdjustGroup}
        title="调整分组"
        destroyOnClose={true}
        onOk={this.handleConfirmAdjustGroup}
        onCancel={this.handleCancelAdjustGroup}
      >
        <Form onSubmit={this.handleConfirmAdjustGroup} layout="horizontal">
          <Form.Item>
            {getFieldDecorator('adjustGroup', {
              rules: [
                {
                  required: true,
                  message: '请选择分组',
                },
              ],
            })(
              <Select
                showSearch
                placeholder="请选择分组"
                style={{ width: '100%' }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {groups &&
                  groups.length &&
                  groups.map(item => (
                    <Option key={item['id']} value={item['id']}>
                      {item['name']}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  handleAdjustGroup = () => {
    const { selectedRowKeys } = this.state;
    if (!selectedRowKeys || !selectedRowKeys.length) {
      Modal.warn({
        title: '提示',
        content: '请选择人员后操作',
        onOk() {},
      });
      return;
    }
    this.setState({ isAdjustGroup: true });
  };

  handleCancelAdjustGroup = () => {
    this.setState({ isAdjustGroup: false });
  };

  /**
   * 调整分组
   */
  handleConfirmAdjustGroup = () => {
    const { selectedRowKeys } = this.state;
    const { form, dispatch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const { adjustGroup } = fieldsValue;
      dispatch({
        type: 'ctripGroup/adjustGroup',
        payload: {
          url: '/ctrip/ctripGroupMember/updategid',
          gid: adjustGroup,
          userids: selectedRowKeys.map(userid => ({ userid })),
        },
      }).then(data => {
        this.setState({ isAdjustGroup: false });
        const groupid = this.groupid;
        const condition = this.condition ? this.condition.trim() : '';
        dispatch({
          type: 'ctripGroup/queryUserTable',
          payload: {
            current: 1,
            pageSize: 10,
            groupid,
            condition,
          },
        });
      });
    });
  };

  /************调整分组**********************/

  /************导出功能*********************/

  /**
   * 导出组用户，没选组时导出所有用户，神奇的需求
   */
  handleExportGroup() {
    const groupid = this.groupid;
    const payload = {
      gid: groupid || '0',
      type: '1',
    };
    window.open(`${serverUrl}/ctrip/ctripGroupMember/export?${stringify(payload)}`, '_blank');
  }

  /**
   * 导出所选用户
   */
  handleExportSelectedUsers() {
    const { selectedRowKeys } = this.state;
    if (!selectedRowKeys || !selectedRowKeys.length) {
      Modal.warn({
        title: '提示',
        content: '请选择人员后操作',
        onOk() {},
      });
      return;
    }
    const payload = {
      type: '0',
      userids: selectedRowKeys.join(','),
    };
    window.open(`${serverUrl}/ctrip/ctripGroupMember/export?${stringify(payload)}`, '_blank');
  }

  /************导出功能*********************/

  /************添加组用户***********************/

  generateGroupUserModal = () => {
    const {
      ctripGroup: { groupUserTable },
      loading,
    } = this.props;
    const { isAddGroupUsers } = this.state;
    const columns = [
      {
        title: '用户编码',
        dataIndex: 'userid',
        key: 'userid',
      },
      {
        title: '用户名称',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '部门',
        dataIndex: 'depart',
        key: 'depart',
      },
      {
        title: '职务',
        dataIndex: 'pcode',
        key: 'pcode',
      },
    ];
    return (
      <Modal
        visible={isAddGroupUsers}
        title="添加组用户"
        width={'90%'}
        destroyOnClose={true}
        onOk={this.handleAddGroupUsers}
        onCancel={this.handleCancelAddGroupUsers}
      >
        <StandardTable
          data={groupUserTable}
          columns={columns}
          loading={loading.effects['ctrip/queryGroupUserTable']}
          rowKey={record => record.userid}
          onSelectRow={this.handleGroupUserTableSelectChange}
          multiple={true}
          onChange={this.handleModalTableChange}
          onSearch={this.handleModalTableSearch}
        />
      </Modal>
    );
  };

  handleGroupUserTableSelectChange = selectedRows => {
    this.setState({
      groupUserSelectedRows: selectedRows,
    });
  };

  handleModalTableChange = (pagination, filters, sorter, condition) => {
    const { current, pageSize } = pagination;
    const { dispatch } = this.props;
    dispatch({
      type: 'ctripGroup/queryGroupUserTable',
      payload: {
        current,
        pageSize,
        condition,
      },
    });
  };

  handleModalTableSearch = (condition = '') => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ctripGroup/queryGroupUserTable',
      payload: {
        current: 1,
        pageSize: 10,
        condition,
      },
    });
  };

  handleAdd() {
    if (!this.groupid) {
      Modal.warn({
        title: '提示',
        content: '请选择分组后进行操作',
      });
      return;
    }
    this.setState({ isAddGroupUsers: true });
  }

  handleAddGroupUsers = () => {
    const { groupUserSelectedRows } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'ctripGroup/addGroupUsers',
      payload: {
        gid: this.groupid,
        users: groupUserSelectedRows,
      },
    }).then(
      data => {
        this.setState({ isAddGroupUsers: false });
        const groupid = this.groupid;
        const condition = this.condition ? this.condition.trim() : '';
        dispatch({
          type: 'ctripGroup/queryUserTable',
          payload: {
            current: 1,
            pageSize: 10,
            groupid,
            condition,
          },
        });
      },
      err => {
        console.log(err);
      }
    );
  };

  handleCancelAddGroupUsers = () => {
    this.setState({ isAddGroupUsers: false });
  };

  /************添加组用户***********************/

  render() {
    const { ctripGroup, group, groups, onReturnButton, loading } = this.props;
    const { list, pagination } = ctripGroup;
    const { isEditNote, note, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectChange,
    };
    const columns = [
      {
        title: '姓名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '工号',
        dataIndex: 'pcode',
        key: 'pcode',
      },
      {
        title: '分组',
        dataIndex: 'groupname',
        key: 'groupname',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => (
          <span>
            {
              // eslint-disable-next-line
              <a href="javascript:void(0);" onClick={this.openNoteModal.bind(this, record)}>
                备注
              </a>
            }
            {record.note ? (
              <span>
                <Divider type="vertical" />
                {
                  // eslint-disable-next-line
                  <a href="javascript:void(0);"
                    onClick={this.handleViewNote.bind(this, record.note)}
                  >
                    查看备注
                  </a>
                }
              </span>
            ) : (
              ''
            )}
          </span>
        ),
      },
    ];
    return (
      <Fragment>
        <div className={styles.ctripGroupUser}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }} className={styles.operationRow}>
            <Col md={2} sm={2}>
              <Button type="primary" icon="left" onClick={onReturnButton}>
                返回
              </Button>
            </Col>
            <Col md={4} sm={24}>
              <Input.Search
                placeholder="请输入搜索内容"
                onSearch={this.handleSearch}
                onChange={this.handleSearchInputChange}
              />
            </Col>
            <Col md={4} sm={24}>
              <Select
                showSearch
                defaultValue={group}
                placeholder="分组"
                style={{ width: '100%' }}
                optionFilterProp="children"
                onChange={this.handleGroupChange}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option key="__undefined__" value="">
                  全部
                </Option>
                {groups &&
                  groups.length &&
                  groups.map(item => (
                    <Option key={item['id']} value={item['id']}>
                      {item['name']}
                    </Option>
                  ))}
              </Select>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={list}
            loading={loading.effects['ctripGroup/queryUserTable']}
            pagination={pagination}
            rowKey={record => record.userid}
            rowSelection={rowSelection}
            onChange={this.handleTableChange}
          />
          <FooterToolbar>
            <Button type="primary" onClick={this.handleDelete}>
              删除人员
            </Button>
            <Button type="primary" onClick={this.handleAdjustGroup}>
              调整分组
            </Button>
            <Button type="primary" onClick={onReturnButton}>
              分组设置
            </Button>
            <Button type="primary" onClick={this.handleExportSelectedUsers}>
              导出所选用户
            </Button>
            <Button type="primary" onClick={this.handleExportGroup}>
              导出当前组
            </Button>
            <Button type="primary" onClick={this.handleAdd}>
              新增人员
            </Button>
          </FooterToolbar>
          <Modal
            visible={isEditNote}
            title="备注"
            destroyOnClose={true}
            onOk={this.handleAddNote}
            onCancel={this.handleCancelAddNote}
          >
            <Input.TextArea rows={4} defaultValue={note} onChange={this.handleChangeNote} />
          </Modal>
          {this.generateGroupUserModal()}
          {this.generateAdjustGroupModal()}
        </div>
      </Fragment>
    );
  }
}

export default connect(({ ctripGroup, loading }) => ({
  ctripGroup,
  loading,
}))(Form.create()(CtripGroupUser));
