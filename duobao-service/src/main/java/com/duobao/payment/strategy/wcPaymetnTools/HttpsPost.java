package com.duobao.payment.strategy.wcPaymetnTools;

import java.io.BufferedReader;  
import java.io.FileInputStream;  
import java.io.IOException;  
import java.io.InputStreamReader;  
import java.net.MalformedURLException;  
import java.net.URL;  
import java.security.GeneralSecurityException;  
import java.security.KeyStore;  
  
import javax.net.ssl.HostnameVerifier;  
import javax.net.ssl.HttpsURLConnection;  
import javax.net.ssl.KeyManagerFactory;  
import javax.net.ssl.SSLContext;  
import javax.net.ssl.TrustManagerFactory;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;  
  
public class HttpsPost {  
    /** 
     * 获得KeyStore. 
     * @param keyStorePath 
     *            密钥库路径 
     * @param password 
     *            密码 
     * @return 密钥库 
     * @throws Exception 
     */  
    public static KeyStore getKeyStore(String password, String keyStorePath)  
            throws Exception {  
        // 实例化密钥库  
        KeyStore ks = KeyStore.getInstance("JKS");  
        // 获得密钥库文件流  
        FileInputStream is = new FileInputStream(keyStorePath);  
        // 加载密钥库  
        ks.load(is, password.toCharArray());  
        // 关闭密钥库文件流  
        is.close();  
        return ks;  
    }  
  
    /** 
     * 获得SSLSocketFactory. 
     * @param password 
     *            密码 
     * @param keyStorePath 
     *            密钥库路径 
     * @param trustStorePath 
     *            信任库路径 
     * @return SSLSocketFactory 
     * @throws Exception 
     */  
    public static SSLContext getSSLContext(String password,  
            String keyStorePath, String trustStorePath) throws Exception {  
        // 实例化密钥库  
        KeyManagerFactory keyManagerFactory = KeyManagerFactory  
                .getInstance(KeyManagerFactory.getDefaultAlgorithm());  
        // 获得密钥库  
        KeyStore keyStore = getKeyStore(password, keyStorePath);  
        // 初始化密钥工厂  
        keyManagerFactory.init(keyStore, password.toCharArray());  
  
        // 实例化信任库  
        TrustManagerFactory trustManagerFactory = TrustManagerFactory  
                .getInstance(TrustManagerFactory.getDefaultAlgorithm());  
        // 获得信任库  
        KeyStore trustStore = getKeyStore(password, trustStorePath);  
        // 初始化信任库  
        trustManagerFactory.init(trustStore);  
        // 实例化SSL上下文  
        SSLContext ctx = SSLContext.getInstance("TLS");  
        // 初始化SSL上下文  
        ctx.init(keyManagerFactory.getKeyManagers(),  
                trustManagerFactory.getTrustManagers(), null);  
        // 获得SSLSocketFactory  
        return ctx;  
    }  
  
    /** 
     * 初始化HttpsURLConnection. 
     * @param password 
     *            密码 
     * @param keyStorePath 
     *            密钥库路径 
     * @param trustStorePath 
     *            信任库路径 
     * @throws Exception 
     */  
    public static void initHttpsURLConnection(String password,  
            String keyStorePath, String trustStorePath) throws Exception {  
        // 声明SSL上下文  
        SSLContext sslContext = null;  
        // 实例化主机名验证接口  
        HostnameVerifier hnv = new MyHostnameVerifier();  
        try {  
            sslContext = getSSLContext(password, keyStorePath, trustStorePath);  
        } catch (GeneralSecurityException e) {  
            e.printStackTrace();  
        }  
        if (sslContext != null) {  
            HttpsURLConnection.setDefaultSSLSocketFactory(sslContext  
                    .getSocketFactory());  
        }  
        HttpsURLConnection.setDefaultHostnameVerifier(hnv);  
    }  
  
