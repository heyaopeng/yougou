package com.duobao.payment.strategy.alipay.util;

import java.net.URL;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
/**
 * ���ܣ��ⲿ����XML�ļ��ࣨ���಻��֧�������У�Ҳ����ʹ����������������
 * �����ԣ���֧����������
 * ��˾���ƣ�alipay
 * �޸�ʱ�䣺2008-10-10
 * */
public class Dom4j {
	String filepath = "";

	public String DomXml(String filepath) throws Exception {
		
		SAXReader reader = new SAXReader();
		Document doc = reader.read(new URL(filepath).openStream());
		//����request�б��µ���Ϣ
		List<Node> nodeList = doc.selectNodes("//request/*");
		StringBuffer buf = new StringBuffer();
		for (Node node : nodeList) {
			buf.append("<html><p>");
			buf.append(node.getName()).append("=").append(node.getText())
					.append("<html><p>");
		}
		//����response�б��µĶ�����Ϣ 
		List<Node> nodeList1 = doc.selectNodes("//response/trade/*");
		StringBuffer buf1 = new StringBuffer();
		for (Node node : nodeList1) {
			buf1.append("<html><p>");
			//��ȡ���ֲ���Ҫ��������Ϣ
			if(!node.getName().equals("flag_trade_locked")&&!node.getName().equals("use_coupon")){
				//������������ݴ����ַ���
				buf1.append(node.getName()).append("=").append(node.getText())
				.append("<html><p>");
			}				
		}
		// System.out.println(buf.toString());
		return "request��Ϣ��" + buf.toString()+ 
				"response��Ϣ��" + buf1.toString();

	}

	
	public static void main(String[] args) throws Exception {
		//dom4j dom = new dom4j();
		//String sss = dom
		//		.dd("https://www.alipay.com/cooperate/gateway.do?service=single_trade_query&partner=2088002029290264&_input_charset=utf-8&out_trade_no=237&sign=abaab98dbff75a3712ec7a69e295a80b&sign_type=MD5");
		//System.out.println(sss);

	}
}
