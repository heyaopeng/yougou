package com.duobao.payment.strategy.wcPaymetnTools;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * Description��΢��ͳһ��������<br>
 * User��liqijing <br>
 * Date��2015-7-17����3:01:10 <br>
 */
public class UniteOrderResult implements Serializable {

	/**
	 * UniteOrderResult.java 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private String uniteOrderResultId ;
	
	// ����״̬��
	@Column(name = "RETURN_CODE")
	private String return_code ;
	
	// ������Ϣ
	@Column(name = "RETURN_MSG")
	private String return_msg ;
	
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
	@Column(name = "UNITE_SIGN")
	private String sign ;
	
	// ҵ����
	@Column(name = "RESULT_CODE")
	private String result_code ;
	
	// �������
	@Column(name = "ERR_CODE")
	private String err_code ;
	
	// �����������
	@Column(name = "ERR_CODE_DES")
	private String err_code_des ;
	
	// ��������
	@Column(name = "TRADE_TYPE")
	private String trade_type ;
	
	// Ԥ֧�����׻Ự��ʶ
	@Column(name = "PREPAY_ID")
	private String prepay_id ;
	
	// ��ά������
	@Column(name = "CODE_URL")
	private String code_url ;
	
	// �������
	@Column(name = "UNITEORDER_ID")
	private String uniteOrder_id;
	
	// ����ʱ��
	@Column(name = "UPDATEDATE")
	private String updateDate ;

	public String getUniteOrderResultId() {
		return uniteOrderResultId;
	}

	public void setUniteOrderResultId(String uniteOrderResultId) {
		this.uniteOrderResultId = uniteOrderResultId;
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

	public String getTrade_type() {
		return trade_type;
	}

	public void setTrade_type(String trade_type) {
		this.trade_type = trade_type;
	}

	public String getPrepay_id() {
		return prepay_id;
	}

	public void setPrepay_id(String prepay_id) {
		this.prepay_id = prepay_id;
	}

	public String getCode_url() {
		return code_url;
	}

	public void setCode_url(String code_url) {
		this.code_url = code_url;
	}
	
	public String getUniteOrder_id() {
		return uniteOrder_id;
	}

	public void setUniteOrder_id(String uniteOrder_id) {
		this.uniteOrder_id = uniteOrder_id;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}
	
	
	
	
}
