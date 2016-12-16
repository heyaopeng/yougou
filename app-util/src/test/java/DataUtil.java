import java.util.Date;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.duobao.date.util.DateUtils;

public class DataUtil extends AbstractServiceTests{
	
	
	@Test
	public void testDate(){
		String dateStr = "2016-10-14 10:25:29";
		Date date = DateUtils.parse(dateStr, DateUtils.FORMAT_LONG);
		String timeStr = DateUtils.format(date, DateUtils.FORMAT_TIME);
		timeStr = timeStr.replaceAll(":", "");
		timeStr = timeStr + "219";
		System.out.println(timeStr);
		Long timeNumber = new Long(timeStr);
		System.out.println(timeNumber);
	}
	
}
