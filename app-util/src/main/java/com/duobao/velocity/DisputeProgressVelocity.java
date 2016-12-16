package com.duobao.velocity;

import org.apache.velocity.tools.Scope;
import org.apache.velocity.tools.config.DefaultKey;
import org.apache.velocity.tools.config.ValidScope;

import com.duobao.fundation.config.links.DisputeProgressConstant;

@DefaultKey("disputeProgress")
@ValidScope(Scope.APPLICATION)
public class DisputeProgressVelocity {
	private static final Byte noraml = DisputeProgressConstant.NORMAL;
	private static final Byte cookaHandle = DisputeProgressConstant.COOKA_HANDLE;
	private static final Byte finaceHandle = DisputeProgressConstant.FINACE_HANDLE;
	private static final Byte logisticHandle = DisputeProgressConstant.LOGISTIC_HANDLE;
	private static final Byte storageHandle = DisputeProgressConstant.STORAGE_HANDLE;
	private static final Byte abnormalHandle = DisputeProgressConstant.ABNORMAL_HANDLE;
	public static Byte getNoraml() {
		return noraml;
	}
	public static Byte getCookahandle() {
		return cookaHandle;
	}
	public static Byte getFinacehandle() {
		return finaceHandle;
	}
	public static Byte getLogistichandle() {
		return logisticHandle;
	}
	public static Byte getStoragehandle() {
		return storageHandle;
	}
	public static Byte getAbnormalhandle() {
		return abnormalHandle;
	}
	
}
