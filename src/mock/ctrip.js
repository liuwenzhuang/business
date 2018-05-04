const qs = require('qs');
const Mock = require('mockjs');

import { getUrlParams } from '../utils/utils';

let orgs = Mock.mock({
  'list|30-40': [
    {
      id: '@id',
      name: '@name',
    }
  ]
});

let deptauth = Mock.mock({
  'list|200-300': [
    {
      "deptpk": Mock.mock('@string("lower", 20)'),
      "deptname": "@cname",
      "userid": Mock.mock('@string("lower", 11)'),
      "username": "@cname",
      "email": Mock.mock('@email'),
      "orgpk": Mock.mock('@string("lower", 20)')
    }
  ]
})

let userauth = Mock.mock({
  'list|500-700': [
    {
      id: Mock.mock('@character("number")'),
      userid: Mock.mock('@string("lower", 11)'),
      username: "@cname",
      phone: Mock.mock('@string("number", 11)'),
      email: Mock.mock('@email'),
      destuserid: Mock.mock('@string("lower", 11)'),
      destusername: "@cname",
      destemail: Mock.mock('@email'),
      destphone: Mock.mock('@string("number", 11)'),
      orgpk: Mock.mock('@string("lower", 20)')
    }
  ]
})

console.log(orgs);

module.exports = {
  [`POST /ctrip/orginfo`](req, res) {
    res.status(200).json({
      code: '0',
      information: orgs.list,
    });
  },

  [`GET /ctrip/deptauth`](req, res, u) {
    const { query } = req;
    let { pageSize = 10, current = 1, ...rest } = query;
    console.log(pageSize, current);
    res.status(200).json({
      code: '0',
      information: deptauth.list.slice((current - 1) * pageSize, current * pageSize),
      pagination: {
        current: Number(current),
        pageSize: Number(pageSize),
        total: deptauth.list.length
      }
    });
  },

  [`GET /ctrip/userauth`](req, res, u) {
    const { query } = req;
    let { pageSize = 10, current = 1, ...rest } = query;
    res.status(200).json({
      code: '0',
      information: userauth.list.slice((current - 1) * pageSize, current * pageSize),
      pagination: {
        current: Number(current),
        pageSize: Number(pageSize),
        total: deptauth.list.length
      }
    });
  },

  [`POST /ctrip/updateDeptAuth`](req, res) {
    res.status(200).json({
      code: '0',
      information: '更新成功'
    });
  },

  [`POST /ctrip/updateUserAuth`](req, res) {
    res.status(200).json({
      code: '1',
      information: '更新成功'
    });
  }
};
