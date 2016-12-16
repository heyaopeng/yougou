package com.duobao.velocity;

import org.apache.velocity.tools.Scope;
import org.apache.velocity.tools.config.DefaultKey;
import org.apache.velocity.tools.config.ValidScope;

import com.duobao.fundation.config.links.ReturnStatusConstant;

@DefaultKey("returnVel")
@ValidScope(Scope.APPLICATION)
public class ReturnStatusVelocity {

	private static final Byte logisticHandle = ReturnStatusConstant.LOGISTIC_HANDLE;
	private static final Byte storageHandle = ReturnStatusConstant.STORAGE_HANDLE;
	private static final Byte logisticAbnormalHandle = ReturnStatusConstant.LOGISTIC_ABNORMAL_HANDLE;
	private static final Byte storageAbnormalHandle = ReturnStatusConstant.STORAGE_ABNORMAL_HANDLE;
	private static final Byte awaitingSellerConfirm = ReturnStatusConstant.AWAITING_SELLER_CONFIRM;
	private static final Byte returnSuccess = ReturnStatusConstant.RETURN_SUCCESS;
	private static final Byte returnClose = ReturnStatusConstant.RETURN_CLOSE;
	private static final Byte logisticAndStorageAbnormalHandle = ReturnStatusConstant.LOGISTIC_AND_STORAGE_ABNORMAL_HANDLE;
	public static Byte getLogistichandle() {
		return logisticHandle;
	}
	public static Byte getStoragehandle() {
		return storageHandle;
	}
	public static Byte getReturnsuccess() {
		return returnSuccess;
	}
	public static Byte getReturnclose() {
		return returnClose;
	}
	public static Byte getLogisticabnormalhandle() {
		return logisticAbnormalHandle;
	}
	public static Byte getStorageabnormalhandle() {
		return storageAbnormalHandle;
	}
	public static Byte getAwaitingsellerconfirm() {
		return awaitingSellerConfirm;
	}
	public static Byte getLogisticandstorageabnormalhandle() {
		return logisticAndStorageAbnormalHandle;
	}
}
