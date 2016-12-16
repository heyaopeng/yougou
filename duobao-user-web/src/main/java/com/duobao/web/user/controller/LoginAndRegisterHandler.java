package com.duobao.web.user.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.SavedRequest;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.DeviceUtils;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.duobao.filter.service.CSRFTokenManager;
import com.duobao.fundation.config.links.ConfigConstant;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.config.links.Language;
import com.duobao.fundation.config.links.OrderConstant;
import com.duobao.fundation.config.links.PermissionSetting.MarketPermission;
import com.duobao.fundation.data.mybatis.model.Order;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.user.model.UserForm;
import com.duobao.user.service.UserProfileServiceI;
import com.duobao.user.service.UserServiceI;
import com.duobao.user.util.JavaSmsApi;
import com.duobao.user.util.UserUtil;
import com.google.code.kaptcha.Constants;
import com.google.common.base.Strings;
import com.jhlabs.image.MarbleFilter;

@EnableRedisHttpSession
@Controller
@RequestMapping("/duobao-user-web")
public class LoginAndRegisterHandler {
	@Autowired
	private UserServiceI userService;


	@Autowired
	private UserProfileServiceI userProfileServiceI;
	
	
	private static final Logger logger = Logger.getLogger(LoginAndRegisterHandler.class);
	
	@RequestMapping(value = "/dologin")
	public String doLogin(@Valid @ModelAttribute("user") UserForm user, BindingResult bindingResult, HttpServletRequest request, ModelMap model) throws Exception {
		HttpSession session = request.getSession();
		boolean validateCaptcha = false;
		short error_count = 0;
		
		if(!request.getMethod().equals("POST")){
			return "redirect:/duobao-user-web/login";   //url直接访问dologin
		}
		
		String account = user.getAccount().replaceAll(" ", "");
		if(UserUtil.isPhone(account)){
			model.put("isPhone", "true");
		}
		
		if (bindingResult.hasErrors()) {
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			return "login";
		}
		
		logger.info("account 为"+account);
		UserProfile userProfile = userProfileServiceI.getUserProfileByEmailOrPhoneOrSerialNum(account);
		if (userProfile == null) {
			bindingResult.rejectValue("account", "account_not_exist");
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			return "login";
		} 
		
		if(userProfile.getLoginCount()>3)
			validateCaptcha = true;
			
		String inputCaptcha = user.getCaptcha();
		String kaptchaExpected = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);
		if (validateCaptcha || !Strings.isNullOrEmpty(inputCaptcha)) {
			if (Strings.isNullOrEmpty(inputCaptcha) || !inputCaptcha.equals(kaptchaExpected)) {
				bindingResult.rejectValue("captcha", "invalidateCaptcha");
				request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
				model.put("neddCaptcha", "neddCaptcha");
				return "login";
			}
		}
		
		if (!userProfile.getIsActive()) {
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			if (session.getAttribute(GlobalSessionConstant.ALLOW_SEND_DO_ACTIVE_EMAIL) != null && ((String) session.getAttribute(GlobalSessionConstant.ALLOW_SEND_DO_ACTIVE_EMAIL)).equals("hasSend")) {
				bindingResult.rejectValue("account", "to_active");
			} else {
				session.setAttribute(GlobalSessionConstant.ALLOW_SEND_DO_ACTIVE_EMAIL, "YES");    
				model.put("emailNotActive",account);
				bindingResult.rejectValue("account", "not_active");
			}
			return "login";
		}


		String inputPassword = user.getPassword();

