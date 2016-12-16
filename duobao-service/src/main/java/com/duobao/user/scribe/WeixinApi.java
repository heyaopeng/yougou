package com.duobao.user.scribe;

import org.apache.log4j.Logger;
import org.scribe.builder.api.DefaultApi20;
import org.scribe.exceptions.OAuthException;
import org.scribe.model.OAuthConfig;
import org.scribe.model.OAuthConstants;
import org.scribe.model.OAuthRequest;
import org.scribe.model.Response;
import org.scribe.model.Token;
import org.scribe.model.Verifier;
import org.scribe.oauth.OAuth20ServiceImpl;
import org.scribe.oauth.OAuthService;
import org.scribe.utils.OAuthEncoder;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONPath;
import com.google.common.base.Strings;

public class WeixinApi extends DefaultApi20 {
    
	/**
	 * scope=snsapi_userinfo  使用这种方式 会弹出 授权页
	 * scope=snsapi_base   这种就不会
	 */
	private static final String AUTHORIZE_URL = 
			 "https://open.weixin.qq.com/connect/oauth2/authorize?"
			 + "appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
	//   snsapi_userinfo
	private static final String ACCESS_TOKEN_URL = "https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code";

	private static final Logger logger = Logger.getLogger(WeixinApi.class);
	
    @Override
    public String getAuthorizationUrl(OAuthConfig config) {
        return String.format(AUTHORIZE_URL, config.getApiKey(), OAuthEncoder.encode(config.getCallback()));
    }

    @Override
    public String getAccessTokenEndpoint() {
        return ACCESS_TOKEN_URL;
    }
    
    @Override
    public OAuthService createService(OAuthConfig config){
      return new WeixinOAuthService(this, config);
    }
    
    private class WeixinOAuthService extends OAuth20ServiceImpl {

    	private final DefaultApi20 api;
        private final OAuthConfig config;
        private final String authorizationUrl;
        
	 
		public WeixinOAuthService(DefaultApi20 api, OAuthConfig config) {
	        super(api, config);
	        this.api = api;
	        this.config = config;
	        this.authorizationUrl = getAuthorizationUrl(null);
	    }

		@Override
	    public Token getAccessToken(Token requestToken, Verifier verifier){
	      OAuthRequest request = new OAuthRequest(api.getAccessTokenVerb(), api.getAccessTokenEndpoint());
	      request.addQuerystringParameter("appid", config.getApiKey());
	      request.addQuerystringParameter("secret", config.getApiSecret());
	      request.addQuerystringParameter(OAuthConstants.CODE, verifier.getValue());
	      if(config.hasScope()) 
	    	  request.addQuerystringParameter(OAuthConstants.SCOPE, config.getScope());
	      Response response = request.send();
	      String responceBody = response.getBody();
	      logger.info("获取的来自微信的responceBody"+responceBody);
	      
	      Object result = JSON.parse(responceBody);
	      String access_token = JSONPath.eval(result, "$.access_token").toString();
	      if(Strings.isNullOrEmpty(access_token)){
	    	    throw new OAuthException(
                        "请求 body  中没有 access_token ,回掉失败"
                                + response + "'", null);
	      }
	      logger.info("--响应对象是"+JSON.toJSONString(result)+" access_token 是"+ access_token);
	      //System.out.printf("-------------"+JSON.toJSONString(result));
	      // return api.getAccessTokenExtractor().extract(responceBody);
	     return new Token(access_token, "", responceBody);
	    }
    }
}
