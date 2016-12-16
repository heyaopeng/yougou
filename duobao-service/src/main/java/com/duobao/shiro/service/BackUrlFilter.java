	package com.duobao.shiro.service;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.web.filter.PathMatchingFilter;
import org.apache.shiro.web.util.WebUtils;

public class BackUrlFilter extends PathMatchingFilter {  

    @Override  
    protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {  
     
        HttpServletRequest req = (HttpServletRequest) request;  
     
        if("get".equalsIgnoreCase(req.getMethod())) {
        	WebUtils.saveRequest(req);  
        }
    	return true;
    }  
    
}
