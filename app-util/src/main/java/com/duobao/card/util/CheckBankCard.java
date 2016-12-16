package com.duobao.card.util;

public class CheckBankCard {
	   /*
    当你输入信用卡号码的时候，有没有担心输错了而造成损失呢？其实可以不必这么担心，
    因为并不是一个随便的信用卡号码都是合法的，它必须通过Luhn算法来验证通过。
    该校验的过程：
    1、从卡号最后一位数字开始，逆向将奇数位(1、3、5等等)相加。
    2、从卡号最后一位数字开始，逆向将偶数位数字，先乘以2（如果乘积为两位数，则将其减去9），再求和。
    3、将奇数位总和加上偶数位总和，结果应该可以被10整除。
    例如，卡号是：5432123456788881
    则奇数、偶数位（用红色标出）分布：5432123456788881
    奇数位和=35
    偶数位乘以2（有些要减去9）的结果：1 6 2 6 1 5 7 7，求和=35。
    最后35+35=70 可以被10整除，认定校验通过。
    请编写一个程序，从键盘输入卡号，然后判断是否校验通过。通过显示：“成功”，否则显示“失败”。
    比如，用户输入：356827027232780
    程序输出：成功
    */ 
	
	/**
    * 校验银行卡卡号
    * @param cardId
    * @return
    */
   public static boolean checkBankCard(String cardId) {
            char bit = getBankCardCheckCode(cardId.substring(0, cardId.length() - 1));
            if(bit == 'N'){
                return false;
            }
            return cardId.charAt(cardId.length() - 1) == bit;
   }
  
   /**
    * 从不含校验位的银行卡卡号采用 Luhm 校验算法获得校验位
    * @param nonCheckCodeCardId
    * @return
    */
   public static char getBankCardCheckCode(String nonCheckCodeCardId){
       if(nonCheckCodeCardId == null || nonCheckCodeCardId.trim().length() == 0
               || !nonCheckCodeCardId.matches("\\d+")) {
           //如果传的不是数据返回N
           return 'N';
       }
       char[] chs = nonCheckCodeCardId.trim().toCharArray();
       int luhmSum = 0;
       for(int i = chs.length - 1, j = 0; i >= 0; i--, j++) {
           int k = chs[i] - '0';
           if(j % 2 == 0) {
               k *= 2;
               k = k / 10 + k % 10;
           }
           luhmSum += k;           
       }
       return (luhmSum % 10 == 0) ? '0' : (char)((10 - luhmSum % 10) + '0');
   }
}
