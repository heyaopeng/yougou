package com.duobao.velocity;

import org.apache.velocity.tools.Scope;
import org.apache.velocity.tools.config.DefaultKey;
import org.apache.velocity.tools.config.ValidScope;

import com.duobao.fundation.config.links.OrderCodeConstant;

@DefaultKey("orderCode")
@ValidScope(Scope.APPLICATION)
public class OrderCode {

	private static final String waitPay = OrderCodeConstant.waitPay;
	private static final String waitShip = OrderCodeConstant.waitShip;
	private static final String waitRec = OrderCodeConstant.waitRec;
	private static final String tradeSuccess = OrderCodeConstant.tradeSuccess;
	private static final String tradeClose = OrderCodeConstant.tradeClose;
	public static String getWaitpay() {
		return waitPay;
	}
	public static String getWaitship() {
		return waitShip;
	}
	public static String getWaitrec() {
		return waitRec;
	}
	public static String getTradesuccess() {
		return tradeSuccess;
	}
	public static String getTradeclose() {
		return tradeClose;
	}




}
