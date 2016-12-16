package com.duobao.user.util;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URLDecoder;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.URI;
import org.apache.commons.httpclient.methods.GetMethod;

public class ChuangLanSMSAPI {
	
	/**
	 * 
	 * @param url 应用地址，类似于http://ip:port/msg/
	 * @param account 账号
	 * @param pswd 密码
	 * @param mobile 手机号码，多个号码使用","分割
	 * @param msg 短信内容
	 * @param needstatus 是否需要状态报告，需要true，不需要false
	 * @return 返回值定义参见HTTP协议文档
	 * @throws Exception
	 */
	public static String batchSend(
			String url, 
			String account, 
			String pswd, 
			String mobile, 
			String msg, 
			boolean needstatus 
			) throws Exception {
		HttpClient client = new HttpClient();
		GetMethod method = new GetMethod();
		try {
			URI base = new URI(url, false);
			method.setURI(new URI(base, "HttpBatchSendSM", false));
			method.setQueryString(new NameValuePair[] { 
					new NameValuePair("account", account),
					new NameValuePair("pswd", pswd), 
					new NameValuePair("mobile", mobile),
					new NameValuePair("needstatus", String.valueOf(needstatus)), 
					new NameValuePair("msg", msg),
					
				});
			int result = client.executeMethod(method);
			if (result == HttpStatus.SC_OK) {
				InputStream in = method.getResponseBodyAsStream();
				ByteArrayOutputStream baos = new ByteArrayOutputStream();
				byte[] buffer = new byte[1024];
				int len = 0;
				while ((len = in.read(buffer)) != -1) {
					baos.write(buffer, 0, len);
				}
				return URLDecoder.decode(baos.toString(), "UTF-8");
			} else {
				throw new Exception("HTTP ERROR Status: " + method.getStatusCode() + ":" + method.getStatusText());
			}
		} finally {
			method.releaseConnection();
		}

	}
	public static boolean sendSMSByChuangLan(String text,String... mobiles){
		String url = "http://222.73.117.156/msg/";// 应用地址
		String account = "kekawangluo";// 账号
		String pswd = "nicaicai!3";// 密码
		String mobile = "";// 手机号码，多个号码使用","分割
		String msg = text;// 短信内容
		boolean needstatus = true;// 是否需要状态报告，需要true，不需要false
		boolean first=true;
		for(String s:mobiles){
			if(first){
				mobile+=s;
				first=false;
			}
			else{
				mobile=mobile+","+s;
			}
		}
		try {
			String returnString = batchSend(url, account, pswd, mobile, msg, needstatus);
			System.out.println("returnString:"+returnString);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
}
