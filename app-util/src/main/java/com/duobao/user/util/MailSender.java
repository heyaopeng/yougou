package com.duobao.user.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.VelocityException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.ui.velocity.VelocityEngineFactoryBean;
import org.springframework.ui.velocity.VelocityEngineUtils;

import com.sun.mail.smtp.SMTPAddressFailedException;


public class MailSender {
	/** 日志 **/
	private static final Logger log = Logger.getLogger(MailSender.class);

	private JavaMailSenderImpl mailSender;
	private VelocityEngine velocityEngine;
	private final static String configFile = "Util.properties";
	public MailSender() {
		String username = "";
		String password = "";
		String smtp = "";
		
		mailSender = new JavaMailSenderImpl();
		Properties prop =  new  Properties();    
        InputStream in = MailSender.class.getClassLoader().getResourceAsStream(configFile);    
         try  {    
            prop.load(in);    
            username = prop.getProperty( "mailname" ).trim();  
            password = prop.getProperty( "mailpass" ).trim(); 
            smtp = prop.getProperty( "smtp" ).trim(); 
            //log.info("username:" + username + "and password:" + password );
        }  catch  (IOException e) {    
            e.printStackTrace();    
        }
		mailSender.setHost(smtp);
		mailSender.setUsername(username);
		mailSender.setPassword(password);
	}

	public String sendVelocityEmail(String receiverEmail, String content,
			String type) {
		Properties props = System.getProperties();
		props.put("resource.loader", "class");
		props.put("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
		VelocityEngineFactoryBean v = new VelocityEngineFactoryBean();
		
		v.setVelocityProperties(props);
		try {
			velocityEngine = v.createVelocityEngine();
		} catch (VelocityException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Map<String, Object> model = new HashMap<String, Object>();
		model.put("content", content);

		if (type.equals("ACTIVE_ACCOUNT")) {
			model.put("type", "active_account");
			model.put("link", content);
		} else if (type.equals("RESET_PASSWORD")) {
			model.put("type", "reset_password");
			model.put("link", content);
		} else if (type.equals("RANDOM_NUM")) {
			model.put("type", "random_num");
			model.put("num", content);
		}

		// Spring	提供的VelocityEngineUtils将模板进行数据填充，并转换成普通的String对象
		String emailText = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, "templates/index.vm", "UTF-8", model);
		MimeMessage msg = mailSender.createMimeMessage();
		MimeMessageHelper helper;
		try {
			helper = new MimeMessageHelper(msg, true, "utf-8");
			helper.setFrom(mailSender.getUsername());

			helper.setTo(receiverEmail);
			helper.setSubject("Cooka Official E-Mail");
			helper.setText(emailText, true);
			mailSender.send(msg);
		} catch(MailSendException a){
			log.info("系统无法识别的邮箱"+receiverEmail);
			return "fail";
		}catch ( MessagingException e  ) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return "success";
	}


	public static void main(String[] agrs) {
		// 注意测试需要修改您自己的邮件服务商host,登陆邮件用户,邮件密码,附件,收信人地址
		String content = "3333";
		//new MailSender().sendVelocityEmail("631663525@qq.com", content,"ACTIVE_ACCOUNT");
		//new MailSender().sendVelocityEmail("631663525@qq.com", content,"RANDOM_NUM");
		new MailSender().sendVelocityEmail("631663525@qq.com", content,"RESET_PASSWORD");
	}
}