let AbstractTrigger = require("AbstractTrigger");
class MyTrigger extends AbstractTrigger {
  execute(context, param) {
    var mainObj = param.data[0];
    let actionSource = context.billnum;
    let actionName = context.action.toLowerCase();
    if (mainObj.fdOrderSource === "经销商") {
      if (["a497e816", "a497e816List"].indexOf(actionSource) >= 0 && actionName.indexOf("unsubmit") >= 0) {
        return {};
      }
    }
    //退回返利前先向订单返利品行与返利品对应表中写入要退回的金额
    if (mainObj.id != undefined) {
      let rewriteFrontBills = [];
      let queryDetsql = "select id,fdQuantity,fdOldPrice from 	GT4691AT1.GT4691AT1.MFrontSaleOrderDet where bRebate='是' and fdProMemo='返利金额' and MFrontSaleOrderDetFk=" + mainObj.id;
      let detList = ObjectStore.queryByYonQL(queryDetsql, "developplatform");
      let queryRelatSql = "select * from GT4691AT1.GT4691AT1.RebateRowRelatedPool where fbMainId='" + mainObj.id + "'";
      let relateRes = ObjectStore.queryByYonQL(queryRelatSql, "developplatform");
      for (let i = 0; i < detList.length; i++) {
        let detItem = detList[i];
        let relateItem = relateRes.find((val) => val.fbDetailId === detItem.id);
        if (relateItem !== undefined) {
          let rewriteDetObj = {
            fdbillCode: relateItem.fdbillCode,
            fbMainId: relateItem.fbMainId,
            fbDetailId: relateItem.fbDetailId,
            rebateType: "返利金额",
            deduct: 0 - detItem.fdQuantity * detItem.fdOldPrice,
            poolIdStr: relateItem.poolId,
            poolCodeStr: relateItem.poolCode,
            deductSource: "前置订单撤回",
            deductSourceCode: mainObj.code,
            deductSourceIdStr: mainObj.id,
            deductSourceDetIdStr: detItem.id
          };
          rewriteFrontBills.push(rewriteDetObj);
        }
      }
      ObjectStore.insertBatch("GT4691AT1.GT4691AT1.RebateRowRelatedPool", rewriteFrontBills, "c70a95ec");
    }
    if (mainObj.id != undefined) {
      //根据返利UID查找记录
      var sql = "select * from GT4691AT1.GT4691AT1.MRebateAmountLog where dr=0 and rpId = '" + mainObj.id + "'";
      var rebateList = ObjectStore.queryByYonQL(sql);
      var updateRecords = [];
      var idStr = "";
      var updateObj = {};
      for (var prop = 0; prop < rebateList.length; prop++) {
        if (rebateList[prop].rpParentId != undefined) {
          rebateList[prop]["sourceAction"] = "前置订单撤回";
          rebateList[prop]["oriCode"] = rebateList[prop].code;
          rebateList[prop]["oriCreateTime"] = rebateList[prop].createTime;
          rebateList[prop]["oriCreator"] = rebateList[prop].creator;
          idStr = idStr.replace(rebateList[prop].rpParentId + ",", "");
          idStr += rebateList[prop].rpParentId + ",";
          if (updateObj[rebateList[prop].rpParentId] == undefined) {
            updateObj[rebateList[prop].rpParentId] = 0;
          }
          updateObj[rebateList[prop].rpParentId] += rebateList[prop].rgExQuantity;
        }
      }
      if (idStr.length <= 0) {
        return {};
      }
      idStr = idStr.substring(0, idStr.length - 1);
      //查询parent 记录
      var upRes = ObjectStore.queryByYonQL("select * from GT4691AT1.GT4691AT1.MRebateAmountLog where dr=0 and id in (" + idStr + ") ");
      for (var prop = 0; prop < upRes.length; prop++) {
        var updateRow = {};
        updateRow.id = upRes[prop].id;
        updateRow.rpAftQuantity = upRes[prop].rpAftQuantity + updateObj[upRes[prop].id];
        updateRecords.push(updateRow);
      }
      // 将待删除的记录先插入到 商品兑付记录_已删除 表中
      var res = ObjectStore.insertBatch("GT4691AT1.GT4691AT1.MRebateAmountLogDeleted", rebateList, "f55ca877");
      //删除记录
      var res = ObjectStore.deleteBatch("GT4691AT1.GT4691AT1.MRebateAmountLog", rebateList, "7a529c02");
      //更新记录
      var res = ObjectStore.updateBatch("GT4691AT1.GT4691AT1.MRebateAmountLog", updateRecords, "7a529c02");
      if (updateRecords.length == 0 || res.length != updateRecords.length) {
        throw new Error("提交失败：更新记录为空");
      }
      //更新前置订单
    }
    return {};
  }
}
exports({ entryPoint: MyTrigger });