
package com.duobao.velocity;
import org.apache.velocity.tools.Scope;
import org.apache.velocity.tools.config.DefaultKey;
import org.apache.velocity.tools.config.ValidScope;

import com.duobao.fundation.config.links.OrderConstant;

@DefaultKey("orderVel")
@ValidScope(Scope.APPLICATION)
public class OrderStatusVelocity {

	private static final Byte awaitingPayment = OrderConstant.AWAITING_PAYMENT;
	private static final Byte awaitingShipment = OrderConstant.AWAITING_SHIPMENT;
	private static final Byte awaitingReceipt = OrderConstant.AWAITING_RECEIPT;
	private static final Byte success = OrderConstant.TRADE_SUCCESS;
	private static final Byte close = OrderConstant.TRADE_CLOSE;
	private static final Byte tradeSuccess = OrderConstant.TRADE_SUCCESS;
	private static final Byte tradeClose = OrderConstant.TRADE_CLOSE;
	
	public static Byte getAwaitingpayment() {
		return awaitingPayment;
	}

	public static Byte getAwaitingshipment() {
		return awaitingShipment;
	}

	public static Byte getAwaitingreceipt() {
		return awaitingReceipt;
	}

	public static Byte getSuccess() {
		return success;
	}

	public static Byte getClose() {
		return close;
	}

	public static Byte getTradesuccess() {
		return tradeSuccess;
	}

	public static Byte getTradeclose() {
		return tradeClose;
	}
	
}
