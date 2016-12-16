package com.duobao.web;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@Configuration
@SpringBootApplication
@ComponentScan
@EnableAutoConfiguration
@EnableCaching
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(new Object[] {
				"classpath*:web/config/viewResolver.xml",
				"classpath*:app/config/properties.xml",
				"classpath*:app/dao/mybatis-dao.xml",
				"classpath*:app/dao/mysql-data-source.xml",
				"classpath*:app/dao/spring-mybatis.xml",
				"classpath*:app/dao/spring-context.xml",
				"classpath*:app/config/spring-*.xml",
				"classpath*:/app/config/spring-session-redis.xml",
				"classpath*:/user/captcha.xml",
				Application.class
			}, args);
	}	
	@Bean(name = "springCM")
	public CacheManager myCacheManager() {
		return new EhCacheCacheManager(ehCacheCacheManager().getObject());
	}

	@Bean
	public EhCacheManagerFactoryBean ehCacheCacheManager() {
		EhCacheManagerFactoryBean cmfb = new EhCacheManagerFactoryBean();
		cmfb.setConfigLocation(new ClassPathResource("ehcache.xml"));
		cmfb.setShared(true);
		
		return cmfb;
	}
}