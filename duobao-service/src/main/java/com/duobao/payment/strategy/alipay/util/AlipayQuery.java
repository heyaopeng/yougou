package com.duobao.payment.strategy.alipay.util;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradeQueryRequest;
import com.alipay.api.response.AlipayTradeQueryResponse;
import com.duobao.payment.strategy.alipay.config.AlipayConfig;

public class AlipayQuery {
	private static final Logger logger = Logger.getLogger(AlipayQuery.class);
	public static boolean query(String out_trade_no){
		AlipayClient alipayClient = new DefaultAlipayClient("https://openapi.alipay.com/gateway.do",AlipayConfig.seller_id,AlipayConfig.key,"json","UTF-8",null);
		AlipayTradeQueryRequest request = new AlipayTradeQueryRequest();
		request.setBizContent("{\"out_trade_no\":"+out_trade_no+"\"}");
		try {
			AlipayTradeQueryResponse response = alipayClient.execute(request);
			logger.info(JSON.toJSONString(response));
		} catch (AlipayApiException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

}
