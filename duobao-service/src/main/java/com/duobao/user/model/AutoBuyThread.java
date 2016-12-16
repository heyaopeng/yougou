package com.duobao.user.model;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;

import com.duobao.fundation.data.mybatis.model.Term;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.model.SpringContextUtil;
import com.duobao.user.service.DuobaoServiceI;
import com.duobao.user.service.UserServiceI;
import com.duobao.user.service.impl.DuobaoServiceImpl;

public class AutoBuyThread implements Runnable{	
	
	private Term term;
	
	private BigDecimal money;
	
	private UserProfile profile;
	
	public AutoBuyThread(Term term,BigDecimal money, UserProfile profile) {
		// TODO Auto-generated constructor stub
		this.term=term;
		this.money=money;
		this.profile=profile;
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		DuobaoServiceI duobaoService = (DuobaoServiceI)SpringContextUtil.getBean("duobaoServiceImpl");
		duobaoService.autoBuyHandler(term,money,profile);
	}

}
