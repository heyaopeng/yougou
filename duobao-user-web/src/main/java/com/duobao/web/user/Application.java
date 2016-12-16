package com.duobao.web.user;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;


@Configuration
@SpringBootApplication
@ComponentScan
@EnableAutoConfiguration

public class Application {
	public static void main(String[] args) {
		SpringApplication.run(new String[] {
				"classpath*:web/config/viewResolver.xml",
				"classpath*:app/config/properties.xml",
				"classpath*:app/dao/mybatis-dao.xml",
				"classpath*:app/dao/mysql-data-source.xml",
				"classpath*:app/dao/spring-mybatis.xml",
				"classpath*:app/dao/spring-context.xml",
				"classpath*:app/config/spring-*.xml",
				"classpath*:/app/config/spring-session-redis.xml",
				"classpath:/user/captcha.xml",
				"classpath*:/user/user-service.xml",
				"classpath:/user/finance-conterxt.xml"
			}, args);
	}		
}
		