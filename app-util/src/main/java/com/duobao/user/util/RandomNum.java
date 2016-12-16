package com.duobao.user.util;

import java.util.Random;
import java.util.UUID;

public class RandomNum {
	
	public  String sixRandomNum() {
        int count = 6;
        char start = '0';
        char end = '9';
        Random rnd = new Random();
        char[] result = new char[count];
        int len = end - start + 1;
        while (count-- > 0) {
            result[count] = (char) (rnd.nextInt(len) + start);
        }
 
        return new String(result);
    }
}
