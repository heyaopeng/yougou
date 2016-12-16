package com.duobao.payment.strategy.wcPaymetnTools;

import java.io.Serializable;

import javax.persistence.Column;


/**
 * Description��΢��ͳһ����<br>
 * User��liqijing <br>
 * date��2015-7-17����1:29:32 <br>
 */
public class UniteOrder implements Serializable{
	
	/**
	 * UniteOrder.java 
	 */
	private static final long serialVersionUID = 1L;

	// Ψһ��ʶ
	
	private String uniteOrderid ;
	
	// �����˺�ID
	@Column(name = "APPID")
	private String appid ;
		
	// �̻���
	@Column(name = "MCH_ID")
	private String mch_id ;
	
	// �豸��
	@Column(name = "DEVICE_INFO")
	private String device_info ;
	
	// ����ַ�
	@Column(name = "NONCE_STR")
	private String nonce_str ;
	
	// ǩ��
	@Column(name = "ORDER_SIGN")
	private String sign ;

	// ��Ʒ����
	@Column(name = "ORDER_BODY")
	private String body ;
	
	// ��Ʒ����
	@Column(name = "ORDER_DETAIL")
	private String detail ;
	
	// �������
	@Column(name = "ATTACH")
	private String attach ;
	
	// �̻�������
	@Column(name = "OUT_TRADE_NO")
	private String out_trade_no ;
	
	// ��������
	@Column(name = "FEE_TYPE")
	private String fee_type ;
	
	// �ܽ��
	@Column(name = "TOTAL_FEE")
	private String total_fee ;
	
	// �ն�IP
	@Column(name = "SPBILL_CREATE_IP")
	private String spbill_create_ip ;
	
	// ������ʼʱ��
	@Column(name = "TIME_START")
	private String time_start ;
	
	// ���׽���ʱ��
	@Column(name = "TIME_EXPIRE")
	private String time_expire ;
	
	// ��Ʒ���
	@Column(name = "GOODS_TAG")
	private String goods_tag ;
	
	// ֪ͨ��ַ
	@Column(name = "NOTIFY_URL")
	private String notify_url ;
	
	// ��������
	@Column(name = "TRADE_TYPE")
	private String trade_type ;
	
	// ��ƷID
	@Column(name = "PRODUCT_ID")
	private String product_id ;
	
	// �û���ʶ
	@Column(name = "OPENID")
	private String openid ;
	
	// ����ʱ��
	@Column(name = "UPDATEDATE")
	private String updateDate ;

	
	/**
	 * 
	 * @param appid �����˺�ID
	 * @param mch_id �̻���
	 * @param device_info �豸��
	 * @param nonce_str ����ַ�
	 * @param body	��Ʒ����
	 * @param detail 	��Ʒ����
	 * @param out_trade_no �̻�������
	 * @param fee_type	��������
	 * @param total_fee	�ܽ��
	 * @param spbill_create_ip �ն�IP
	 * @param time_start	������ʼʱ��
	 * @param time_expire	���׽���ʱ��
	 * @param notify_url ֪ͨ��ַ
	 * @param trade_type ��������
	 * @param openid  �û���ʶ
	 */
	public UniteOrder(String appid, String mch_id, String device_info,
			String nonce_str, String body, String detail,
			String out_trade_no, String fee_type, String total_fee,
			String spbill_create_ip, String time_start, String time_expire,
			String notify_url, String trade_type, String openid) {
		this.appid = appid;
		this.mch_id = mch_id;
		this.device_info = device_info;
		this.nonce_str = nonce_str;
		this.body = body;
		this.detail = detail;
		this.out_trade_no = out_trade_no;
		this.fee_type = fee_type;
		this.total_fee = total_fee;
		this.spbill_create_ip = spbill_create_ip;
		this.time_start = time_start;
		this.time_expire = time_expire;
		this.notify_url = notify_url;
		this.trade_type = trade_type;
		this.openid = openid;
	}

	public UniteOrder() {
		
	}
	
	public String getUniteOrderid() {
		return uniteOrderid;
	}

	public void setUniteOrderid(String uniteOrderid) {
		this.uniteOrderid = uniteOrderid;
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

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public String getAttach() {
		return attach;
	}

	public void setAttach(String attach) {
		this.attach = attach;
	}

	public String getOut_trade_no() {
		return out_trade_no;
	}

	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}

	public String getFee_type() {
		return fee_type;
	}

	public void setFee_type(String fee_type) {
		this.fee_type = fee_type;
	}

	public String getTotal_fee() {
		return total_fee;
	}

	public void setTotal_fee(String total_fee) {
		this.total_fee = total_fee;
	}

	public String getSpbill_create_ip() {
		return spbill_create_ip;
	}

	public void setSpbill_create_ip(String spbill_create_ip) {
		this.spbill_create_ip = spbill_create_ip;
	}

	public String getTime_start() {
		return time_start;
	}

	public void setTime_start(String time_start) {
		this.time_start = time_start;
	}

	public String getTime_expire() {
		return time_expire;
	}

	public void setTime_expire(String time_expire) {
		this.time_expire = time_expire;
	}

	public String getGoods_tag() {
		return goods_tag;
	}

	public void setGoods_tag(String goods_tag) {
		this.goods_tag = goods_tag;
	}

	public String getNotify_url() {
		return notify_url;
	}

	public void setNotify_url(String notify_url) {
		this.notify_url = notify_url;
	}

	public String getTrade_type() {
		return trade_type;
	}

	public void setTrade_type(String trade_type) {
		this.trade_type = trade_type;
	}

	public String getProduct_id() {
		return product_id;
	}

	public void setProduct_id(String product_id) {
		this.product_id = product_id;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}
 
	
	public static UniteOrder nativeUniteOrder(){
		UniteOrder order = new UniteOrder();
		order.setAppid("公众号ID");
		order.setMch_id("商户号");
		order.setDevice_info(PaymentTools.getServerIP());
		order.setNonce_str(PayMD5.GetMD5nonce_str());
		order.setBody("iPhone 6S");
		order.setDetail("iPhone 6S");
		order.setOut_trade_no(PaymentTools.businessOrderNumber());
		order.setFee_type("CNY");
		order.setTotal_fee("1"); 
		order.setSpbill_create_ip(PaymentTools.getServerIP());
		order.setNotify_url("http://域名/wechatpaytest/NativeNotifyUrl");
		order.setTrade_type("NATIVE");  // 表示二维码支付
		order.setProduct_id(PaymentTools.businessOrderNumber());
		return order ;
		
	}
	
	public static UniteOrder jsapiUniteOrder(){
		UniteOrder order = new UniteOrder();
		order.setAppid("公众号ID");
		order.setMch_id("商户号");
		order.setDevice_info(PaymentTools.getServerIP());
		order.setNonce_str(PayMD5.GetMD5nonce_str());
		order.setBody("iPhone 6S");
		order.setDetail("iPhone 6S");
		order.setOut_trade_no(PaymentTools.businessOrderNumber());
		order.setFee_type("CNY");
		order.setTotal_fee("1");
		order.setSpbill_create_ip(PaymentTools.getServerIP());
		order.setNotify_url("http://域名/wechatpaytest/NativeNotifyUrl");
		order.setTrade_type("JSAPI");  // 表示公众号支付
		order.setOpenid("openId");
		return order ;
		
	}
	
}
