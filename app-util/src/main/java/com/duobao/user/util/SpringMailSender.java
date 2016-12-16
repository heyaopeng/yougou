package com.duobao.user.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.VelocityException;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.ui.velocity.VelocityEngineFactoryBean;
import org.springframework.ui.velocity.VelocityEngineUtils;

public class SpringMailSender {
	// Spring的邮件工具类，实现了MailSender和JavaMailSender接口
    private  JavaMailSenderImpl mailSender;
    private  VelocityEngine velocityEngine;
     
    public  SpringMailSender() {
	    mailSender = new JavaMailSenderImpl();
	    String userName = "cookabuy@163.com";
		String password = "nicaicai";
		mailSender.setHost("smtp.163.com");
		mailSender.setUsername(userName);
		mailSender.setPassword(password);
    }
    
    
	public  void test_sendWithVelocity() throws MessagingException, VelocityException, IOException{
		 // Velocity的参数，通过VelocityEngineFactoryBean创建VelocityEngine，也是推荐在配置文件中配置的
	    Properties props = System.getProperties();
	    props.put("resource.loader", "class");
	    props.put("class.resource.loader.class","org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
	    VelocityEngineFactoryBean v = new VelocityEngineFactoryBean();
	    v.setVelocityProperties(props);
	    velocityEngine = v.createVelocityEngine();
	   
	    
	    Map<String, Object> model = new HashMap<String, Object>();
	    model.put("user", "MZULE");
	    model.put("content", "Thank you for signing up in our site. <br>Please click the link below to activate you account.");
	    model.put("logo", "src='cid:file'");
	    // Spring提供的VelocityEngineUtils将模板进行数据填充，并转换成普通的String对象
	    String emailText = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, "index.vm","UTF-8", model);
	    
	    // 和上面一样的发送邮件的工作
	    MimeMessage msg = mailSender.createMimeMessage();
	    
	    MimeMessageHelper helper = new MimeMessageHelper(msg, true, "utf-8");
	    helper.setFrom(mailSender.getUsername());
	    //helper.setTo("631663525@qq.com");
	   //helper.setTo("liaoming.lxm@outlook.com");
	    helper.setTo("usedlittlee@icloud.com");
	    helper.setSubject("Rich content mail");
	    helper.setText(emailText, true);
	    mailSender.send(msg);
	}
	

	/**发送富文本邮件
	 * @throws MessagingException
	 */
	public void richContentSend() throws MessagingException {
	    MimeMessage msg = mailSender.createMimeMessage();
	 
	    MimeMessageHelper helper = new MimeMessageHelper(msg, true, "utf-8");
	    helper.setFrom(mailSender.getUsername());
	    
	  //  helper.setTo("liaoming.lxm@outlook.com");
//	    helper.setTo("631663525@qq.com");
	    helper.setTo("usedlittlee@icloud.com");
	    helper.setSubject("Rich content mail");
	    //第二个参数true，表示text的内容为html，然后注意<img/>标签，src='cid:file'，'cid'是contentId的缩写，'file'是一个标记，需要在后面的代码中调用MimeMessageHelper的addInline方法替代成文件
	    helper.setText("<body><p>Hello Html Email</p><img src='cid:file'/></body>", true); 
	 
	  FileSystemResource file = new FileSystemResource("C:\\Users\\Ming\\Pictures\\lovewallpaper\\268224-106.JPG");
	    //File file = FileUtil.convertToFile(result);
	    helper.addInline("file", file);
	 
	    mailSender.send(msg);
	}
	
	public static void main(String[] agrs) throws VelocityException, MessagingException, IOException {
		//new SpringMailSender().richContentSend();
		new SpringMailSender().test_sendWithVelocity();
	}
}
