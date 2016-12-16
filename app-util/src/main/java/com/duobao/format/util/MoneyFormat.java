package com.duobao.format.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;

public abstract class MoneyFormat {
	public static BigDecimal moneyFormat(BigDecimal money){
		DecimalFormat myformat=new DecimalFormat("0.00");
		myformat.setRoundingMode(RoundingMode.HALF_DOWN);
		return new BigDecimal(myformat.format(money));
	}
	public static double moneyFormat(double money){
		DecimalFormat myformat=new DecimalFormat("0.00");
		myformat.setRoundingMode(RoundingMode.HALF_DOWN);
		return Double.parseDouble(myformat.format(money));
	}
}
