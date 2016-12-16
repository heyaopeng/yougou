package com.duobao.velocity;

import org.apache.velocity.tools.Scope;
import org.apache.velocity.tools.config.DefaultKey;
import org.apache.velocity.tools.config.ValidScope;

import com.duobao.fundation.config.links.RefundStatusConstant;

@DefaultKey("refundVel")
@ValidScope(Scope.APPLICATION)
public class RefundStatusVelocity {

	private static final Byte arbitrationForRefund = RefundStatusConstant.ARBITRATION_FOR_REFUND;

	public static Byte getArbitrationforrefund() {
		return arbitrationForRefund;
	}
	
//	private static final Byte rejectRefund = RefundStatusConstant.REJECT_REFUND;
//	private static final Byte refundSuccess = RefundStatusConstant.REFUND_SUCCESS;
//	private static final Byte arbitrationForRefund = RefundStatusConstant.ARBITRATION_FOR_REFUND;
//	private static final Byte refundArbitrationSuccess = RefundStatusConstant.REFUND_ARBITRATION_SUCCESS;
//	private static final Byte refundClosed = RefundStatusConstant.REFUND_CLOSED;
//	private static final Byte refundArbitrationClosed = RefundStatusConstant.REFUND_ARBITRATION_CLOSED;
//	
//	public static Byte getApplicationforrefund() {
//		return applicationForRefund;
//	}
//	public static Byte getRejectrefund() {
//		return rejectRefund;
//	}
//	public static Byte getRefundsuccess() {
//		return refundSuccess;
//	}
//	public static Byte getRefundclosed() {
//		return refundClosed;
//	}
//	public static Byte getArbitrationforrefund() {
//		return arbitrationForRefund;
//	}
//	public static Byte getRefundarbitrationsuccess() {
//		return refundArbitrationSuccess;
//	}
//	public static Byte getRefundarbitrationclosed() {
//		return refundArbitrationClosed;
//	}
	
	
}
