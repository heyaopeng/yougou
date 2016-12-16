package com.duobao.payment.strategy.wcPaymetnTools;

import java.io.Serializable;

/**
 * Description：微信订单查询<br>
 * User：liqijing <br>
 * Date：2015-7-17下午2:49:59 <br>
 */
public class QueryOrder implements Serializable {

	/**
	 * QueryOrder.java 
	 */
	private static final long serialVersionUID = 1L;

	// 公众账号ID
	private String appid ;
	
	// 商户号
	private String mch_id ;
	
	// 微信订单号
	private String transaction_id ;
	
	// 商户订单号
	private String out_trade_no ;
	
	// 随机字符串
	private String nonce_str ;
	
	// 签名
	private String sign ;

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

	public QueryOrder(String appid, String mch_id, 
			String out_trade_no, String nonce_str) {
		super();
		this.appid = appid;
		this.mch_id = mch_id;
		this.out_trade_no = out_trade_no;
		this.nonce_str = nonce_str;
	}

	public QueryOrder() {
	}
	
	
	
	
}
