import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.security.Key;

import org.apache.shiro.codec.H64;
import org.apache.shiro.codec.Hex;
import org.apache.shiro.crypto.AesCipherService;
import org.apache.shiro.crypto.hash.Md5Hash;

import com.duobao.number.util.NumberUtil;

public class DataCreate {
	  public static void main(String[] args) { 
		  handlerCategoryData();
	    } 
	public static void handlerCategoryData(){
        try {
        		String sourcePath = "D:/sourceCategory.txt";
        		String targetPath = "D:/target.sql";
                String encoding="UTF8";
                File file=new File(sourcePath);
                if(file.isFile() && file.exists()){ //判断文件是否存在
                    InputStreamReader read = new InputStreamReader(
                    new FileInputStream(file),encoding);//考虑到编码格式
                    BufferedReader bufferedReader = new BufferedReader(read);
                    String lineTxt = null;
                    while((lineTxt = bufferedReader.readLine()) != null){
                        String text = "";
						text = text.concat("insert into `ck_specification_values` (`lang`,`value_id`,`specification_id`,`value`) values ('zh_CN','"+lineTxt+"');");
						System.out.println(text);
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
