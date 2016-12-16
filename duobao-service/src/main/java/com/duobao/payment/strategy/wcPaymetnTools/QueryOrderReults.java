package com.duobao.payment.strategy.wcPaymetnTools;


/**
 * Description：查询订单返回<br>
 * User：liqijing <br>
 * Date：2015-7-27下午4:49:59 <br>
 */
public class QueryOrderReults {
	
	// 交易状态
	private String trade_state ;

	public String getTrade_state() {
		return trade_state;
	}

	public void setTrade_state(String trade_state) {
		this.trade_state = trade_state;
	}
	
	
	// 公众账号ID
	private String appid ;
	
	// 商户号
	private String mch_id ;
	
	// 设备号
	private String device_info ;
	
	// 随机字符串
	private String nonce_str ;
	
	// 签名
	private String sign ;
	
	// 业务结果
	private String result_code ;
	
	// 错误代码
	private String err_code ;
	
	// 错误代码描述
	private String err_code_des ;
	
	// 用户标识
	private String openid ;
	
	// 总金额
	private String total_fee ;
	
	// 微信支付订单号
	private String transaction_id ;
	
	// 商户订单号
	private String out_trade_no;
	
	// 支付完成时间
	private String time_end ;

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

	public String getTotal_fee() {
		return total_fee;
	}

	public void setTotal_fee(String total_fee) {
		this.total_fee = total_fee;
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

	public String getTime_end() {
		return time_end;
	}

	public void setTime_end(String time_end) {
		this.time_end = time_end;
	}

}
