package com.duobao.velocity;

import org.apache.velocity.tools.Scope;
import org.apache.velocity.tools.config.DefaultKey;
import org.apache.velocity.tools.config.ValidScope;

import com.duobao.fundation.config.links.ReturnRefundStatusConstant;

@DefaultKey("returnRefundVel")
@ValidScope(Scope.APPLICATION)
public class ReturnRefundStatusVelocity {

	private static final Byte storeReceiptFail = ReturnRefundStatusConstant.STORE_RECEIPT_FAIL;
	private static final Byte arbitrationForReturnRefund = ReturnRefundStatusConstant.ARBITRATION_FOR_RETURN_REFUND;
	private static final Byte returnArbitrationStoreReceiptFail = ReturnRefundStatusConstant.RETURN_ARBITRATION_STORE_RECEIPT_FAIL;
	public static Byte getStorereceiptfail() {
		return storeReceiptFail;
	}
	public static Byte getArbitrationforreturnrefund() {
		return arbitrationForReturnRefund;
	}
	public static Byte getReturnarbitrationstorereceiptfail() {
		return returnArbitrationStoreReceiptFail;
	}
	
	
	
//	private static final Byte returnSuccess = ReturnRefundStatusConstant.RETURN_SUCCESS;
//	private static final Byte cookaDispute = ReturnRefundStatusConstant.COOKA_DISPUTE;
//	private static final Byte afterSaleDispute = ReturnRefundStatusConstant.AFTER_SALE_DISPUTE;
//	private static final Byte rejectReturn = ReturnRefundStatusConstant.REJECT_RETURN;
//	private static final Byte confirmReceipt = ReturnRefundStatusConstant.CONFIRM_RECEIPT;
//	private static final Byte returnClosed = ReturnRefundStatusConstant.RETURN_CLOSED;
//	
//	public static Byte getApplicationforreturn() {
//		return applicationForReturn;
//	}
//	public static Byte getEditreturninfo() {
//		return editReturnInfo;
//	}
//	public static Byte getAwaitingreception() {
//		return awaitingReception;
//	}
//	public static Byte getReturnsuccess() {
//		return returnSuccess;
//	}
//	public static Byte getCookadispute() {
//		return cookaDispute;
//	}
//	public static Byte getAftersaledispute() {
//		return afterSaleDispute;
//	}
//	public static Byte getRejectreturn() {
//		return rejectReturn;
//	}
//	public static Byte getConfirmreceipt() {
//		return confirmReceipt;
//	}
//	public static Byte getReturnclosed() {
//		return returnClosed;
//	}

}
