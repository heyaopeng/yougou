package com.duobao.payment.strategy.wcPaymetnTools;

import com.alibaba.fastjson.JSON;
import com.duobao.payment.strategy.wcPaymetnTools.config.MerchantInfo;



public class DemoPay {
	
	private static String ORDER_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder" ;
	
	private static String RERUND_URL = "https://api.mch.weixin.qq.com/secapi/pay/refund" ;
	
	private static String FIND_ORDER_URL = "https://api.mch.weixin.qq.com/pay/orderquery" ;
	
	private static String CLOSE_ORDER_URL = "https://api.mch.weixin.qq.com/pay/closeorder" ;
	
	private static String DOWNLOADBILL = "https://api.mch.weixin.qq.com/pay/downloadbill" ;
	
	public static void main(String[] args) {
		/**
		 *  测试订单及支付
		 */
		//testAdvanceOrder();
//		
//		/**
//		 *  订单查询
//		 */
		QueryOrder queryOrder = new QueryOrder();
		queryOrder.setAppid(MerchantInfo.APPID);
		queryOrder.setMch_id(MerchantInfo.MERCHANT_CODE);
		queryOrder.setNonce_str(PayMD5.GetMD5nonce_str());
		queryOrder.setOut_trade_no("14642474189167546");
		String reqXML = PayImpl.generateXML(queryOrder, MerchantInfo.API_PASSWORD);
		System.out.println(JSON.toJSONString(reqXML));
		String respXML = PayImpl.requestWechat(FIND_ORDER_URL, reqXML);
		System.out.println(JSON.toJSONString(respXML));
		QueryOrderReults order = (QueryOrderReults) PayImpl.turnObject("com.cooka.finance.strategy.wexinpay.QueryOrderReults", respXML);
		System.out.println(JSON.toJSONString(order));
//		
//		/**
//		 *  申请退款
//		 */
//		ApplicationRefund applicationRefund = new ApplicationRefund();
//		applicationRefund.setAppid(order.getAppid());
//		applicationRefund.setMch_id(order.getMch_id());
//		applicationRefund.setNonce_str(PayMD5.GetMD5nonce_str());
//		applicationRefund.setTransaction_id(order.getTransaction_id());
//		applicationRefund.setOut_trade_no(order.getOut_trade_no());
//		applicationRefund.setOut_refund_no(PaymentTools.businessOrderNumber());
//		applicationRefund.setTotal_fee(order.getTotal_fee());
//		applicationRefund.setRefund_fee("1");
//		applicationRefund.setOp_user_id(order.getMch_id());
//		applicationRefund.setRefund_fee_type("CNY");
//		applicationRefund.setDevice_info(order.getDevice_info());
//		String sXML = PayImpl.generateXML(applicationRefund, "商户KEY_API密钥");
//		System.out.println(sXML+"==========");
//		String path = DemoPay.class.getResource("/").getFile().toString();
//		System.out.println(path);
//		respXML = PayImpl.requestWechat(RERUND_URL, sXML, "商户证书路径", "商户号（mch_id）");
////		System.out.println(respXML);
		
		
	}
	
	public static void testAdvanceOrder(){
		UniteOrder order = getUniteOrder();
		String reqXML = PayImpl.generateXML(order, "cookabuynicaicaicookabuynicaicai");
		System.out.println("step1:" + reqXML);
		String respXML = PayImpl.requestWechat(ORDER_URL, reqXML);
		System.out.println("step2:" + respXML);
		UniteOrderResult result = (UniteOrderResult) PayImpl.turnObject(UniteOrderResult.class, respXML);
		System.out.println("step3:" + JSON.toJSONString(result));
		WechatPay  wechatPay= getWechatPay(result);
		System.out.println("step4:" + JSON.toJSONString(wechatPay));

		
	}
	
	 
	
	public static WechatPay getWechatPay(UniteOrderResult result){
		WechatPay wechatPay = new WechatPay();
		wechatPay.setAppId(result.getAppid());
		wechatPay.setNonceStr(PayMD5.GetMD5nonce_str());
		wechatPay.setSignType("MD5");
		wechatPay.setPrepay_id("prepay_id="+result.getPrepay_id());
		wechatPay.setTimeStamp(PaymentTools.getTimeStamp());
		String sign = PayImpl.paySign(wechatPay, "cookabuynicaicaicookabuynicaicai");
		wechatPay.setPaySign(sign);
		wechatPay.setPaySign(sign);
		System.out.println();
		return wechatPay ;
	}
	
	public static UniteOrder getUniteOrder(){
		UniteOrder order = new UniteOrder();
		order.setAppid("wxb1ca8c9df26c87bf");
		order.setOpenid("oFgHAv1iSsby1Iac9fg4Y30AFWuw");
		order.setMch_id("1270467201");
		order.setDevice_info("10.145.26.138");
		order.setNonce_str("19667f9fa99ae31a5be90bc877ee540e");
		order.setBody("\"????\"");
		order.setDetail("????");
		order.setOut_trade_no("14593168600489440");
		order.setFee_type("CNY");
		order.setTotal_fee("100");
		order.setSpbill_create_ip("10.145.26.138");
		order.setNotify_url("http://seller.cookabuy.com/seller/WCNotifyHandler");
		order.setTrade_type("JSAPI");  // 表示二维码支付
		order.setProduct_id("14593168600489440");
		return order ;
		
	}
}
