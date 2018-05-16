let isOpen = false;

module.exports = {
  [`GET /smeCtrip/isOpen`](req, res) {
    res.status(200).json({
      code: '0',
      data: {
        isOpen,
      },
    });
  },

  [`GET /smeCtrip/registerCompany`](req, res) {
    isOpen = true;
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
};
