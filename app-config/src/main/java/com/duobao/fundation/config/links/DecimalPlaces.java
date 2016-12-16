package com.duobao.fundation.config.links;

public class DecimalPlaces {

	public static int getDecimalPlaces(String currency){
		switch(currency){
		 	case "CNY" : return 2;
		 	case "VND" : return 3;
		 	default : return 2;
		}
	}
	
}
