package com.duobao.shiro.service;
 
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.mgt.RealmSecurityManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.data.mybatis.mapping.UserMapper;
import com.duobao.fundation.data.mybatis.model.User;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.user.service.UserProfileServiceI;
import com.duobao.user.service.UserServiceI;

public class MonitorRealm  extends AuthorizingRealm {

	@Autowired
	private UserServiceI userService;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private UserProfileServiceI userProfileServiceI;
	
	
	private static final Logger logger = Logger.getLogger(MonitorRealm.class);
	private  final static String REALM_NAME = "MonitorRealm"; 
	
	public MonitorRealm() {
		setName(REALM_NAME);
	}
	
	/*
	 * 授权
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {

		String account = (String)super.getAvailablePrincipal(principals);
 		
		logger.info("登录名是"+account);
		UserProfile userProfile =  userProfileServiceI.getUserProfileByEmailOrPhoneOrSerialNum(account);
		
		if(userProfile!=null && userProfile.getIsActive()){
			SimpleAuthorizationInfo simpleAuthorInfo = new SimpleAuthorizationInfo();
			List<String> roles = userProfileServiceI.getRolesByUserId(userProfile.getUserId());

			List<String>  permissions = userProfileServiceI.getUserPermissions(userProfile.getUserId());
			simpleAuthorInfo.addRoles(roles);
			simpleAuthorInfo.addStringPermissions(permissions);
			logger.info("用户ID为"+userProfile.getUserId()+"拥有的所有角色："+JSON.toJSONString(roles));
			logger.info("用户ID为"+userProfile.getUserId()+"拥有的所有权限："+JSON.toJSONString(permissions));
			return simpleAuthorInfo;
		}
		return null;
	}

	/*
	 * 认证
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
		UsernamePasswordToken token = (UsernamePasswordToken)authcToken;
		String account = token.getUsername();
		logger.info("account为"+account);
		UserProfile userProfile = userProfileServiceI.getUserProfileByEmailOrPhoneOrSerialNum(account);
		
	    if(userProfile==null ){
	    	 logger.info("获取的name为  "+token.getUsername()+"  profile 表没有记录,用户不存在");
	    	 throw new UnknownAccountException();
	    }
	    
	    User user = userMapper.selectByPrimaryKey(userProfile.getUserId());
    	if(user == null){
    		logger.info("该用户没有 设置 密码,user表中不存在 字段,userId 为"+userProfile.getUserId());
    		throw new UnknownAccountException();
    	}
    	user.setRegistTime(userProfile.getRegistTime());
    	logger.info("长度"+token.getPassword().length);
	    if(token.getPassword().length >5){
	    	if(userService.hasMatchUserPwd(user, String.valueOf(token.getPassword()))){
	            AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(token.getUsername(), token.getPassword(),getName());  
	            this.setSession(GlobalSessionConstant.USER_ACCOUNT, token.getUsername());
	            this.setSession(GlobalSessionConstant.USER_ID, user.getUserId());
	            return authcInfo;  
	      	}else{
	      		logger.info("密码错误１１１１");
	      		 throw new IncorrectCredentialsException();  
	      	}
	    }
	    else if(String.valueOf(token.getPassword()).equals(user.getPassword().substring(0, 4)))	{
    		 AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(token.getUsername(), token.getPassword(),getName                  ());  
	          this.setSession(GlobalSessionConstant.USER_ACCOUNT, token.getUsername());
	          this.setSession(GlobalSessionConstant.USER_ID, userProfile.getUserId());
	          return authcInfo;  
    	}
	    else{
	    	logger.info("密码错误２２２２");
	    	throw new IncorrectCredentialsException();  
	    }
	}
	
	/** 
     * 将一些数据放到ShiroSession中,以便于其它地方使用 
     * @see 比如Controller,使用时直接用HttpSession.getAttribute(key)就可以取到 
     */  
    private void setSession(Object key, Object value){  
        Subject currentUser = SecurityUtils.getSubject();  
        if(null != currentUser){  
            Session session = currentUser.getSession();  
            logger.info("Session默认超时时间为[" + session.getTimeout() + "]毫秒");  
            if(null != session){  
                session.setAttribute(key, value);  
            }  
        }  
    } 
  
    
   
    /** 
     * 清除用户的授权信息 ,只用通过redis
     * @param username 
     */  
    public static void clearAuthorizationInfo(String username){
    	RedisCacheManager cacheManager = new RedisCacheManager();
    	logger.info("+++++getCache"+"and get username"+username);
    	Cache<Object, Object> cache = cacheManager.getCache(MonitorRealm.REALM_NAME); 
        cache.remove(username);  
    }  
    
    
    /**
	 * 获得当前用户名
	 * @return
	 */
	public static String getCurrentUserEmail() {
		Subject subject = getSubject();
		PrincipalCollection collection = subject.getPrincipals();
		if(null != collection && !collection.isEmpty()) {
			return (String) collection.iterator().next();
		}
		return null;
	}
	
	public static Subject getSubject() {
		return SecurityUtils.getSubject();
	}
	
	public static void clearCurrentUserCachedAuthorizationInfo(){
		RealmSecurityManager securityManager = (RealmSecurityManager) SecurityUtils.getSecurityManager();
		MonitorRealm userRealm = (MonitorRealm) securityManager.getRealms().iterator().next();
		userRealm.clearCachedAuthorizationInfo(SecurityUtils.getSubject().getPrincipals());
		logger.info("清除当前用户的权限缓存");
	}

    @Override
    public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
        super.clearCachedAuthorizationInfo(principals);
    }

    @Override
    public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
        super.clearCachedAuthenticationInfo(principals);
    }

    //	清除redis的
    public void clearAllCachedAuthorizationInfo() {
        getAuthorizationCache().clear();
    }

    public void clearAllCachedAuthenticationInfo() {
        getAuthenticationCache().clear();
    }
     
    public void clearCachedAuthorizationInfoByUserName(String name){
    	Cache<Object, AuthorizationInfo> cache = getAuthorizationCache(); 
    	cache.remove("shiro_redis_cache:"+name);
    } 
}
