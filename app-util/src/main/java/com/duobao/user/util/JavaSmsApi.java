package com.duobao.user.util;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.DateUtil;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.duobao.date.util.DateUtils;
import com.duobao.fundation.config.links.ConfigConstant;
import com.duobao.fundation.config.links.UrlConfig;
import com.google.common.base.Strings;

/**
 * 短信http接口的java代码调用示例 基于Apache HttpClient 4.3
 *
 * @author songchao
 * @since 2015-04-03
 */

public class JavaSmsApi {

	private static final Logger logger = Logger.getLogger(JavaSmsApi.class);

	// 查账户信息的http地址
	private static String URI_GET_USER_INFO = "http://yunpian.com/v1/user/get.json";

	// 智能匹配模版发送接口的http地址
	private static String URI_SEND_SMS = "http://yunpian.com/v1/sms/send.json";

	// 模板发送接口的http地址
	private static String URI_TPL_SEND_SMS = "http://yunpian.com/v1/sms/tpl_send.json";

	// 发送语音验证码接口的http地址
	private static String URI_SEND_VOICE = "http://yunpian.com/v1/voice/send.json";

	// 编码格式。发送编码格式统一用UTF-8
	private static String ENCODING = "UTF-8";

	public static boolean sendMsg(Integer aciontType, String number, String randomNum) {

		if (Strings.isNullOrEmpty(number) || Strings.isNullOrEmpty(randomNum) || number.length() < 4) {
			return false;
		}

		if (!number.substring(0, 3).equals("+86")) {
			number = "+86" + number;
			logger.info("处理后的手机号码是" + number);
		}

		String text = null;
		if (aciontType == ConfigConstant.MESSAGE_TYPE_BOUND_PHONE) {
			text = "【柯咔网络】您正在设置手机号码，您的手机验证码是" + randomNum + "，如果这不是你本人操作，请忽略本短信";
		} else if (aciontType == ConfigConstant.MESSAGE_TYPE_VERIFY) {
			text = "【柯咔网络】您正在通过手机号码进行身份验证，您的手机验证码是" + randomNum + "，如果这不是你本人操作，请忽略本短信";
		} else if (aciontType == ConfigConstant.MESSAGE_TYPE_DEFAULT) {
			text = "【柯咔网络】您的验证码是" + randomNum + "。如非本人操作，请忽略本短信";
		} else if (aciontType == ConfigConstant.MESSAGE_STORE_NOTIFICATION) {
			text = "【柯咔网络】尊敬的Cooka合作商，您的商品在Cooka系统中已生成订单，请及时登陆系统确认商品信息及发货，" + UrlConfig.URL + "/cooka-store-web/unconfirmedOrders，祝您生活愉快！生意兴隆！";
		} else {
			return false;
		}

		logger.info(text);
		logger.info(number);

		String apikey = "fabf234c51f7387672aa9f0d2f8825a9";
		try {
			String result = JavaSmsApi.sendSms(apikey, text, number);
			logger.info(result);
			JSONObject dataJSON = JSON.parseObject(result);
			boolean res=((Integer) dataJSON.get("code")) == 0 ? true : false;
			if(res==false){
				String s="【柯咔网络】";
				if(text.startsWith(s)){
					text = text.substring(s.length());
				}
				res= ChuangLanSMSAPI.sendSMSByChuangLan(text, number);
			}
			return res;

		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}

	public static int sendPhoneMsg(Integer aciontType, String number, String randomNum) {

		if (Strings.isNullOrEmpty(number) || Strings.isNullOrEmpty(randomNum) || number.length() < 4) {
			logger.error("系统错误传入的随机数不合法"+randomNum);
			return -1;
		}

		if (!number.substring(0, 3).equals("+86")) {
			number = "+86" + number;
			logger.info("处理后的手机号码是" + number);
		}

		String text = null;
		if (aciontType == ConfigConstant.MESSAGE_TYPE_BOUND_PHONE) {
			text = "【柯咔网络】您正在设置手机号码，您的手机验证码是" + randomNum + "，如果这不是你本人操作，请忽略本短信";
		} else if (aciontType == ConfigConstant.MESSAGE_TYPE_VERIFY) {
			text = "【柯咔网络】您正在通过手机号码进行身份验证，您的手机验证码是" + randomNum + "，如果这不是你本人操作，请忽略本短信";
		} else if (aciontType == ConfigConstant.MESSAGE_TYPE_DEFAULT) {
			text = "【柯咔网络】您的验证码是" + randomNum + "。如非本人操作，请忽略本短信";
		} else if (aciontType == ConfigConstant.MESSAGE_STORE_NOTIFICATION) {
			text = "【柯咔网络】尊敬的Cooka合作商，您的商品在Cooka系统中已生成订单，请及时登陆系统确认商品信息及发货，" + UrlConfig.URL + "/cooka-store-web/unconfirmedOrders，祝您生活愉快！生意兴隆！";
		} else {
			logger.info("系统错误，未找到匹配模板");
			return -1;
		}

		logger.info(text);
		logger.info(number);

		String apikey = "fabf234c51f7387672aa9f0d2f8825a9";
		try {
			String result = JavaSmsApi.sendSms(apikey, text, number);
			logger.info(result);
			JSONObject dataJSON = JSON.parseObject(result);
			return ((Integer) dataJSON.get("code"));

		} catch (IOException e) {
			e.printStackTrace();
			logger.info("网络错误，发送验证码失败");
			return -1;
		}
	}
	
	public static boolean sendMsgForStallLease(String number, String type, String rejectReason, String market, Date timestamp) {

		if (Strings.isNullOrEmpty(number) || number.length() < 4) {
			return false;
		}

		if (!number.substring(0, 3).equals("+86")) {
			number = "+86" + number;
			logger.info("处理后的手机号码是" + number);
		}

		String text = null;
		if (type.equals("apporve")) {
			text = "【柯咔网络】您在" + DateUtils.format(timestamp, DateUtils.FORMAT_SHORT_CN) + "发布的档口租赁信息已成功通过" + market
					+ "市场审核，详情请查看公众号，请知悉！";
		} else if (type.equals("reject")) {
			text = "【柯咔网络】您在" + DateUtils.format(timestamp, DateUtils.FORMAT_SHORT_CN) + "发布的档口租赁信息未能成功通过，审核不通过原因为:"
					+ rejectReason + "，请知悉！";
		}

		logger.info(text);
		logger.info(number);

		String apikey = "fabf234c51f7387672aa9f0d2f8825a9";
		try {
			String result = JavaSmsApi.sendSms(apikey, text, number);
			logger.info(result);
			JSONObject dataJSON = JSON.parseObject(result);
			
			boolean res=((Integer) dataJSON.get("code")) == 0 ? true : false;
			if(res==false){
				String s="【柯咔网络】";
				if(text.startsWith(s)){
					text = text.substring(s.length());
				}
				res= ChuangLanSMSAPI.sendSMSByChuangLan(text, number);
			}
			return res;

		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}

	public static void main(String[] args) throws IOException, URISyntaxException {

		logger.info(JavaSmsApi.sendMsg(ConfigConstant.MESSAGE_TYPE_BOUND_PHONE, "+84961832358", "592077"));
		// 修改为您的apikey.apikey可在官网（http://www.yuanpian.com)登录后用户中心首页看到
		// String apikey = "fabf234c51f7387672aa9f0d2f8825a9";

		// 修改为您要发送的手机号
		// String mobile = "15626139118";

		/**************** 查账户信息调用示例 *****************/
		// logger.info(JavaSmsApi.getUserInfo(apikey));

		/**************** 使用智能匹配模版接口发短信(推荐) *****************/
		// 设置您要发送的内容(内容必须和某个模板匹配。以下例子匹配的是系统提供的1号模板）
		// String text = "【柯咔网络】您的验证码是1234。如非本人操作，请忽略本短信";
		// String text = "【cooka】[cooka]Your verification code is 12345. if you
		// are not the operator, please ignore this message.";
		// 发短信调用示例
		// logger.info(JavaSmsApi.sendSms(apikey, text, "+84969568018"));

		/**************** 使用指定模板接口发短信(不推荐，建议使用智能匹配模版接口) *****************/
		// 设置模板ID，如使用1号模板:【#company#】您的验证码是#code#
		// long tpl_id = 1;
		// 设置对应的模板变量值
		// 如果变量名或者变量值中带有#&=%中的任意一个特殊符号，需要先分别进行urlencode编码
		// 如code值是#1234#,需作如下编码转换
		// String codeValue = URLEncoder.encode("#1234#", ENCODING);
		/* String tpl_value = "#code#=1111" + "&#company#=云片网"; */
		// 模板发送的调用示例
		/*
		 * logger.info(JavaSmsApi.tplSendSms(apikey, tpl_id, tpl_value,
		 * mobile));
		 */

		/**************** 使用接口发语音验证码 *****************/
		// String code = "1234";
		// logger.info(JavaSmsApi.sendVoice(apikey, mobile ,code));
	}

	/**
	 * 取账户信息
	 *
	 * @return json格式字符串
	 * @throws java.io.IOException
	 */

	public static String getUserInfo(String apikey) throws IOException, URISyntaxException {
		Map<String, String> params = new HashMap<String, String>();
		params.put("apikey", apikey);
		return post(URI_GET_USER_INFO, params);
	}

	/**
	 * 智能匹配模版接口发短信
	 *
	 * @param apikey
	 *            apikey
	 * @param text
	 *            短信内容
	 * @param mobile
	 *            接受的手机号
	 * @return json格式字符串
	 * @throws IOException
	 */

	public static String sendSms(String apikey, String text, String mobile) throws IOException {
		Map<String, String> params = new HashMap<String, String>();
		params.put("apikey", apikey);
		params.put("text", text);
		params.put("mobile", mobile);
		return post(URI_SEND_SMS, params);
	}

	/**
	 * 通过模板发送短信(不推荐)
	 *
	 * @param apikey
	 *            apikey
	 * @param tpl_id
	 *            模板id
	 * @param tpl_value
	 *            模板变量值
	 * @param mobile
	 *            接受的手机号
	 * @return json格式字符串
	 * @throws IOException
	 */

	public static String tplSendSms(String apikey, long tpl_id, String tpl_value, String mobile) throws IOException {
		Map<String, String> params = new HashMap<String, String>();
		params.put("apikey", apikey);
		params.put("tpl_id", String.valueOf(tpl_id));
		params.put("tpl_value", tpl_value);
		params.put("mobile", mobile);
		return post(URI_TPL_SEND_SMS, params);
	}

	/**
	 * 通过接口发送语音验证码
	 * 
	 * @param apikey
	 *            apikey
	 * @param mobile
	 *            接收的手机号
	 * @param code
	 *            验证码
	 * @return
	 */

	public static String sendVoice(String apikey, String mobile, String code) {
		Map<String, String> params = new HashMap<String, String>();
		params.put("apikey", apikey);
		params.put("mobile", mobile);
		params.put("code", code);
		return post(URI_SEND_VOICE, params);
	}

	/**
	 * 基于HttpClient 4.3的通用POST方法
	 *
	 * @param url
	 *            提交的URL
	 * @param paramsMap
	 *            提交<参数，值>Map
	 * @return 提交响应
	 */

	public static String post(String url, Map<String, String> paramsMap) {
		CloseableHttpClient client = HttpClients.createDefault();
		String responseText = "";
		CloseableHttpResponse response = null;
		try {
			HttpPost method = new HttpPost(url);
			if (paramsMap != null) {
				List<NameValuePair> paramList = new ArrayList<NameValuePair>();
				for (Map.Entry<String, String> param : paramsMap.entrySet()) {
					NameValuePair pair = new BasicNameValuePair(param.getKey(), param.getValue());
					paramList.add(pair);
				}
				method.setEntity(new UrlEncodedFormEntity(paramList, ENCODING));
			}
			response = client.execute(method);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				responseText = EntityUtils.toString(entity);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				response.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return responseText;
	}
}