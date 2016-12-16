package com.duobao.user.model;

import java.math.BigDecimal;
import java.util.Map;
import java.util.TreeMap;

public class PaymentStrategyResult {
	private Integer paymentId;
	
	private Boolean result; //支付结果，成功或失败
	
	private String reason;
	/*失败原因
	1.please_choose_at_least_one_payment_method
	2.payment_order_is_expired_or_illegal
	3.由支付网关返回，不用翻译*/
	
	private String paymentSerialNum;//支付单号
	
	private String type; //'WC ,BALANCE'
	
	private String orderSerialNum;
	
	//WC
	private String appId;
	
	private String timeStamp;
	
	private String nonceStr;
	
	private String prePackage;
	
	private String signType;
	
	private String paySign;
	
	private Boolean isWC;
	//WC
	
	//alipay
	private Map<String,String> params;
	
	private String html;
	//alipay
	
	private Integer passEnterCount;
	
	private BigDecimal balance;
	
	

	public String getOrderSerialNum() {
		return orderSerialNum;
	}

	public void setOrderSerialNum(String orderSerialNum) {
		this.orderSerialNum = orderSerialNum;
	}

	public Boolean getIsWC() {
		return isWC;
	}

	public void setIsWC(Boolean isWC) {
		this.isWC = isWC;
	}

	public Integer getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(Integer paymentId) {
		this.paymentId = paymentId;
	}

	public Boolean getResult() {
		return result;
	}

	public void setResult(Boolean result) {
		this.result = result;
	}

	public String getHtml() {
		return html;
	}

	public void setHtml(String html) {
		this.html = html;
	}

	public PaymentStrategyResult(){
		this.params = new TreeMap<String,String>();
	}

	public Map<String, String> getParams() {
		return params;
	}

	public void setParams(Map<String, String> params) {
		this.params = params;
	}

	public String getPaymentSerialNum() {
		return paymentSerialNum;
	}

	public void setPaymentSerialNum(String paymentSerialNum) {
		this.paymentSerialNum = paymentSerialNum;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public String getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}

	public String getNonceStr() {
		return nonceStr;
	}

	public void setNonceStr(String nonceStr) {
		this.nonceStr = nonceStr;
	}

	public String getPrePackage() {
		return prePackage;
	}

	public void setPrePackage(String prePackage) {
		this.prePackage = prePackage;
	}

	public String getSignType() {
		return signType;
	}

	public void setSignType(String signType) {
		this.signType = signType;
	}

	public String getPaySign() {
		return paySign;
	}

	public void setPaySign(String paySign) {
		this.paySign = paySign;
	}

	public Integer getPassEnterCount() {
		return passEnterCount;
	}

	public void setPassEnterCount(Integer passEnterCount) {
		this.passEnterCount = passEnterCount;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

}
