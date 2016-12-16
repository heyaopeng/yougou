package com.duobao.web.session.redis;

import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;



@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 60 * 60)
public class HttpSessionConfig { }
