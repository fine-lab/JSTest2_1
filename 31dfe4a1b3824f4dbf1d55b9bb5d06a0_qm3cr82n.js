//异常记录列表过滤
let AbstractAPIHandler = require("AbstractAPIHandler");
class MyAPIHandler extends AbstractAPIHandler {
  execute(request) {
    //获取当前用户的身份信息
    var currentUser = JSON.parse(AppContext()).currentUser;
    var sysId = "yourIdHere";
    var tenantId = currentUser.tenantId;
    var userids = [currentUser.id];
    var result = listOrgAndDeptByUserIds(sysId, tenantId, userids);
    //转化为JSON字符串
    var resultJSON = JSON.parse(result);
    var userid;
    var allData;
    if ("1" == resultJSON.status && resultJSON.data != null) {
      //根据当前用户信息区查询员工表
      var userData = resultJSON.data;
      //业务系统员工id
      userid = userData[currentUser.id].id;
    } else {
      throw new Error("获取员工信息异常");
    }
    //先判断是否是集团的人员
    var orgsql = "select StaffNew from GT10261AT179.GT10261AT179.org1 where StaffNew='" + userid + "'";
    var orgres = ObjectStore.queryByYonQL(orgsql);
    if (orgres.length > 0) {
      allData = "all";
    } else {
      //确定是集团内部的人了，判断是否为管理人员----一个大区的区长默认为是有下属门店的，根据门店来获取区长信息
      var managerSql = "select StaffNew,id,area.StaffNew as areapsn,area.id as areaid from GT10261AT179.GT10261AT179.stores1 where" + " StaffNew='" + userid + "'or area.StaffNew = '" + userid + "'";
      var res = ObjectStore.queryByYonQL(managerSql);
      //权限范围内的异常创建人，根据人来筛选
      var result = [];
      if (res.length > 0) {
        //说明是管理人员   --默认身份互斥
        res.forEach((data) => {
          if (userid == data.areapsn) {
            //说明是区长
            result.push(data.StaffNew);
          }
        });
        //加入自身
        result.push(userid);
      }
    }
    return { res: result, allData: allData };
  }
}
exports({ entryPoint: MyAPIHandler });