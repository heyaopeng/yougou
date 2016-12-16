package com.duobao.model;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Enumeration;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.log4j.Logger;
import org.apache.velocity.tools.config.DefaultKey;
import org.apache.velocity.tools.config.ValidScope;
import com.alibaba.fastjson.JSON;
import com.duobao.fundation.config.links.Language;

@DefaultKey(value = "cookies")
@ValidScope(value = "request")
public class CookieVelocity {
	private static final Logger logger = Logger.getLogger(CookieVelocity.class);

	public String getLanguageCookie(HttpServletRequest request) {
		if (request.getCookies() == null) {
			return "zh_CN";
		}
		String lang = request.getParameter("lang");
		//logger.info("lang :" + JSON.toJSONString(lang));
		if (null != lang) {
			for (String language : Language.LANG_ARRAY) {
				if (lang.equals(language)) {
					return lang;
				}
			}
		}
		Cookie[] cookies = request.getCookies();
		logger.info("cookie"+JSON.toJSONString(cookies));
		
		for(Cookie cookie : cookies){
			//logger.info(JSON.toJSONString(cookie));
			if(cookie.getName().equals("language")&&!cookie.getValue().isEmpty()){
				return cookie.getValue();
			}
		}
		return "zh_CN";
	}

	public String getFixLengthByLang(HttpServletRequest request, BigDecimal money) {
		/*Cookie[] cookies = request.getCookies();
		logger.info(JSON.toJSONString(cookies));
		Configuration config;
		try {
			config = new PropertiesConfiguration("langFixLength.properties");
			for (Cookie cookie : cookies) {
				logger.info(JSON.toJSONString(cookie));
				if (cookie.getName().equals("language") && !cookie.getValue().isEmpty()) {
					Integer t = config.getInteger(cookie.getValue(), 2);
					String format = "%." + t + "f";
					return String.format(format, money);
				}
			}
		} catch (ConfigurationException e) {
			e.printStackTrace();
		}
		String format = "%." + 2 + "f";
		return String.format(format, money);*/
		DecimalFormat myformat=new DecimalFormat("0.00");
		return new BigDecimal(myformat.format(money)).toString();
	}

	public String getFixLengthByLang(BigDecimal money) {
		/*money = money.divide(new BigDecimal(1000));
		String format = "%." + 0 + "f";
		return String.format(format, money) + ".00";*/
		DecimalFormat myformat=new DecimalFormat("0.00");
		return new BigDecimal(myformat.format(money)).toString();
	}

	public String getFixLengthByLangOld(BigDecimal money) {
		/*Configuration config;
		try {
			config = new PropertiesConfiguration("langFixLength.properties");
			Integer t = config.getInteger("current", 2);
			String format = "%." + t + "f";
			return String.format(format, money);
		} catch (ConfigurationException e) {
			e.printStackTrace();
		}
		String format = "%." + 2 + "f";
		return String.format(format, money);*/
		DecimalFormat myformat=new DecimalFormat("0.00");
		return new BigDecimal(myformat.format(money)).toString();
	}

	public String getFixLengthByLangZhCN(BigDecimal money) {
		/*String format = "%." + 2 + "f";
		return String.format(format, money);*/
		DecimalFormat myformat=new DecimalFormat("0.00");
		return new BigDecimal(myformat.format(money)).toString();
	}
}
