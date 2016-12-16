package com.duobao.velocity;

import org.apache.velocity.tools.Scope;
import org.apache.velocity.tools.config.DefaultKey;
import org.apache.velocity.tools.config.ValidScope;

import com.duobao.fundation.config.links.PaymentMethodConstant;
@DefaultKey("paymentMethod")
@ValidScope(Scope.APPLICATION)
public class PaymentMethod {
	private String ACCOUNT_BALANCE = PaymentMethodConstant.ACCOUNT_BALANCE;
	private String PAYPAL = PaymentMethodConstant.PAYPAL;
	private String COOKA_STORE = PaymentMethodConstant.COOKA_STORE;
	private String CASH_ON_DELIVERY = PaymentMethodConstant.CASH_ON_DELIVERY;
	private String CREDIET_CARD = PaymentMethodConstant.CREDIET_CARD;
	public String getACCOUNT_BALANCE() {
		return ACCOUNT_BALANCE;
	}
	public void setACCOUNT_BALANCE(String aCCOUNT_BALANCE) {
		ACCOUNT_BALANCE = aCCOUNT_BALANCE;
	}
	
	public String getCREDIET_CARD() {
		return CREDIET_CARD;
	}
	public void setCREDIET_CARD(String cREDIET_CARD) {
		CREDIET_CARD = cREDIET_CARD;
	}
	public String getPAYPAL() {
		return PAYPAL;
	}
	public void setPAYPAL(String pAYPAL) {
		PAYPAL = pAYPAL;
	}
	public String getCOOKA_STORE() {
		return COOKA_STORE;
	}
	public void setCOOKA_STORE(String cOOKA_STORE) {
		COOKA_STORE = cOOKA_STORE;
	}
	public String getCASH_ON_DELIVERY() {
		return CASH_ON_DELIVERY;
	}
	public void setCASH_ON_DELIVERY(String cASH_ON_DELIVERY) {
		CASH_ON_DELIVERY = cASH_ON_DELIVERY;
	}
	
}
