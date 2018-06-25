const Mock = require('mockjs');

const Random = Mock.Random;

let orgs = [];

for (let i = 0; i < 45; i++) {
  orgs.push({
    id: Random.id(),
    name: `${Random.cword(3, 4)}部`,
    isOpen: Random.boolean(),
    key: Random.increment(),
  });
}

let isCtripSmeOpen = false;
let isRtpnrOpen = false;

module.exports = {

  [`GET /smeCtrip/registerCompany`](req, res) {
    isCtripSmeOpen = true;
    res.status(200).json({
      code: '0',
      information: '开通成功',
    });
  },

  [`GET /smeCtrip/ssologin/pc`](req, res) {
    res.set('Content-Type', 'text/html');
    res.send(
      new Buffer(`<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <script type="text/javascript">function formSubmit(){document.getElementById("fLogin").submit();}</script>
    </head>
    <body>
        <form name="fLogin" id="fLogin" method="post" action="https://ct.ctrip.com/corpservice/authorize/login">
            <input type="hidden" name="AppKey" value="226195" />
            <input type="hidden" name="Ticket" value="5af52caf0953ee4c50031d0c" />
            <input type="hidden" name="EmployeeID" value="969bd34d-c232-43d6-b538-b5ed1b9479d2"/>
            <input type="hidden" name="Signature" value="157b14b9c7df9caa9b18ed43179fbc7f"/>
            <input type="hidden" name="TA" value=""/>
            <script language="javascript">formSubmit();</script>
        </form>
    </body>
</html>`)
    );
  },

  [`POST /brigade/open`](req, res) {
    isRtpnrOpen = true;
    res.status(200).json({
      code: '0',
      data: {
        id: '3',
      },
      information: '开通成功',
    });
  },

  [`GET /brigade/openStateList`](req, res) {
    res.status(200).json({
      code: 0,
      data: {
        ctripSme: {
          isOpen: isCtripSmeOpen,
        },
        rtpnr: {
          tenantName: '用友网络1',
          adminPhone: '17778135772',
          tenantId: 'ft9fbcrw',
          orgs: [
            {
              isOpen: isRtpnrOpen,
              name: '用友网络科技股份有限公司',
              id: '0001A210000000003ADC',
            },
            {
              isOpen: !isRtpnrOpen,
              name: '用友甘肃分公司',
              id: '0001A210000000003MYP',
            },
            {
              isOpen: isRtpnrOpen,
              name: '用友能源科技有限公司',
              id: '0001A210000000003BZ4',
            },
          ],
        },
      },
    });
  },

  [`POST /brigade/manageurl`](req, res) {
    res.status(200).json({
      code: 0,
      data: {
        url: 'https://baidu.com'
      }
    });
  }
};
