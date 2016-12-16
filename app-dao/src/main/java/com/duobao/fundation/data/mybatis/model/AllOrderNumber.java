package com.duobao.fundation.data.mybatis.model;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.OrderNumber;

public class AllOrderNumber {

	private List<OrderNumber> orderNumber;
	
	private Integer size;
	
	private String timeStr;

	public List<OrderNumber> getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(List<OrderNumber> orderNumber) {
		this.orderNumber = orderNumber;
	}

	public Integer getSize() {
		return size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	public String getTimeStr() {
		return timeStr;
	}

	public void setTimeStr(String timeStr) {
		this.timeStr = timeStr;
	}
	
	
}
