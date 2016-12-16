package com.duobao.payment.strategy;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSON;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.data.mybatis.model.OauthLogin;
import com.duobao.fundation.data.mybatis.model.Order;
import com.duobao.fundation.data.mybatis.model.PaymentOrder;
import com.duobao.model.SpringContextUtil;
import com.duobao.payment.exception.PaymentHandlerException;
import com.duobao.user.model.PaymentStrategyResult;
import com.duobao.user.service.UserServiceI;
import com.duobao.user.service.impl.UserServiceImpl;

public class WCJSAPIPaymentStrategy implements PaymentHandlerStrategy {

	private static String ORDER_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder" ;
	
	private static String RERUND_URL = "https://api.mch.weixin.qq.com/secapi/pay/refund" ;
	
	private static String FIND_ORDER_URL = "https://api.mch.weixin.qq.com/pay/orderquery" ;
	
	private static String CLOSE_ORDER_URL = "https://api.mch.weixin.qq.com/pay/closeorder" ;
	
	private static String DOWNLOADBILL = "https://api.mch.weixin.qq.com/pay/downloadbill" ;
	
	@Override
	public PaymentStrategyResult payHandle(String paymentSerialNum,Integer paymentId, HttpServletRequest request,Integer userId) throws PaymentHandlerException {
		UserServiceI userService = (UserServiceI)SpringContextUtil.getBean("userServiceImpl");
		HttpSession session = request.getSession();
		//String openId =  (String) session.getAttribute(GlobalSessionConstant.WEI_XIN_OPEN_ID);
		OauthLogin oauthLogin = userService.getOauthLoginInfoByUserId(userId);
		String openId = null;
		if(oauthLogin!=null){
			openId = oauthLogin.getOauthId();
		}
		List<Order> orders = userService.getProductByPaymentSerialNum(paymentSerialNum);
		PaymentOrder paymentOrder = userService.getPaymentOrderBySerialNum(paymentSerialNum);
		paymentOrder.setPaymentId(paymentId);
		userService.updatePaymentOrder(paymentOrder);
		String title = "";
		for(Order order : orders){
			title = title + order.getProductTitle() + "  ";
		}
		PaymentStrategyResult result=null;
		result = userService.getWCPayment(openId,paymentSerialNum,title);
		result.setType("WC");
		System.out.println("result:" + JSON.toJSONString(result));
		return result;
	}

}
