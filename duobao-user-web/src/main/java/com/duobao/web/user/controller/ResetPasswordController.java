package com.duobao.web.user.controller;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.duobao.user.model.UserForm;
import com.duobao.user.service.UserServiceI;

@Controller
@EnableAutoConfiguration
@RequestMapping("/duobao-user-web")
public class ResetPasswordController {
	
	private static final Logger logger = Logger.getLogger(ResetPasswordController.class);
	@Autowired
	private UserServiceI userService;
	
	//选择重置方式
	@RequestMapping("/resetOptions")
	public String a() {
		return "resetOptions";
	}
	
	
	@RequestMapping("/resetEmailPswd")
	public String forgetpaswd(Map<String, Object> model){
		model.put("user", new UserForm());
		return "forgetpaswd";
	}
	
	@RequestMapping("/resetPhonePswd")
	public String resetPhonePswd(ModelMap model) {
		model.put("type", "inputPhone");
		return "resetPhonePswd";
	}
	
	//邮箱激活链接
	/*@RequestMapping("/resetpaswd")
	public String resetpaswd(
			@RequestParam(value="bid",required=true)String code1,
			@RequestParam(value="cid",required=true)String code2,
			@RequestParam(value="email",required=true)String email,
			HttpServletRequest request,Map<String,Object> model) throws IOException {
		HttpSession session = request.getSession();
		
		if(Strings.isNullOrEmpty(code1) || Strings.isNullOrEmpty(code2) || Strings.isNullOrEmpty(email)){
			logger.info("重置密码链接中缺少参数");
			model.put("flag", "errorLink");
			return "resetpaswd";
		}
		
		//User t_user =  userService.getUserByEmail(email);
		User t_user = new User();
		 
		if(!userService.isTimeOutLink(t_user.getUserId())){
			if (userService.verifyResetPswdCode(code1, code2, t_user)) {
				model.put("flag", "showResetForm");
				session.setAttribute(GlobalSessionConstant.ALLOW_TO_RESET_PASSWORD_ACCOUNT, email);
				model.put("user", new UserForm());
				return "resetpaswd";							//合法激活链接，渲染重设密码页面
			}else {
				logger.info("重置密码中的code验证不通过");
				model.put("flag", "outTimeLink");
				return "resetpaswd";
			}
		}else{
			logger.info("链接已过期");
			model.put("flag", "outTimeLink");
			return "resetpaswd";
		}
	}*/
 
}
