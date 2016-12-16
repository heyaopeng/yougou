package com.duobao.fundation.data.mybatis.model;

import java.util.List;

public class Winner {
	private String name;
	
	private List<OrderNumber> orderNumber;
	
	private Long luckyNumber;
	
	private int count;
	
	private String serialNum;

	public String getSerialNum() {
		return serialNum;
	}

	public void setSerialNum(String serialNum) {
		this.serialNum = serialNum;
	}

	public Long getLuckyNumber() {
		return luckyNumber;
	}

	public void setLuckyNumber(Long luckyNumber) {
		this.luckyNumber = luckyNumber;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<OrderNumber> getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(List<OrderNumber> orderNumber) {
		this.orderNumber = orderNumber;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
}
