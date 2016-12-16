import org.apache.log4j.Logger;
import org.junit.Test;

import com.duobao.QRCode.util.MyQRCode;
import com.duobao.userAgent.util.UserAgentUtils;

public class UserAgentTest {
private static final Logger logger = Logger.getLogger(QRCodeTest.class);
	
	@Test
	public void myUserAgentTest(){
		System.out.println(UserAgentUtils.getBrowserInfo("Mozilla/5.0 (Linux; U; Android 4.4.4; zh-cn; MX4 Pro Build/KTU84P) AppleWebKit/533.1 (KHTML, like Gecko)Version/4.0 MQQBrowser/5.4 TBS/025489 Mobile Safari/533.1 MicroMessenger/6.3.15.49_r8aff805.760 NetType/WIFI Language/zh_CN"));
	}
}
