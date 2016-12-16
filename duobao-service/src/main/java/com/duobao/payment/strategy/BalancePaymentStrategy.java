package com.duobao.payment.strategy;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.duobao.fundation.data.mybatis.model.FinancialAccount;
import com.duobao.fundation.data.mybatis.model.PaymentOrder;
import com.duobao.model.SpringContextUtil;
import com.duobao.user.model.PaymentStrategyResult;
import com.duobao.user.service.UserServiceI;

public class BalancePaymentStrategy implements PaymentHandlerStrategy {
	private static final Logger logger = Logger.getLogger(BalancePaymentStrategy.class);
	@Override
	public PaymentStrategyResult payHandle(String paymentSerialNum, Integer paymentId,HttpServletRequest request, Integer userId) {
		UserServiceI userService = (UserServiceI)SpringContextUtil.getBean("userServiceImpl");
		FinancialAccount account = userService.selectFinancialAcountByUserId(userId);
		PaymentStrategyResult result = new PaymentStrategyResult();
		if(account!=null){
			PaymentOrder paymentOrder = userService.getPaymentOrderBySerialNum(paymentSerialNum);
			paymentOrder.setPaymentId(paymentId);
			if(paymentOrder!=null&&paymentOrder.getIsActive()&&!paymentOrder.getIsCompleted()){
				if(paymentOrder.getMoney().compareTo(account.getBalance())<=0){
					logger.info("夺币支付处理");
					userService.paymentBalanceHandler(paymentOrder,account,result);
				}else{
					result.setResult(false);
					result.setReason("money_not_enough");
				}
			}else{
				result.setResult(false);
				result.setReason("paymentOrder_illegle");
			}
			return result;
		}else{
			result.setResult(false);
			result.setReason("account_not_existed");
			return result;
		}
	}

}
