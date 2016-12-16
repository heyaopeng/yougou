package com.duobao.web.user.controller;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.scribe.model.Token;
import org.scribe.model.Verifier;
import org.scribe.oauth.OAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.data.mybatis.mapping.OauthLoginMapper;
import com.duobao.fundation.data.mybatis.model.OauthLogin;
import com.duobao.user.scribe.OAuthServiceProvider;
import com.google.common.base.Strings;

@Controller
@EnableAutoConfiguration
public class WeiXinUtil {
	
	@Autowired
	@Qualifier("weixinServiceProvider")
	private OAuthServiceProvider weixinServiceProvider;
	
	@Autowired
	private OauthLoginMapper  oauthLoginMapper;
	
	private static final Logger logger = Logger.getLogger(WeiXinUtil.class);
	
	/*public static void getOpenId(){
		
		String urlToGetCode = 
				"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx77164363cd4eb0e0"
				+ "&redirect_uri=http://seller.cookabuy.com/duobao-user-web/getOpendId&response_type=code"
				+ "&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect";
		
 
		
        CloseableHttpClient httpclient = HttpClients.createDefault();  
        CloseableHttpResponse response = null;
        try {
        	HttpGet httpGetCode = new HttpGet(urlToGetCode);
			response = httpclient.execute(httpGetCode);
			if(response.getStatusLine().getStatusCode()==200){  
	            String content = EntityUtils.toString(response.getEntity(),"utf-8");  
	            //code = JSON.parseObject(content).getString("code");
	            logger.info("发请求 获取code"+JSON.toJSONString(content));
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			logger.info("httpClient 请求异常,没能拿到openId");
			e.printStackTrace();
		}  
	}*/
	
	@RequestMapping(value={"/duobao-user-web/getOpendId"}, method = RequestMethod.GET)
	public  void weiXinCallback(@RequestParam(value="code", required=false) String oauthVerifier, 
			WebRequest request,ModelMap model,HttpSession session) {
		logger.info("code 是"+oauthVerifier);
 		OAuthService service = weixinServiceProvider.getService();
		Token accessToken = service.getAccessToken(null, new Verifier(oauthVerifier));
		JSONObject jsonObject = JSON.parseObject(accessToken.getRawResponse());  
 		String openId=jsonObject.getString("openid");
		logger.info("weiXinUtil 获取的openId 为"+openId);
		session.setAttribute("WEI_XIN_OPEN_ID", openId);
		Integer userId = (Integer) session.getAttribute(GlobalSessionConstant.USER_ID);
		logger.info("获取的userId id 是"+userId);
		//插入OauthLogin  或更新openId
		/*if(userId!=null && !Strings.isNullOrEmpty(openId)){
			OauthLogin oauthInfo = oauthLoginMapper.getOauthLoginInfoByUserId(userId);
			if(oauthInfo ==null){
				logger.info("oauth 表记录为空，这里再次获取");
				oauthInfo = new OauthLogin();
				oauthInfo.setUserId(userId);
				oauthInfo.setOauthType(WeiXinLogin.OAUTH_WEIXIN);

 				if(!Strings.isNullOrEmpty(openId)){
					oauthInfo.setOauthId(openId);
					oauthLoginMapper.insertSelective(oauthInfo);
				}
				else{
					logger.info("获取openId 失败");
				}
			}
			else{
				if(Strings.isNullOrEmpty(oauthInfo.getOauthId())){
					oauthInfo.setOauthId(openId);
					oauthLoginMapper.updateByPrimaryKeySelective(oauthInfo);
				}
			}
		}*/
	}
}
