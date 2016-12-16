package com.duobao.payment.strategy.alipay.util;

public class Params {
	
	private String service;//接口名称
	
	private String partner;//合作者身份ID
	
	private String _input_charset;//参数编码字符集
	
	private String sign_type;//签名方式
	
	private String sign;//签名
	
	private String notify_url;//服务器异步通知页面路径
	
	private String return_url;//页面跳转同步通知页面路径
	
	private String out_trade_no;//商户网站唯一订单号
	
	private String subject;//商品名称
	
	private String total_fee;//交易金额
	
	private String seller_id;//卖家支付宝用户号
	
	private String payment_type;//支付类型
	
	private String show_url;//商品展示网址
	
	private String body;//商品描述
	
	private String it_b_pay;//超时时间
	
	private String extern_token;//手机支付宝token
	
	private String otherfee;
	
	private String airticket;
	
	private String rn_check;
	
	private String buyer_cert_no;
	
	private String buyer_real_name;
	
	private String scene;

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getPartner() {
		return partner;
	}

	public void setPartner(String partner) {
		this.partner = partner;
	}

	public String get_input_charset() {
		return _input_charset;
	}

	public void set_input_charset(String _input_charset) {
		this._input_charset = _input_charset;
	}

	public String getSign_type() {
		return sign_type;
	}

	public void setSign_type(String sign_type) {
		this.sign_type = sign_type;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getNotify_url() {
		return notify_url;
	}

	public void setNotify_url(String notify_url) {
		this.notify_url = notify_url;
	}

	public String getReturn_url() {
		return return_url;
	}

	public void setReturn_url(String return_url) {
		this.return_url = return_url;
	}

	public String getOut_trade_no() {
		return out_trade_no;
	}

	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getTotal_fee() {
		return total_fee;
	}

	public void setTotal_fee(String total_fee) {
		this.total_fee = total_fee;
	}

	public String getSeller_id() {
		return seller_id;
	}

	public void setSeller_id(String seller_id) {
		this.seller_id = seller_id;
	}

	public String getPayment_type() {
		return payment_type;
	}

	public void setPayment_type(String payment_type) {
		this.payment_type = payment_type;
	}

	public String getShow_url() {
		return show_url;
	}

	public void setShow_url(String show_url) {
		this.show_url = show_url;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getIt_b_pay() {
		return it_b_pay;
	}

	public void setIt_b_pay(String it_b_pay) {
		this.it_b_pay = it_b_pay;
	}

	public String getExtern_token() {
		return extern_token;
	}

	public void setExtern_token(String extern_token) {
		this.extern_token = extern_token;
	}

	public String getOtherfee() {
		return otherfee;
	}

	public void setOtherfee(String otherfee) {
		this.otherfee = otherfee;
	}

	public String getAirticket() {
		return airticket;
	}

	public void setAirticket(String airticket) {
		this.airticket = airticket;
	}

	public String getRn_check() {
		return rn_check;
	}

	public void setRn_check(String rn_check) {
		this.rn_check = rn_check;
	}

	public String getBuyer_cert_no() {
		return buyer_cert_no;
	}

	public void setBuyer_cert_no(String buyer_cert_no) {
		this.buyer_cert_no = buyer_cert_no;
	}

	public String getBuyer_real_name() {
		return buyer_real_name;
	}

	public void setBuyer_real_name(String buyer_real_name) {
		this.buyer_real_name = buyer_real_name;
	}

	public String getScene() {
		return scene;
	}

	public void setScene(String scene) {
		this.scene = scene;
	}
	

}
