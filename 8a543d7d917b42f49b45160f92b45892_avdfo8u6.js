let AbstractTrigger = require("AbstractTrigger");
class MyTrigger extends AbstractTrigger {
  execute(context, param) {
    var timezone = 8; //目标时区时间，东八区
    var offset_GMT = new Date().getTimezoneOffset(); //本地时间和格林威治的时间差，单位为分钟
    var nowDate = new Date().getTime(); //本地时间距 1970 年 1 月 1 日午夜(GMT 时间)之间的毫秒数
    var date = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
    var strDate = date.getFullYear() + "-";
    var month = date.getMonth() + 1; //月
    var getData = date.getDate(); //日
    var hours = date.getHours(); //时
    var minutes = date.getMinutes(); //分
    var seconds = date.getSeconds(); //秒
    month = month < 10 ? "0" + month : month;
    getData = getData < 10 ? "0" + getData : getData;
    strDate += month + "-";
    strDate += getData;
    strDate = "" + strDate + "";
    var id = param.data[0].id;
    var sql = "select * from AT164D981209380003.AT164D981209380003.salesPlan where id=" + id;
    var res = ObjectStore.queryByYonQL(sql);
    if (res.length != 0) {
      var flag = res[0].isTakeEffect;
      if (null != flag && "true" == flag) {
        param.data[0].set("changeTime", strDate);
        param.data[0].set("changer", param.data[0].modifier_userName);
      }
    }
    return {};
  }
}
exports({ entryPoint: MyTrigger });