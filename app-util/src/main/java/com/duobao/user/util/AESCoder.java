package com.duobao.user.util;

import java.security.Key;  
import java.security.NoSuchAlgorithmException;  
  




import javax.crypto.Cipher;  
import javax.crypto.KeyGenerator;  
import javax.crypto.SecretKey;  
import javax.crypto.spec.SecretKeySpec;  

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
  
/** 
 * AES Coder<br/> 
 * secret key length:   128bit, default:    128 bit<br/> 
 * mode:    ECB/CBC/PCBC/CTR/CTS/CFB/CFB8 to CFB128/OFB/OBF8 to OFB128<br/> 
 * padding: Nopadding/PKCS5Padding/ISO10126Padding/ 
 * @author Aub 
 *  
 */  
public class AESCoder {  
      
    /** 
     * 密钥算法 
    */  
    private static final String KEY_ALGORITHM = "AES";  
      
    private static final String DEFAULT_CIPHER_ALGORITHM = "AES/ECB/PKCS5Padding";  
      
    private static final String KEY="qqziyywxdwjgcyzj";
    /** 
     * 初始化密钥 
     *  
     * @return byte[] 密钥  
     * @throws Exception 
     */  
    public static byte[] initSecretKey() {  
        //返回生成指定算法的秘密密钥的 KeyGenerator 对象  
        KeyGenerator kg = null;  
        try {  
            kg = KeyGenerator.getInstance(KEY_ALGORITHM);  
        } catch (NoSuchAlgorithmException e) {  
            e.printStackTrace();  
            return new byte[0];  
        }  
        //初始化此密钥生成器，使其具有确定的密钥大小  
        //AES 要求密钥长度为 128  
        kg.init(128);  
        //生成一个密钥  
        SecretKey  secretKey = kg.generateKey();  
        return secretKey.getEncoded();  
    }  
      
    /** 
     * 转换密钥 
     *  
     * @param key   二进制密钥 
     * @return 密钥 
     */  
    private static Key toKey(byte[] key){  
        //生成密钥  
        return new SecretKeySpec(key, KEY_ALGORITHM);  
    }  
      
    /** 
     * 加密 
     *  
     * @param data  待加密数据 
     * @param key   密钥 
     * @return byte[]   加密数据 
     * @throws Exception 
     */  
    public static byte[] encrypt(byte[] data,Key key) throws Exception{  
        return encrypt(data, key,DEFAULT_CIPHER_ALGORITHM);  
    }  
      
    /** 
     * 加密 
     *  
     * @param data  待加密数据 
     * @param key   二进制密钥 
     * @return byte[]   加密数据 
     * @throws Exception 
     */  
    public static byte[] encrypt(byte[] data,byte[] key) throws Exception{  
        return encrypt(data, key,DEFAULT_CIPHER_ALGORITHM);  
    }  
      
      
    /** 
     * 加密 
     *  
     * @param data  待加密数据 
     * @param key   二进制密钥 
     * @param cipherAlgorithm   加密算法/工作模式/填充方式 
     * @return byte[]   加密数据 
     * @throws Exception 
     */  
    public static byte[] encrypt(byte[] data,byte[] key,String cipherAlgorithm) throws Exception{  
        //还原密钥  
        Key k = toKey(key);  
        return encrypt(data, k, cipherAlgorithm);  
    }  
      
    /** 
     * 加密 
     *  
     * @param data  待加密数据 
     * @param key   密钥 
     * @param cipherAlgorithm   加密算法/工作模式/填充方式 
     * @return byte[]   加密数据 
     * @throws Exception 
     */  
    public static byte[] encrypt(byte[] data,Key key,String cipherAlgorithm) throws Exception{  
        //实例化  
        Cipher cipher = Cipher.getInstance(cipherAlgorithm);  
        //使用密钥初始化，设置为加密模式  
        cipher.init(Cipher.ENCRYPT_MODE, key);  
        //执行操作  
        return cipher.doFinal(data);  
    }  
      
      
      
