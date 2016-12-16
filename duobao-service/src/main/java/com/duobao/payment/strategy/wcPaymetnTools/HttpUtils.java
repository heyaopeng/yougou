package com.duobao.payment.strategy.wcPaymetnTools;

import java.io.*;
import java.lang.reflect.Type;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.TreeMap;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.protocol.HTTP;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.common.reflect.TypeToken;

public class HttpUtils {

	public HttpUtils() {
	}

	public static String doHttpsPost(String url, String param) throws Exception {
		return postApache(url, param);
	}

	public static String postApache(String url, String param) {
		HttpPost post = new HttpPost(url);
		StringBuffer buff = new StringBuffer();
		String rep = "";
		try {
			StringEntity s = new StringEntity(param, "utf-8");
			s.setContentEncoding("UTF-8");
			s.setContentType("application/json");
			post.setEntity(s);
			CloseableHttpResponse response = HttpClients.createDefault().execute(post);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(entity.getContent()));
				while ((rep = bufferedReader.readLine()) != null)
					buff.append(rep);
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return buff.toString();
	}

	protected static String clientCustomPost(String url, String param, CloseableHttpClient httpclient) {
		StringBuffer buff = new StringBuffer();
		String retData = "";
		try {
			HttpPost post = new HttpPost(url);
			StringEntity s = new StringEntity(param, "utf-8");
			s.setContentEncoding("UTF-8");
			s.setContentType("application/json");
			post.setEntity(s);
			CloseableHttpResponse response = httpclient.execute(post);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(entity.getContent()));
				while ((retData = bufferedReader.readLine()) != null)
					buff.append(retData);
			}
			httpclient.close();
			response.close();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return buff.toString();
	}
	/**
     * 向指定URL发送GET方法的请求
     * 
     * @param url
     *            发送请求的URL
     * @param param
     *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return URL 所代表远程资源的响应结果
     */
    public static String sendGet(String url, String param) {
        String result = "";
        BufferedReader in = null;
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            // 设置通用的请求属性
            connection.setRequestProperty("accept", "*/*");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 建立实际的连接
            connection.connect();
            // 获取所有响应头字段
            Map<String, List<String>> map = connection.getHeaderFields();
            // 遍历所有的响应头字段
            for (String key : map.keySet()) {
                System.out.println(key + "--->" + map.get(key));
            }
            // 定义 BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            System.out.println("发送GET请求出现异常！" + e);
            e.printStackTrace();
        }
        // 使用finally块来关闭输入流
        finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return result;
    }
    //pattern:json格式{"access_token":"oxFXYb3laQzT2BExLweL6B3Aftp-N2hbSPFgs4bOYeSP4RsbYuTfoVEgbdkzWyyRvV9sdpxFweiD6e-3mh1EKT4op26ZdCVrKCcTPYM-1PzSH3BTwSlAKqlKvl9CfnJDATPdCHANGC","expires_in":7200}
    public static Map<String,String> transStringToMap(String mapString){  
    	mapString = mapString.replaceAll("\"", "");
    	mapString = mapString.replaceAll("\\{", "");
    	mapString = mapString.replaceAll("\\}", "");
    	/*Map<String,String> map = new HashMap<String,String>();  
	  	java.util.StringTokenizer items;  
	  	for(StringTokenizer entrys = new StringTokenizer(mapString, ",");entrys.hasMoreTokens();   
	      	map.put(items.nextToken(), (String) (items.hasMoreTokens() ? ((Object) (items.nextToken())) : null)))  
	      	items = new StringTokenizer(entrys.nextToken(), ":");  
	  	return map;  */
		Map<String, String> myMap = new TreeMap<String, String>();
		String s = mapString;
		String[] pairs = s.split(",");
		for (int i=0;i<pairs.length;i++) {
		    String pair = pairs[i];
		    String[] keyValue = pair.split(":");
		    myMap.put(keyValue[0], keyValue[1]);
		}
		return myMap;
	}
}

/*
 * DECOMPILATION REPORT
 * 
 * Decompiled from:
 * C:\Users\Administrator\.m2\repository\fakepath\wechatpay\1.1\wechatpay-1.1.
 * jar Total time: 17 ms Jad reported messages/errors: Exit status: 0 Caught
 * exceptions:
 */