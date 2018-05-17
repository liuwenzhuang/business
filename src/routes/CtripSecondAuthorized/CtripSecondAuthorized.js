import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Select, Table, Button, Form, Row, Col, Input, Modal } from 'antd';
import FooterToolbar from '../../components/FooterToolbar';
import Constant from './Constants';
import styles from './index.less';
import StandardTable from '../../components/StandardTable';
import Loader from '../../components/Loader/Loader';

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Search = Input.Search;

class CtripSecondAuthorized extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsKey: Constant.SETTYPES.DEPT, // 按部门 or 按用户
      orgpk: '', // 选择的组织pk
      selectedRowKeys: [], // 多选的表格项
      selectedRows: [],
    };
    this.handleOrgChange = this.handleOrgChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.generateOrgDorpDown = this.generateOrgDorpDown.bind(this);
    this.generateSearchForm = this.generateSearchForm.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.generateTable = this.generateTable.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleTabsChange = this.handleTabsChange.bind(this);
    this.handleBatchModify = this.handleBatchModify.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.generateModalTable = this.generateModalTable.bind(this);
    this.handleModalTableChange = this.handleModalTableChange.bind(this);
    this.handleModalTableSearch = this.handleModalTableSearch.bind(this);

    this.singleSelectRow = null; // 点击某行修改按钮时，保存此行数据
    this.singleAuthorize = false; // 单/多 选修改授权人
  }

  /**
   * 组织变化事件
   * @param {*} value
   */
  handleOrgChange(value) {
    this.setState(
      {
        orgpk: value,
      },
      () => {
        this.handleSearch();
      }
    );
  }

  /**
   * 表格搜索事件
   * @param {} e
   */
  handleSearch(e) {
    e && e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const { searchStr } = fieldsValue;
      const { orgpk } = this.state;
      const { dispatch } = this.props;
      const { tabsKey } = this.state;
      let type =
        'ctrip/' + (tabsKey === Constant.SETTYPES.DEPT ? 'queryDeptTable' : 'queryUserTable');
      dispatch({
        type,
        payload: {
          condition: searchStr,
          orgpk,
          current: 1,
          pageSize: 10,
        },
      });
    });
  }

  /**
   * 左上角组织下拉
   */
  generateOrgDorpDown() {
    const { orgs } = this.props;
    return (
      <Select
        showSearch
        style={{ width: 152 }}
        placeholder="组织"
        optionFilterProp="children"
        onChange={this.handleOrgChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {orgs &&
          orgs.length &&
          orgs.map(org => (
            <Option key={org['pk']} value={org['pk']}>
              {org['name']}
            </Option>
          ))}
      </Select>
    );
  }

  generateSearchForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem>
              {getFieldDecorator('searchStr')(<Search placeholder="请输入搜索内容" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }

  /**
   * 表格项的操作事件
   * @param {*} record
   */
  handleOperation(record) {
    this.singleSelectRow = record;
    this.singleAuthorize = true;
    const { dispatch } = this.props;
    const { orgpk } = this.state;
    dispatch({
      type: 'ctrip/showModal',
    });
    dispatch({
      type: 'ctrip/queryAuthorizerTable',
      payload: {
        current: 1,
        pageSize: 10,
        orgpk,
      },
    });
  }

  /**
   * 选择表格项
   * @param {*} selectedRowKeys
   */
  handleSelectChange(selectedRowKeys, selectedRows) {
    this.setState({ selectedRowKeys, selectedRows });
  }

  handleTableChange(pagination, filters, sorter) {
    const { current, pageSize } = pagination;
    const { dispatch, form } = this.props;
    const { tabsKey, orgpk } = this.state;
    let type =
      'ctrip/' + (tabsKey === Constant.SETTYPES.DEPT ? 'queryDeptTable' : 'queryUserTable');
    let searchStr = form.getFieldValue('searchStr');
    searchStr = searchStr && searchStr.trim();
    dispatch({
      type,
      payload: {
        current,
        pageSize,
        condition: searchStr,
        orgpk,
      },
    });
  }

  /**
   * 生成列表
   */
  generateTable() {
    const { tabsKey, selectedRowKeys } = this.state;
    const { deptTable, userTable, loading } = this.props;
    let dataSource = [];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectChange,
    };
    let pagination = null;
    let columns = [];
    let loadingIndicator = false;
    let rowKey = '';
    switch (tabsKey) {
      case Constant.SETTYPES.DEPT:
        rowKey = 'deptpk';
        columns = Constant.TABLESETTINGS.DEPT.COLUMNS;
        dataSource = deptTable.list;
        pagination = deptTable.pagination;
        loadingIndicator = loading.effects['ctrip/queryDeptTable'];
        break;
      case Constant.SETTYPES.USER:
        rowKey = 'pcode';
        columns = Constant.TABLESETTINGS.USER.COLUMNS;
        dataSource = userTable.list;
        pagination = userTable.pagination;
        loadingIndicator = loading.effects['ctrip/queryUserTable'];
        break;
      default:
        break;
    }
    columns[columns.length - 1]['render'] = (text, record) => (
      <span>
        {
          // eslint-disable-next-line
          <a href="javascript:void(0);" onClick={this.handleOperation.bind(this, record)}>
            修改
          </a>
        }
      </span>
    );
    pagination = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    return (
      <Table
        rowKey={record => record[rowKey]}
        loading={loadingIndicator}
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        pagination={pagination}
        onChange={this.handleTableChange}
      />
    );
  }

  /**
   * 标签页变化事件
   * @param {*} activeKey
   */
  handleTabsChange(activeKey) {
    this.setState(
      {
        tabsKey: activeKey,
        selectedRowKeys: [],
        selectedRows: [],
      },
      () => {
        this.handleSearch();
      }
    );
  }

  /**
   * 批量修改
   */
  handleBatchModify() {
    const { selectedRowKeys } = this.state;
    if (!selectedRowKeys || !selectedRowKeys.length) {
      Modal.info({
        title: '提示',
        content: '请选择部门或人员信息后进行操作',
        onOk() {},
      });
      return;
    }
    this.singleAuthorize = false;
    const { dispatch } = this.props;
    const { orgpk } = this.state;
    dispatch({
      type: 'ctrip/showModal',
    });
    dispatch({
      type: 'ctrip/queryAuthorizerTable',
      payload: {
        current: 1,
        pageSize: 10,
        orgpk,
      },
    });
  }

  /**
   * 生成选择授权人弹出表格
   */
  generateModalTable() {
    const { authorizedUserTable, modalVisible, loading } = this.props;
    let columns = Constant.TABLESETTINGS.AUTHORIZER.COLUMNS;
    columns[columns.length - 1]['render'] = (text, record) => (
      <span>
        {
          // eslint-disable-next-line
          <a href="javascript:void(0);" onClick={this.setAsAuthorizer.bind(this, record)}>
            设为二次授权人
          </a>
        }
      </span>
    );
    return (
      <Modal
        title="选择二次授权人"
        wrapClassName="vertical-center-modal"
        visible={modalVisible}
        width={'90%'}
        footer={null}
        onCancel={this.hideModal}
      >
        <StandardTable
          rowKey={record => record.pcode}
          data={authorizedUserTable}
          columns={columns}
          loading={loading.effects['ctrip/queryAuthorizerTable']}
          multiple={false}
          onChange={this.handleModalTableChange}
          onSearch={this.handleModalTableSearch}
        />
      </Modal>
    );
  }

  /**
   * 弹出表格的变化事件
   * @param {*} pagination
   * @param {*} filters
   * @param {*} sorter
   * @param {*} searchStr
   */
  handleModalTableChange(pagination, filters, sorter, searchStr = '') {
    const { current, pageSize } = pagination;
    const { dispatch } = this.props;
    const { orgpk } = this.state;
    dispatch({
      type: 'ctrip/queryAuthorizerTable',
      payload: {
        current,
        pageSize,
        orgpk,
        condition: searchStr,
      },
    });
  }

  /**
   * 弹出表格的搜索事件
   * @param {*} searchStr
   */
  handleModalTableSearch(searchStr = '') {
    const { dispatch } = this.props;
    const { orgpk } = this.state;
    dispatch({
      type: 'ctrip/queryAuthorizerTable',
      payload: {
        current: 1,
        pageSize: 10,
        orgpk,
        condition: searchStr,
      },
    });
  }

  setAsAuthorizer(record) {
    if (!record.email) {
      Modal.error({
        title: '错误',
        content: '此用户邮箱为空，不能选择其作为授权人',
      });
      return;
    }
    const { tabsKey, selectedRows, orgpk } = this.state;
    const { dispatch } = this.props;
    let type = '';
    let payload = {};
    switch (tabsKey) {
      case Constant.SETTYPES.DEPT:
        type = 'ctrip/updatedeptauth';
        payload = {
          depts: this.singleAuthorize ? [this.singleSelectRow] : selectedRows,
          ...record,
          orgpk,
        };
        break;
      case Constant.SETTYPES.USER:
        type = 'ctrip/updateuserauth';
        payload = {
          users: this.singleAuthorize ? [this.singleSelectRow] : selectedRows,
          ...record,
          orgpk,
        };
        break;
      default:
        break;
    }
    dispatch({
      type,
      payload,
    })
      .then(() => {
        Modal.info({
          title: '修改成功',
          content: '修改授权人成功',
          onOk: () => {
            this.hideModal();
            this.handleSearch();
          },
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  hideModal() {
    this.props.dispatch({
      type: 'ctrip/hideModal',
    });
  }

  render() {
    const orgDropDown = this.generateOrgDorpDown();
    const searchForm = this.generateSearchForm();
    const tableContent = this.generateTable();
    const modalTableContent = this.generateModalTable();
    const { loading } = this.props;
    return (
      <div className={styles.ctrip}>
        <Tabs tabBarExtraContent={orgDropDown} onChange={this.handleTabsChange}>
          <TabPane tab={Constant.TABHEADS.DEPT} key={Constant.SETTYPES.DEPT}>
            <div className={styles.panel}>
              {searchForm}
              {tableContent}
            </div>
          </TabPane>
          <TabPane tab={Constant.TABHEADS.USER} key={Constant.SETTYPES.USER}>
            <div className={styles.panel}>
              {searchForm}
              {tableContent}
            </div>
          </TabPane>
        </Tabs>
        <FooterToolbar>
          <Button type="primary" onClick={this.handleBatchModify}>
            批量修改
          </Button>
        </FooterToolbar>
        {modalTableContent}
        <Loader
          fullScreen
          spinning={
            loading.effects['ctrip/updatedeptauth'] || loading.effects['ctrip/updateuserauth']
          }
        />
      </div>
    );
  }
}

export default connect(({ ctrip, loading, ...rest }) => {
  return {
    orgs: ctrip.orgs,
    deptTable: ctrip.deptTable,
    userTable: ctrip.userTable,
    authorizedUserTable: ctrip.authorizedUserTable,
    modalVisible: ctrip.modalVisible,
    loading: loading,
  };
})(Form.create({})(CtripSecondAuthorized));
