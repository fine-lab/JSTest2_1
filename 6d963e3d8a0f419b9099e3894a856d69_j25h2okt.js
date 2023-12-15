let AbstractTrigger = require("AbstractTrigger");
class MyTrigger extends AbstractTrigger {
  execute(context, param) {
    let body = {
      appCode: "beiwei-base-data",
      appApiCode: "standard.shop.sync",
      schemeCode: "beiwei_bd",
      jsonBody: { id: param.data[0].id, _status: "Delete" }
    };
    let header = { key: "yourkeyHere" };
    let strResponse = postman("post", "http://47.100.73.161:888/api/unified", JSON.stringify(header), JSON.stringify(body));
    let str = JSON.parse(strResponse);
    if (str.success != true) {
      throw new Error(str.errorMessage);
    }
    return {};
  }
}
exports({ entryPoint: MyTrigger });