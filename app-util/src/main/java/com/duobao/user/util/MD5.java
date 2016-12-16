package com.duobao.user.util;
import java.security.MessageDigest;
/**
 *
 * @author 雁过留声
 */

public class MD5 {
    //16进制下数字到字符的映射数组
    private  String[] hexDigits = new String[]{"0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"};

    //将inputstr加密
    public  String encryptByMD(String inputstr)
    {
        return encodeByMD5(inputstr);
    }
    
   
    //验证密码是否正确
    public  boolean authenticatePassword(String pass , String inputstr)
    {
        if(pass.equals((encodeByMD5(inputstr))))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    //对字符串进行MD5编码
    private  String encodeByMD5(String originstr)
    {
        if(originstr !=null)
        {
            try{
                //创建具有指定算法名称的信息摘要
                MessageDigest md = MessageDigest.getInstance("MD5");
                //使用指定的字节数组对摘要进行最后的更新，然后完成摘要计算
                byte[] results = md.digest(originstr.getBytes());
                //将得到的字节数组编程字符窜返回
                String resultString = byteArrayToHexString(results);
                //return resultString.toUpperCase();
                return resultString;
            }catch(Exception ex){
                ex.printStackTrace();
            }
        }
        return null;
    }
    //转换字节数组为十六进制字符串
    private  String byteArrayToHexString(byte[] b)
    {
        StringBuffer resultsb = new StringBuffer();
        int i=0;
        for(i=0;i<b.length;i++)
        {
            resultsb.append(byteToHexString(b[i]));
        }
        return resultsb.toString();
    }
    //将字节转化成十六进制的字符串
    private  String byteToHexString(byte b)
    {
        int n=b;
        if(n<0)
        {
            n = 256 + n;
        }
        int d1 = n / 16;
        int d2 = n /16;
        return hexDigits[d1]+hexDigits[d2];
    }

    public  static void main(String[] args)
    {
    	MD5 MD5 = new MD5();
        String password = MD5.encryptByMD("nicaicai");
        System.out.println("对nicaicai用MD5加密后："+password);
        String inputstr = "1234";
        System.out.println("1234与密码相同？"+MD5.authenticatePassword(password, inputstr));
        inputstr = "123456";
        System.out.println("123456与密码相同？"+MD5.authenticatePassword(password, inputstr));
    }
}