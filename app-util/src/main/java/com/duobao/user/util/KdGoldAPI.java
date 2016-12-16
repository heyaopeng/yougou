package com.duobao.user.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
/**
 *
 * 快递鸟物流轨迹即时查询接口
 *
 * @author: CQ
 * @qq: 1069712970
 * @see: http://www.kdniao.com/YundanChaxunAPI.aspx
 * @copyright: 深圳市快金数据技术服务有限公司
 *
 * DEMO中的电商ID与私钥仅限测试使用，正式环境请单独注册账号
 * 单日超过500单查询量，建议接入我方物流轨迹订阅推送接口
 * 
 * ID和Key请到官网申请：http://www.kdniao.com/ServiceApply.aspx
 * name:cookabuy  password:wifi password
 * 
 * 快递网：
 * http://www.kuaidi.com/mobileapi.html
 * 
 * ShipperCode  物流公司编号
 * LogisticCode 物流单号
 */

public class KdGoldAPI  {
	
	//电商ID
	private String EBusinessID="1256692";	
	//电商加密私钥，快递鸟提供，注意保管，不要泄漏
	private String AppKey="e2133386-853e-4833-a74f-a30ccff6cce7";	
	//请求url
	private String ReqURL="http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx";	
 
	
	public String getOrderTracesByJson(String  ShipperCode  ,String LogisticCode) throws Exception{
		String requestData= "{'OrderCode':'201406240002','ShipperCode':'"+ShipperCode+"','LogisticCode':'"+LogisticCode+"'}";
		
		Map<String, String> params = new HashMap<String, String>();
		params.put("RequestData", urlEncoder(requestData, "UTF-8"));
		params.put("EBusinessID", EBusinessID);
		params.put("RequestType", "1002");
		String dataSign=encrypt(requestData, AppKey, "UTF-8");
		params.put("DataSign", urlEncoder(dataSign, "UTF-8"));
		params.put("DataType", "2");
		
		String result=sendPost(ReqURL, params);	
		
		//根据公司业务处理返回的信息......
		System.err.println(result);
		return result;
	}
	
	
	/**
     * Json方式 查询订单物流轨迹
	 * @throws Exception 
     */
	public String getOrderTracesByJson() throws Exception{
		//String requestData= "{'OrderCode':'','ShipperCode':'SF','LogisticCode':'589707398027'}";
		String requestData= "{'OrderCode':'','ShipperCode':'YTO','LogisticCode':'881158955837058813'}";
		
		Map<String, String> params = new HashMap<String, String>();
		params.put("RequestData", urlEncoder(requestData, "UTF-8"));
		params.put("EBusinessID", EBusinessID);
		params.put("RequestType", "1002");
		String dataSign=encrypt(requestData, AppKey, "UTF-8");
		params.put("DataSign", urlEncoder(dataSign, "UTF-8"));
		params.put("DataType", "2");
		
		String result=sendPost(ReqURL, params);	
		
		//根据公司业务处理返回的信息......
		System.err.println(result);
		return result;
	}
	
	public static void main(String[] args) {
		KdGoldAPI a = new KdGoldAPI();
		try {
			
 			String result = a.getOrderTracesByJson("ZTO","376872278449");
 			JSONObject dataJSON = JSON.parseObject(result);
 			
 			System.err.println("全部信息 是"+JSON.toJSONString(dataJSON.get("State")));
 			System.err.println("全部信息 是"+JSON.toJSONString(dataJSON.get("Success")));

 			System.err.println("Traces 是"+JSON.toJSONString(dataJSON.get("Traces")));
 			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
 
	/**
     * MD5加密
     * @param str 内容       
     * @param charset 编码方式
	 * @throws Exception 
     */
	@SuppressWarnings("unused")
	private String MD5(String str, String charset) throws Exception {
	    MessageDigest md = MessageDigest.getInstance("MD5");
	    md.update(str.getBytes(charset));
	    byte[] result = md.digest();
	    StringBuffer sb = new StringBuffer(32);
	    for (int i = 0; i < result.length; i++) {
	        int val = result[i] & 0xff;
	        if (val <= 0xf) {
	            sb.append("0");
	        }
	        sb.append(Integer.toHexString(val));
	    }
	    return sb.toString().toLowerCase();
	}
	
	/**
     * base64编码
     * @param str 内容       
     * @param charset 编码方式
	 * @throws UnsupportedEncodingException 
     */
	private String base64(String str, String charset) throws UnsupportedEncodingException{
		String encoded = Base64.encode(str.getBytes(charset));
		return encoded;    
	}	
	
	@SuppressWarnings("unused")
	private String urlEncoder(String str, String charset) throws UnsupportedEncodingException{
		String result = URLEncoder.encode(str, charset);
		return result;
	}
	
	/**
     * 电商Sign签名生成
     * @param content 内容   
     * @param keyValue Appkey  
     * @param charset 编码方式
	 * @throws UnsupportedEncodingException ,Exception
	 * @return DataSign签名
     */
	@SuppressWarnings("unused")
	private String encrypt (String content, String keyValue, String charset) throws UnsupportedEncodingException, Exception
	{
		if (keyValue != null)
		{
			return base64(MD5(content + keyValue, charset), charset);
		}
		return base64(MD5(content, charset), charset);
	}
	
	 /**
     * 向指定 URL 发送POST方法的请求     
     * @param url 发送请求的 URL    
     * @param params 请求的参数集合     
     * @return 远程资源的响应结果
     */
	@SuppressWarnings("unused")
	private String sendPost(String url, Map<String, String> params) {
        OutputStreamWriter out = null;
        BufferedReader in = null;        
        StringBuilder result = new StringBuilder(); 
        try {
            URL realUrl = new URL(url);
            HttpURLConnection conn =(HttpURLConnection) realUrl.openConnection();
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // POST方法
            conn.setRequestMethod("POST");
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.connect();
            // 获取URLConnection对象对应的输出流
            out = new OutputStreamWriter(conn.getOutputStream(), "UTF-8");
            // 发送请求参数            
            if (params != null) {
		          StringBuilder param = new StringBuilder(); 
		          for (Map.Entry<String, String> entry : params.entrySet()) {
		        	  if(param.length()>0){
		        		  param.append("&");
		        	  }	        	  
		        	  param.append(entry.getKey());
		        	  param.append("=");
		        	  param.append(entry.getValue());		        	  
		        	  System.out.println(entry.getKey()+":"+entry.getValue());
		          }
		          System.out.println("param:"+param.toString());
		          out.write(param.toString());
            }
            // flush输出流的缓冲
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), "UTF-8"));
            String line;
            while ((line = in.readLine()) != null) {
                result.append(line);
            }
        } catch (Exception e) {            
            e.printStackTrace();
        }
        //使用finally块来关闭输出流、输入流
        finally{
            try{
                if(out!=null){
                    out.close();
                }
                if(in!=null){
                    in.close();
                }
            }
            catch(IOException ex){
                ex.printStackTrace();
            }
        }
        return result.toString();
    }
}
