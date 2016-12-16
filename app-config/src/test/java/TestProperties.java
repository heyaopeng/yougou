import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;
import java.util.Set;
import java.util.TreeSet;

import org.apache.commons.configuration.AbstractFileConfiguration;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.junit.Test;

import com.duobao.fundation.config.links.OrderConstant;


public class TestProperties {
	@Test
	public void TESTFASTDFSCLIENTCONFIGSTRING() throws ConfigurationException  {
		Configuration configuration = new PropertiesConfiguration();
		((AbstractFileConfiguration) configuration).setEncoding("utf8");
		((AbstractFileConfiguration) configuration).load("test/messages_vi_VN.properties");
		
		Iterator<String> keys = configuration.getKeys();
		List<String> keyList = new ArrayList<String>();
		    while(keys.hasNext()){
		    keyList.add(keys.next());
		}
		for(String tmp:keyList){
			List<Object>objs=configuration.getList(tmp);
			Set<String>vis=new TreeSet<String>();
			int flag=0;
			for(Object obj:objs){
				vis.add((String)obj);
			}
			for(String s:vis){
				try {
					String result = new String(s.getBytes(),"UTF-8");
					System.out.println(tmp+" = "+result);
					flag++;
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(flag>1)
				System.out.println();
		}
	}
	@Test
	public void getStatusNameByStatus() {
		byte status=1;
		ResourceBundle re = ResourceBundle.getBundle("test/messages", Locale.getDefault(),this.getClass().getClassLoader());
		String ret=null;
		switch (status) {
			case OrderConstant.AWAITING_PAYMENT : ret=re.getString("awaiting_payment");break;
			case OrderConstant.TRADE_SUCCESS : ret =re.getString("trade_success");break;
		}
		System.out.println(ret);
	}	
}
