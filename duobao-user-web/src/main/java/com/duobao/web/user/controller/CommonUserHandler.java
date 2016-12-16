package com.duobao.web.user.controller;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.duobao.fundation.config.links.ConfigConstant;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.data.mybatis.mapping.OauthLoginMapper;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.user.service.UserProfileServiceI;
import com.duobao.user.service.UserServiceI;
import com.duobao.user.util.JavaSmsApi;
import com.duobao.user.util.MailSender;
import com.duobao.user.util.RandomNum;
import com.google.common.base.Strings;
@Component
public class CommonUserHandler {
	
	protected    static final Log logger = LogFactory.getLog(new Object() {
		//静态方法中获取当前类名
		public String getClassName() {
		String className = this.getClass().getName();
		return className.substring(0, className.lastIndexOf("$"));
		}
	}.getClassName());

	@Autowired
	protected UserServiceI userService;
	
	@Autowired
	protected UserProfileServiceI userProfileServiceI;
	
	@Autowired
	protected OauthLoginMapper oauthLoginMapper;
	
	protected enum Result {
	       wrongFormSubmit,wrongCaptcha,notExistAccount,userIsExist,
	       unknowPhone,sendPhoneCodeSuccess,sendPhoneCodeFail,frequently,
	       sendEmailFail,sendEmailSuccess,unknowEmail,
	       randomCodeWrong,
	       errorPhone,
	       resetPasswordLinkWrong,resetPasswordLinkOutTime,
	       allowDoReset,
	       resetSuccess,resetFail,	       
	       registerSuccess,registerFail,
	       isForbidden,noActive,wrongPasswordAndShowCaptcha,invalidatePassword,
	       validatePassword,prohibitOperation,
	       success,fail,
	       firstLoginSuccess,
	       registerAndLoginSuccess,
	       isExistPhoneAccount,
	       twoPasswordNotMatch
	}
	
	protected UserProfile initUseMessageInSession(String account, Integer userId, HttpSession session) {
		UserProfile userProfile = userProfileServiceI.getUserProfileByUserId(userId);
		String name = account;
		if (null != userProfile) {
			if (!Strings.isNullOrEmpty(userProfile.getName()))
				name = userProfile.getName();
			if(!Strings.isNullOrEmpty(userProfile.getPhone()))
				session.setAttribute(GlobalSessionConstant.USER_PHONE, userProfile.getPhone());	
		}else{
			userProfile = new UserProfile();
		}
		
		session.setAttribute(GlobalSessionConstant.USER_NAME, name);
		session.setAttribute(GlobalSessionConstant.USER_ACCOUNT, account);
		userProfile.setName(name);
		return userProfile;
	}
	
	protected Result sendEmailUserCode(HttpSession session,String email){
		Long sendEmailRandomTime = (Long)session.getAttribute(GlobalSessionConstant.SEND_EMAIL_RANDOM_TIME);
		
		//初次发送
		if(sendEmailRandomTime == null)
			 return doSendCode(session, email,false);
		 
		//合法时间内发送  （1分钟）
		 long t = System.currentTimeMillis() -  sendEmailRandomTime;
		 if(t > ConfigConstant.DEFAULT_ALLOW_SEND_RANDMON_AGAIN)
			 return doSendCode(session, email,false);
		 
		 String account = (String)session.getAttribute(GlobalSessionConstant.ACCOUNT_HAS_SEND_CODE);
		 if(account.equals(email))
			 return Result.frequently;
		 
		return doSendCode(session, email,false);
		 
	}
	
	protected Result sendPhoneUserCode(HttpSession session,String phone){
		Long sendPhoneRandomwTime = (Long)session.getAttribute(GlobalSessionConstant.SEND_PHONE_RANDOM_TIME);
		
		if(sendPhoneRandomwTime == null)
			 return doSendCode(session, phone,true);
			 
		long t = System.currentTimeMillis() -  sendPhoneRandomwTime;
		if(t > ConfigConstant.DEFAULT_ALLOW_SEND_RANDMON_AGAIN)
			return doSendCode(session, phone,true);
				 
		String account = (String)session.getAttribute(GlobalSessionConstant.ACCOUNT_HAS_SEND_CODE);
		if(account.equals(phone)) 
			 return Result.frequently;
		 
		return doSendCode(session, phone,true);
	}
	
	private Result doSendCode(HttpSession session,String account,boolean isPhone){
		Result result = null;
		String randomNum = (new  RandomNum()).sixRandomNum();
		if(isPhone){
			 if(JavaSmsApi.sendMsg(ConfigConstant.MESSAGE_TYPE_DEFAULT, account, randomNum)){
				 logger.info("手机验证码发送成功");
				 session.setAttribute(GlobalSessionConstant.RANDOM_NUM, randomNum);
				 session.setAttribute(GlobalSessionConstant.SEND_PHONE_RANDOM_TIME, System.currentTimeMillis());
				 session.setAttribute(GlobalSessionConstant.ACCOUNT_HAS_SEND_CODE, account);
				 result = Result.sendPhoneCodeSuccess;
			 }
			 else
				 result = Result.sendPhoneCodeFail;
		}
		else{
			 String  res = new MailSender().sendVelocityEmail(account, randomNum, "RANDOM_NUM");
			 if(res.equals("success")){
				 session.setAttribute(GlobalSessionConstant.RANDOM_NUM, randomNum);
				 logger.info("   "+(String)session.getAttribute(GlobalSessionConstant.RANDOM_NUM));
				 session.setAttribute(GlobalSessionConstant.SEND_EMAIL_RANDOM_TIME, System.currentTimeMillis());
				 session.setAttribute(GlobalSessionConstant.ACCOUNT_HAS_SEND_CODE, account);
				 result = Result.sendEmailSuccess;
			 }
			 else
				 result = Result.sendEmailFail;
		}
		return result;
	}
}
