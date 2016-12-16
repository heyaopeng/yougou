package com.duobao.payment.strategy;

import javax.servlet.http.HttpServletRequest;

import com.duobao.payment.exception.PaymentHandlerException;
import com.duobao.user.model.PaymentStrategyResult;

public interface PaymentHandlerStrategy {
	public PaymentStrategyResult payHandle(String paymentSerialNum,Integer paymentId,HttpServletRequest request,Integer userId) throws PaymentHandlerException;
}
