package com.duobao.payment.strategy;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.duobao.fundation.data.mybatis.model.Order;
import com.duobao.fundation.data.mybatis.model.PaymentOrder;
import com.duobao.fundation.data.mybatis.model.Product;
import com.duobao.model.SpringContextUtil;
import com.duobao.payment.exception.PaymentHandlerException;
import com.duobao.user.model.PaymentStrategyResult;
import com.duobao.user.service.UserServiceI;

public class AlipayPaymentStrategy implements PaymentHandlerStrategy {

	@Override
	public PaymentStrategyResult payHandle(String paymentSerialNum, Integer paymentId,HttpServletRequest request, Integer userId)
			throws PaymentHandlerException {
		UserServiceI userService = (UserServiceI)SpringContextUtil.getBean("userServiceImpl");
		// TODO Auto-generated method stub
		PaymentStrategyResult paymentStrategyResult = new PaymentStrategyResult();
		PaymentOrder paymentOrder = userService.getPaymentOrderBySerialNum(paymentSerialNum);
		paymentOrder.setPaymentId(paymentId);
		userService.updatePaymentOrder(paymentOrder);
		List<Order> orders = userService.getProductByPaymentSerialNum(paymentSerialNum);
		String title = "";
		for(Order order : orders){
			title = title + order.getProductTitle() + "  ";
		}
		paymentStrategyResult = userService.getAlipayForFastPay(paymentOrder, title, "http://m.uclee.com/paymentResult?paymentSerialNum="+paymentOrder.getPaymentSerialNum());
		return paymentStrategyResult;
	}

}
