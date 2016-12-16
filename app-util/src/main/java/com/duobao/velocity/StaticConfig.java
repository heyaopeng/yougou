package com.duobao.velocity;

import org.apache.velocity.tools.Scope;
import org.apache.velocity.tools.config.DefaultKey;
import org.apache.velocity.tools.config.ValidScope;

@DefaultKey("staticConfig")
@ValidScope(Scope.APPLICATION)
public class StaticConfig {
	private static final String path = "//localhost";

	public static String getPath() {
		return path;
	}
}
