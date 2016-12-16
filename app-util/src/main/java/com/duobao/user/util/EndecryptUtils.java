package com.duobao.user.util;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.shiro.codec.Base64;
import org.apache.shiro.codec.H64;
import org.apache.shiro.codec.Hex;
import org.apache.shiro.crypto.AesCipherService;
import org.apache.shiro.crypto.hash.Md5Hash;

import com.duobao.number.util.NumberUtil;
import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
/** 
* User： cutter.li 
* Date： 2014/6/27 0027 
* Time： 16:49 
* 备注： shiro进行加密解密的工具类封装 
*/ 
public final class EndecryptUtils { 
	
	public static String SHA1(String decript) {
		try {
			MessageDigest digest = java.security.MessageDigest
					.getInstance("SHA-1");
			digest.update(decript.getBytes());
			byte messageDigest[] = digest.digest();
			// Create Hex String
			StringBuffer hexString = new StringBuffer();
			// 字节数组转换为 十六进制 数
			for (int i = 0; i < messageDigest.length; i++) {
				String shaHex = Integer.toHexString(messageDigest[i] & 0xFF);
				if (shaHex.length() < 2) {
					hexString.append(0);
				}
				hexString.append(shaHex);
			}
			return hexString.toString();

		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return "";
	}
    /** 
     * base64进制加密 
     * 
     * @param password 
     * @return 
     */ 
    public static String encrytBase64(String password) { 
       Preconditions.checkArgument(!Strings.isNullOrEmpty(password), "不能为空"); 
        byte[] bytes = password.getBytes(); 
        return Base64.encodeToString(bytes); 
    } 
    /** 
     * base64进制解密 
     * @param cipherText 
     * @return 
     */ 
    public static String decryptBase64(String cipherText) { 
       Preconditions.checkArgument(!Strings.isNullOrEmpty(cipherText), "消息摘要不能为空"); 
        return Base64.decodeToString(cipherText); 
    } 
    /** 
     * 16进制加密 
     * 
     * @param password 
     * @return 
     */ 
    public static String encrytHex(String password) { 
       Preconditions.checkArgument(!Strings.isNullOrEmpty(password), "不能为空"); 
        byte[] bytes = password.getBytes(); 
        return Hex.encodeToString(bytes); 
    } 
    /** 
     * 16进制解密 
     * @param cipherText 
     * @return 
     */ 
    public static String decryptHex(String cipherText) { 
       Preconditions.checkArgument(!Strings.isNullOrEmpty(cipherText), "消息摘要不能为空"); 
        return new String(Hex.decode(cipherText)); 
    } 
    public static String generateKey() 
    { 
        AesCipherService aesCipherService=new AesCipherService(); 
        Key key=aesCipherService.generateNewKey(); 
        return Base64.encodeToString(key.getEncoded()); 
    } 
    /** 
     * 对密码进行md5加密
     * @param username 用户名 
     * @param password 密码 
     * @return 密文 
     */
    public static String md5Password(String username,String password){ 
       Preconditions.checkArgument(!Strings.isNullOrEmpty(username),"username不能为空"); 
       Preconditions.checkArgument(!Strings.isNullOrEmpty(password),"password不能为空"); 
    	//SecureRandomNumberGenerator secureRandomNumberGenerator=new SecureRandomNumberGenerator(); 
        //String salt= secureRandomNumberGenerator.nextBytes().toHex();
    	String salt=",.,sdf,.s,f.sdf,.sd,fwe.,df.as";
        //组合username,两次迭代，对密码进行加密 
        String password_cipherText= new Md5Hash(password,username+salt,2).toBase64(); 
        return password_cipherText; 
    }
    
    public static String md5Password2(String username,String password){ 
        Preconditions.checkArgument(!Strings.isNullOrEmpty(username),"username不能为空"); 
        Preconditions.checkArgument(!Strings.isNullOrEmpty(password),"password不能为空"); 
     	//SecureRandomNumberGenerator secureRandomNumberGenerator=new SecureRandomNumberGenerator(); 
         //String salt= secureRandomNumberGenerator.nextBytes().toHex();
         //组合username,两次迭代，对密码进行加密 
         String password_cipherText= new Md5Hash(password,username).toBase64(); 
         return password_cipherText; 
     }
    	
    //验证密码是否正确
    public  static boolean authenticatePassword(String pass ,String userName, String inputstr)
    {
        if(pass.equals((md5Password(userName,inputstr))))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    public static void main(String[] args) { 
        String password = "admin"; 
        String cipherText = encrytHex(password); 
        System.out.println(password + "hex加密之后的密文是：" + cipherText); 
        String decrptPassword=decryptHex(cipherText); 
        System.out.println(cipherText + "hex解密之后的密码是：" + decrptPassword); 
        String cipherText_base64 = encrytBase64(password); 
        System.out.println(password + "base64加密之后的密文是：" + cipherText_base64); 
        String decrptPassword_base64=decryptBase64(cipherText_base64); 
        System.out.println(cipherText_base64 + "base64解密之后的密码是：" + decrptPassword_base64); 
        String h64=  H64.encodeToString(password.getBytes()); 
        System.out.println(h64); 
        String salt="7road"; 
        String cipherText_md5= new Md5Hash(password,salt,4).toHex(); 
        System.out.println(password+"通过md5加密之后的密文是："+cipherText_md5); 
        System.out.println(generateKey()); 
        System.out.println("=========================================================="); 
        AesCipherService aesCipherService=new AesCipherService(); 
        aesCipherService.setKeySize(128); 
        Key key=aesCipherService.generateNewKey(); 
        String aes_cipherText= aesCipherService.encrypt(password.getBytes(),key.getEncoded()).toHex(); 
        System.out.println(password+" aes加密的密文是："+aes_cipherText); 
        String aes_mingwen=new String(aesCipherService.decrypt(Hex.decode(aes_cipherText),key.getEncoded()).getBytes()); 
        System.out.println(aes_cipherText+" aes解密的明文是："+aes_mingwen);
        
        
        System.out.println("md5 nicaicai "+md5Password("cookabuy@163.com", "nicaicaia3+"));
        handlerStoreData(264,150,229);
        
    } 
    
    
    public static void handlerStoreData(int userId,int storeId,int accounId){
        try {
        		String sourcePath = "E:/source.txt";
        		String targetPath = "E:/target.sql";
                String encoding="UTF8";
                File file=new File(sourcePath);
                if(file.isFile() && file.exists()){ //判断文件是否存在
                    InputStreamReader read = new InputStreamReader(
                    new FileInputStream(file),encoding);//考虑到编码格式
                    BufferedReader bufferedReader = new BufferedReader(read);
                    String lineTxt = null;
                    int userIdBegin = userId;
                	int storeIdBegin = storeId;
                	int accounIdBegin = accounId;
                    while((lineTxt = bufferedReader.readLine()) != null){
                        String line[] = lineTxt.split("\\s+");
                        try{
                            FileOutputStream out=new FileOutputStream("D:/test.txt");
                            PrintStream p=new PrintStream(out);
                            String user = "",financialAccount="",accountBalance="",billBalance="",store="",storeProfile="",scope="",userRole="";
                            //user = user.concat("INSERT INTO `ck_users`(`user_id`,`phone`,`password`) VALUES ("+userIdBegin+",'"+line[0].trim()+"',"+"'"+md5Password(line[0].trim(),line[1].trim())+"'"+");");    
                            //加密方法已改
                            System.out.println(user);
                            financialAccount = financialAccount.concat("INSERT INTO `ck_financial_account`(`account_id`,`user_id`,`pay_password`) VALUES ("+accounIdBegin+","+userIdBegin+",'"+new Md5Hash(line[1].trim()+userIdBegin+line[1].trim())+"');");
                            System.out.println(financialAccount);
                            accountBalance = accountBalance.concat("INSERT INTO `ck_account_balance`(`account_id`) VALUES ("+accounIdBegin+");");
                            System.out.println(accountBalance);
                            billBalance = billBalance.concat("INSERT INTO `ck_bill_balance`(`account_id`) VALUES ("+accounIdBegin+");");
                            System.out.println(billBalance);
                            store=store.concat("INSERT INTO `ck_stores`(`store_id`,`store_serial_num`,`contract_num`,`user_id`,`store`) VALUES ("+storeIdBegin+","+NumberUtil.generateSerialNum()+",'"+line[2].trim()+"',"+userIdBegin+","+"'"+line[3].trim()+"'"+");");
                            System.out.println(store);
                            storeProfile=storeProfile.concat("INSERT INTO `ck_store_profiles`(`store_id`,`shopkeeper`,`phone`) VALUES ("+storeIdBegin+","+"'"+line[5].trim()+"'"+",'"+line[0].trim()+"');");
                            System.out.println(storeProfile);
                            userRole=userRole.concat("INSERT INTO `ck_user_role_link`(`user_id`,`role_id`) VALUES ("+userIdBegin+","+3+");");
                            System.out.println(userRole);
                            String[] category = line[4].trim().split(",");
                            for(int i =0;i<category.length;i++){
                            	scope="";
                            	scope=scope.concat("INSERT INTO `ck_business_scope`(`store_id`,`category_id`) VALUES ("+storeIdBegin+","+category[i]+");");
                            	System.out.println(scope);
                            }
                            //p.println();
                        } catch (FileNotFoundException e){
                            e.printStackTrace();
                        }
                        userIdBegin++;
                        storeIdBegin++;
                        accounIdBegin++;
                    }
                    read.close();
        }else{
            System.out.println("找不到指定的文件");
        }
        } catch (Exception e) {
            System.out.println("读取文件内容出错");
            e.printStackTrace();
        }
     
    }
}