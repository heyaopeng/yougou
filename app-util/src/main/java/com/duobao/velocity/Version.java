package com.duobao.velocity;

import org.apache.velocity.tools.Scope;
import org.apache.velocity.tools.config.DefaultKey;
import org.apache.velocity.tools.config.ValidScope;

@DefaultKey("version")
@ValidScope(Scope.APPLICATION)
public class Version {
	private static final long num = System.currentTimeMillis();

	public static long getNum() {
		return num;
	}
}