    /** 
     * 解密 
     *  
     * @param data  待解密数据 
     * @param key   二进制密钥 
     * @return byte[]   解密数据 
     * @throws Exception 
     */  
    public static byte[] decrypt(byte[] data,byte[] key) throws Exception{  
        return decrypt(data, key,DEFAULT_CIPHER_ALGORITHM);  
    }  
      
    /** 
     * 解密 
     *  
     * @param data  待解密数据 
     * @param key   密钥 
     * @return byte[]   解密数据 
     * @throws Exception 
     */  
    public static byte[] decrypt(byte[] data,Key key) throws Exception{  
        return decrypt(data, key,DEFAULT_CIPHER_ALGORITHM);  
    }  
      
    /** 
     * 解密 
     *  
     * @param data  待解密数据 
     * @param key   二进制密钥 
     * @param cipherAlgorithm   加密算法/工作模式/填充方式 
     * @return byte[]   解密数据 
     * @throws Exception 
     */  
    public static byte[] decrypt(byte[] data,byte[] key,String cipherAlgorithm) throws Exception{  
        //还原密钥  
        Key k = toKey(key);  
        return decrypt(data, k, cipherAlgorithm);  
    }  
  
    /** 
     * 解密 
     *  
     * @param data  待解密数据 
     * @param key   密钥 
     * @param cipherAlgorithm   加密算法/工作模式/填充方式 
     * @return byte[]   解密数据 
     * @throws Exception 
     */  
    public static byte[] decrypt(byte[] data,Key key,String cipherAlgorithm) throws Exception{  
        //实例化  
        Cipher cipher = Cipher.getInstance(cipherAlgorithm);  
        //使用密钥初始化，设置为解密模式  
        cipher.init(Cipher.DECRYPT_MODE, key);  
        //执行操作  
        return cipher.doFinal(data);  
    } 
    
    public static  String decrypt(String data ) {
    	 try {
			return new String(decrypt(Hex.decodeHex(data.toCharArray()), toKey(KEY.getBytes())));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	 return null;
    }
    
    private static String  showByteArray(byte[] data){  
        if(null == data){  
            return null;  
        }  
        StringBuilder sb = new StringBuilder("{");  
        for(byte b:data){  
            sb.append(b).append(",");  
        }  
        sb.deleteCharAt(sb.length()-1);  
        sb.append("}");  
        return sb.toString();  
    }  
      
    public static void main(String[] args) throws Exception {  
        byte[] key =KEY.getBytes();  
        System.out.println("key："+showByteArray(key));  
          
        Key k = toKey(key);  
        System.err.println("dataSource.password="+Hex.encodeHexString(encrypt("nicaicai".getBytes(), k)));
        System.err.println("dataSource.username="+Hex.encodeHexString(encrypt("root".getBytes(), k)));
        
        /*
dataSource.password=29c629702ec1a16201d74f9adf26e1cc
dataSource.username=6176bad98b3c35b9d40bfeb56a30c1e6
         */
        
        System.err.println(decrypt("29c629702ec1a16201d74f9adf26e1cc"));
        System.err.println(decrypt("6176bad98b3c35b9d40bfeb56a30c1e6"));
         
        /* System.err.println();
        String data ="AES数据";  
        System.out.println("加密前数据: string:"+data);  
        System.out.println("加密前数据: byte[]:"+showByteArray(data.getBytes()));  
        System.out.println();  
        byte[] encryptData = encrypt(data.getBytes(), k);  
        System.out.println("加密后数据: byte[]:"+showByteArray(encryptData));  
        System.out.println("加密后数据: hexStr:"+Hex.encodeHexString(encryptData));  
        System.out.println();  
        byte[] decryptData = decrypt(encryptData, k);  
        System.out.println("解密后数据: byte[]:"+showByteArray(decryptData));  
        System.out.println("解密后数据: string:"+new String(decryptData)); */
    }  
}  