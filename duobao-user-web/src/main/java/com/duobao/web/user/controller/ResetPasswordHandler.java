package com.duobao.web.user.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.WebUtils;

import com.alibaba.fastjson.JSON;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.data.mybatis.model.User;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.user.model.UserForm;
import com.duobao.user.service.UserProfileServiceI;
import com.duobao.user.service.UserServiceI;
import com.duobao.user.util.UserUtil;
import com.google.code.kaptcha.Constants;
import com.google.common.base.Strings;

@Controller
@EnableAutoConfiguration
@RequestMapping("/duobao-user-web")
public class ResetPasswordHandler{
	@Autowired
	private UserServiceI userService;
	
	private UserProfileServiceI userProfileService;
	
	private static final Logger logger = Logger.getLogger(ResetPasswordHandler.class);
	
	/*
	 * 重置密码：发送重置密码邮箱
	 */
	@RequestMapping(value="/doforgetpaswd",method = RequestMethod.POST)
	public String sendUserCodeOrLink(@Valid  @ModelAttribute("user")UserForm user,
			BindingResult bindingResult,HttpServletRequest request,Map<String,Object> model) {
		String kaptchaExpected = (String) request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);

		if(bindingResult.hasErrors()){
			return "forgetpaswd";  
        }
		
    	String inputCaptcha = user.getCaptcha();
		if (Strings.isNullOrEmpty(inputCaptcha)) {
			logger.info("do not input captcha");
			bindingResult.rejectValue("captcha","captcha_require");
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			return "forgetpaswd";
		}
		
		if (!kaptchaExpected.equals(inputCaptcha)) {
			bindingResult.rejectValue("captcha","invalidateCaptcha");
			logger.info("error captchaImage");
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			return "forgetpaswd";
		}
		
		/*String account = user.getAccount();
		User tempUser = userService.getUserByEmailOrPhone(account);
		
		if (null == tempUser) {
			bindingResult.rejectValue("account", "account_not_exist");
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			return "forgetpaswd";
		} 
		
		logger.info(JSON.toJSONString(tempUser));
		
		if (tempUser.getIsActive()) {
			model.put("flag", "sendEmailSuccess");
			model.put("email",tempUser.getEmail());
			logger.info("发送成功");
			userService.sendUserResetPasswordEmail(tempUser);
		} else {
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			logger.info("the email is not acitve");
			bindingResult.rejectValue("email","not_active");
		}*/
		return "forgetpaswd";
	}

	/*
	 * 验证用户的手机验证码
	 */
	@RequestMapping(value="toSetPhonePaswd",method = RequestMethod.POST)
	public String sendPhoneUserCode(
			@RequestParam(value="phone",required=true)String phone,
			@RequestParam(value="phoneCode",required=true)String phoneCode,
			ModelMap model,HttpServletRequest request  ){
		
		phone =phone.replaceAll(" ", "");
		String randomNumInSession = (String)WebUtils.getSessionAttribute(request, GlobalSessionConstant.RANDOM_NUM);
		HttpSession session = request.getSession();
		logger.info("randomNum in session is "+randomNumInSession+"   get code is "+phoneCode);
		if(Strings.isNullOrEmpty(randomNumInSession) || !randomNumInSession.equals(phoneCode)){
			model.put("type", "inputPhone");
			model.put("phoneCode","phoneCode_is_wrong");
			return "resetPhonePswd";
		}
		session.removeAttribute(GlobalSessionConstant.RANDOM_NUM);
		session.setAttribute(GlobalSessionConstant.ALLOW_TO_RESET_PASSWORD_ACCOUNT, phone);
		model.put("type", "inputNewPswd");
		model.put("user", new UserForm());
		return "resetPhonePswd";
	}
	
	/*
	 * 重置密码
	 */
	@RequestMapping(value="/doresetpaswd",method = RequestMethod.POST)
	public String doReset(@Valid  @ModelAttribute("user")UserForm user,
			BindingResult bindingResult,
			Map<String,Object> model,HttpServletRequest request) {
		HttpSession session = request.getSession();
		
		if(Strings.isNullOrEmpty((String)session.getAttribute(GlobalSessionConstant.ALLOW_TO_RESET_PASSWORD_ACCOUNT))){
			logger.info("非法访问重设密码页面,session中不包含需要重置密");
			model.put("flag", "errorLink");
			return "resetpaswd";
		}
		
		String account = (String)session.getAttribute(GlobalSessionConstant.ALLOW_TO_RESET_PASSWORD_ACCOUNT);
		UserProfile userProfile = userProfileService.getUserProfileByEmailOrPhoneOrSerialNum(account);
		User tempUser =  userService.getUserById(userProfile.getUserId());
		
		tempUser.setPassword(user.getPassword());
		userService.updatePassword(tempUser);
		
		session.removeAttribute(GlobalSessionConstant.ALLOW_TO_RESET_PASSWORD_ACCOUNT);
		if(UserUtil.isPhone(account)){
			model.put("type", "resetSuccess");
			return "resetPhonePswd";
		}else{
			model.put("flag", "resetSuccess");
			return "resetpaswd";
		}
	}
}
