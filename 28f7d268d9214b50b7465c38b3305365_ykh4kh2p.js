viewModel.get("button45ch") &&
  viewModel.get("button45ch").on("click", function (data) {
    // 推送有赞单位--单击
    debugger;
    var saveByUnitDatas = cb.rest.invokeFunction("GZTBDM.backEnd.unitData", {}, function (err, res) {}, viewModel, { async: false });
    if (saveByUnitDatas.error) {
      cb.utils.alert(saveByUnitDatas.error.message);
    } else {
      cb.utils.alert("  --YS单位推送有赞,推送成功--  ");
    }
  });