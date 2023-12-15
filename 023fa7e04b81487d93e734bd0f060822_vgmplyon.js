function loadScript(src, attrs) {
  return new Promise((resolve, reject) => {
    try {
      let scriptEle = document.createElement("script");
      scriptEle.type = "text/javascript";
      scriptEle.src = src;
      for (let key in attrs) {
        scriptEle.setAttribute(key, attrs[key]);
      }
      scriptEle.addEventListener("load", function () {
        resolve("成功");
      });
      document.body.appendChild(scriptEle);
    } catch (err) {
      reject(err);
    }
  });
}
function loadCss() {
  // 背景
  $(".wui-tabs-tabpane").css({ backgroundColor: "#fff" });
  $(".wui-tabs-content .themeNcc .group-container").css({ backgroundColor: "#fff" });
  $(".dq-bg-white .tabpane-container").css({ backgroundColor: "#fff", padding: "0 30px" });
  $(".dq-bg-white .group-container").css({ backgroundColor: "#fff" });
  $(".wui-tabs-content .themeNcc .line-tabs").css({ backgroundColor: "#fff" });
  $(".wui-tabs-content .themeNcc .line-tabs .lineTabsMenu").css({ backgroundColor: "#fff" });
  // 标签页
  $(".dq-tabs.line-tabs .lineTabsMenu .wui-tabs-nav").css({ marginLeft: "2px" });
  $(".dq-tabs.line-tabs .lineTabsMenu .wui-tabs-nav .wui-tabs-ink-bar").css({ backgroundColor: "#F22E27" });
  $(".dq-tabs.line-tabs .lineTabsMenu .wui-tabs-nav .wui-tabs-tab").css({ backgroundColor: "rgba(242, 46, 39, .4)", color: "#fff" });
  $(".dq-tabs.line-tabs .lineTabsMenu .wui-tabs-nav .wui-tabs-tab .groupTipsTitle").css({ fontSize: "12px", padding: "0 6px" });
  $(".dq-tabs.line-tabs .lineTabsMenu .wui-tabs-nav .wui-tabs-tab.wui-tabs-tab-active").css({ backgroundColor: "#F22E27", color: "#fff" });
  $(".dq-tabs.line-tabs .lineTabsMenu .wui-tabs .wui-tabs-bar").css({ borderBottom: "none" });
  // 边框
  $(".dq-border").css({ border: "1px solid #DCDDDD", margin: "0 16px" });
  // 标题部分
  $(".main-title").css({ margin: "0 16px", textAlign: "left" });
  $(".main-title .c-title").css({ display: "inline-block", border: "1px solid #F22E27", color: "#F22E27", borderRadius: "24px", padding: "12px 27px", margin: "20px auto" });
  // 表单部分
  $(".dq-form .form").css({ padding: "10px 30px 10px" });
  $(".dq-form").css({ margin: "12px auto" });
  $(".dq-form .form .width-percent-25").css({ marginBottom: "4px" });
  $(".dq-form .form .width-percent-33").css({ marginBottom: "4px" });
  $(".dq-form .form .width-percent-50").css({ marginBottom: "4px" });
  $(".dq-form .form .width-percent-100").css({ marginBottom: "4px" });
  $(".dq-form .form .dq-desc").css({ paddingTop: "0", paddingBottom: "0", marginBottom: "0", marginTpp: "0" });
  // 表单内每一项
  $(".container-edit-mode .dq-form .form .viewCell .basic-control .input-control").css({ backgroundColor: "#fff", height: "30px", lineHeight: "30px", borderRadius: "0" });
  $(".dq-form .form .viewCell .basic-control input").css({ height: "30px", lineHeight: "30px" });
  $(".dq-form .form .viewCell .basic-control").css({ textAlign: "center" });
  $(".dq-form .form .viewCell .basic-control textarea").css({ height: "60px", minHeight: "60px" });
  $(".dq-form .form .viewCell .basic-control .refer-input .wui-input-simple-suffix").css({ height: "30px", lineHeight: "30px" });
  $(".dq-form .form .viewCell .basic-control .wui-select-selector").css({ height: "30px", minHeight: "30px" });
  $(".dq-form  .viewCell .dq-form-item-jssx .input-control .wui-input").css({ backgroundColor: "#e3e1e1" });
  $(".dq-form .viewCell .dq-form-item-jssx .input-control .wui-input-group-btn").css({ display: "none" });
  $(".dq-form  .viewCell .dq-form-item-jssx .label-control label").css({ color: "#c33" });
  $(".dq-group").css({ padding: "10px 30px 10px" });
  // 表格部分
  $(".dq-table").css({ paddingTop: "4px" });
  $(".dq-table.meta-table .fixedDataTableLayout_main").css({ borderTop: "none" });
}
loadScript("https://www.example.com/", { async: false }).then((res) => {
  console.log(res, "标的公司-加载js完成");
  loadCss();
  $(".wui-tabs-nav").click(() => {
    setTimeout(function () {
      loadCss();
    }, 30);
  });
});
// 编辑按钮
viewModel.get("btnEdit") &&
  viewModel.get("btnEdit").on("click", function () {
    setTimeout(() => {
      loadCss();
    }, 100);
  });
