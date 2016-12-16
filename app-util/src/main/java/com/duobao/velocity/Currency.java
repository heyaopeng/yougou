package com.duobao.velocity;

import org.apache.velocity.tools.Scope;
import org.apache.velocity.tools.config.DefaultKey;
import org.apache.velocity.tools.config.ValidScope;

import com.duobao.fundation.config.links.CurrencyConstant;

@DefaultKey("currency")
@ValidScope(Scope.APPLICATION)
public class Currency {
	private static final String baseCurrency =  CurrencyConstant.BASE_CURRENCY;
	private static final String priceCurrency = CurrencyConstant.PRICE_CURRENCY;
	private static final String basCurrencySymbol = CurrencyConstant.BASE_CURRENCY_SYMBOL;
	private static final String priceCurrencySymbol = CurrencyConstant.PRICE_CURRENCY_SYMBOL;
	public static String getBasecurrency() {
		return baseCurrency;
	}
	public static String getPricecurrency() {
		return priceCurrency;
	}
	public static String getBascurrencysymbol() {
		return basCurrencySymbol;
	}
	public static String getPricecurrencysymbol() {
		return priceCurrencySymbol;
	}
	
	
}
