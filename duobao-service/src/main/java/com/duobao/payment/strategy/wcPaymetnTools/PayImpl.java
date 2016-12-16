package com.duobao.payment.strategy.wcPaymetnTools;


public class PayImpl extends PaymentUtils
{

 public PayImpl()
 {
 }

 public static String generateXML(Object object, String mch_api)
 {
     String reqXML = "";
     if(object == null)
         reqXML = fail("\u8BF7\u6C42\u53C2\u6570\u4E0D\u80FD\u4E3A\u7A7A");
     else
     if(mch_api == null || "".equals(mch_api))
         reqXML = fail("\u7B7E\u540D\u5546\u6237API\u5BC6\u94A5\u4E0D\u80FD\u4E3A\u7A7A");
     else
         reqXML = froXML(object, mch_api);
     return reqXML;
 }

 public static Object turnObject(String className, String respXML)
 {
     Object obj = toXML(className, respXML);
     if(obj == null)
         return null;
     else
         return obj;
 }

 public static Object turnObject(Class clzz, String respXML)
 {
     Object obj = toXML(clzz, respXML);
     if(obj == null)
         return null;
     else
         return obj;
 }

 public static String paySign(Object obj, String mch_api)
 {
     String paySign = "";
     if(obj == null)
         paySign = fail("\u8BF7\u6C42\u53C2\u6570\u4E0D\u80FD\u4E3A\u7A7A");
     else
     if(mch_api == null || "".equals(mch_api))
         paySign = fail("\u7B7E\u540D\u5546\u6237API\u5BC6\u94A5\u4E0D\u80FD\u4E3A\u7A7A");
     else
         paySign = getSign(obj, mch_api);
     return paySign;
 }

 public static String requestWechat(String req_URL, String reqXML)
 {
     String respXML = "";
     if(reqXML == null || "".equals(reqXML))
         respXML = fail("\u8BF7\u6C42\u53C2\u6570\u4E0D\u80FD\u4E3A\u7A7A");
     else
     if(req_URL == null || "".equals(req_URL))
         respXML = fail("\u8BF7\u6C42URL\u4E0D\u80FD\u4E3A\u7A7A");
     else
         respXML = reqWechat(req_URL, reqXML, null, null);
     return respXML;
 }

 public static String requestWechat(String req_URL, String reqXML, String certPath, String certPWD)
 {
     String respXML = "";
     if(reqXML == null || "".equals(reqXML))
         respXML = fail("\u8BF7\u6C42\u53C2\u6570\u4E0D\u80FD\u4E3A\u7A7A");
     else
     if(req_URL == null || "".equals(req_URL))
         respXML = fail("\u8BF7\u6C42URL\u4E0D\u80FD\u4E3A\u7A7A");
     else
     if(certPath == null || "".equals(certPath))
         respXML = fail("\u8BC1\u4E66API\u4E0D\u80FD\u4E3A\u7A7A");
     else
     if(certPWD == null || "".equals(certPWD))
         respXML = fail("\u8BC1\u4E66API\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A");
     else
         respXML = reqWechat(req_URL, reqXML, certPath, certPWD);
     return respXML;
 }
}


/*
	DECOMPILATION REPORT

	Decompiled from: C:\Users\Administrator\.m2\repository\fakepath\wechatpay\1.1\wechatpay-1.1.jar
	Total time: 23 ms
	Jad reported messages/errors:
	Exit status: 0
	Caught exceptions:
*/