    /** 
     * 发送请求. 
     * @param httpsUrl 
     *            请求的地址 
     * @param xmlStr 
     *            请求的数据 
     */  
    public static void post(String httpsUrl, String xmlStr) {  
        HttpsURLConnection urlCon = null;  
        try {  
            urlCon = (HttpsURLConnection) (new URL(httpsUrl)).openConnection();  
            urlCon.setDoInput(true);  
            urlCon.setDoOutput(true);  
            urlCon.setRequestMethod("POST");  
            urlCon.setRequestProperty("Content-Length",  
                    String.valueOf(xmlStr.getBytes().length));  
            urlCon.setUseCaches(false);  
            //设置为gbk可以解决服务器接收时读取的数据中文乱码问题  
            urlCon.getOutputStream().write(xmlStr.getBytes("UTF-8"));  
            urlCon.getOutputStream().flush();  
            urlCon.getOutputStream().close();  
            BufferedReader in = new BufferedReader(new InputStreamReader(  
                    urlCon.getInputStream()));  
            String line;  
            while ((line = in.readLine()) != null) {  
                System.out.println(line);  
            }  
        } catch (MalformedURLException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
    }  
  
    /** 
     * 测试方法. 
     * @param args 
     * @throws Exception 
     */  
    public static String  httpsPost(String url,String params) {  
        // 密码  
        String password = "nicaicai";  
        // 密钥库  
        URL fileUrl = HttpsPost.class.getResource("/cooka-weixin.keystore");
        String keyStorePath = fileUrl.getPath();  
        // 信任库  
        String trustStorePath = fileUrl.getPath();  
        // 本地起的https服务  
        String httpsUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";  
        // 传输文本  
        String xmlStr = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><xml><appid>wxb1ca8c9df26c87bf</appid><body>电费充值</body><detail>电费充值</detail><device_info>192.168.94.1</device_info><fee_type>CNY</fee_type><mch_id>1270467201</mch_id><nonce_str>d1933956e825e7334b895fbe0418c04e</nonce_str><notify_url>http://seller.cookabuy.com/seller/WCNotifyHandler</notify_url<openid>oFgHAv75ZN9TR5v67RM_jjVJibhs</openid><out_trade_no>14594055304777475</out_trade_no><product_id>14594055304777475</product_id><spbill_create_ip>192.168.94.1</spbill_create_ip><total_fee>2</total_fee><trade_type>JSAPI</trade_type><sign><![CDATA[E77E8EB6AE98A134B22D5A933297B3D1]]></sign></xml>";  
        try {
			HttpsPost.initHttpsURLConnection(password, keyStorePath, trustStorePath);
		
	        // 发起请求  
			HttpPost post = new HttpPost(url);
		     StringBuffer buff = new StringBuffer();
		     String rep = "";
		     try
		     {
		         StringEntity s = new StringEntity(params, "utf-8");
		         s.setContentEncoding("UTF-8");
		         s.setContentType("application/json");
		         post.setEntity(s);
		         CloseableHttpResponse response = HttpClients.createDefault().execute(post);
		         HttpEntity entity = response.getEntity();
		         if(entity != null)
		         {
		             BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(entity.getContent()));
		             while((rep = bufferedReader.readLine()) != null) 
		                 buff.append(rep);
		         }
		     }
		     catch(Exception e)
		     {
		         throw new RuntimeException(e);
		     }
        } catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}  
		return null;
		
    }  
     
    public static void  main(String args[]) {  
        // 密码  
        String password = "nicaicai";  
        // 密钥库  
        URL fileUrl = HttpsPost.class.getResource("/cooka-weixin.keystore");
        String keyStorePath = fileUrl.getPath();  
        // 信任库  
        String trustStorePath = fileUrl.getPath();  
        // 本地起的https服务  
        String httpsUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";  
        // 传输文本  
        String xmlStr = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><xml><appid>wxb1ca8c9df26c87bf</appid><body>电费充值</body><detail>电费充值</detail><device_info>192.168.94.1</device_info><fee_type>CNY</fee_type><mch_id>1270467201</mch_id><nonce_str>d1933956e825e7334b895fbe0418c04e</nonce_str><notify_url>http://seller.cookabuy.com/seller/WCNotifyHandler</notify_url<openid>oFgHAv75ZN9TR5v67RM_jjVJibhs</openid><out_trade_no>14594055304777475</out_trade_no><product_id>14594055304777475</product_id><spbill_create_ip>192.168.94.1</spbill_create_ip><total_fee>2</total_fee><trade_type>JSAPI</trade_type><sign><![CDATA[E77E8EB6AE98A134B22D5A933297B3D1]]></sign></xml>";  
        try {
			HttpsPost.initHttpsURLConnection(password, keyStorePath, trustStorePath);
		
	        // 发起请求  
			HttpPost post = new HttpPost("https://api.mch.weixin.qq.com/pay/unifiedorder");
		     StringBuffer buff = new StringBuffer();
		     String rep = "";
		     try
		     {
		         StringEntity s = new StringEntity(xmlStr, "utf-8");
		         s.setContentEncoding("UTF-8");
		         s.setContentType("application/json");
		         post.setEntity(s);
		         CloseableHttpResponse response = HttpClients.createDefault().execute(post);
		         HttpEntity entity = response.getEntity();
		         if(entity != null)
		         {
		             BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(entity.getContent()));
		             while((rep = bufferedReader.readLine()) != null) 
		                 buff.append(rep);
		         }
		     }
		     catch(Exception e)
		     {
		         throw new RuntimeException(e);
		     }
        } catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}  
		
    }  
}
