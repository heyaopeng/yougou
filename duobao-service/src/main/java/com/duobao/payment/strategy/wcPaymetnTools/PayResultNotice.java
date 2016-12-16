package com.duobao.payment.strategy.wcPaymetnTools;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Description：微信支付结果通知<br>
 * User：liqijing <br>
 * Date：2015-7-17下午1:51:06 <br>
 */
public class PayResultNotice implements Serializable {

	/**
	 * PayResultNotice.java 
	 */
	private static final long serialVersionUID = 1L;
	
	// 唯一标识
	private String payResultNoticeId ;
	
	// 公众账号ID
	@Column(name = "APPID")
	private String appid ;
	
	// 商家数据包
	@Column(name = "ATTACH")
	private String attach ;
	
	// 付款银行
	@Column(name = "BANK_TYPE")
	private String bank_type ;
	
	// 现金支付金额
	@Column(name = "CASH_FEE")
	private String cash_fee ;
	
	// 现金支付货币类型
	@Column(name = "CASH_FEE_TYPE")
	private String cash_fee_type ;

	// 代金券或立减优惠使用数量
	@Column(name = "COUPON_COUNT")
	private String coupon_count ;
	
	// 代金券或立减优惠金额
	@Column(name = "COUPON_FEE")
	private String coupon_fee ;
	
	// 单个代金券或立减优惠支付金额
	@Column(name = "COUPON_FEE_N")
	private String coupon_fee_$n ;
	
	// 代金券或立减优惠ID
	@Column(name = "COUPON_ID_N")
	private String coupon_id_$n ;
	
	// 设备号
	@Column(name = "DEVICE_INFO")
	private String device_info ;
	
	// 错误代码
	@Column(name = "ERR_CODE")
	private String err_code ;
	
	// 错误代码描述
	@Column(name = "ERR_CODE_DES")
	private String err_code_des ;
	
	// 货币种类
	@Column(name = "FEE_TYPE")
	private String fee_type ;

	// 是否关注公众账号
	@Column(name = "IS_SUBSCRIBE")
	private String is_subscribe ;

	// 商户号
	@Column(name = "MCH_ID")
	private String mch_id ;

	// 随机字符串
	@Column(name = "NONCE_STR")
	private String nonce_str ;

	// 用户标识
	@Column(name = "OPENID")
	private String openid ;
	
	// 商户订单号
	@Column(name = "OUT_TRADE_NO")
	private String out_trade_no ;

	// 业务结果
	@Column(name = "RESULT_CODE")
	private String result_code ;
	
	// 返回状态码  :SUCCESS/FAIL
	@Column(name = "RETURN_CODE")
	private String return_code ;
	
	// 返回信息
	@Column(name = "RETURN_MSG")
	private String return_msg ;
	
	// 签名
	@Column(name = "NOTICE_SIGN")
	private String sign ;

	// 支付完成时间
	@Column(name = "TIME_END")
	private String time_end ;
	
	// 总金额
	@Column(name = "TOTAL_FEE")
	private String total_fee ;

	// 交易类型
	@Column(name = "TRADE_TYPE")
	private String trade_type ;
	
	// 微信支付订单号
	@Column(name = "TRANSACTION_ID")
	private String transaction_id ;

	// 更新时间
	@Column(name = "UPDATEDATE")
	private String updateDate ;
	
	public String getPayResultNoticeId() {
		return payResultNoticeId;
	}

	public void setPayResultNoticeId(String payResultNoticeId) {
		this.payResultNoticeId = payResultNoticeId;
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

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getIs_subscribe() {
		return is_subscribe;
	}

	public void setIs_subscribe(String is_subscribe) {
		this.is_subscribe = is_subscribe;
	}

	public String getTrade_type() {
		return trade_type;
	}

	public void setTrade_type(String trade_type) {
		this.trade_type = trade_type;
	}

	public String getBank_type() {
		return bank_type;
	}

	public void setBank_type(String bank_type) {
		this.bank_type = bank_type;
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

	public String getCash_fee_type() {
		return cash_fee_type;
	}

	public void setCash_fee_type(String cash_fee_type) {
		this.cash_fee_type = cash_fee_type;
	}

	public String getCoupon_fee() {
		return coupon_fee;
	}

	public void setCoupon_fee(String coupon_fee) {
		this.coupon_fee = coupon_fee;
	}

	public String getCoupon_count() {
		return coupon_count;
	}

	public void setCoupon_count(String coupon_count) {
		this.coupon_count = coupon_count;
	}

	public String getCoupon_id_$n() {
		return coupon_id_$n;
	}

	public void setCoupon_id_$n(String coupon_id_$n) {
		this.coupon_id_$n = coupon_id_$n;
	}

	public String getCoupon_fee_$n() {
		return coupon_fee_$n;
	}

	public void setCoupon_fee_$n(String coupon_fee_$n) {
		this.coupon_fee_$n = coupon_fee_$n;
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

	public String getAttach() {
		return attach;
	}

	public void setAttach(String attach) {
		this.attach = attach;
	}

	public String getTime_end() {
		return time_end;
	}

	public void setTime_end(String time_end) {
		this.time_end = time_end;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	
	
}
