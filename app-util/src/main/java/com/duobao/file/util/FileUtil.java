package com.duobao.file.util;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Properties;
import java.util.Random;

import javax.imageio.ImageIO;
import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;

import Decoder.BASE64Decoder;
import net.glxn.qrgen.QRCode;
import net.glxn.qrgen.image.ImageType;

public abstract class FileUtil {
	private static final Logger logger = Logger.getLogger(FileUtil.class);
	private final static String configFile = "Util.properties";

	public static String convertToString(InputStream inputStream) {
		InputStreamReader inputStreamReader = null;
		try {
			inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
			logger.info("ENCODE error" + e1);
		}
		BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
		StringBuilder result = new StringBuilder();
		String line = null;
		try {
			while ((line = bufferedReader.readLine()) != null) {
				result.append(line + "\n");
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				inputStreamReader.close();
				inputStream.close();
				bufferedReader.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return result.toString();
	}

	public static String convertToString(FileInputStream inputStream) {
		InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
		BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
		StringBuilder result = new StringBuilder();
		String line = null;
		try {
			while ((line = bufferedReader.readLine()) != null) {
				result.append(line + "\n");
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				inputStreamReader.close();
				inputStream.close();
				bufferedReader.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return result.toString();
	}

	public static boolean isImageOnServer(String targetUrl) {
		if (targetUrl != null) {
			URL url;
			try {
				url = new URL(targetUrl);
				HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
				// GET Request Define:
				urlConnection.setRequestMethod("GET");
				urlConnection.connect();
				if (urlConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
					return true;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return false;
	}

	private static void inputstreamtofile(InputStream ins, File file) {
		try {
			OutputStream os = new FileOutputStream(file);
			int bytesRead = 0;
			byte[] buffer = new byte[8192];
			while ((bytesRead = ins.read(buffer, 0, 8192)) != -1) {
				os.write(buffer, 0, bytesRead);
			}
			os.close();
			ins.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static File urlRequestToGetFile(String targetUrl) {
		URL url;
		if (targetUrl != null) {
			try {
				url = new URL(targetUrl);
				HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
				// GET Request Define:
				urlConnection.setRequestMethod("GET");
				urlConnection.connect();
				Random random=new Random();
				String tmpName = random.nextInt(100000)+String.valueOf(System.currentTimeMillis());
				File file =  File.createTempFile("tmp", null);
				inputstreamtofile(urlConnection.getInputStream(), file);
				return file;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static File urlRequestToGetFileForExcel(String targetUrl) {
		URL url;
		if (targetUrl != null) {
			try {
				final int pos = targetUrl.lastIndexOf('.');
				String tmptUrl = targetUrl.substring(0, pos) + "_" + 512 + "x" + 768 + "." + targetUrl.substring(pos + 1);
				url = new URL(tmptUrl);
				HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
				// GET Request Define:
				urlConnection.setRequestMethod("GET");
				urlConnection.connect();
				String path = getUtilProperties("tmp_dir");
				logger.info("path: " + path);
				String tmpName = "tmp.png";
				File file = new File(path, tmpName);
				inputstreamtofile(urlConnection.getInputStream(), file);
				return file;
			} catch (Exception e) {
			}
		}
		return null;
	}

	public static InputStream urlRequestToGetInputStream(String targetUrl) {
		URL url = null;
		InputStream is = null;
		BufferedImage bufferImg = null;
		try {
			url = new URL(targetUrl);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		try {
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();// 利用HttpURLConnection对象,我们可以从网络中获取网页数据.
			conn.setDoInput(true);
			conn.connect();
			is = conn.getInputStream(); // 得到网络返回的输入流

		} catch (IOException e) {
			e.printStackTrace();
		}
		return is;
	}

	public static void main(String args[]) {
		System.out.println(JSON.toJSONString(urlRequestToGetFile("http://dev.cookabuy.com/group1/M00/00/62/wKgL6FZFlsGAL7taAAQljzEIg3k45.file")));
	}

	public static String UrlRequest(String targetUrl) {
		try {
			if (targetUrl != null) {
				URL url = new URL(targetUrl);
				HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
				// GET Request Define:
				urlConnection.setRequestMethod("GET");
				urlConnection.connect();
				// Connection Response From Test Servlet
				InputStream inputStream = urlConnection.getInputStream();
				// Convert Stream to String
				String responseStr = convertToString(inputStream);
				return responseStr;
			}
		} catch (IOException e) {
			logger.info("无效链接");
		}
		return null;
	}

	protected static String getUtilProperties(String key) {
		String os = System.getProperty("os.name");
		//logger.info(os + " wwwwwwwwwww");
		if (os.toLowerCase().startsWith("win")) {
			key = "win" + key;
			//logger.info("key :" + key);
		}
		String ret = "";
		Properties prop = new Properties();
		InputStream in = FileUtil.class.getClassLoader().getResourceAsStream(configFile);
		try {
			prop.load(in);
			ret = prop.getProperty(key).trim();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ret;
	}

	public static File convertToFile(String data) {
		byte[] bytexml = data.getBytes();
		try {
			String path = getUtilProperties("tmp_dir");
			//logger.info("path:" + path);
			//String tmpName = "tmp".concat(String.valueOf(System.currentTimeMillis())) + (int) Math.random() * 1000111 + ".html";
			//logger.info("fileName:" + tmpName);
			//File file = new File(path, tmpName);
			File file =  File.createTempFile("tmp", "html");
			FileOutputStream fos = new FileOutputStream(file);
			OutputStreamWriter os = new OutputStreamWriter(fos, "UTF-8");
			os.write(data);
			os.flush();
			os.close();
			return file;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static File convertToFile(MultipartFile file) {
		try {
			String path = getUtilProperties("tmp_dir");
			logger.info("path:" + path);
			String fileName = file.getName().replace('\\', '/');
			// 避免同时上传多个重名
			fileName = fileName.concat(String.valueOf(System.currentTimeMillis())) + (int) Math.random() * 1000111 + ".file";
			logger.info("fileName:" + fileName);
			//File temp = new File(path, fileName);
			File temp =  File.createTempFile("tmp", "file");
			InputStream in = file.getInputStream();
			OutputStream out = new BufferedOutputStream(new FileOutputStream(temp));
			byte buffer[] = new byte[1024];
			int len = 0;
			while ((len = in.read(buffer)) > 0) {
				out.write(buffer, 0, len);
			}
			in.close();
			out.close();
			return temp;
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public static File convertToFileForCoupon(String couponNumber) {
		try {
			String path = getUtilProperties("tmp_dir");
			logger.info("path:" + path);
			String fileName = couponNumber;
			// 避免同时上传多个重名
			fileName = fileName.concat(String.valueOf(System.currentTimeMillis())) + (int) Math.random() * 1000111 + ".file";
			logger.info("fileName:" + fileName);
			//File temp = new File(path, fileName);
			File temp =  File.createTempFile("tmp", "file");
			FileOutputStream fout = new FileOutputStream(temp);  
			ByteArrayOutputStream out = QRCode.from(couponNumber)  
	                .to(ImageType.PNG).withSize(100, 100).stream();
            fout.write(out.toByteArray());
            fout.flush();  
            fout.close();
			return temp;
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public static File base64ConvertToFile(String fileBase64) {
		try {
			String path = getUtilProperties("tmp_dir");
			logger.info("path:" + path);
			// 避免同时上传多个重名
			String fileName = String.valueOf(System.currentTimeMillis()) + (int) Math.random() * 1000111 + ".file";
			logger.info("fileName:" + fileName);
			//File temp = new File(path, fileName);
			File temp =  File.createTempFile("tmp", "file");
			String[] temp64 = fileBase64.split(",");
			if (temp64.length != 2) {
				logger.info("uploadFail");
			}
			fileBase64 = temp64[1];

			BASE64Decoder decoder = new BASE64Decoder();
			// Base64解码
			byte[] bytes = decoder.decodeBuffer(fileBase64);
			for (int i = 0; i < bytes.length; i++) {
				if (bytes[i] < 0) {// 调整异常数据
					bytes[i] += 256;
				}
			}

			OutputStream out = new BufferedOutputStream(new FileOutputStream(temp));
			out.write(bytes);

			out.flush();
			out.close();
			return temp;
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public static boolean isImage(File file) {
		boolean flag = false;
		try {
			InputStream input = new FileInputStream(file);
			ImageIO.read(input).toString();
			// It's an image (only BMP, GIF, JPG and PNG are recognized).
		} catch (Exception e) {
			// It's not an image.
		}
		return flag;
	}
}
