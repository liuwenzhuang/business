export default {
  TABHEADS: {
    DEPT: '按部门设置',
    USER: '按用户设置',
  },
  SETTYPES: {
    DEPT: 'dept', // 按部门设置
    USER: 'user', // 按用户设置
  },
  TABLESETTINGS: {
    DEPT: {
      COLUMNS: [
        {
          title: '编码',
          dataIndex: 'deptpk',
          key: 'deptpk',
          align: 'right',
          width: '20%',
        },
        {
          title: '部门名称',
          dataIndex: 'deptname',
          key: 'deptname',
        },
        {
          title: '携程二次授权人',
          dataIndex: 'username',
          key: 'destusername',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
        },
      ],
    },
    USER: {
      COLUMNS: [
        {
          title: '编码',
          dataIndex: 'pcode',
          key: 'pcode',
          align: 'right',
          width: '20%',
        },
        {
          title: '用户名称',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '联系方式',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: '携程二次授权人',
          dataIndex: 'destusername',
          key: 'destusername',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
        },
      ],
    },
    AUTHORIZER: {
      COLUMNS: [
        {
          title: '编码',
          dataIndex: 'pcode',
          key: 'pcode',
          align: 'right',
        },
        {
          title: '用户名称',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '联系方式',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
        },
      ],
    },
  },
};
