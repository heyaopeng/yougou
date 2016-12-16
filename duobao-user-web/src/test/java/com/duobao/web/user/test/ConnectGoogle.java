package com.duobao.web.user.test;


import java.io.ByteArrayOutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class ConnectGoogle {

	public static void main(String[] args) throws Exception {
		URL url = new URL("https://www.google.com.hk/?gws_rd=cr,ssl&ei=wPA2VtXBK4eomgXqm5zgAw");
		System.out.println(ConnectGoogle.getURLSource(url));
	}
	
	public static String getURLSource(URL url) throws Exception {
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setConnectTimeout(5 * 1000); 
		java.io.InputStream inStream = conn.getInputStream(); 

		byte[] data = readInputStream(inStream); 
		String htmlSource = new String(data);
		return htmlSource;
	}
	/**
	 * @param inStream
	 * @return byte[]
	 * @throws Exception
	 */
	public static byte[] readInputStream(java.io.InputStream inStream)
			throws Exception {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] buffer = new byte[1204];
		int len = 0;
		while ((len = inStream.read(buffer)) != -1) {
			outStream.write(buffer, 0, len);
		}
		inStream.close();
		return outStream.toByteArray();
	}
}
