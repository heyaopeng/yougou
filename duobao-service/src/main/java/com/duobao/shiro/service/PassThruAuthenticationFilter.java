package com.duobao.shiro.service;

import java.util.Date;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.Device;
import org.springframework.mobile.device.DeviceUtils;

import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.user.service.UserProfileServiceI;
import com.duobao.user.service.UserServiceI;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class PassThruAuthenticationFilter extends AccessControlFilter{

    private static final Logger logger = LoggerFactory.getLogger(PassThruAuthenticationFilter.class);

    
	protected static final String AUTHORIZATION_HEADER = "Authorization";
	
	protected static final String SECRET_KEY = "cooka_secretkey_caicai";
	//TODO - complete JavaDoc

    public static final String DEFAULT_SUCCESS_URL = "/";

    private String successUrl = DEFAULT_SUCCESS_URL;
    
    @Autowired
    private UserProfileServiceI userProfileServiceI;
    
    @Autowired
    private UserServiceI userServiceI;

   
    public String getSuccessUrl() {
        return successUrl;
    }

    
    public void setSuccessUrl(String successUrl) {
        this.successUrl = successUrl;
    }
    
    /**
     * 表示访问拒绝时是否自己处理，如果返回true表示自己不处理且继续拦截器链执行
     */
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
    	
    	String loginUrl = getLoginUrl();
    	logger.info("----"+loginUrl);
    	setLoginUrl("/duobao-user-web/login") ;
    	logger.info("++++"+loginUrl);
        if (isLoginRequest(request, response)) {
        	logger.info("走拦截器");
            return true;
        } else {
        	logger.info("拒绝访问,重定向的登陆"+loginUrl);
            saveRequestAndRedirectToLogin(request, response);
            return false;
        }
    }

	/*
	 * 判断用户  否允许访问，返回true表示允许
	 */
	@Override
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
 		Subject subject = getSubject(request, response);
		boolean isAuthenticated = subject.isAuthenticated();
		if(isAuthenticated){
			return true;
		}else{
			HttpServletRequest httpRequest = WebUtils.toHttp(request);
			Device d = DeviceUtils.getCurrentDevice(httpRequest);
			if(d == null){
				logger.info("设备信息为空");
			}else{
				logger.info("==="+d.isMobile());
			}
			
			
			/*if(!DeviceUtils.getCurrentDevice(WebUtils.toHttp(request)).isMobile()){
				logger.info("==pc 端口");
			}else{
				logger.info("==移动   设备");
			}*/
			   //微信端针对 token  ,做自动登陆
			  String authHeader = getAuthzHeader(request);
		        if (authHeader == null || authHeader.length() == 0) {
		        	logger.info("header 为空");
		        	return false;
		        }
		        else{
		        	logger.info("取得的 jwt header 为"+authHeader);
		        	if(!authHeader.startsWith("Bearer ")){
		        		return false;
		        	}
		        	
		        	final String token = authHeader.substring(7); // The part after "Bearer "
		        	

		            try {
		                final Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
		                String phone = claims.getSubject();
		                UserProfile userProfile = userProfileServiceI.getUserProfileByEmailOrPhoneOrSerialNum(phone);
		                
		                if(userProfile == null){
		                	return false;
		                }
		                logger.info("get 到的 phone 为"+phone);
		                String pswd = userServiceI.getUserById(userProfile.getUserId()).getPassword().substring(0, 4);
		                
		                UsernamePasswordToken loginToken = new UsernamePasswordToken(phone, pswd);
		                loginToken.setRememberMe(true);
		        		Subject currentUser = SecurityUtils.getSubject();
		        		currentUser.login(loginToken);
		                request.setAttribute("claims", claims);
		                
		                HttpSession session = WebUtils.toHttp(request).getSession();
		                //session.setAttribute(name, value);
		                session.setAttribute(GlobalSessionConstant.USER_ID, userProfile.getUserId());
		                logger.info("自动登陆成功");
		                return true;
		            }
		            catch (Exception e) {
		            	//e.printStackTrace();
		                logger.info("无法解析的token");
		                return false;
		            }
		        	
		        }
		}
 	} 

    protected String getAuthzHeader(ServletRequest request) {
        HttpServletRequest httpRequest = WebUtils.toHttp(request);
        return httpRequest.getHeader(AUTHORIZATION_HEADER);
    }
    
    
    protected void issueSuccessRedirect(ServletRequest request, ServletResponse response) throws Exception {
        WebUtils.redirectToSavedRequest(request, response, getSuccessUrl());
    }
    
    public static String createToken(String subject){
    	return Jwts.builder().setSubject(subject)
        //.claim("roles", userDb.get(login.name))
        .setIssuedAt(new Date())
        .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }
}
