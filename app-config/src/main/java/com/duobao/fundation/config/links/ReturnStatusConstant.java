package com.duobao.fundation.config.links;

public interface ReturnStatusConstant {

	// normal 0

	Byte LOGISTIC_HANDLE = 1;

	Byte STORAGE_HANDLE = 2;

	Byte AWAITING_SELLER_CONFIRM = 5;
	
	Byte RETURN_SUCCESS = 6;
	
	Byte RETURN_CLOSE = 7;

	Byte LOGISTIC_ABNORMAL_HANDLE = 3;
	
	Byte STORAGE_ABNORMAL_HANDLE = 4;
	
	Byte LOGISTIC_AND_STORAGE_ABNORMAL_HANDLE = 8;

}
