package com.duobao.fundation.config.links;

public interface OrderConstant {

	/**
	 * 1-19 待付款
	 * 20-29待发货
	 * 30-39待收货
	 * 40-49交易成功
	 * 50-59 订单关闭
	 * */
	
	byte MIN = 0 ;
	byte AWAITING_PAYMENT = 1 ;
	byte AWAITING_SHIPMENT = 20;
	byte AWAITING_RECEIPT = 30;
	byte TRADE_SUCCESS = 40;
	byte TRADE_CLOSE = 50;
	byte MAX=127;

	
	
	
	byte AWAITING_PAYMENT_LEFT = 1 ;
	byte AWAITING_PAYMENT_RIGHT = 19 ;
	
	byte AWAITING_SHIPMENT_LEFT = 20;
	byte AWAITING_SHIPMENT_RIGHT = 29;
	
	byte AWAITING_RECEIPT_LEFT = 30;
	byte AWAITING_RECEIPT_RIGHT = 39;
	
	byte TRADE_SUCCESS_LEFT = 40;
	byte TRADE_SUCCESS_RIGHT = 49;
	
	byte TRADE_CLOSE_LEFT = 50;
	byte TRADE_CLOSE_RIGHT = 59;
	
	byte DISTRIBUTE_NOT = 1;
	byte DISTRIBUTE_YES = 2;
	byte  DISTRIBUTE_DO_NEED = 3;
	
	Integer TIME_FORM_PAYMENT = 15;
	
	
}