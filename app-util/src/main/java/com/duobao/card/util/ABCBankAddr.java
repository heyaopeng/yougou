package com.duobao.card.util;

public class ABCBankAddr {
	static String[] bankBin = { "008", "009", "010", "011", "012", "013",  
            "060", "061", "062", "113", "114", "115", "116", "117", "118",  
            "139", "140", "141", "142", "143", "145", "146", "350", "086","289"};  
    static String[] bankName = { "广州市", "佛山市", "中山市", "珠海市", "深圳市", "汕头市", "东莞市",  
            "江门市", "湛江市", "惠州市", "清远市", "肇庆市", "阳江市", "茂名市", "潮州市", "揭阳市",  
            "河源市", "汕尾市", "梅州市", "韶关市", "顺德区", "南海区", "云浮市", "云南省昆明市" , "楚雄彝族自治州"};  
      
    public static String getAddrOfBank(String charBin) {  
  
        int index=binarySearch(bankBin, charBin);  
        if (index == -1 ||  index>bankName.length) {  
            return "没有记录的卡号:\n";  
        }  
        return bankName[index] + "\n";  
  
    }  
  
    // 查找方法  
    public static int binarySearch(String[] srcArray, String des) {  
        int low = 0;  
        int high = srcArray.length;  
        while (low < high) {  
              
            if (des.startsWith(srcArray[low])) {  
                return low;  
            }  
            low++;  
        }  
        return -1;  
    }  
}
