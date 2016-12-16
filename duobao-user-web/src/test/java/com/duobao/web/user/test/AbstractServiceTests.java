package com.duobao.web.user.test;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:app/config/properties.xml", "classpath*:app/dao/mysql-data-source.xml",
		"classpath*:app/dao/spring-mybatis.xml", "classpath*:app/dao/spring-context.xml" })
public abstract class AbstractServiceTests extends AbstractJUnit4SpringContextTests {
}
