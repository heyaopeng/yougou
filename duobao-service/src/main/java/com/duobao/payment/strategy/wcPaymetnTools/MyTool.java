package com.duobao.payment.strategy.wcPaymetnTools;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import sun.misc.BASE64Encoder;

public class MyTool {

	/**
	 * MD5加密
	 * 
	 * @param source
	 * @return
	 */
	public static String getMD5(byte[] source) {
		String s = null;
		char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
				'a', 'b', 'c', 'd', 'e', 'f' };// 用来将字节转换成16进制表示的字符
		try {
			java.security.MessageDigest md = java.security.MessageDigest
					.getInstance("MD5");
			md.update(source);
			byte tmp[] = md.digest();// MD5 的计算结果是一个 128 位的长整数，
			// 用字节表示就是 16 个字节
			char str[] = new char[16 * 2];// 每个字节用 16 进制表示的话，使用两个字符， 所以表示成 16
			// 进制需要 32 个字符
			int k = 0;// 表示转换结果中对应的字符位置
			for (int i = 0; i < 16; i++) {// 从第一个字节开始，对 MD5 的每一个字节// 转换成 16
				// 进制字符的转换
				byte byte0 = tmp[i];// 取第 i 个字节
				str[k++] = hexDigits[byte0 >>> 4 & 0xf];// 取字节中高 4 位的数字转换,// >>>
				// 为逻辑右移，将符号位一起右移
				str[k++] = hexDigits[byte0 & 0xf];// 取字节中低 4 位的数字转换

			}
			s = new String(str);// 换后的结果转换为字符串

		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return s;
	}

	/**
	 * AES加密
	 * 
	 * @param iv
	 * @param key
	 * @return
	 */
	public static byte[] AESencrypt(String content, String keyWord) {
		try {
			KeyGenerator kgen = KeyGenerator.getInstance("AES");
			SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
			secureRandom.setSeed(keyWord.getBytes());
			kgen.init(128, secureRandom);
			SecretKey secretKey = kgen.generateKey();
			byte[] enCodeFormat = secretKey.getEncoded();
			SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
			Cipher cipher = Cipher.getInstance("AES");// 创建密码器
			byte[] byteContent = content.getBytes("utf-8");
			cipher.init(Cipher.ENCRYPT_MODE, key);// 初始化
			byte[] result = cipher.doFinal(byteContent);
			return result; // 加密
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * AES加密处理方法
	 * 
	 * @param text
	 *            ：待加密字符串
	 * @param key
	 *            ：key值
	 * @param iv
	 *            ：向量
	 * @return
	 * @throws Exception
	 */
	public static String AESencrypt(String text, String key, String iv)
			throws Exception {
		SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES"); // 两个参数，第一个为私钥字节数组，
		IvParameterSpec ivSpec = new IvParameterSpec(iv.getBytes());
		Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");
		cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec); 
		byte[] encrypted = cipher.doFinal(text.getBytes("UTF-8"));
		System.out.println(new String(encrypted));
		return new BASE64Encoder().encode(encrypted);

	}

	/**
	 * 获得OrderPayId
	 * 
	 * @return
	 */
	public static String getOrderPayId() {
		String str = "";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmsss");
		str = sdf.format(new Date());
		return str;
	}

	/**
	 * 测试
	 * 
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		// 正常值：p4Uk2310jYHa0HnFIIVg4g==
		String test = MyTool
				.getMD5("00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
						.getBytes());
		String aestr = test.toUpperCase();
		System.out.println(aestr);
		System.out.println("key=" + aestr.substring(0, 16));
		System.out.println("IV=" + aestr.substring(16));
		String carnub = "4111111111111199";
		System.out.println("carnub=" + carnub);
		String mm = MyTool.AESencrypt(carnub, aestr.substring(0, 16),
				aestr.substring(16));
		System.out.println(mm);
	}

}
