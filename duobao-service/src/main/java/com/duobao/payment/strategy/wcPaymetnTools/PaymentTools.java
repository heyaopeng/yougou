package com.duobao.payment.strategy.wcPaymetnTools;


import java.io.PrintStream;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.lijing.wechatpay.util.ssl.ClientCustomSSL;

public class PaymentTools
{

 public PaymentTools()
 {
 }

 protected static String createSign(SortedMap parameters, String KEYAPI)
 {
     StringBuffer sb = new StringBuffer();
     Set es = parameters.entrySet();
     for(Iterator it = es.iterator(); it.hasNext();)
     {
         java.util.Map.Entry entry = (java.util.Map.Entry)it.next();
         String k = (String)entry.getKey();
         Object v = entry.getValue();
         if(v != null && !"".equals(v) && !"sign".equals(k) && !"key".equals(k))
             if("prepay_id".equals(k))
                 sb.append((new StringBuilder("package=")).append(v).append("&").toString());
             else
                 sb.append((new StringBuilder(String.valueOf(k))).append("=").append(v).append("&").toString());
     }

     sb.append((new StringBuilder("key=")).append(KEYAPI).toString());
     return PayMD5.MD5Encode(sb.toString(), "UTF-8");
 }

 protected static String Signature(SortedMap parameters, String KEYAPI)
 {
     StringBuilder sb = new StringBuilder();
     StringBuilder sb2 = new StringBuilder();
     sb2.append("<?xml version='1.0' encoding='UTF-8' standalone='yes'?>\n<xml>");
     sb2.append("\n");
     Set es = parameters.entrySet();
     for(Iterator it = es.iterator(); it.hasNext(); sb2.append("\n"))
     {
         java.util.Map.Entry entry = (java.util.Map.Entry)it.next();
         String k = (String)entry.getKey();
         Object v = entry.getValue();
         sb.append(k);
         sb.append('=');
         sb.append(v);
         sb.append('&');
         sb2.append((new StringBuilder("<")).append(k).append(">").toString());
         sb2.append(v);
         sb2.append((new StringBuilder("</")).append(k).append(">").toString());
     }

     sb.append("key=");
     sb.append(KEYAPI);
     String packageSign = null;
     packageSign = createSign(parameters, KEYAPI);
     sb2.append("<sign><![CDATA[");
     sb2.append(packageSign);
     sb2.append("]]></sign>");
     sb2.append("\n</xml>");
     try
     {
         return new String(sb2.toString().getBytes(), "UTF-8");
     }
     catch(Exception e)
     {
         e.printStackTrace();
     }
     return "";
 }

 public static String getServerIP()
 {
     String serverip = "";
     try
     {
         Enumeration netInterfaces = null;
         for(netInterfaces = NetworkInterface.getNetworkInterfaces(); netInterfaces.hasMoreElements();)
         {
             NetworkInterface ni = (NetworkInterface)netInterfaces.nextElement();
             for(Enumeration ips = ni.getInetAddresses(); ips.hasMoreElements();)
             {
                 InetAddress ip = (InetAddress)ips.nextElement();
                 if(ip.isSiteLocalAddress())
                 {
                     serverip = ip.getHostAddress();
                     break;
                 }
             }

         }

     }
     catch(Exception ex)
     {
         serverip = "192.168.200.200";
     }
     return serverip;
 }

 public static Date policyHesitation(String dateTime)
 {
     SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
     Calendar ca = Calendar.getInstance();
     try
     {
         ca.setTime(sdf.parse(dateTime));
         ca.add(6, 10);
     }
     catch(ParseException e)
     {
         e.printStackTrace();
     }
     return ca.getTime();
 }

 protected static String reqWechat(String req_URL, String param, String cret, String mch_id)
 {
     String respXML = null;
     try
     {
         if(req_URL.equals(RERUND_URL))
             respXML = ClientCustomSSL.doClientCustomSSL(req_URL, param, cret, mch_id);
         else
             respXML = HttpUtils.postApache(req_URL, param);
     }
     catch(Exception e)
     {
         e.printStackTrace();
     }
     return respXML;
 }

 public static String getTimeStamp()
 {
     return Long.toString((new Date()).getTime() / 1000L);
 }

 public static String getPackage(String prepay_id)
 {
     return (new StringBuilder("prepay_id=")).append(prepay_id).toString();
 }

 public static String businessOrderNumber()
 {
     return (new StringBuilder(String.valueOf((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date())))).append(getcurrentTimeMillis()).append(PayMD5.nonceStrNumber()).toString();
 }

 public static String getcurrentTimeMillis()
 {
     return String.valueOf(System.currentTimeMillis()).substring(6, 13);
 }

 protected static String sbString(String prepay_id)
 {
     return prepay_id.substring(0, 10);
 }

 public static boolean isTime(String dateTime)
 {
     return (new Date()).before(policyHesitation(dateTime));
 }

 public static String getUnitCount(String money)
 {
     int count = Integer.parseInt(money.substring(0, money.length() - 3));
     return String.valueOf(count / 1000);
 }

 public static String getStringTime(Date dateTime)
 {
     return getFormat().format(dateTime);
 }

 public static Date getDateTime(String dateTime)
 {
     Date date = null;
     try
     {
         date = getFormat().parse(dateTime);
     }
     catch(ParseException e)
     {
         e.printStackTrace();
     }
     return date;
 }

 public static SimpleDateFormat getFormat()
 {
     return new SimpleDateFormat("yyyy-MM-dd");
 }

 public static String ChangeSex(String sex)
 {
     return sex != "M" ? "1" : "0";
 }

 public static String getStringTime(String dateTime)
 {
     SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
     SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
     Date date = null;
     try
     {
         date = sdf.parse(dateTime);
     }
     catch(ParseException e)
     {
         e.printStackTrace();
     }
     return sd.format(date);
 }

 public static String getStringDate(String dateTime)
 {
     SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
     SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
     Date date = null;
     try
     {
         date = sdf.parse(dateTime);
     }
     catch(ParseException e)
     {
         e.printStackTrace();
     }
     return sd.format(date);
 }

 public static String notify_urlSUCCESS()
 {
     return "<xml><return_code><![CDATA[SUCCESS]]></return_code> <return_msg><![CDATA[OK]]></return_msg></xml>";
 }

 public static String notify_urlFail()
 {
     return "<xml><return_code><![CDATA[FAIL]]></return_code><return_msg></return_msg></xml>";
 }

 protected static String fail(String msg)
 {
     return (new StringBuilder("<xml><return_code><![CDATA[FAIL]]></return_code>\n<return_msg><![CDATA[")).append(msg).append("]]></return_msg>").append("</xml>").toString();
 }

 private static String RERUND_URL = "https://api.mch.weixin.qq.com/secapi/pay/refund";

}


/*
	DECOMPILATION REPORT

	Decompiled from: C:\Users\Administrator\.m2\repository\fakepath\wechatpay\1.1\wechatpay-1.1.jar
	Total time: 29 ms
	Jad reported messages/errors:
	Exit status: 0
	Caught exceptions:
*/