// 取消按钮
viewModel.get("btnAbandon") &&
  viewModel.get("btnAbandon").on("click", function () {
    setTimeout(() => {
      loadCss();
    }, 100);
  });
// 保存按钮
viewModel.get("btnSave") &&
  viewModel.get("btnSave").on("click", function () {
    setTimeout(() => {
      loadCss();
    }, 100);
  });
// 保存新增按钮
viewModel.get("btnSaveAndAdd") &&
  viewModel.get("btnSaveAndAdd").on("click", function () {
    setTimeout(() => {
      loadCss();
    }, 100);
  });
viewModel.on("customInit", function (data) {
  // 标的公司详情--页面初始化
});
viewModel.get("gongsimingchen") &&
  viewModel.get("gongsimingchen").on("blur", function (data) {
    // 公司名称--失去焦点的回调
    const value = viewModel.get("gongsimingchen").getValue();
    let url = `https://c2.yonyoucloud.com/iuap-api-gateway/vgmplyon/commonProductCls/commonProduct/getData?access_token=52696e3b84b24e24816dce9e4ce1ba9e&creditcode=&name=${value}&id=`;
    $.ajax({
      type: "get",
      url: url,
      success: function (data) {
        if (data.code === "200") {
          let { result } = data.data;
          if (result) {
            viewModel.get("gongsijianchen").setValue(result.bondName);
            viewModel.get("zhucedishengshi").setValue(result.baseName);
            viewModel.get("zhucedixiangxidizhi").setValue(result.regLocation);
            viewModel.get("zhucezijin").setValue(result.actualCapital);
            viewModel.get("fadingdaibiaoren").setValue(result.legalPersonName);
            viewModel.get("zhengjianhaoma").setValue(result.property1);
            viewModel.get("zhuceshijian").setValue(result.fromTime); //注册时间
            viewModel.get("tuichuqingkuang").setValue(result.businessTerm); //退出情况
          }
        }
      },
      error: function (err) {
        console.log("查询接口不通");
      }
    });
  });
let detailsModel = viewModel.get("deqin_tzqkList");
let deqin_tcqkList_model = viewModel.get("deqin_tcqkList");
viewModel.on("afterLoadData", (args) => {
  let detailsModel = viewModel.get("deqin_tzqkList");
  let deqin_tcqkList_model = viewModel.get("deqin_tcqkList");
  let tblData = getTouziData(); //总投资
  let tuichu_money = getTuichuData(); //总退出
  let else_money = Number(tblData) - Number(tuichu_money);
  viewModel.get("xiangmuzaitoujine").setValue(else_money); //净投入
  viewModel.get("xiangmuyituichujine").setValue(tuichu_money); //净投入
});
detailsModel.on("afterCellValueChange", function (data) {
  if (data.cellName === "touzijine") {
    let tblData = getTouziData();
    let tuichu_money = getTuichuData();
    let Num = Number(tblData) - Number(tuichu_money);
    viewModel.get("xiangmuzaitoujine").setValue(Num);
  }
});
deqin_tcqkList_model.on("afterCellValueChange", function (data) {
  if (data.cellName === "tuichujine") {
    let tuichu_money = getTuichuData();
    let tblData = getTouziData();
    let Num = Number(tblData) - Number(tuichu_money);
    viewModel.get("xiangmuyituichujine").setValue(tuichu_money);
    viewModel.get("xiangmuzaitoujine").setValue(Num);
  }
});
function getTouziData() {
  let detailsData = detailsModel.getData();
  let num = 0;
  if (detailsData && detailsData.length > 0) {
    detailsData.forEach((item, index) => {
      num += Number(item.touzijine);
    });
  }
  return num;
}
function getTuichuData() {
  let detailsData = deqin_tcqkList_model.getData();
  let num = 0;
  if (detailsData && detailsData.length > 0) {
    detailsData.forEach((item, index) => {
      num += Number(item.tuichujine);
    });
  }
  return num;
}