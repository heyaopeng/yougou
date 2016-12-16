package com.duobao.web.session.redis;

import java.util.Set;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class TestJedis {

	public static void main(String[] args) {
		JedisPool pool = new JedisPool(new JedisPoolConfig(), "119.28.11.157");
		Jedis jedis = null;
		try {
		  jedis = pool.getResource();
		  /// ... do stuff here ... for example
		  jedis.set("foo", "barasa");
		  String foobar = jedis.get("foo");
		  System.out.println(foobar);
		  jedis.zadd("sose", 0, "car"); jedis.zadd("sose", 0, "bike"); 
		  Set<String> sose = jedis.zrange("sose", 0, -1);
		} finally {
		  if (jedis != null) {
		    jedis.close();
		  }
		}
		/// ... when closing your application:
		pool.destroy();
	}

}
