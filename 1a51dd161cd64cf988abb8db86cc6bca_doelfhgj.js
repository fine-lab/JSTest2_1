let AbstractTrigger = require("AbstractTrigger");
class MyTrigger extends AbstractTrigger {
  execute(context, param) {
    var jsonContext = JSON.parse(AppContext());
    var currentUser = jsonContext.currentUser;
    var id = param.data[0].id;
    var code = param.data[0].code;
    var token = jsonContext.token;
    var tantentId = currentUser.tenantId;
    var env = "";
    if (!tantentId || !token) {
      throw new Error("用户过期未认证");
    }
    if (tantentId === "x3hacpnx") {
      //沙箱环境
      env = "https://www.example.com/";
    } else {
      //生产环境
      env = "https://www.example.com/";
    }
    var body = {
      id: id,
      code: code,
      tenantId: tantentId,
      docType: "voucher_delivery", //销售发货单
      eventType: "voucher_delivery_audit" //销售发货单审核
    };
    var header = {
      "Content-Type": "application/json;charset=utf-8",
      Cookie: "yht_access_token=" + token
    };
    var url = "/opn/rec/orderExt?domainKey=ilogwms";
    var resp = postman("POST", env + url, JSON.stringify(header), JSON.stringify(body));
    if (resp) {
      var obj = JSON.parse(resp);
      if ("200" != obj.code) {
        throw new Error(obj.message);
      }
    }
    return {};
  }
}
exports({ entryPoint: MyTrigger });