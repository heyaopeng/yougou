package com.duobao.payment.strategy.wcPaymetnTools;

import java.io.Serializable;

import javax.persistence.Column;

/**
 * Description：微信申请退款返回<br>
 * User：liqijing <br>
 * Date：2015-7-17下午1:34:47 <br>
 */
public class ApplicationRefundResult implements Serializable {

	/**
	 * ApplicationRefund.java 
	 */
	private static final long serialVersionUID = 1L;
	
	// 唯一标识
	private String applicationRefundResultId ;
	
	// 返回状态码
	@Column(name = "RETURN_CODE")
	private String return_code ;
	
	// 返回信息
	@Column(name = "RETURN_MSG")
	private String return_msg ;
	
	// 业务结果
	@Column(name = "RESULT_CODE")
	private String result_code ;
	
	// 错误代码
	@Column(name = "ERR_CODE")
	private String err_code ;
	
	// 错误代码描述
	@Column(name = "ERR_CODE_DES")
	private String err_code_des ;
	
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
	private String sign	;
	
	// 微信订单号
	@Column(name = "TRANSACTION_ID")
	private String transaction_id ;
	
	// 商户订单号
	@Column(name = "OUT_TRADE_NO")
	private String out_trade_no ;
	
	// 商户退款单号
	@Column(name = "OUT_REFUND_NO")
	private String out_refund_no ;
	
	// 微信退款单号
	@Column(name = "REFUND_ID")
	private String refund_id ;
	
	// 退款渠道
	@Column(name = "REFUND_CHANNEL")
	private String refund_channel ;
	
	// 退款金额
	@Column(name = "REFUND_FEE")
	private String refund_fee ;
	
	// 订单总金额
	@Column(name = "TOTAL_FEE")
	private String total_fee ;
	
	// 订单金额货币种类
	@Column(name = "FEE_TYPE")
	private String fee_type ;
	
	// 现金支付金额
	@Column(name = "CASH_FEE")
	private String cash_fee ;
	
	// 现金退款金额
	@Column(name = "CASH_REFUND_FEE")
	private String cash_refund_fee ;
	
	// 代金券或立减优惠退款金额
	@Column(name = "COUPON_REFUND_FEE")
	private String coupon_refund_fee ;
	
	// 代金券或立减优惠使用数量
	@Column(name = "COUPON_REFUND_COUNT")
	private String coupon_refund_count ;
	
	// 代金券或立减优惠ID
	@Column(name = "COUPON_REFUND_ID")
	private String coupon_refund_id ;

	// 更新时间
	@Column(name = "UPDATEDATE")
	private String updateDate ;

	public String getApplicationRefundResultId() {
		return applicationRefundResultId;
	}

	public void setApplicationRefundResultId(String applicationRefundResultId) {
		this.applicationRefundResultId = applicationRefundResultId;
	}

	public String getReturn_code() {
		return return_code;
	}

	public void setReturn_code(String return_code) {
		this.return_code = return_code;
	}

	public String getReturn_msg() {
		return return_msg;
	}

	public void setReturn_msg(String return_msg) {
		this.return_msg = return_msg;
	}

	public String getResult_code() {
		return result_code;
	}

	public void setResult_code(String result_code) {
		this.result_code = result_code;
	}

	public String getErr_code() {
		return err_code;
	}

	public void setErr_code(String err_code) {
		this.err_code = err_code;
	}

	public String getErr_code_des() {
		return err_code_des;
	}

	public void setErr_code_des(String err_code_des) {
		this.err_code_des = err_code_des;
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

	public String getRefund_id() {
		return refund_id;
	}

	public void setRefund_id(String refund_id) {
		this.refund_id = refund_id;
	}

	public String getRefund_channel() {
		return refund_channel;
	}

	public void setRefund_channel(String refund_channel) {
		this.refund_channel = refund_channel;
	}

	public String getRefund_fee() {
		return refund_fee;
	}

	public void setRefund_fee(String refund_fee) {
		this.refund_fee = refund_fee;
	}

	public String getTotal_fee() {
		return total_fee;
	}

	public void setTotal_fee(String total_fee) {
		this.total_fee = total_fee;
	}

	public String getFee_type() {
		return fee_type;
	}

	public void setFee_type(String fee_type) {
		this.fee_type = fee_type;
	}

	public String getCash_fee() {
		return cash_fee;
	}

	public void setCash_fee(String cash_fee) {
		this.cash_fee = cash_fee;
	}

	public String getCash_refund_fee() {
		return cash_refund_fee;
	}

	public void setCash_refund_fee(String cash_refund_fee) {
		this.cash_refund_fee = cash_refund_fee;
	}

	public String getCoupon_refund_fee() {
		return coupon_refund_fee;
	}

	public void setCoupon_refund_fee(String coupon_refund_fee) {
		this.coupon_refund_fee = coupon_refund_fee;
	}

	public String getCoupon_refund_count() {
		return coupon_refund_count;
	}

	public void setCoupon_refund_count(String coupon_refund_count) {
		this.coupon_refund_count = coupon_refund_count;
	}

	public String getCoupon_refund_id() {
		return coupon_refund_id;
	}

	public void setCoupon_refund_id(String coupon_refund_id) {
		this.coupon_refund_id = coupon_refund_id;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}
	
	
	
	
}
