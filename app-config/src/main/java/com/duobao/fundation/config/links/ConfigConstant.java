package com.duobao.fundation.config.links;

import java.math.BigDecimal;

public interface ConfigConstant {
	String DEFAULT_IMGAE_URL = "$staticConfig.getPath()/images/default_img.jpg";
	
	long DEFAULT_ALLOW_SEND_RANDMON_AGAIN = 60000;
	long DEFAULT_SEND_RESETPASSWORD_EMAIL_TIMEOUT=7200000;
	int MESSAGE_TYPE_DEFAULT=3;
	int MESSAGE_TYPE_BOUND_PHONE=1;
	int MESSAGE_TYPE_VERIFY=2;
	int MESSAGE_STORE_NOTIFICATION = 4;
	int COOKA_STORE_ID = 1;
	
	int ROOT_ROLE_ID=1;
	int CUSTOMER_ROLE_ID=2;
	int SELLER_ROLE_ID = 3;
	int UNCERTIFIED_SELLER_ROLE_ID= 4;
	int AUTHENTICATES_SELLER_ROLE_ID = 14;
	
	int MARKET_USER_ROLE_ID = 5;   //市场人员角色id
	
	int MARKET_SUB_USER_DEFAULT_ROLE_ID = 6;  //市场人员添加子账户时默认 角色
	int STORE_SUB_USER_DEFAULT_ROLE_ID = 7;	  //商家添加子账户时的默认角色   
	
	int STOCK_TIGHT_LEVEL = 500;
	BigDecimal STORE_WITHDRAW_CHARGE=new BigDecimal(2);
	
	
	Integer COOKA_STORE1 = 1;
	Integer COOKA_STORE2 = 130;
	
	//Integer MOBILE_TEST_USER_ID = 1;
	
	String USER_PC_LOGIN_SUCCESS = "/duobao-user-web/center/profile";
	String MOBILE_USER_CENTER = "/center/socailLogin";
	String MOBILE_USER_SOCIAL_REGISTER = "";
	
	Boolean BIG_RED_PACKET = false;
	
	double WITHDRAW_HANDLE_CHARGE = 2;
	
	double REBATE_RATE_STORE = 0.009;  //(0.2 * 0.45)
	double REBATE_RATE_MARKET = 0.006;  //(0.2 * 0.3)
	double REBATE_RATE_COOKA = 0.005;    //(0.2 * 0.25)
	
	Integer DEFAULT_LOGISTIC_COMPANY_ID = 96;
	
}
