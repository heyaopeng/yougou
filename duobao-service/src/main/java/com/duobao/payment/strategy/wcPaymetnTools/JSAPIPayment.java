package com.duobao.payment.strategy.wcPaymetnTools;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



/**
 * Description：公众号支付<br>
 * User：liqijing <br>
 * Date：2015-8-14下午02:16:47 <br>
 */
public class JSAPIPayment extends HttpServlet {

	private static String ORDER_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder" ;
	/**
	 * PublicNoPayment.java 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Constructor of the object.
	 */
	public JSAPIPayment() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		UniteOrder order = UniteOrder.jsapiUniteOrder();
		String reqXML = PayImpl.generateXML(order, "商户API密钥");
		System.out.println("请求微信信息："+reqXML);
		String respXML = PayImpl.requestWechat(ORDER_URL, reqXML);
		System.out.println("微信响应信息："+reqXML);
		UniteOrderResult result = (UniteOrderResult) PayImpl.turnObject(UniteOrderResult.class, respXML);
		WechatPay wechatPay = WechatPay.getWechatPay(result);
		request.setAttribute("wechatPay", wechatPay);
		request.getRequestDispatcher("pay/jsapi.jsp").forward(request, response);
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
