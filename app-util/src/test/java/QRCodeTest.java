import java.io.File;

import org.apache.log4j.Logger;
import org.junit.Test;

import com.duobao.QRCode.util.MyQRCode;
import com.duobao.file.util.ImageUtils;


public class QRCodeTest{
	private static final Logger logger = Logger.getLogger(QRCodeTest.class);
	String data[]={
			"灏丰      | 417B                       | 布依坊                                           | 14646809502164722",
			"新潮都    | 5016                       | 衣万利网络批发                                   | 14646810205669568"
	};
	@Test
	public void myQRCode(){
		for(String s:data){
			String ss[]=s.split("\\|");
/*			for(int i=0;i<ss.length;i++){
				System.out.println(ss[i].trim());
			}*/
			System.out.println("http://m.cookabuy.com/fastpay/"+ss[3].trim());
			File file=MyQRCode.generateQRCode(600, 600, "http://m.cookabuy.com/fastpay/"+ss[3].trim());
			String name=ss[0].trim()+"-"+ss[1].trim()+ss[2].trim();
			name=name.replace(" ", "");
			//ImageUtils.addTextToImage(file, "", name);
			ImageUtils.cutImage(file, name);
/*			select A.market,A.stalls,B.store,B.store_serial_num from ck_store_profiles as A left join ck_stores as B on A.store_id=B.store_id;*/
		}
		//MyQRCode.generateQRCodeIMG(500,500,"http://cm.cookabuy.com/fastpay/14609481263245195");
	}
	@Test
	public void myQRCode2(){
			MyQRCode.generateQRCodeIMG(600,600,"Sa146AB78800339709794");
	}
}
