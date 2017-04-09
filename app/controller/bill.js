// 首页换图片
// 购物车逻辑：删除 某个
// 订单展示（后台的）
// 订单管理， 可以填写订单发货号
// 部署

'use strict';

const moment = require('moment');
const marked = require('marked');
const AlipayNotify = require('../lib/alipay');
function pad(num, n) {
  var len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
}

function generatorAlipayUrl(config,id,total){
  let AlipayConfig = config;

  //请与贵网站订单系统中的唯一订单号匹配
  var out_trade_no = pad(id,14);
  //订单名称，显示在支付宝收银台里的“商品名称”里，显示在支付宝的交易管理的“商品名称”的列表里。
  var subject = 'defront 购物';
  //订单描述、订单详细、订单备注，显示在支付宝收银台里的“商品描述”里
  var body = 'defront 购物描述';
  //订单总金额，显示在支付宝收银台里的“应付总额”里
  var total_fee = total;


  //扩展功能参数——默认支付方式//

  //默认支付方式，取值见“即时到帐接口”技术文档中的请求参数列表
  var paymethod = "";
  //默认网银代号，代号列表见“即时到帐接口”技术文档“附录”→“银行列表”
  var defaultbank = "";

  //扩展功能参数——防钓鱼//

  //防钓鱼时间戳
  var anti_phishing_key = "";
  //获取客户端的IP地址，建议：编写获取客户端IP地址的程序
  var exter_invoke_ip = "";
  //注意：
  //1.请慎重选择是否开启防钓鱼功能
  //2.exter_invoke_ip、anti_phishing_key一旦被设置过，那么它们就会成为必填参数
  //3.开启防钓鱼功能后，服务器、本机电脑必须支持远程XML解析，请配置好该环境。
  //4.建议使用POST方式请求数据
  //示例：
  //anti_phishing_key = AlipayService.query_timestamp();	//获取防钓鱼时间戳函数
  //exter_invoke_ip = "202.1.1.1";

  //扩展功能参数——其他///

  //自定义参数，可存放任何内容（除=、&等特殊字符外），不会显示在页面上
  var extra_common_param = "";
  //默认买家支付宝账号
  var buyer_email = "";
  //商品展示地址，要用http:// 格式的完整路径，不允许加?id=123这类自定义参数
  var show_url = "http://localhost:7001/carts";

  //扩展功能参数——分润(若要使用，请按照注释要求的格式赋值)//

  //提成类型，该值为固定值：10，不需要修改
  var royalty_type = "";
  //提成信息集
  var royalty_parameters = "";
  //注意：
  //与需要结合商户网站自身情况动态获取每笔交易的各分润收款账号、各分润金额、各分润说明。最多只能设置10条
  //各分润金额的总和须小于等于total_fee
  //提成信息集格式为：收款方Email_1^金额1^备注1|收款方Email_2^金额2^备注2
  //示例：
  //royalty_type = "10"
  //royalty_parameters	= "111@126.com^0.01^分润备注一|222@126.com^0.01^分润备注二"

  //////////////////////////////////////////////////////////////////////////////////

  //把请求参数打包成数组
  var sParaTemp = [];
  sParaTemp.push(["payment_type", "1"]);
  sParaTemp.push(["out_trade_no", out_trade_no]);
  sParaTemp.push(["subject", subject]);
  sParaTemp.push(["body", body]);
  sParaTemp.push(["total_fee", total_fee]);
  //    sParaTemp.push(["show_url", show_url]);
  sParaTemp.push(["paymethod", paymethod]);
  sParaTemp.push(["defaultbank", defaultbank]);
  sParaTemp.push(["anti_phishing_key", anti_phishing_key]);
  sParaTemp.push(["exter_invoke_ip", exter_invoke_ip]);
  sParaTemp.push(["extra_common_param", extra_common_param]);
  sParaTemp.push(["buyer_email", buyer_email]);
  sParaTemp.push(["royalty_type", royalty_type]);
  sParaTemp.push(["royalty_parameters", royalty_parameters]);
  /**
   * 构造即时到帐接口
   * @param sParaTemp 请求参数集合
   * @return 表单提交HTML信息
   */
  var create_direct_pay_by_user = function (sParaTemp) {
    //增加基本配置
    sParaTemp.push(["service", "create_direct_pay_by_user"]);
    sParaTemp.push(["partner", AlipayConfig.partner]);
    sParaTemp.push(["return_url", AlipayConfig.return_url]);
    sParaTemp.push(["notify_url", AlipayConfig.notify_url]);
    sParaTemp.push(["seller_email", AlipayConfig.seller_email]);
    sParaTemp.push(["_input_charset", AlipayConfig.input_charset]);

    /**
     * 构造提交表单HTML数据
     * @param sParaTemp 请求参数数组
     * @param gateway 网关地址
     * @param strMethod 提交方式。两个值可选：post、get
     * @param strButtonName 确认按钮显示文字
     * @return 提交表单HTML文本
     */
    var buildURL = function (sParaTemp) {
      /**
       * 生成要请求给支付宝的参数数组
       * @param sParaTemp 请求前的参数数组
       * @return 要请求的参数数组
       */
      var buildRequestPara = function (sParaTemp) {
        var sPara = [];
        //除去数组中的空值和签名参数
        for (var i1 = 0; i1 < sParaTemp.length; i1++) {
          var value = sParaTemp[i1];
          if (value[1] == null || value[1] == "" || value[0] == "sign" ||
            value[0] == "sign_type") {
            continue;
          }
          sPara.push(value);
        }
        sPara.sort();
        //生成签名结果
        var prestr = "";
        //把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
        for (var i2 = 0; i2 < sPara.length; i2++) {
          var obj = sPara[i2];
          if (i2 == sPara.length - 1) {
            prestr = prestr + obj[0] + "=" + obj[1];
          } else {
            prestr = prestr + obj[0] + "=" + obj[1] + "&";
          }

        }
        prestr = prestr + AlipayConfig.key; //把拼接后的字符串再与安全校验码直接连接起来
        var crypto = require('crypto');
        var mysign = crypto.createHash('md5').update(prestr, AlipayConfig.input_charset).digest("hex");
        //签名结果与签名方式加入请求提交参数组中
        sPara.push(["sign", mysign]);
        sPara.push(["sign_type", AlipayConfig.sign_type]);

        return sPara;
      };
      //待请求参数数组
      var sPara = buildRequestPara(sParaTemp);
      var path = AlipayConfig.ALIPAY_PATH;


      for (var i3 = 0; i3 < sPara.length; i3++) {
        var obj = sPara[i3];
        var name = obj[0];
        var value = encodeURIComponent(obj[1]);
        if (i3 < (sPara.length - 1)) {
          path = path + name + "=" + value + "&";
        } else {
          path = path + name + "=" + value;
        }
      }
      return path.toString();
    };

    return buildURL(sParaTemp);
  };
  //构造函数，生成请求URL
  var sURL = create_direct_pay_by_user(sParaTemp);
  return sURL;
}

