let AbstractAPIHandler = require("AbstractAPIHandler");
class MyAPIHandler extends AbstractAPIHandler {
  execute(request) {
    let rsp = {
      code: 200,
      message: "",
      data: null
    };
    let apiinfo = {
      url: "/moy6hp0e/11/111/voucherorder/save",
      action: "销售订单单个保存",
      body: "",
      responsedata: ""
    };
    let sql1 = "";
    try {
      let func = extrequire("AT15DCCE0808080001.backOpenApiFunction.getGateway");
      let getGatewayInfo = func.execute();
      let baseurl = getGatewayInfo.data.gatewayUrl;
      let url = baseurl + "/yonbip/sd/voucherorder/singleSave";
      let body = {
        data: {}
      };
      body.data.id = "";
      body.data._status = "Insert";
      body.data.agentId = request.agentId; //客户编码
      body.data.code = request.code;
      body.data.hopeReceiveDate = request.hopeReceiveDate; //希望到货日期
      body.data.invoiceAgentId = request.agentId;
      body.data.orderDetails = [];
      body.data.resubmitCheckKey = request.resubmitCheckKey;
      body.data.salesOrgId = "CSSG";
      body.data.settlementOrgId = "CSSG";
      body.data.transactionTypeId = "yourIdHere";
      body.data.vouchdate = request.vouchdate;
      body.data.orderDate = request.vouchdate;
      body.data.exchRateDate = request.vouchdate; //汇率日期
      sql1 = "select b.professSalesman professSalesman from aa.merchant.Merchant inner join aa.merchant.Principal b on b.merchantId=id where code='" + request.agentId + "'";
      let professSalesman = ObjectStore.queryByYonQL(sql1, "productcenter");
      if (professSalesman.length > 0) {
        body.data.corpContact = professSalesman[0].professSalesman; //业务员
      }
      //客户档案业务对象查询 customerLevel客户级别(价格目录)
      sql1 =
        "select dtl.taxRate taxRate,dtl.collectionAgreement collectionAgreement,dtl.deliveryWarehouse deliveryWarehouse,orgId,dtl.customerLevel customerLevel from aa.merchant.MerchantApplyRange  inner join aa.merchant.MerchantApplyRangeDetail dtl on id=dtl.merchantApplyRangeId inner join aa.merchant.Merchant main on main.id=merchantId where 1=1 and orgId=1665003471855681550 and main.code='" +
        request.agentId +
        "'";
      let MerchantApplyRangeDetail = ObjectStore.queryByYonQL(sql1, "productcenter");
      if (MerchantApplyRangeDetail.length > 0) {
        body.data.receiveAgreementId = MerchantApplyRangeDetail[0].collectionAgreement || ""; //收付款协议
      }
      //收货地址
      sql1 =
        "select b.id,b.addressCode,b.address,b.receiver receiver,b.addressInfoCharacter addressInfoCharacter,b.zipCode from aa.merchant.Merchant inner join aa.merchant.AddressInfo b on b.merchantId=id     where code='" +
        request.agentId +
        "' and b.addressCode='" +
        request.attrext63 +
        "'";
      let receiveInfo = ObjectStore.queryByYonQL(sql1, "productcenter");
      if (receiveInfo.length > 0) {
        let addressInfoCharacter = receiveInfo[0].addressInfoCharacter || {}; //地址信息  attrext103 	 城市 attrext102  国家代码
        body.data.receiveAddress =
          (receiveInfo[0].b_address || "") +
          " " +
          (addressInfoCharacter.attrext103 || "") +
          " " +
          (receiveInfo[0].b_zipCode || "") +
          " " +
          (addressInfoCharacter.attrext102 || "") +
          " " +
          (receiveInfo[0].b_addressCode || ""); //收货地址
        body.data.receiveId = receiveInfo[0].b_id; //收货人id
        body.data.receiver = receiveInfo[0].receiver; //收货人
      }
      body.data.orderDefineCharacter = {};
      body.data.orderDefineCharacter.id = "";
      body.data.orderDefineCharacter.attrext14 = "1821742341882380294"; //销售价格条款
      //发票地址
      sql1 =
        "select b.id,b.addressCode,b.address,b.receiver receiver,b.addressInfoCharacter addressInfoCharacter,b.zipCode from aa.merchant.Merchant inner join aa.merchant.AddressInfo b on b.merchantId=id where code='" +
        request.agentId +
        "' and b.addressCode='" +
        request.attrext64 +
        "'";
      let define5Info = ObjectStore.queryByYonQL(sql1, "productcenter");
      if (define5Info.length > 0) {
        let addressInfoCharacter01 = define5Info[0].addressInfoCharacter || {}; //地址信息  attrext103 	 城市 attrext102  国家代码
        body.data.orderDefineCharacter.attrext101 = define5Info[0].b_id; //  ship to
        body.data.orderDefineCharacter.attrext88 =
          (define5Info[0].b_address || "") +
          " " +
          (addressInfoCharacter01.attrext103 || "") +
          " " +
          (define5Info[0].b_zipCode || "") +
          " " +
          (addressInfoCharacter01.attrext102 || "") +
          " " +
          (define5Info[0].b_addressCode || ""); //  ship to
      }
      body.data.orderDefineCharacter.attrext82 = "EDI"; //系统来源
      body.data.orderDefineCharacter.attrext65 = request.attrext65; //供应商GLN编号
      body.data.orderDefineCharacter.attrext64 = request.attrext64; //采购方GLN编号
      body.data.orderDefineCharacter.attrext63 = request.attrext63; //交付方GLN编号
      body.data.orderDefineCharacter.attrext69 = request.code; //Edi单号
      body.data.orderDefineCharacter.attrext74 = request.attrext74; //发票GLN
      //表体津贴
      sql1 = "select id,merchantCharacter merchantCharacter from aa.merchant.Merchant where code='" + request.agentId + "'";
      let dtMerchantDefine = ObjectStore.queryByYonQL(sql1, "productcenter");
      if (dtMerchantDefine.length > 0) {
        let merchantCharacter = dtMerchantDefine[0].merchantCharacter || {};
        body.data.orderDefineCharacter.attrext70 = merchantCharacter.attrext70 || ""; //物料行津贴
        body.data.orderDefineCharacter.attrext71 = merchantCharacter.attrext71 || ""; //津贴
        body.data.orderDefineCharacter.attrext78 = merchantCharacter.attrext78 || ""; //现金折扣
        body.data.orderDefineCharacter.attrext70 = body.data.orderDefineCharacter.attrext70.replace("%", "");
        body.data.orderDefineCharacter.attrext71 = body.data.orderDefineCharacter.attrext71.replace("%", "");
        body.data.orderDefineCharacter.attrext78 = body.data.orderDefineCharacter.attrext78.replace("%", "");
      }
      let MoneyAll = 0.0; //整单报价金额
      let MoneyAll01 = 0.0; //整单金额
      let discountMoney = 0.0; //折扣总金额
      body.data.orderDefineCharacter.headDefine1 = "1544878777088081928"; //销售渠道
      body.data.payMoney = 0;
      body.data["orderPrices!currency"] = "EUR"; //币种
      body.data["orderPrices!exchRate"] = 1;
      body.data["orderPrices!exchangeRateType"] = "04";
      body.data["orderPrices!natCurrency"] = "EUR"; //本币
      body.data["orderPrices!taxInclusive"] = true;
      //计算扣率
      let orderDetails = request.orderDetails;
      for (var i = 0; i < orderDetails.length; i++) {
        let Detail = {};
        Detail.id = "";
        Detail._status = "Insert";
        Detail.consignTime = request.vouchdate;
        Detail.priceQty = orderDetails[i].priceQty;
        Detail.qty = orderDetails[i].qty;
        Detail.subQty = orderDetails[i].subQty;
        Detail.invExchRate = 1;
        Detail.invPriceExchRate = 1;
        Detail["orderDetailPrices!natMoney"] = 0;
        Detail["orderDetailPrices!natSum"] = 0;
        Detail["orderDetailPrices!natTax"] = 0;
        Detail["orderDetailPrices!natTaxUnitPrice"] = 0;
        Detail["orderDetailPrices!natUnitPrice"] = 0;
        Detail["orderDetailPrices!oriMoney"] = 0;
        Detail["orderDetailPrices!oriTax"] = 0;
        Detail["orderDetailPrices!oriUnitPrice"] = 0;
        Detail.oriSum = 0;
        Detail.oriTaxUnitPrice = 0;
        Detail.unitExchangeType = 0;
        Detail.unitExchangeTypePrice = 0;
        Detail.oriSum = 0;
        Detail.oriTaxUnitPrice = 0;
        Detail.orderProductType = "SALE";
        Detail.settlementOrgId = "CSSG";
        Detail.stockOrgId = "CSSG";
        Detail.productId = "";
        Detail.realProductCode = "";
        Detail.taxId = "A7"; //科目税率
        if (MerchantApplyRangeDetail.length > 0) {
          Detail.taxId = MerchantApplyRangeDetail[0].taxRate || "A7"; //科目税率
        }
        Detail.stockId = "WH14"; //发货仓库
        Detail.iProductAuxUnitId = "";
        Detail.iProductUnitId = "";
        Detail.masterUnitId = "";
        Detail.orderDetailDefineCharacter = {};
        Detail.orderDetailDefineCharacter.attrext66 = orderDetails[i].attrext66; //GTIN物料编码号
        Detail.orderDetailDefineCharacter.ItemDescription = orderDetails[i].ItemDescription; //物料描述
        Detail.orderDetailDefineCharacter.attrext109 = body.data.orderDefineCharacter.attrext70; //表体物料行津贴
        Detail.orderDetailDefineCharacter.attrext86 = orderDetails[i].attrext86; //买方物料号
        Detail.orderDetailDefineCharacter.attrext75 = orderDetails[i].attrext75; //德厨产品编码
        Detail.orderDetailDefineCharacter.attrext85 = (orderDetails[i].productId || "") + " " + (orderDetails[i].attrext75 || ""); //添加条码+客户产品编码
        Detail.orderDetailDefineCharacter.attrext72 = "EAN " + (orderDetails[i].productId || "") + " Käufer Art." + (orderDetails[i].attrext86 || ""); //from edi
        //查询物料
        let sql = "select id,unit,code,b.barCode from pc.product.Product inner join pc.product.ProductDetail b on b.productId=id where b.barCode='" + orderDetails[i].productId + "'";
        var productdata = ObjectStore.queryByYonQL(sql, "productcenter");
        let productId = "";
        if (productdata.length > 0) {
          let unit = productdata[0].unit;
          Detail.iProductAuxUnitId = unit;
          Detail.iProductUnitId = unit;
          Detail.masterUnitId = unit;
          Detail.productId = productdata[0].code;
          Detail.realProductCode = productdata[0].code;
          body.data.orderDetails.push(Detail);
          productId = productdata[0].id; //物料id
        } else {
          //匹配物料属性产品条形码  外箱条码字段
          let sql05 = "";
          let unit = "";
          let code = "";
          let product_Id = "";
          sql05 = "select productPropCharacterDefine,id productId,unit,code from pc.product.Product where productPropCharacterDefine.define113=" + orderDetails[i].productId;
          let cptm = ObjectStore.queryByYonQL(sql05, "productcenter");
          if (cptm.length > 0) {
            unit = cptm[0].unit;
            code = cptm[0].code;
            product_Id = cptm[0].productId;
          } else {
            //匹配外箱条码
            sql05 = "select productPropCharacterDefine,id productId,unit,code from pc.product.Product where productPropCharacterDefine.define115=" + orderDetails[i].productId;
            let wxtm = ObjectStore.queryByYonQL(sql05, "productcenter");
            if (wxtm.length > 0) {
              unit = wxtm[0].unit;
              code = wxtm[0].code;
              product_Id = wxtm[0].productId;
            } else {
              rsp.message += "条码【" + orderDetails[i].productId + "】未找到对应的物料/n";
            }
          }
          Detail.iProductAuxUnitId = unit;
          Detail.iProductUnitId = unit;
          Detail.masterUnitId = unit;
          Detail.productId = code;
          Detail.realProductCode = code;
          body.data.orderDetails.push(Detail);
          productId = product_Id; //物料id
        }
        let customerLevel = ""; //客户级别(价格表)
        if (MerchantApplyRangeDetail.length > 0) {
          customerLevel = MerchantApplyRangeDetail[0].customerLevel || ""; //客户级别(价格表)
        }
        let NetPrice = orderDetails[i].NetPrice || 0; //单价
        if (customerLevel) {
          if (NetPrice) {
            Detail.orderDetailDefineCharacter.attrext108 = NetPrice;
          } else {
            //存在就计算
            let oriUnitPrice = this.getOriTaxUnitPrice(customerLevel, productId); //含税单价没有打折  --无税单价
            Detail.orderDetailDefineCharacter.attrext108 = oriUnitPrice;
          }
        } else {
          if (NetPrice) {
            Detail.orderDetailDefineCharacter.attrext108 = NetPrice;
          }
        }
      }
      console.log("报价金额MoneyAlld------" + MoneyAll);
      console.log("discountMoney------" + discountMoney);
      let allwholeDiscountRate = 100.0;
      if (discountMoney > 0) {
        allwholeDiscountRate = Number(((Number(MoneyAll01.toFixed(2)) / MoneyAll) * 100.0).toFixed(2));
      }
      console.log("调用销售订单请求接口请求数据" + JSON.stringify(body));
      apiinfo.body = JSON.stringify(request);
      if (rsp.message == "") {
        let apiResponse = openLinker("POST", url, "AT15DCCE0808080001", JSON.stringify(body));
        let repdata = JSON.parse(apiResponse);
        if (repdata.code == "200") {
          rsp.message = "操作成功";
          rsp.data = repdata.data;
        } else {
          throw new Error(repdata.message);
        }
      } else {
        throw new Error(rsp.message);
      }
    } catch (e) {
      rsp.message = e.message;
      rsp.code = 999;
    } finally {
      apiinfo.responsedata = JSON.stringify(rsp);
      let apiSave = extrequire("AT15DCCE0808080001.backOpenApiFunction.apiSave");
      apiSave.execute(apiinfo);
      return rsp;
    }
  }
  getAmount(qty, taxRate, exchRate, price, isTax) {
    let res = {};
    if (isTax) {
      let oriTaxUnitPrice = price;
      let oriUnitPrice = (oriTaxUnitPrice / (1 + taxRate / 100)).toFixed(4); //无税单价
      let oriSum = (oriTaxUnitPrice * qty).toFixed(2); //含税金额
      let oriMoney = (oriSum / (1 + taxRate / 100)).toFixed(2); //无税金额
      let oriTax = (oriSum - oriMoney).toFixed(2); //税额
      //本币
      let natTaxUnitPrice = (oriTaxUnitPrice * exchRate).toFixed(4); //含税单价
      let natUnitPrice = (natTaxUnitPrice / (1 + taxRate / 100)).toFixed(4); //无税单价
      let natSum = (natTaxUnitPrice * qty).toFixed(2); //含税金额
      let natMoney = (natSum / (1 + taxRate / 100)).toFixed(2); //无税金额
      let natTax = (natSum - natMoney).toFixed(2); //税额
      res = { oriTaxUnitPrice, oriUnitPrice, oriSum, oriMoney, oriTax, natTaxUnitPrice, natUnitPrice, natSum, natMoney, natTax };
    } else {
      let oriUnitPrice = price; //无税单价
      let oriTaxUnitPrice = (oriUnitPrice * (1 + taxRate / 100)).toFixed(4); //含税单价
      let oriMoney = (oriUnitPrice * qty).toFixed(2); //无税金额
      let oriSum = (oriMoney * (1 + taxRate / 100)).toFixed(2); //含税金额
      let oriTax = (oriSum - oriMoney).toFixed(2); //税额
      //本币
      let natUnitPrice = (oriUnitPrice * exchRate).toFixed(4); //无税单价
      let natTaxUnitPrice = (natUnitPrice * (1 + taxRate / 100)).toFixed(4); //含税单价
      let natMoney = (natUnitPrice * qty).toFixed(2); //无税金额
      let natSum = (natMoney * (1 + taxRate / 100)).toFixed(2); //含税金额
      let natTax = (natSum - natMoney).toFixed(2); //税额
      res = { oriTaxUnitPrice, oriUnitPrice, oriSum, oriMoney, oriTax, natTaxUnitPrice, natUnitPrice, natSum, natMoney, natTax };
    }
    return res;
  }
  getOriTaxUnitPrice(agentLevelId, productId) {
    let sql =
      "select code,status,c.name,beginDate,endDate,b.price,b.priceUnit,b.amountUnit,d.exchangeRateType,d.outputRate from marketing.price.PriceAdjustment inner join marketing.price.PriceAdjustDetail b on b.priceAdjustmentId=id inner join marketing.price.PriceTemplate c on c.id=priceTemplateId inner join marketing.price.PriceAdjustDetailDimension d on b.id=d.priceAdjustDetailId where c.name='客户级别+商品'  and status=1 and d.agentLevelId='" +
      agentLevelId +
      "'  and d.productId=" +
      productId +
      "  order by beginDate desc";
    let dt = ObjectStore.queryByYonQL(sql, "marketingbill");
    let oriTaxUnitPrice = 0; //含税单价
    if (dt.length > 0) {
      oriTaxUnitPrice = dt[0].b_price;
    }
    return oriTaxUnitPrice;
  }
}
exports({ entryPoint: MyAPIHandler });