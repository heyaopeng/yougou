package com.duobao.payment.strategy.wcPaymetnTools;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Description：扫码支付含模式一二<br>
 * User：liqijing <br>
 * Date：2015-8-14下午02:16:47 <br>
 */
public class NATIVEPayment extends HttpServlet {

	private static String ORDER_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder" ;
	/**
	 * PublicNoPayment.java 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Constructor of the object.
	 */
	public NATIVEPayment() {
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
		// 判断模式一还是模式二
		String mode = request.getParameter("mode");
		if("1".equals(mode)){
			PrintWriter out = response.getWriter();
			UniteOrder order = UniteOrder.nativeUniteOrder();
			String reqXML = PayImpl.generateXML(order, "商户API密钥");
			System.out.println("请求微信信息："+reqXML);
			String respXML = PayImpl.requestWechat(ORDER_URL, reqXML);
			System.out.println("微信响应信息："+reqXML);
			UniteOrderResult result = (UniteOrderResult) PayImpl.turnObject(UniteOrderResult.class, respXML);
			out.write(result.getPrepay_id());
			out.close();
		}else if("2".equals(mode)){
			UniteOrder order = UniteOrder.nativeUniteOrder();
			String reqXML = PayImpl.generateXML(order, "商户API密钥");
			System.out.println("请求微信信息："+reqXML);
			String respXML = PayImpl.requestWechat(ORDER_URL, reqXML);
			System.out.println("微信响应信息："+reqXML);
			UniteOrderResult result = (UniteOrderResult) PayImpl.turnObject(UniteOrderResult.class, respXML);
			request.setAttribute("PAY_URL", result.getCode_url());
			request.getRequestDispatcher("pay/IInative.jsp").forward(request, response);
		}else{  // 初始化模式一
			String mode1 = "NATIVEPayment?mode=1" ;
			request.setAttribute("PAY_URL", mode1);
			request.getRequestDispatcher("pay/native.jsp").forward(request, response);
		}
		
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
