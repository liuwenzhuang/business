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
    const { current, pageSize } = req.body;
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
    const { current, pageSize } = req.body;
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
    res.status(200).json({
      code: '0',
      information: '操作成功'
    });
  },
};
