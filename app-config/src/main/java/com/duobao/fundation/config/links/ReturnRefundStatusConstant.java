package com.duobao.fundation.config.links;

/**
 * RETURN 指的是 ReturnRefund
 */
public interface ReturnRefundStatusConstant {

	// 商户审核
	Byte APPLICATION_FOR_RETURN = 11;
	
	// 同意退款||结束
	Byte AGREE_REFUND_SUCCESS = 20;
	
	// 同意退货退款（等待买家退货）
	Byte AGREE_RETURN_REFUND = 30;

	// 申请结束（退货超时）||结束
	Byte AGREE_RETURN_CLOSED = 31;
	
	// 发起退货 卖家等待收货
	Byte AWAITING_STORE_RECEIPT = 32;
	
	// 退货退款成功||结束
	Byte AGREE_RETURN_REFUND_SUCCESS = 33; 
	
	// 商家确认没收到货(Cooka处理)
	Byte STORE_RECEIPT_FAIL = 34; 
	
	// Cooka同意退款||结束
	Byte COOKA_AGREE_REFUND_SUCCESS = 35;
	
	// Cooka不同意退款||结束
	Byte COOKA_AGREE_REFUND_FAIL= 36;
	
	
	// 拒绝申请
	Byte REJECT_RETURN = 12;
	
	// 超时结束||结束
	Byte REJECT_RETURN_CLOSED = 13;
	
	// 仲裁申请（等待商城审核）
	Byte ARBITRATION_FOR_RETURN_REFUND = 40;
	
	//仲裁退款成功||结束
	Byte RETURN_ARBITRATION_AGREE_REFUND_SUCCESS = 41;
	
	//仲裁退货退款（等待买家退货）
	Byte RETURN_ARBITRATION_AGREE_RETURN_REFUND = 50;
	
	//仲裁退货退款申请结束（退货超时）||结束
	Byte RETURN_ARBITRATION_AGREE_RETURN_REFUND_ClOSED = 51;
	
	// 发起退货 卖家等待收货
	Byte RETURN_ARBITRATION_AWAITING_STORE_RECEIPT = 52;
	
	// 退货退款成功||结束
	Byte RETURN_ARBITRATION_AGREE_RETURN_REFUND_SUCCESS = 53; 
	
	// 商家确认没收到货(Cooka处理)
	Byte RETURN_ARBITRATION_STORE_RECEIPT_FAIL = 54; 
	
	// Cooka同意退款||结束
	Byte RETURN_ARBITRATION_COOKA_AGREE_REFUND_SUCCESS = 55;
	
	// Cooka不同意退款||结束
	Byte RETURN_ARBITRATION_COOKA_AGREE_REFUND_FAIL= 56;
	
	//仲裁不同意退货退款||结束
	Byte RETURN_ARBITRATION_FAIl = 60;
	
	// 申请取消(买家取消)||结束
	Byte RETURN_REFUND_CLOSED = 14;
	
}
