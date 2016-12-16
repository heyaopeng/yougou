package com.duobao.web.user.controller;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.duobao.date.util.DateUtils;
import com.duobao.fundation.data.mybatis.mapping.OrderNumberMapper;
import com.duobao.fundation.data.mybatis.mapping.TableRowMapper;
import com.duobao.fundation.data.mybatis.mapping.VarMapper;
import com.duobao.fundation.data.mybatis.model.CartItem;
import com.duobao.fundation.data.mybatis.model.Order;
import com.duobao.fundation.data.mybatis.model.TableRow;
import com.duobao.fundation.data.mybatis.model.Var;
import com.duobao.user.service.DuobaoServiceI;
import com.duobao.user.service.UserServiceI;
import com.github.pagehelper.PageInfo;

@Component
@Configurable
@EnableScheduling
public class DuobaoSchedule {
	
	private static final Logger logger = Logger.getLogger(DuobaoSchedule.class);
	
	@Autowired
	private UserServiceI userService;
	@Autowired
	private DuobaoServiceI duobaoService;
	@Autowired
	private VarMapper varMapper;
	@Autowired
	private OrderNumberMapper orderNumberMapper;
	@Autowired
	private TableRowMapper tableRowMapper;
	
	/*@Scheduled(fixedRate = 1000 * 1)
	private void deleteDisableCardItem(){
		List<CartItem> cartItems = userService.selectCartItemForSchedule(1,50);
		for(CartItem item : cartItems){
			userService.deleteCartItem(item);
		}
	}
	*/
	@Scheduled(fixedRate = 1000 * 1)
	private void disableOrders(){
		userService.orderScheduleHandler(1,50);
	}	
	
	@Scheduled(cron="0 0 0 * * *")
	private void updateWXInfo(){
		userService.updateWXInfo();
	}
	
	/*@Scheduled(fixedRate = 1000 * 1)
	private void openHandlerSchedule(){
		duobaoService.openHandlerSchedule();
	}	*/
	@Scheduled(fixedRate = 1000 * 10)
	private void refreshWXToken(){
		Var var = varMapper.selectByPrimaryKey(new Integer(1));
		if(DateUtils.addSecond(var.getStorageTime(), 7200).before(new Date())){
			logger.info("更新微信Token");
			duobaoService.getGolbalAccessToken();
		}
	}	
	
	@Scheduled(fixedRate = 1000 * 1)
	private void pointTermOpenningHandler(){
		userService.pointTermOpenningHandler(1,50);
	}
	
	/*@Scheduled(fixedRate = 1000 * 1)
	private void pointTermOpenHandler(){
		userService.pointTermOpenHandler(1,50);
	}*/
	
	@Scheduled(fixedRate = 1000 * 5)
	private void sendPointToSubscriber(){
		userService.sendPointToSubscriber(1,200);
	}
	
	
	@Scheduled(cron="0 3/1 09-23 * * *")
	private void caipiao(){
		duobaoService.caipiao();
	}
	
	@Scheduled(fixedRate = 1000 * 5)
	private void updateTotalCount(){
		int count = orderNumberMapper.getTotalBuyCount();
		TableRow table = tableRowMapper.selectByTableName("db_order_numbers");
		table.setRows(count);
		tableRowMapper.updateByPrimaryKeySelective(table);
	}
	
	@Scheduled(cron="0 0 1 * * *")
	private void caipiao1(){
		logger.info("零点任务");
		duobaoService.createCaiPiaoTerm();
	}
}
