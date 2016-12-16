package com.duobao.filter.service;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.alibaba.fastjson.JSON;

public class TokenInterceptor extends HandlerInterceptorAdapter {
	private static final Logger logger = Logger.getLogger(TokenInterceptor.class);

	@SuppressWarnings("unchecked")
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		if (handler instanceof HandlerMethod) {
			HandlerMethod handlerMethod = (HandlerMethod) handler;
			Method method = handlerMethod.getMethod();
			Token annotation = method.getAnnotation(Token.class);

			if (annotation != null) {
				boolean needSaveSession = annotation.save();
				if (needSaveSession) {
					String newToken = UUID.randomUUID().toString();
					List<String> oldTokens = (List<String>) request.getSession(false).getAttribute("tokens");
					logger.info("oldTokens : " + JSON.toJSONString(oldTokens));
					if (null == oldTokens) {
						List<String> tokens = new ArrayList<String>();
						tokens.add(newToken);
						request.getSession().setAttribute("tokens", tokens);
						request.getSession().setAttribute("token", newToken);
					} else {
						if (oldTokens.size() >= 10) {
							oldTokens.remove(0);
						}
						oldTokens.add(newToken);
						request.getSession().setAttribute("tokens", oldTokens);
						request.getSession().setAttribute("token", newToken);
					}
					// request.getSession().setAttribute("token",
					// UUID.randomUUID().toString());
				}
				boolean needRemoveSession = annotation.remove();
				if (needRemoveSession) {
					if (isRepeatSubmit(request)) {
						if (request.getHeader("Referer") == null)
							response.sendRedirect("/duobao-user-web/errorType?type=repeatSubmit");
						else
							response.sendRedirect("/duobao-user-web/errorType?type=repeatSubmit" + "&referer=" + request.getHeader("Referer"));

						return false;
					}
				}
			}
			return true;
		} else {
			return super.preHandle(request, response, handler);
		}
	}

	@SuppressWarnings("unchecked")
	private boolean isRepeatSubmit(HttpServletRequest request) {
		List<String> serverTokens = (List<String>) request.getSession(false).getAttribute("tokens");
		logger.info("get token is " + JSON.toJSONString(serverTokens));
		if (serverTokens == null) {
			return true;
		}
		String clinetToken = request.getParameter("token");
		if (clinetToken == null) {
			return true;
		}
		int index = 0;
		for (String serverToken : serverTokens) {
			if (clinetToken.equals(serverToken)) {
				serverTokens.remove(index);
				request.getSession().setAttribute("tokens", serverTokens);
				return false;
			}
			index++;
		}
		return true;
	}
}