		UsernamePasswordToken token = new UsernamePasswordToken(account, inputPassword);
		token.setRememberMe(true);
		
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			String account_in_session = (String) session.getAttribute(GlobalSessionConstant.USER_ACCOUNT);
			if (!account_in_session.equals(account)) {
				logger.info("使用第二个账号登陆，剔除前一个");
				currentUser.logout();
			}
		}

		try {
			currentUser.login(token);
			//WeiXinUtil.getOpenId();
			userService.updateLoginUserMsg(userProfile, userService.getIp(request)); //用户登录日志表更新
			error_count = 0;
			userProfile.setLoginCount(error_count);
			
			userProfileServiceI.updateUserProfile(userProfile);
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			initUseMessageInSession(account, userProfile.getUserId(), request.getSession());

			logger.info("登陆成功----");
			SavedRequest savedRequest = WebUtils.getSavedRequest(request);
			if (savedRequest == null || savedRequest.getRequestUrl() == null){
				if(currentUser.isPermitted("view_backend_home")){
 					return "redirect:/duobao-backend-web/admin";
				}
				else if(currentUser.isPermitted("market:view:home")){
					return "redirect:/duobao-market-web/home";
				}
				else if(currentUser.isPermitted("store:confirmOrders")){
					return DeviceUtils.getCurrentDevice(request).isMobile()? "redirect:/m/duobao-store-web/unconfirmedOrders":"redirect:/duobao-store-web/unconfirmedOrders";
				}
				else
					return "redirect:/duobao-user-web/center/profile";
			}
			 else
				return "redirect:" + savedRequest.getRequestUrl();
			

		} catch (IncorrectCredentialsException ice) {
			logger.info("对用户[" + account + "]进行登录验证..验证未通过,错误的凭证");
			error_count = userProfile.getLoginCount();
			if (error_count < 40)
				error_count++;
			if(error_count>3){
				model.put("neddCaptcha", "neddCaptcha");
			}
			
			userProfile.setLoginCount(error_count);
			if (userProfileServiceI.updateUserProfile(userProfile) > 0)
				logger.info(account+"更新密码错误次数成功:" + error_count);
			    
			bindingResult.rejectValue("password", "invalidatePassword");
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			return "login";
		}
	}

	/*// 异步弹窗登录
	@RequestMapping(value = "/ajaxLogin", method = RequestMethod.POST)
	public @ResponseBody String ajaxLogin(@Valid @ModelAttribute("user") UserForm user, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		HttpSession session = request.getSession();
		boolean validateCaptcha = false;
		String loginFlag = "wrongPassword";
		short error_count = 0;

		//ajax 登陆 validator 验证
		if (!bindingResult.hasErrors()) {
			String account = user.getAccount().replaceAll(" ", "");
			User tUser = userService.getUserByEmailOrPhone(account);
			if (tUser == null) {
				request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
				return "userNotExist";
			} 
			
			if(tUser.getLoginCount()>3)
				validateCaptcha = true;
			
			String inputCaptcha = user.getCaptcha();
			if (validateCaptcha || !Strings.isNullOrEmpty(inputCaptcha)) {
				String kaptchaExpected = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);
				if (Strings.isNullOrEmpty(inputCaptcha)||!inputCaptcha.equals(kaptchaExpected)) {
					session.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
					return "wrongCaptcha";
				}
			} 
			
			if (!tUser.getIsActive()) {
				request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
				if (session.getAttribute(GlobalSessionConstant.ALLOW_SEND_DO_ACTIVE_EMAIL) != null && ((String) session.getAttribute(GlobalSessionConstant.ALLOW_SEND_DO_ACTIVE_EMAIL)).equals("hasSend")) {
					return "to_active";
				} else {
					session.setAttribute(GlobalSessionConstant.ALLOW_SEND_DO_ACTIVE_EMAIL, "YES");
					return "not_active";
				}
			}

			if (tUser.getIsForbidden()) {
				request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
				return "isForbidden";
			}
			
			String inputPassword = user.getPassword();
			UsernamePasswordToken token = new UsernamePasswordToken(account, inputPassword);
			token.setRememberMe(true);
			Subject currentUser = SecurityUtils.getSubject();

			try {
				currentUser.login(token);
				userService.updateLoginUserMsg(tUser, userService.getIpAddr(request)); // 更新user的信息
				error_count = 0;
				tUser.setLoginCount(error_count);
				userService.updateUser(tUser);
				request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
				logger.info("用户[" + account + "] ajax 登陆成功");
				return initUseMessageInSession(account, tUser.getUserId(), request.getSession());
			} catch (IncorrectCredentialsException ice) {
				logger.info("对用户[" + account + "]进行登录验证..验证未通过,错误的凭证");
				error_count = tUser.getLoginCount();
				if (error_count < 40)
					error_count++;
				if (error_count >= 3)
					validateCaptcha = true;

				tUser.setLoginCount(error_count);
				if (userService.updateUser(tUser) == 1)
					logger.info(account+"更新密码错误次数成功:" + error_count);
				bindingResult.rejectValue("password", "invalidatePassword");
				request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
				return "wrongPassword";
			}
			
		}
		else
		{
			logger.info("基于注解的方式的表单拦截");
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
		}
		return loginFlag;
	}*/
	
