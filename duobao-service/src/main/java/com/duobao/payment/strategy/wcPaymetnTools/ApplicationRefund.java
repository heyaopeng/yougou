package com.duobao.payment.strategy.wcPaymetnTools;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Description：微信申请退款<br>
 * User：liqijing <br>
 * Date：2015-7-17下午1:34:47 <br>
 */
public class ApplicationRefund implements Serializable {

	/**
	 * ApplicationRefund.java 
	 */
	private static final long serialVersionUID = 1L;
	
	// 唯一标识
	private String applicationRefundId ;
	
	// 公众账号ID
	@Column(name = "APPID")
	private String appid ;
	
	// 商户号
	@Column(name = "MCH_ID")
	private String mch_id ;
	
	// 设备号
	@Column(name = "DEVICE_INFO")
	private String device_info ;
	
	// 随机字符串
	@Column(name = "NONCE_STR")
	private String nonce_str ;
	
	// 签名
	@Column(name = "REFUND_SIGN")
	private String sign ;
	
	// 微信订单号
	@Column(name = "TRANSACTION_ID")
	private String transaction_id ;
	
	// 商户订单号
	@Column(name = "OUT_TRADE_NO")
	private String out_trade_no ;
	
	// 商户退款单号
	@Column(name = "OUT_REFUND_NO")
	private String out_refund_no ;
	
	// 总金额
	@Column(name = "TOTAL_FEE")
	private String total_fee ;
	
	// 退款金额
	@Column(name = "REFUND_FEE")
	private String refund_fee ;
	
	// 货币种类
	@Column(name = "REFUND_FEE_TYPE")
	private String refund_fee_type ;
	
	// 操作员  操作员帐号, 默认为商户号
	@Column(name = "OP_USER_ID")
	private String op_user_id ;

	// 更新时间
	@Column(name = "UPDATEDATE")
	private String updateDate ;
	
	
	/**
	 * 
	 * @param appid 公众账号ID
	 * @param mch_id 商户号
	 * @param device_info 设备号
	 * @param nonce_str 随机字符串
	 * @param transaction_id 微信订单号
	 * @param out_trade_no 商户订单号
	 * @param out_refund_no 商户退款单号
	 * @param total_fee 总金额 
	 * @param refund_fee 退款金额
	 * @param refund_fee_type 货币种类
	 * @param op_user_id 操作员  操作员帐号
	 */
	public ApplicationRefund(String appid, String mch_id, String device_info,
			String nonce_str, String transaction_id, String out_trade_no,
			String out_refund_no, String total_fee, String refund_fee,
			String refund_fee_type, String op_user_id) {
		this.appid = appid;
		this.mch_id = mch_id;
		this.device_info = device_info;
		this.nonce_str = nonce_str;
		this.transaction_id = transaction_id;
		this.out_trade_no = out_trade_no;
		this.out_refund_no = out_refund_no;
		this.total_fee = total_fee;
		this.refund_fee = refund_fee;
		this.refund_fee_type = refund_fee_type;
		this.op_user_id = op_user_id;
	}
	
	public ApplicationRefund getRefund(QueryOrderReults queryOrderReults, String nonce_str, String refund_no, String mchId){
		ApplicationRefund applicationRefund = new ApplicationRefund(
				queryOrderReults.getAppid(), queryOrderReults.getMch_id(), queryOrderReults.getDevice_info(), nonce_str, 
				queryOrderReults.getTransaction_id(), queryOrderReults.getOut_trade_no(), refund_no,
				queryOrderReults.getTotal_fee(), queryOrderReults.getTotal_fee(), "CNY", mchId);
		
		return applicationRefund ;
	}
	
	public String getApplicationRefundId() {
		return applicationRefundId;
	}

	public void setApplicationRefundId(String applicationRefundId) {
		this.applicationRefundId = applicationRefundId;
	}

	public String getAppid() {
		return appid;
	}

	public void setAppid(String appid) {
		this.appid = appid;
	}

	public String getMch_id() {
		return mch_id;
	}

	public void setMch_id(String mch_id) {
		this.mch_id = mch_id;
	}

	public String getDevice_info() {
		return device_info;
	}

	public void setDevice_info(String device_info) {
		this.device_info = device_info;
	}

	public String getNonce_str() {
		return nonce_str;
	}

	public void setNonce_str(String nonce_str) {
		this.nonce_str = nonce_str;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getTransaction_id() {
		return transaction_id;
	}

	public void setTransaction_id(String transaction_id) {
		this.transaction_id = transaction_id;
	}

	public String getOut_trade_no() {
		return out_trade_no;
	}

	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}

	public String getOut_refund_no() {
		return out_refund_no;
	}

	public void setOut_refund_no(String out_refund_no) {
		this.out_refund_no = out_refund_no;
	}

	public String getTotal_fee() {
		return total_fee;
	}

	public void setTotal_fee(String total_fee) {
		this.total_fee = total_fee;
	}

	public String getRefund_fee() {
		return refund_fee;
	}

	public void setRefund_fee(String refund_fee) {
		this.refund_fee = refund_fee;
	}

	public String getRefund_fee_type() {
		return refund_fee_type;
	}

	public void setRefund_fee_type(String refund_fee_type) {
		this.refund_fee_type = refund_fee_type;
	}

	public String getOp_user_id() {
		return op_user_id;
	}

	public void setOp_user_id(String op_user_id) {
		this.op_user_id = op_user_id;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	

	public ApplicationRefund() {
		
	}
	
}
