package com.duobao.payment.strategy.wcPaymetnTools;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Description：微信回调URL<br>
 * User：liqijing <br>
 * Date：2015-8-15下午07:41:19 <br>
 */
public class NativeNotifyUrl extends HttpServlet {

	/**
	 * NativeNotifyUrl.java 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Constructor of the object.
	 */
	public NativeNotifyUrl() {
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
		PrintWriter out = response.getWriter();
		String respXML = IOUtils.toString(request.getInputStream(),request.getCharacterEncoding());
		System.out.println("微信回调通知："+respXML);
		
		PayResultNotice resultNtice = (PayResultNotice) PayImpl.turnObject(PayResultNotice.class, respXML);
		if("SUCCESS".equals(resultNtice.getReturn_code())){
			System.out.println("支付成功："+resultNtice.getReturn_code());
			System.out.println("通知微信："+PayImpl.notify_urlSUCCESS());
			out.write(PayImpl.notify_urlSUCCESS());
		}else{
			System.out.println("支付失败："+resultNtice.getReturn_code());
			System.out.println("通知微信："+PayImpl.notify_urlSUCCESS());
			out.write(PayImpl.notify_urlFail());
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