/*
	@RequestMapping(value = "/active")
	public String activeAgain(@RequestParam("email") String email, HttpSession session, HttpServletResponse response, ModelMap model) {	
		User user = userService.getUserByEmail(email);
		if (null != user && !user.getIsActive() && null != session.getAttribute(GlobalSessionConstant.ALLOW_SEND_DO_ACTIVE_EMAIL)) {
			userService.sendUserActivateEmail(user);
			session.setAttribute(GlobalSessionConstant.ALLOW_SEND_DO_ACTIVE_EMAIL, "hasSend");
			logger.info("重新发送激活邮件成功");
			model.put("flag", "sendEmailToReg");
			model.put("message", user.getEmail());
			return "register";
		} else {
			logger.info("申请重新发送邮件异常异常");
			return "error";
		}
	}*/

	//给静态页token
	@RequestMapping("/get")
	public @ResponseBody String getTokenFormSession(HttpSession session,HttpServletResponse response){
		String token  = CSRFTokenManager.getTokenForSession(session);
		//System.out.println("----------------------"+token);
		response.setDateHeader("Expires", 0);
		response.setHeader("Cache-Control", "no-store, no-cache");
		response.setContentType("text/html;charset=UTF-8");
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		response.setHeader("Pragma", "no-cache");
		return token;
	}
	
	private String initUseMessageInSession(String account, Integer userId, HttpSession session) {
		UserProfile userProfile = userProfileServiceI.getUserProfileByUserId(userId);
		String name = account;
		if (null != userProfile) {
			if (!Strings.isNullOrEmpty(userProfile.getImage()))
				session.setAttribute(GlobalSessionConstant.USERPICTURE, userProfile.getImage());
			if (!Strings.isNullOrEmpty(userProfile.getName()))
				name = userProfile.getName();
			if(!Strings.isNullOrEmpty(userProfile.getPhone()))
				session.setAttribute(GlobalSessionConstant.USER_PHONE, userProfile.getPhone());	
		}
		session.setAttribute(GlobalSessionConstant.USER_NAME, name);
		session.setAttribute(GlobalSessionConstant.USER_ACCOUNT, account);
		session.setAttribute(GlobalSessionConstant.USER_ID, userId);

		
		//Integer awaiting_payment = orderService.selectCountsByOrder(countSearch);
		//session.setAttribute(GlobalSessionConstant.AWAITING_PAYMENT_ORDER_NUM, awaiting_payment);
		return name;
	}

	@RequestMapping(value = "/ajaxRegister", method = RequestMethod.POST)
	public @ResponseBody String doAjaxRegister(@Valid UserForm user, BindingResult bindingResult,HttpSession session, HttpServletRequest request, Map<String, Object> model) {
		//System.err.println(JSON.toJSONString(bindingResult.getAllErrors()));
		String kaptchaExpected = (String) request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
		logger.info("This is doRegister" + kaptchaExpected);

		String inputCaptcha = user.getCaptcha();
		if (Strings.isNullOrEmpty(inputCaptcha) || !kaptchaExpected.equals(inputCaptcha)) {
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			return "wrong_captcha";
		} 
		
		String account = user.getAccount().replaceAll(" ", "");
		
		if (userService.isExistAccount(account)) {
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			return "exist_account";
		} 
		
		
		boolean isPhone = UserUtil.isPhone(account);
		if(isPhone){
			String randomNumInSession = (String)request.getSession().getAttribute(GlobalSessionConstant.RANDOM_NUM);
			String phoneCode = user.getPhoneCode();
			if(Strings.isNullOrEmpty(randomNumInSession) || Strings.isNullOrEmpty(phoneCode)|| !randomNumInSession.equals(phoneCode)){
				logger.info("验证码错误"+randomNumInSession+"    phonCode"+phoneCode);
				return "wrong_phone_code";
			}else{
				return userService.regUser(user)<0? account:"error_account";
			}
		}
		else{
			session.setAttribute(GlobalSessionConstant.ALLOW_SEND_DO_ACTIVE_EMAIL, "hasSend");
			return userService.regUser(user)<0?  account:"error_account";
		}
	}
	
	@RequestMapping(value = "/doregister")
	public String doRegister(@Valid @ModelAttribute("user") UserForm user, 
			BindingResult bindingResult, HttpSession session, HttpServletRequest request, Map<String, Object> model) {
		String kaptchaExpected = (String) request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);

		if(!request.getMethod().equals("POST")){
			return "redirect:/duobao-user-web/register";
		}
		
		
		String account = user.getAccount().replaceAll(" ", "");
		if(UserUtil.isPhone(account)){
			model.put("isPhone", "true");
		}
		
		
		if (bindingResult.hasErrors()) {
			logger.info("========has error:" + bindingResult.toString());
			return "register";
		}
		
		String inputCaptcha = user.getCaptcha();
		if (Strings.isNullOrEmpty(inputCaptcha)) {
			logger.info("do not input captcha");
			bindingResult.rejectValue("captcha", "captcha_require");
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			return "register";
		}

		if (!kaptchaExpected.equals(inputCaptcha)) {
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			bindingResult.rejectValue("captcha", "invalidateCaptcha");
			logger.info("session captcha"+kaptchaExpected+" user input is ：" + user.getCaptcha());
			return "register";
		} 
		
		if (userService.isExistAccount(account)) {
			bindingResult.rejectValue("account", "account_is_exist");
			request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			return "register";
		} 
		
		if(UserUtil.isPhone(account)){
			String randomNumInSession = (String)request.getSession().getAttribute(GlobalSessionConstant.RANDOM_NUM);
			String phoneCode = user.getPhoneCode();
			if(Strings.isNullOrEmpty(randomNumInSession) || Strings.isNullOrEmpty(phoneCode)|| !randomNumInSession.equals(phoneCode)){
				
				logger.info("验证码错误"+randomNumInSession+"    phonCode"+phoneCode);
				bindingResult.rejectValue("phoneCode", "wrong_phone_code");
				
			}else{
				logger.info("注册成功");
				userService.regUser(user);
				model.put("flag", "regscussess");
			}
		}
		else{
			if(userService.regUser(user)>0){
				logger.info("Register successfully");
				session.setAttribute(GlobalSessionConstant.ALLOW_SEND_DO_ACTIVE_EMAIL, "hasSend");
				model.put("flag", "sendEmailToReg");
				model.put("message", user.getAccount());
			}else{
				bindingResult.rejectValue("account", "not_identified_Email");
				request.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			}
		}
		return "register";
	}

	@RequestMapping(value = "/isNeedCaptcha.do")
	public @ResponseBody boolean checkNeedCaptcha(@RequestParam(value = "account", required = true) String account, HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "*");
		if(StringUtils.isEmpty(account)){
			logger.info("account 为空");
			return false;
		}
		logger.info("验证是否需要验证码 ,account为"+account);
		UserProfile user = userProfileServiceI.getUserProfileByEmailOrPhoneOrSerialNum(account);
		boolean flag = false;
		if (user != null) {
			short error_count = user.getLoginCount();
			logger.info("The error time is ：" + error_count);
			if (error_count >= 3) {
				flag = true;
			}
		}
		return flag;
	}

	@RequestMapping(value = "/isLogin")
	public @ResponseBody boolean checkIsLogin(HttpSession session,HttpServletResponse response) {
		response.setContentType("text/html;charset=UTF-8");
		response.setDateHeader("Expires", 0);
		response.setHeader("Cache-Control", "no-store, no-cache");
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		response.setHeader("Pragma", "no-cache");
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			logger.info("This is isLogin,用户已经登录");
			String name = (String) session.getAttribute(GlobalSessionConstant.USER_NAME);
			logger.info("拿到的name 是"+name);
			return true;
		} else {
			logger.info("This is isLogin,用户没有登陆");
			return false;
		}
	}
	
	
	/*@RequestMapping(value = "/isLogin")
	public @ResponseBody String checkIsLogin(HttpSession session,HttpServletResponse response) {
		response.setContentType("text/html;charset=UTF-8");
		response.setDateHeader("Expires", 0);
		response.setHeader("Cache-Control", "no-store, no-cache");
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		response.setHeader("Pragma", "no-cache");
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			logger.info("This is isLogin,用户已经登录");
			String name = (String) session.getAttribute(GlobalSessionConstant.USER_NAME);
			return name;
		} else {
			logger.info("This is isLogin,用户没有登陆");
			return "false";
		}
	}*/

	@RequestMapping(value = "isExistEmail")
	public @ResponseBody String isExistEmail(@RequestParam(value="email",required=true) String account){
		boolean flag = !userService.isExistAccount(account);
		return "{\"valid\":\"" + flag + "\"}";
	}
	
	@RequestMapping(value = "isExistAccount")
	public @ResponseBody String isExistAccount(@RequestParam(value="account",required=true) String account){
		
		boolean flag = !userService.isExistAccount(account);
		logger.info("getAount "+account);
		return "{\"valid\":\"" + flag + "\"}";
	}
	
	@RequestMapping("/logout")
	public void doLogout(HttpServletRequest request,HttpServletResponse response) throws IOException {
		Subject currentUser = SecurityUtils.getSubject();
		currentUser.logout();
		String url = request.getHeader("Referer");
		logger.info("You are sign out and current url is:"+url);
		if(Strings.isNullOrEmpty(url))
			response.sendRedirect("/duobao-user-web/login");
		else
			response.sendRedirect(url);
	}

	@RequestMapping("/out")
	public void out(HttpServletRequest request,HttpServletResponse response) throws IOException {
		Subject currentUser = SecurityUtils.getSubject();
		currentUser.logout();
		String url = request.getHeader("Referer");
		logger.info("You are sign out and current url is:"+url);
	}
	
	@RequestMapping(value = "/getPhoneCode")
	public @ResponseBody String sendPhoneRandomCode1(@RequestParam(value="phone")String phone,HttpSession session){
		logger.info("GetPhone is"+phone);
		Long sendPhoneRandomwTime = (Long)session.getAttribute(GlobalSessionConstant.SEND_PHONE_RANDOM_TIME);
		 if(sendPhoneRandomwTime == null){
			 String randomNum = userService.getRandomNum();
			 if(session.getAttribute(GlobalSessionConstant.RANDOM_NUM)!=null)
			 {
				 session.removeAttribute(GlobalSessionConstant.RANDOM_NUM);
				 logger.info("session 中的手机验证码不为空");
				 
			 }
			 if(JavaSmsApi.sendMsg(ConfigConstant.MESSAGE_TYPE_DEFAULT, phone, randomNum)){
				 session.setAttribute(GlobalSessionConstant.RANDOM_NUM, randomNum);
				 logger.info("   "+(String)session.getAttribute(GlobalSessionConstant.RANDOM_NUM));
				 session.setAttribute(GlobalSessionConstant.SEND_PHONE_RANDOM_TIME, System.currentTimeMillis());
				 return "success";
			 }else{
				 return "fail";
			 }
		 }
		 else{
			 long t = System.currentTimeMillis() -  sendPhoneRandomwTime;
			 
			 if(t > ConfigConstant.DEFAULT_ALLOW_SEND_RANDMON_AGAIN){
				 String randomNum = userService.getRandomNum();
				 session.setAttribute(GlobalSessionConstant.RANDOM_NUM, randomNum);
				 session.setAttribute(GlobalSessionConstant.SEND_PHONE_RANDOM_TIME, System.currentTimeMillis());
				 if(JavaSmsApi.sendMsg(ConfigConstant.MESSAGE_TYPE_DEFAULT, phone, randomNum)){
					 session.setAttribute(GlobalSessionConstant.RANDOM_NUM, randomNum);
					 logger.info("   "+(String)session.getAttribute(GlobalSessionConstant.RANDOM_NUM));
					 session.setAttribute(GlobalSessionConstant.SEND_PHONE_RANDOM_TIME, System.currentTimeMillis());
					 return "success";
				 }else{
					 return "fail";
				 }
			 }
			 else
				 return "frequently";
		 }
	}
}
