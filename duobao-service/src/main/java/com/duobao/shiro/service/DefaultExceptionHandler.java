package com.duobao.shiro.service;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.data.mybatis.model.User;
import com.duobao.user.service.UserProfileServiceI;
import com.google.common.base.Strings;
 
@ControllerAdvice
public class DefaultExceptionHandler {

	@Autowired
	private UserProfileServiceI userProfileServiceI;
	
	private static final Logger logger = Logger.getLogger(DefaultExceptionHandler.class);
	/**
     * 没有权限 异常 处理类
     * <p/>
     * 后续根据不同的需求定制即可
     */
    @ExceptionHandler({UnauthorizedException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ModelAndView processUnauthenticatedException(HttpServletRequest request, HttpServletResponse response,UnauthorizedException e) {
    	
    	Subject currentUser = SecurityUtils.getSubject();//获取当前用户
    	//Session session =request.getAttribute(GlobalSessionConstant.USER_ID, null);
    	Integer userId = (Integer)currentUser.getSession().getAttribute(GlobalSessionConstant.USER_ID);  //获取会话
    	String errorMsg = e.getMessage();
    	if(userId!=null){
    		String role = JSON.toJSONString(userProfileServiceI.getRolesByUserId(userId));
    		errorMsg = "userId 为"+userId + "当前用户角色是 "+role+"\n"+ errorMsg ;
    	}
    	logger.info(errorMsg);
    	
    	//根据url 来判断，当该用户没有权限的时候，要返回什么
    	String getServerName = request.getServerName();
    	if(!Strings.isNullOrEmpty(getServerName)){
    		logger.info("server name 为"+getServerName);
    		
    		if(Pattern.matches("seller.*",getServerName) ||  Pattern.matches("merchant.*",getServerName)||Pattern.matches("m.*",getServerName)){
    			sendEmptyObject(response);
    			return null;
    		}else{
    			ModelAndView mv = new ModelAndView(); 
    	        mv.addObject("exception", errorMsg);
    	        mv.setViewName("unauthorized");
    	        return mv;
    		}
    	}
    	else{
    		logger.info("取到 server name 为空");
    		sendEmptyObject(response);
    		return null;
    	}
    }
    
    private void sendEmptyObject( HttpServletResponse response){
    	response.setContentType("application/json");
		PrintWriter out = null;
		try {
			out = response.getWriter();
			logger.info("来自移动端 ，返回空对象{}" );
			out.append(JSON.toJSONString(new User()));
			response.sendError(401);
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}finally{
			 if (out != null) {  
		            out.close();  
		        } 
		}
    }
}


/*
String getServerName = request.getServerName();
    	 ModelAndView mv = new ModelAndView(); 

return null;
}*/
