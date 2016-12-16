package com.duobao.user.model;

import java.math.BigDecimal;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.duobao.fundation.data.mybatis.mapping.UserProfileMapper;
import com.duobao.fundation.data.mybatis.model.Term;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.model.SpringContextUtil;
import com.duobao.user.service.DuobaoServiceI;
import com.duobao.user.service.UserServiceI;
import com.duobao.user.service.impl.DuobaoServiceImpl;

public class AddrRefreshThread implements Runnable{	
	
	private HttpServletRequest request;
	
	private UserProfile profile;
	
	public AddrRefreshThread(UserProfile profile,HttpServletRequest request) {
		// TODO Auto-generated constructor stub
		this.request=request;
		this.profile=profile;
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		UserProfileMapper userProfileMapper = (UserProfileMapper)SpringContextUtil.getBean("userProfileMapper");
		UserServiceI userService = (UserServiceI)SpringContextUtil.getBean("userServiceImpl");
		profile.setIpAddr(userService.getIpAddr(request));
		userProfileMapper.updateByPrimaryKeySelective(profile);
	}

}
