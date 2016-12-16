package com.duobao.web.user.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.duobao.user.service.DuobaoServiceI;
import com.duobao.user.service.UserServiceI;

@Controller
@EnableAutoConfiguration
@RequestMapping("/duobao-user-web/")
public class AlipayNotifyHandler {
	private static final Logger logger = Logger.getLogger(AlipayNotifyHandler.class);

	@Autowired
	private UserServiceI userService;
	@RequestMapping(value = "/alipayNotifyHandler")
	@ResponseBody
	public String alipayNotifyHandler(HttpServletRequest request, HttpServletResponse response) {
		return userService.alipayNotifyHandle(request);
	}
}
