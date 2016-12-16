package com.duobao.user.util;

import org.apache.shiro.crypto.hash.Sha256Hash;

public class SHA256 {
	
	public static String encrypt(String value,String salt){
		return new Sha256Hash(value,salt,40).toBase64();
	}
	
}
