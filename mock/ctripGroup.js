const qs = require('qs');
const Mock = require('mockjs');

const Random = Mock.Random;

let groups = [];
let userTable = [];

for (let i = 0; i < 45; i++) {
  groups.push({
    name: Mock.mock('@name'),
    note: Random.cparagraph(1, 2),
    id: Random.increment(),
    num: Random.integer(10, 23)
  });
  userTable.push({
    name: Mock.mock('@name'),
    phone: Random.integer(10000000000, 99999999999),
    no: Random.increment(),
    "id": Random.id(),
    "userid": Random.guid(),
    "groupid": Random.id(),
    "username": Mock.mock('@name'),
    "userName": Mock.mock('@name'),
    "pcode": Random.word(5, 6),
    "email": Random.email(),
    "depart": Random.cword(3, 4),
    "note": Random.cparagraph(1, 2),
  })
}

module.exports = {
  [`GET /ctrip/ctripGroup/groups`](req, res) {
    res.cookie('Hm_lpvt_aps', '1525917549', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('Hm_lpvt_yht', '1525926442', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('Hm_lvt_6acf335e14c16a029a767db1698f289c', '1525759440', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('Hm_lvt_aps', '1523326647,1525748627,1525917549', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('Hm_lvt_cloud', '1525759458', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('Hm_lvt_yht', '1524449023,1525334223,1525748621,1525917547', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('JSESSIONID', '4FBE8C7924466E7EF1BF6C04976EB956', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('NTKF_T2D_CLIENTID', 'guestCAA496DA-0AFB-8CBD-159D-28E3E9B0D1DD', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('_A_P_userAvator', '', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('_A_P_userId', '02189f95-0a5e-49b1-9aae-6ec08dc178dc', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('_A_P_userLoginName', 'a13511044160', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('_A_P_userName', '13511044160', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('_A_P_userType', '1', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('_TH_', 'primary', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('_ga', 'GA1.2.424919635.1525401280', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('_gid', 'GA1.2.2054325843.1525852927', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});

    res.cookie('acw_tc', 'AQAAAFj/mxtF4gIACAlne51179YQfUuV', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('businessid', 'ssc_baozhang', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('i18next', 'zh_CN', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('login_token', 'd2ViLDM2MDAsWHFXNngzYVFJVFZRZTZwV2RqZWREd2hTdkg5WmVhQi9pUGkrU3hVRGRwU1p6SEZKS00zYldJcU1FSm13YU10aXQ5NStlSjZhSWRtRi9HRzJld0Rwb0E9PQ', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('phone', '13511044160', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('sysid', 'ssc_baozhang', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('tenantid', 'es0jmgsl', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('token', 'd2ViLDM2MDAsWHFXNngzYVFJVFZRZTZwV2RqZWREd2hTdkg5WmVhQi9pUGkrU3hVRGRwU1p6SEZKS00zYldJcU1FSm13YU10aXQ5NStlSjZhSWRtRi9HRzJld0Rwb0E9PQ', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('u_locale', 'zh_CN', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('u_logints', '1525917554928', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('u_usercode', '02189f95-0a5e-49b1-9aae-6ec08dc178dc', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('userId', '02189f95-0a5e-49b1-9aae-6ec08dc178dc', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('userType', '1', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('yht_tenantinfo', 'es0jmgsl', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('yht_username', 'ST-26081-WrA9tzGK6KMYswiNFbRt-cas01.example.org__02189f95-0a5e-49b1-9aae-6ec08dc178dc', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.cookie('yht_usertoken', '9wGtJEVhT7GlxyT8UhVrPdN%2FQoLZofFZ7z6L0Bmu6IdsxT9j7bI9AHxKzAM2zwHiYq0JkT16O9P%2FxUh1Jyzblg%3D%3D', {domain: '.yonyoucloud.com', expires: new Date(Date.now() + 900000)});
    res.status(200).json({
      code: '0',
      information: groups,
    });
  },

  [`GET /ctrip/ctripClientManager/find`](req, res) {
    res.status(200).json({
      code: '0',
      information: {
        id: Random.increment(),
        info: Mock.mock('@name')
      },
    });
  },

  [`POST /ctrip/ctripGroupMember/groupmembers`](req, res) {
    const { current, pageSize, groupid, condition } = req.body;
    res.status(200).json({
      code: '0',
      information: userTable.slice((current - 1) * pageSize, current * pageSize),
      pagination: {
        current: Number(current),
        pageSize: Number(pageSize),
        total: userTable.length
      }
    });
  },

  [`POST /ctrip/ctripClientManager/add`](req, res) {
    res.status(200).json({
      code: '0',
      information: '修改成功'
    });
  },

  [`POST /ctrip/ctripGroup/delgroup`](req, res) {
    res.status(200).json({
      code: '0',
      information: '操作成功'
    });
  },

  [`POST /ctrip/ctripGroup/addGroup`](req, res) {
    res.status(200).json({
      code: '0',
      information: '操作成功'
    });
  },

  [`POST /ctrip/ctripGroup/updateGroup`](req, res) {
    res.status(200).json({
      code: '0',
      information: '操作成功'
    });
  },

  [`POST /ctrip/ctripGroupMember/addgroupmembers`](req, res) {
    const { users } = req.body;
    userTable = [...users, ...userTable];
    res.status(200).json({
      code: '0',
      information: '操作成功'
    });
  },

  [`POST /ctrip/userfilter/users`](req, res) {
    const { current, pageSize, condition } = req.body;
    res.status(200).json({
      code: '0',
      information: userTable.slice((current - 1) * pageSize, current * pageSize),
      pagination: {
        current: Number(current),
        pageSize: Number(pageSize),
        total: userTable.length
      }
    });
  },

  [`POST /ctrip/ctripGroupMember/updategid`](req, res) {
    const { gid, userids } = req.body;
    res.status(200).json({
      code: '0',
      information: '操作成功'
    });
  },
};
