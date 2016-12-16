package com.duobao.filter.service;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

/**
* A manager for the CSRF token for a given session. The {@link #getTokenForSession(HttpSession)} should used to
* obtain the token value for the current session (and this should be the only way to obtain the token value).
* ***/

public final class CSRFTokenManager {

    /**
     * The token parameter name
     */
    static final String CSRF_PARAM_NAME = "xToken";

    /**
     * The location on the session which stores the token
     */
    public static final  String CSRF_TOKEN_FOR_SESSION_ATTR_NAME = CSRFTokenManager.class .getName() + ".tokenval";
    private static final Logger logger = Logger .getLogger(CSRFTokenManager.class);
    public static String getTokenForSession(HttpSession session) {
        String token = null;
        
        // I cannot allow more than one token on a session - in the case of two
        // requests trying to
        // init the token concurrently
        synchronized (session) {
            token = (String) session.getAttribute(CSRF_TOKEN_FOR_SESSION_ATTR_NAME);
            if (null == token) {
                token = UUID.randomUUID().toString();
                session.setAttribute(CSRF_TOKEN_FOR_SESSION_ATTR_NAME, token);
                
                //logger.info("token为null 申请的的token 是"+token);
            }else{
            	//logger.info("token不为null,已有的token是"+token);
            	
            }
        }
        return token;
    }

    /**
     * Extracts the token value from the session
     * 
     * @param request
     * @return
     */
    public static String getTokenFromRequest(HttpServletRequest request) {
        return request.getParameter(CSRF_PARAM_NAME);
    }

    private CSRFTokenManager() {
    };
}