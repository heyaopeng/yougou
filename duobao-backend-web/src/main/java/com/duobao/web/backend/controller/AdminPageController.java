package com.duobao.web.backend.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.duobao.shiro.service.RedisManager;
import com.duobao.user.service.UserServiceI;


@Controller
@EnableAutoConfiguration
@RequestMapping("/duobao-backend-web/")
public class AdminPageController {
	
	
	private static final Logger logger = Logger.getLogger(AdminPageController.class);
	
	@RequestMapping("/admin")
	@RequiresPermissions("backend:home")
	public String admin(@RequestParam(value="page",defaultValue="1",required=true)Integer page,
			@RequestParam(value="pageSize",defaultValue="3",required=true)Integer pageSize
			,ModelMap model, HttpServletRequest request) {
		Subject subject = SecurityUtils.getSubject();
		return "admin";
	}
	
}
