package com.duobao.user.util;
import org.jasypt.util.text.BasicTextEncryptor;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
public class ConfigEncryptUtils {  
   /* public static void main(String[] args){  
        //加密工具  
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();  
        //加密配置  
        EnvironmentStringPBEConfig config = new EnvironmentStringPBEConfig();  
        config.setAlgorithm("PBEWithMD5AndDES");  
        //自己在用的时候更改此密码  
        config.setPassword("password");  
        //应用配置  
        encryptor.setConfig(config);  
       
      
        String plaintext=encryptor.decrypt("nicaicai");  
        System.out.println(  plaintext);  
    } */
	
	public static void main(String[] args) {  
        //PBEWithMD5AndDES  
        BasicTextEncryptor encryptor = new BasicTextEncryptor();  
        encryptor.setPassword("password");  
        String encrypted = encryptor.encrypt("nicaicai");  
        System.out.println(encrypted);
		
		
		/*StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();  
        //加密配置  
        EnvironmentStringPBEConfig config = new EnvironmentStringPBEConfig();  
        config.setAlgorithm("PBEWithMD5AndDES");  
        //自己在用的时候更改此密码  
        config.setPassword("password");  
        //应用配置  
        encryptor.setConfig(config);  
       
        String plaintext=encryptor.decrypt("nicaicai");  
        System.out.println(  plaintext); */
        PropertyPlaceholderConfigurer a = new PropertyPlaceholderConfigurer();
    }  
} 