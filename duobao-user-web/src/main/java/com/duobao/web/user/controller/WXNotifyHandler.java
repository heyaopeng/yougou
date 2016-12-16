package com.duobao.web.user.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.duobao.payment.strategy.wcPaymetnTools.IOUtils;
import com.duobao.payment.strategy.wcPaymetnTools.PayImpl;
import com.duobao.payment.strategy.wcPaymetnTools.PayResultNotice;
import com.duobao.user.service.UserServiceI;

@Controller
@EnableAutoConfiguration
@RequestMapping("/seller")
public class WXNotifyHandler {
	@Autowired
	private UserServiceI userService;
	private static final Logger logger = Logger.getLogger(WXNotifyHandler.class);
	@RequestMapping(value = "/WCNotifyHandler")
	@ResponseBody
	public String WCNotifyHandler(HttpServletRequest request, HttpServletResponse response){
		logger.info("微信异步通知开始");
		try {
			String respXML = IOUtils.toString(request.getInputStream(),request.getCharacterEncoding());
			System.out.println("微信回调通知："+respXML);
			PayResultNotice payResultNotice = (PayResultNotice) PayImpl.turnObject(PayResultNotice.class, respXML);
			logger.info("resultNtice:" + JSON.toJSONString(payResultNotice));
			logger.info("method:WCNotifyHandler name:payResultNotice data: " + JSON.toJSONString(payResultNotice));
			if(payResultNotice.getReturn_code()!=null && payResultNotice.getReturn_code().equals("SUCCESS")){
				/*if(paymentService.verifyWCReturnSign(payResultNotice)){
					if(payResultNotice.getOut_trade_no()!=null && payResultNotice.getTransaction_id()!=null){
						if(paymentService.wCNotifySuccessHandle(payResultNotice.getOut_trade_no(),payResultNotice.getTransaction_id())){
							return "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
						}
					}
				}else{
					logger.info("签名错误");
				}*/
				if(payResultNotice.getOut_trade_no()!=null && payResultNotice.getTransaction_id()!=null){
					if(userService.wCNotifySuccessHandle(payResultNotice.getOut_trade_no(),payResultNotice.getTransaction_id())){
						return "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
					}
				}
			}else if(payResultNotice.getReturn_msg()!=null){
				
				logger.error("return error msg: " +JSON.toJSONString(payResultNotice.getReturn_msg()));
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
}
