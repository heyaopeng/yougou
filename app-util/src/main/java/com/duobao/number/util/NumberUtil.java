package com.duobao.number.util;

import java.util.Random;

public class NumberUtil {
	public static String generateSerialNum() {
		long time = System.currentTimeMillis();
		String serialnum = String.valueOf(time);
		Random random = new Random();// randomize
		int randtail = (int) (random.nextInt(8999) + 1000);// keep length 4
		serialnum = serialnum + String.valueOf(randtail);// unix
		// timestamp
		// + 4 digit
		return serialnum;
	}
	public static String generateSerialNum(int i) {
		long time = System.currentTimeMillis();
		String serialnum = String.valueOf(time);
		Random random = new Random();// randomize
		int randtail = (int) (random.nextInt(8999) + 1000);// keep length 4
		serialnum = serialnum +i + String.valueOf(randtail);// unix
		// timestamp
		// + 4 digit
		return serialnum;
	}
}