function countPrice(){

}
// 新增订单
exports.add = function* () {
  const name = this.request.body.name;
  const email = this.request.body.email;
  const phone = this.request.body.phone;
  const address = this.request.body.address;
  const country = this.request.body.country;
  const postcode = this.request.body.postcode;
  const user_id = this.session.user.id;
  let goods = yield this.service.cart.list(this.session.user.id);
  let total = 0;
  for (let i = 0, l = goods.length; i < l; i++) {
    let goodsInfo = yield this.service.goods.find(goods[i].goods_id);
    Object.assign(goods[i], goodsInfo);
    delete goods[i].content;
    delete goods[i].description;
    delete goods[i].in_pic;
    total += parseInt(goods[i].price)* goods[i].quantity;
  }

  let bill = yield this.service.bill.insert({
    user_id,
    name,
    email,
    phone,
    address,
    country,
    postcode,
    total: total,
    info: JSON.stringify(goods),
    status: 0 //创建订单
  });
  let bill_id = bill.insertId;
  //向支付宝网关发出请求
  //    requestUrl(AlipayConfig.ALIPAY_HOST,show_url,function(data){
  //        console.log(data);
  //    });
  let AlipayConfig = this.app.config.alipay;

  // 清除购物车 

  yield this.service.cart.remove({
    user_id: this.session.user.id
  });

  this.body = {
    success: true,
    surl: "https://" + AlipayConfig.ALIPAY_HOST + "/" + generatorAlipayUrl(this.app.config.alipay, bill_id, total)
  }

};

