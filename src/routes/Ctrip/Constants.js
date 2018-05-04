export default {
  TABHEADS: {
    DEPT: '按部门设置',
    USER: '按用户设置',
  },
  SETTYPES: {
    DEPT: 'dept', // 按部门设置
    USER: 'user'  // 按用户设置
  },
  TABLESETTINGS: {
    DEPT: {
      COLUMNS: [{
        title: '编码',
        dataIndex: 'deptpk',
        key: 'deptpk',
        align: 'right'
      }, {
        title: '部门名称',
        dataIndex: 'deptname',
        key: 'deptname',
      }, {
        title: '携程二次授权人',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
      }],
    },
    USER: {
      COLUMNS: [{
        title: '编码',
        dataIndex: 'id',
        key: 'id',
        align: 'right'
      }, {
        title: '用户名称',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '联系方式',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: '携程二次授权人',
        dataIndex: 'secondAuthorizedPerson',
        key: 'secondAuthorizedPerson',
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
      }]
    },
    AUTHORIZER: {
      COLUMNS: [{
        title: '编码',
        dataIndex: 'destuserid',
        key: 'destuserid',
        align: 'right'
      }, {
        title: '用户名称',
        dataIndex: 'destusername',
        key: 'destusername',
      }, {
        title: '联系方式',
        dataIndex: 'destphone',
        key: 'destphone',
      }, {
        title: '邮箱',
        dataIndex: 'destemail',
        key: 'destemail',
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
      }]
    }
  },

}
