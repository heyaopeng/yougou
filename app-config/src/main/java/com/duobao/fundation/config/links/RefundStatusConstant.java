package com.duobao.fundation.config.links;

public interface RefundStatusConstant {
	
	//申请（等待商户审核）
	Byte APPLICATION_FOR_REFUDN = 1;
	
	//商户拒绝
	Byte REJECT_REFUND = 2;
	
	//退款成功||结束
	Byte REFUND_SUCCESS = 3;
	
	//仲裁申请（等待商城审核）
	Byte ARBITRATION_FOR_REFUND = 4;
	
	//仲裁退款成功||结束
	Byte REFUND_ARBITRATION_SUCCESS = 5;
	
	//仲裁申请失败||结束
	Byte REFUND_ARBITRATION_FAIL = 6;
	
	//申请取消(买家取消)||结束
	Byte REFUND_CLOSED = 7;
	
}
