package com.duobao.filter.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.resource.DefaultServletHttpRequestHandler;

/**
 * A Spring MVC <code>HandlerInterceptor</code> which is responsible to enforce CSRF token validity on incoming posts
 * requests. The interceptor should be registered with Spring MVC servlet using the following syntax:
 * 
 * <mvc:interceptors>
 *     <bean class="com.javan.security.CSRFHandlerInterceptor"/>
 * </mvc:interceptors>
 * 
 * @see CSRFRequestDataValueProcessor
 */
public class CSRFHandlerInterceptor extends HandlerInterceptorAdapter {

	private static final Logger logger = Logger .getLogger(CSRFHandlerInterceptor.class);

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

      if (handler instanceof DefaultServletHttpRequestHandler) {
          return true;
      }
      
      
      if (request.getMethod().equalsIgnoreCase("POST")){
          String sessionToken = CSRFTokenManager.getTokenForSession(request.getSession());   //从session 里面拿到token
          String requestToken = "default";
          boolean isAjaxRequest = isAjaxRequest(request);

          if(null!=request.getHeader("__RequestVerificationToken")){
          		requestToken =  request.getHeader("__RequestVerificationToken");
        	  logger.info("从header里面获取token"+requestToken);	
          }

          if(null!=CSRFTokenManager.getTokenFromRequest(request)){
          		requestToken = CSRFTokenManager.getTokenFromRequest(request);	
        	  logger.info("从form表单里面获取token"+requestToken);
          }
          
 
          if (!sessionToken.equals(requestToken)) {
        	  logger.info("CSRf攻击拦截,请求头的token "+requestToken+"   session中的："+sessionToken);

        	  String retUrl = request.getHeader("Referer");   
        	  
        	  if(retUrl != null){   
        		  logger.info("上一个访问链接是"+retUrl);
        	  }   
        	  
        	  if(isAjaxRequest){
        		  response.sendError(401);
        	  }else{
        		  response.sendRedirect("/duobao-user-web/login");
        	  }
        	  
              return false;
          }
          
          return true;
      }else {
          // GET - allow the request
    	  //logger.info("是get请求");
          return true;
      }
  }
  
  private  boolean isAjaxRequest(HttpServletRequest request) {
		String requestType = request.getHeader("X-Requested-With");
		if (requestType != null && requestType.equals("XMLHttpRequest")) {
			logger.info("非表单请求");
			return true;
		} else {
			logger.info("表单请求");
			return false;
		}
	}
}