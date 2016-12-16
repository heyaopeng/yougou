package com.duobao.web.user.test;

import java.util.Date;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.duobao.date.util.DateUtils;
import com.duobao.fundation.data.mybatis.mapping.OrderMapper;
import com.duobao.fundation.data.mybatis.model.Order;

public class DateTest extends AbstractServiceTests{
	private static final Logger logger = Logger.getLogger(DateTest.class);
	
	@Autowired
	private OrderMapper orderMapper;
	
	@Test
	public void testOrder(){
		logger.info(Integer.valueOf("010"));
		String a = JSON.toJSONString(DateUtils.format(new Date(), DateUtils.FORMAT_FULL));
		logger.info(Integer.valueOf(a.substring(a.length()-4, a.length())));
		String[] b = a.split("/.");
		logger.info(JSON.toJSONString(a.split("/.")));
		logger.info(JSON.toJSONString(b[1].split(".")));
	}
	
	@Test
	public void testAddMinute(){
		
		Date date = new Date();
		Date tmp = DateUtils.addMinute(date, 15);
		logger.info(JSON.toJSONString(DateUtils.format(date, DateUtils.FORMAT_FULL)));
		logger.info(JSON.toJSONString(DateUtils.format(tmp, DateUtils.FORMAT_FULL)));
	}
	
	@Test
	public void testDisAbleOrder(){
		Order order = orderMapper.selectByPrimaryKey(51);
		Date now = new Date();
		Date target = DateUtils.addMinute(order.getCreateTime(), 15);
		if(!now.before(target)){
			logger.info("in");
			order.setIsActive(false);
			orderMapper.updateByPrimaryKeySelective(order);
		}
	}
}
