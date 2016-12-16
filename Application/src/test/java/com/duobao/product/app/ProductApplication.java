package com.duobao.product.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

//import com.duobao.product.conf.CxfConfig;

@Configuration
@SpringBootApplication
@ComponentScan
/*@EnableAutoConfiguration(exclude = { org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration.class,
		ServerPropertiesAutoConfiguration.class })*/
@EnableAsync
// @EnableCaching
// @MapperScan("com.duobao.fundation.data.mybatis.mapping")
public class ProductApplication {
	public static void main(String[] args) {
		SpringApplication
				.run(new Object[] { "classpath*:web/config/viewResolver.xml", "classpath*:app/config/properties.xml",
						"classpath*:app/dao/mybatis-dao.xml", "classpath*:app/dao/mysql-data-source.xml",
						"classpath*:app/dao/spring-mybatis.xml", "classpath*:app/dao/spring-context.xml",
						"classpath*:app/config/spring-*.xml", ProductApplication.class
				// CxfConfig.class
		}, args);

	}

	// @Bean(name = "springCM")
	// public CacheManager myCacheManager() {
	// return new EhCacheCacheManager(ehCacheCacheManager().getObject());
	// }
	//
	// @Bean
	// public EhCacheManagerFactoryBean ehCacheCacheManager() {
	// EhCacheManagerFactoryBean cmfb = new EhCacheManagerFactoryBean();
	// cmfb.setConfigLocation(new ClassPathResource("ehcache.xml"));
	// cmfb.setShared(true);
	//
	// return cmfb;
	// }
}