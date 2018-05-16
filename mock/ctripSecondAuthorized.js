const Mock = require('mockjs');
const { Random } = Mock;

let orgs = [];
let deptauth = [];
let userauth = [];

for(let i=0; i<34; i++) {
  orgs.push({
    pk: Random.id(),
    name: Random.cname(),
  });
}

for (let i = 0; i < 200; i++) {
  deptauth.push({
    deptpk: Random.increment(),
    deptname: Random.cname(),
    userid: Mock.mock('@string("lower", 11)'),
    username: Random.cname(),
    email: Mock.mock('@email'),
    orgpk: Mock.mock('@string("lower", 20)'),
  });
  userauth.push({
    id: Mock.mock('@character("number")'),
    pcode: Random.increment(),
    userid: Mock.mock('@string("lower", 11)'),
    username: Random.cname(),
    phone: Mock.mock('@string("number", 11)'),
    email: Mock.mock('@email'),
    destuserid: Mock.mock('@string("lower", 11)'),
    destusername: Random.cname(),
    destemail: Mock.mock('@email'),
    destphone: Mock.mock('@string("number", 11)'),
    orgpk: Mock.mock('@string("lower", 20)'),
  });
}

module.exports = {
  [`GET /ctrip/orginfo`](req, res) {
    res.status(200).json({
      code: '0',
      information: orgs,
    });
  },

  [`GET /ctrip/deptauth`](req, res, u) {
    const { query } = req;
    let { pageSize = 10, current = 1 } = query;
    res.status(200).json({
      code: '0',
      information: deptauth.slice((current - 1) * pageSize, current * pageSize),
      pagination: {
        current: Number(current),
        pageSize: Number(pageSize),
        total: deptauth.length,
      },
    });
  },

  [`GET /ctrip/userauth`](req, res, u) {
    const { query } = req;
    let { pageSize = 10, current = 1 } = query;
    res.status(200).json({
      code: '0',
      information: userauth.slice((current - 1) * pageSize, current * pageSize),
      pagination: {
        current: Number(current),
        pageSize: Number(pageSize),
        total: deptauth.length,
      },
    });
  },

  [`POST /ctrip/updateDeptAuth`](req, res) {
    res.status(200).json({
      code: '0',
      information: '更新成功',
    });
  },

  [`POST /ctrip/updateUserAuth`](req, res) {
    res.status(200).json({
      code: '0',
      information: '更新成功',
    });
  },
};
