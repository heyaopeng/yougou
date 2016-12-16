import static org.bytedeco.javacpp.opencv_core.copyMakeBorder;
import static org.bytedeco.javacpp.opencv_core.cvReleaseImage;
import static org.bytedeco.javacpp.opencv_core.BORDER_CONSTANT;
import static org.bytedeco.javacpp.opencv_imgcodecs.cvLoadImage;
import static org.bytedeco.javacpp.opencv_imgcodecs.cvSaveImage;
import static org.bytedeco.javacpp.opencv_imgcodecs.imread;
import static org.bytedeco.javacpp.opencv_imgcodecs.imwrite;
import static org.bytedeco.javacpp.opencv_imgproc.INTER_LINEAR;
import static org.bytedeco.javacpp.opencv_imgproc.cvResize;
import static org.bytedeco.javacpp.opencv_imgproc.resize;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.net.URL;

import org.apache.log4j.Logger;
import org.bytedeco.javacpp.opencv_core.IplImage;
import org.bytedeco.javacpp.opencv_core.Mat;
import org.bytedeco.javacpp.opencv_core.Scalar;
import org.bytedeco.javacpp.opencv_core.Size;
import org.junit.Test;

import com.duobao.card.util.ABCBankAddr;
import com.duobao.card.util.BankCardBin;
import com.duobao.card.util.CheckBankCard;
import com.duobao.file.util.FileUtil;
import com.duobao.file.util.ImageUtils;


public class CardUtilTest extends AbstractServiceTests{
	
	@Test
	public void testCard(){
		String cardNumber = "622";// 卡号
		cardNumber = cardNumber.replaceAll(" ", "");
		
		//位数校验
		if (cardNumber.length() == 16 || cardNumber.length() == 19) {

		} else {
			System.out.println("卡号位数无效");
			return;
		}
		
		//校验
		if (CheckBankCard.checkBankCard(cardNumber) == true) {

		} else {
			System.out.println("卡号校验失败");
			return;
		}

		//判断是不是银联，老的卡号都是服务电话开头，比如农行是95599
		// http://cn.unionpay.com/cardCommend/gyylbzk/gaishu/file_6330036.html
		if (cardNumber.startsWith("62")) {
			System.out.println("中国银联卡");
		} else {

			System.out.println("国外的卡，或者旧银行卡，暂时没有收录");
			return;
		}

		String name = BankCardBin.getNameOfBank(cardNumber.substring(0, 6), 0);// 获取银行卡的信息
		System.out.println(name);
		
		//归属地每个银行不一样，这里只收录农行少数地区代码
		if (name.startsWith("农业银行") == true) {
			if (cardNumber.length() == 19) {
				//4大银行的16位是信用卡
				//注意：信用卡没有开户地之说，归总行信用卡部。唯独中国银行的长城信用卡有我的地盘这个属性
				name = ABCBankAddr.getAddrOfBank(cardNumber.substring(6, 10));
				System.out.println("开户地:" + name);
			}
		}
	}
}