exports.pay = function *(){
  let bill_id = this.query.bill_id;
  let bill = yield this.service.bill.find(bill_id);
  let AlipayConfig = this.app.config.alipay;
  this.body = {
    success: true,
    surl: "https://" + AlipayConfig.ALIPAY_HOST + "/" + generatorAlipayUrl(this.app.config.alipay, bill_id, bill.total)
  } 
}

exports.send = function *(){
  let bill_id = this.query.bill_id;
  let shipping_code = this.query.shipping_code;
  let bill = yield this.service.bill.update({
    id:bill_id,
    status:2,
    shipping_code
  });
  this.body = {
    success: true
  } 
}

exports.confirm = function *(){
  let bill_id = this.query.bill_id;
  let bill = yield this.service.bill.update({
    id:bill_id,
    status:3
  });
  this.body = {
    success: true
  } 
}

// 更新订单状态
exports.update = function* () {
  const id = this.request.body.id;
  const title = this.request.body.title;
  const m_pic = this.request.body.m_pic;
  const in_pic = this.request.body.in_pic;


  yield this.service.bill.update({
    id,
    title,
    m_pic,
    in_pic,
  });

  this.body = {
    success: 'true'
  }
};

// 删除一个订单
exports.deleteBill = function* () {
  const id = +this.request.body.id;

  const success = yield this.service.bill.deleteBill(id);

  if (success) {
    this.body = true;
  } else {
    this.body = false;
  }
};


exports.paynotify = function* () {
  var params = this.query;
  var trade_no = params.trade_no; //支付宝交易号
  var order_no = params.out_trade_no; //获取订单号
  var total_fee = params.total_fee; //获取总金额
  var subject = params.subject; //商品名称、订单名称
  var body = "";
  if (params.body != null) {
    body = params.body; //商品描述、订单备注、描述
  }
  var buyer_email = param.buyer_email; //买家支付宝账号
  var trade_status = param.trade_status; //交易状态
  //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)//
  const self = this;
  AlipayNotify.verity(params, function (result) {
    console.log(result);
    if (result) {

      if (trade_status == "TRADE_FINISHED") {

      } else if (trade_status == "TRADE_SUCCESS") {
        self.body = "success"; //请不要修改或删除——
        return
      }
    } else {
      self.body = "fail";
      return
    }

  });
};
exports.payreturn = function* () {
  //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以下仅供参考)//
  var params = this.query;
  var trade_no = params.trade_no; //支付宝交易号
  var order_no = params.out_trade_no; //获取订单号
  var total_fee = params.total_fee; //获取总金额
  var subject = params.subject; //商品名称、订单名称
  var body = "";
  if (params.body != null) {
    body = params.body; //商品描述、订单备注、描述
  }
  var buyer_email = params.buyer_email; //买家支付宝账号
  var trade_status = params.trade_status; //交易状态
  //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)//
  const self = this;
  console.log(order_no, buyer_email, trade_status);
  /*
  yield this.service.bill.update({
    id,
    status:1
  });*/
  var id = parseInt(order_no);
  var verify = AlipayNotify.verity(params);

  if (verify.host) {
    const result = yield self.app.curl('https://' + verify.host + verify.path);
    if (trade_status == "TRADE_SUCCESS" && result.data.toString() === 'true') {
      yield this.service.bill.update({
        id,
        status:1
      })
      self.redirect('/profile');
      return;
    }

  } else {
    self.body = "fail";
    return
  }

};
