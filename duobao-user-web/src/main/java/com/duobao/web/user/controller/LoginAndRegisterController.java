package com.duobao.web.user.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.shiro.web.util.SavedRequest;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.mobile.device.Device;
import org.springframework.mobile.device.DeviceUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.duobao.user.model.UserForm;
import com.duobao.user.service.UserServiceI;
import com.duobao.userAgent.util.UserAgentUtils;
import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import com.google.common.base.Strings;

@Controller
@EnableAutoConfiguration
@RequestMapping("/duobao-user-web")
public class LoginAndRegisterController {

	@Autowired
	private HttpServletRequest request;
	@Autowired
	private Producer captchaProducer;
	@Autowired
	private HttpServletResponse response;
	@Autowired
	private UserServiceI userService;
	
	private static final Logger logger = Logger.getLogger(LoginAndRegisterController.class);
	
	@RequestMapping("redirect")
	public void  sendRedirct(HttpServletResponse response,HttpServletRequest request){
		try {
			response.sendRedirect("/duobao-user-web/errorType?type=repeatSubmit");
			logger.info(request.getHeader("Referer"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
  
	@RequestMapping("/errorType")
	public String errorController(
			@RequestParam(value="type",required = true)String type,
			@RequestParam(value="referer",required=false)String referer,
			ModelMap model){
		if(type.equals("repeatSubmit"))
			model.put("type", "repeatSubmit");
		
		if(!Strings.isNullOrEmpty(referer))
			model.put("referer", referer);
		
		return "error";
	}
	
	private  boolean isAjaxRequest(HttpServletRequest request) {
		String requestType = request.getHeader("X-Requested-With");
		logger.info("请求方式：" + JSON.toJSONString(request.getHeaderNames()));
		if (requestType != null && requestType.equals("XMLHttpRequest")) {
			return true;
		} else {
			//logger.info("非ajax 请求");
			return false;
		}
	}

	@RequestMapping("/login")
	//@com.duobao.filter.service.Token(save=true)
	public String login(Map<String, Object> model,HttpServletRequest request,HttpServletResponse response) throws IOException{
		//System.err.println(request.getSession().getMaxInactiveInterval());
		if(isAjaxRequest(request)){
			logger.info("是ajax 请求或者之前带有访问链接");
			response.sendError(401);
			return null;
		}

		String getServerName = request.getServerName();
		logger.info("getServerName   "+getServerName);
		/*if(Pattern.matches("^m.uclee.com/*$",getServerName)){
			logger.info("服务器的名为"+getServerName);
			response.sendError(401);
			return null;
		}*/
		
		SavedRequest savedRequest = WebUtils.getSavedRequest(request);
		if(savedRequest != null && savedRequest.getRequestUrl() != null){
			String requestUrl = savedRequest.getRequestUrl();
			savedRequest.getRequestURI();
			logger.info("之前带有访问链接,被重定向到登陆页面,之前的请求是"+requestUrl);
			Device device = DeviceUtils.getCurrentDevice(request);
			if(device.isMobile() || device.isTablet()){
				logger.info("设备来自手机或者平板");
				if(Pattern.matches(".seller.cookabuy.*",requestUrl)){
					return "redirect:/duobao-user-web/storelogin";
				}
				else{
					response.sendError(401);
					return null;
				}
			}
		}
		model.put("user", new UserForm());
		return "login";
	}
	/*@RequestMapping("/login")
	@ResponseBody
	//@com.duobao.filter.service.Token(save=true)
	public String login(Map<String, Object> model,HttpServletRequest request,HttpServletResponse response) throws IOException {
		logger.info("是ajax 请求或者之前带有访问链接");
		try {
			response.setCharacterEncoding("utf-8");
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("status", "401");
			out.write(JSON.toJSONString(map));
			out.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.sendError(401);
		return null;
	}
	*/
	@RequestMapping("/storelogin")
	public String storelogin(Map<String, Object> model,HttpServletRequest request,HttpServletResponse response) throws IOException{
		model.put("user", new UserForm());
		if(DeviceUtils.getCurrentDevice(request).isMobile()){
			logger.info("来自手机设备");
			return "storeLogin";
		}else{
			logger.info("来自浏览器");
			return "login";
		}
	}
	
	@RequestMapping("/register")
	public String register(Map<String, Object> model){
		model.put("user", new UserForm());
		return "register";
	}
	
	@RequestMapping("/captchaImage.do")
	public void showCaptcha() throws Exception {
		response.setDateHeader("Expires", 0);
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		response.setHeader("Pragma", "no-cache");
		response.setContentType("image/jpeg");
		String capText = captchaProducer.createText();
		request.getSession().setAttribute(Constants.KAPTCHA_SESSION_KEY, capText);
		BufferedImage bi = captchaProducer.createImage(capText);
		ServletOutputStream out = response.getOutputStream();
		ImageIO.write(bi, "jpg", out);
		try {
			out.flush();
		} finally {
			out.close();
		}
	}
	
	public boolean isWeiXinB(HttpServletRequest request){
		String browser = UserAgentUtils.getBrowserInfo(JSON.toJSONString(request.getHeader("User-Agent")));
		if (browser.contains("MicroMessenger")) {
			return true;
		}else{
			return false;
		}
	}
}
