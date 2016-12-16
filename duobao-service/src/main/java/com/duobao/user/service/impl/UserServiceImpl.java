package com.duobao.user.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;
import java.io.InputStream;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
 
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.h2.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.backend.service.ProductManageServiceI;
import com.duobao.date.util.DateUtils;
import com.duobao.file.util.FileUtil;
import com.duobao.format.util.MoneyFormat;
import com.duobao.fundation.config.links.BalanceLogType;
import com.duobao.fundation.config.links.DuobaoRoleConstant;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.data.mybatis.mapping.AnnouncementMapper;
import com.duobao.fundation.data.mybatis.mapping.AnnouncementUserLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.BalanceLogMapper;
import com.duobao.fundation.data.mybatis.mapping.BankMapper;
import com.duobao.fundation.data.mybatis.mapping.CaiPiaoMapper;
import com.duobao.fundation.data.mybatis.mapping.CartItemMapper;
import com.duobao.fundation.data.mybatis.mapping.CashCouponMapper;
import com.duobao.fundation.data.mybatis.mapping.ChouJiangMapper;
import com.duobao.fundation.data.mybatis.mapping.CityMapper;
import com.duobao.fundation.data.mybatis.mapping.DelOrderMapper;
import com.duobao.fundation.data.mybatis.mapping.DelPaymentOrderMapper;
import com.duobao.fundation.data.mybatis.mapping.DeliverAddrMapper;
import com.duobao.fundation.data.mybatis.mapping.FinancialAccountMapper;
import com.duobao.fundation.data.mybatis.mapping.LoginHistoryMapper;
import com.duobao.fundation.data.mybatis.mapping.OauthLoginMapper;
import com.duobao.fundation.data.mybatis.mapping.OrderMapper;
import com.duobao.fundation.data.mybatis.mapping.OrderNumberMapper;
import com.duobao.fundation.data.mybatis.mapping.PaymentMapper;
import com.duobao.fundation.data.mybatis.mapping.PaymentOrderMapper;
import com.duobao.fundation.data.mybatis.mapping.PermissionMapper;
import com.duobao.fundation.data.mybatis.mapping.PointSigninMapper;
import com.duobao.fundation.data.mybatis.mapping.ProductImageLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.ProductMapper;
import com.duobao.fundation.data.mybatis.mapping.RegionMapper;
import com.duobao.fundation.data.mybatis.mapping.RoleMapper;
import com.duobao.fundation.data.mybatis.mapping.RolePermissionLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.StateMapper;
import com.duobao.fundation.data.mybatis.mapping.StoreApplicationMapper;
import com.duobao.fundation.data.mybatis.mapping.StoreCouponLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.StoreMapper;
import com.duobao.fundation.data.mybatis.mapping.TermMapper;
import com.duobao.fundation.data.mybatis.mapping.UserInvitedLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.UserMapper;
import com.duobao.fundation.data.mybatis.mapping.UserProfileMapper;
import com.duobao.fundation.data.mybatis.mapping.UserRoleLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.UserShowImageLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.UserShowListMapper;
import com.duobao.fundation.data.mybatis.mapping.VarMapper;
import com.duobao.fundation.data.mybatis.mapping.WithdrawMapper;
import com.duobao.fundation.data.mybatis.model.AllOrderNumber;
import com.duobao.fundation.data.mybatis.model.Announcement;
import com.duobao.fundation.data.mybatis.model.AnnouncementUserLinkKey;
import com.duobao.fundation.data.mybatis.model.BalanceLog;
import com.duobao.fundation.data.mybatis.model.Bank;
import com.duobao.fundation.data.mybatis.model.CaiPiao;
import com.duobao.fundation.data.mybatis.model.CartItem;
import com.duobao.fundation.data.mybatis.model.CashCoupon;
import com.duobao.fundation.data.mybatis.model.ChouJiang;
import com.duobao.fundation.data.mybatis.model.City;
import com.duobao.fundation.data.mybatis.model.DelOrder;
import com.duobao.fundation.data.mybatis.model.DelPaymentOrder;
import com.duobao.fundation.data.mybatis.model.DeliverAddr;
import com.duobao.fundation.data.mybatis.model.FinancialAccount;
import com.duobao.fundation.data.mybatis.model.LoginHistory;
import com.duobao.fundation.data.mybatis.model.OauthLogin;
import com.duobao.fundation.data.mybatis.model.Order;
import com.duobao.fundation.data.mybatis.model.OrderNumber;
import com.duobao.fundation.data.mybatis.model.Payment;
import com.duobao.fundation.data.mybatis.model.PaymentOrder;
import com.duobao.fundation.data.mybatis.model.Permission;
import com.duobao.fundation.data.mybatis.model.PointSignin;
import com.duobao.fundation.data.mybatis.model.Product;
import com.duobao.fundation.data.mybatis.model.ProductImageLink;
import com.duobao.fundation.data.mybatis.model.Region;
import com.duobao.fundation.data.mybatis.model.Role;
import com.duobao.fundation.data.mybatis.model.State;
import com.duobao.fundation.data.mybatis.model.Store;
import com.duobao.fundation.data.mybatis.model.StoreApplication;
import com.duobao.fundation.data.mybatis.model.StoreCouponLinkKey;
import com.duobao.fundation.data.mybatis.model.Term;
import com.duobao.fundation.data.mybatis.model.User;
import com.duobao.fundation.data.mybatis.model.UserInvitedLink;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.fundation.data.mybatis.model.UserRoleLinkKey;
import com.duobao.fundation.data.mybatis.model.UserShowImageLink;
import com.duobao.fundation.data.mybatis.model.UserShowList;
import com.duobao.fundation.data.mybatis.model.Var;
import com.duobao.fundation.data.mybatis.model.Winner;
import com.duobao.fundation.data.mybatis.model.Withdraw;
import com.duobao.fundation.dfs.fastdfs.FDFSFileUpload;
import com.duobao.number.util.NumberUtil;
import com.duobao.payment.exception.PaymentHandlerException;
import com.duobao.payment.strategy.alipay.util.AlipayNotify;
import com.duobao.payment.strategy.alipay.util.AlipaySubmit;
import com.duobao.payment.strategy.wcPaymetnTools.HttpUtils;
import com.duobao.payment.strategy.wcPaymetnTools.MyTool;
import com.duobao.payment.strategy.wcPaymetnTools.PayImpl;
import com.duobao.payment.strategy.wcPaymetnTools.PayMD5;
import com.duobao.payment.strategy.wcPaymetnTools.PaymentTools;
import com.duobao.payment.strategy.wcPaymetnTools.UniteOrder;
import com.duobao.payment.strategy.wcPaymetnTools.UniteOrderResult;
import com.duobao.payment.strategy.wcPaymetnTools.WechatPay;
import com.duobao.payment.strategy.wcPaymetnTools.config.MerchantInfo;
import com.duobao.user.model.AccountCenter;
import com.duobao.user.model.AddrRefreshThread;
import com.duobao.user.model.NumberA;
import com.duobao.user.model.PaymentStrategyResult;
import com.duobao.user.model.SharePage;
import com.duobao.user.model.UserCenter;
import com.duobao.user.model.UserForm;
import com.duobao.user.service.DuobaoServiceI;
import com.duobao.user.service.UserServiceI;
import com.duobao.user.util.EndecryptUtils;
import com.duobao.user.util.RandomNum;
import com.duobao.user.util.SHA256;
import com.duobao.user.util.UserUtil;
import com.duobao.userAgent.util.UserAgentUtils;
import com.duobao.weixin.util.EmojiFilter;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.base.Strings;

//@Transactional(rollbackFor=Exception.class)
public class UserServiceImpl implements UserServiceI {

	private static final Logger logger = Logger.getLogger(UserServiceImpl.class);
	@Autowired
	private FDFSFileUpload fDFSFileUpload;
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private UserProfileMapper userProfileMapper;
	@Autowired
	private LoginHistoryMapper loginHistoryMapper;
	@Autowired
	private UserRoleLinkMapper UserRoleLinkMapper;
	@Autowired
	private RoleMapper roleMapper;
	@Autowired
	private PermissionMapper permissionMapper;
	@Autowired
	private RolePermissionLinkMapper rolePermissionLinkMapper;
	@Autowired
	private OauthLoginMapper oauthLoginMapper;
	@Autowired
	private FinancialAccountMapper financialAccountMapper;
	@Autowired
	private OrderMapper orderMapper;
	@Autowired
	private OrderNumberMapper orderNumberMapper;
	@Autowired
	private ProductMapper productMapper;
	@Autowired
	private TermMapper termMapper;
	@Autowired
	private ProductImageLinkMapper productImageLinkMapper;
	@Autowired
	private CartItemMapper cartItemMapper;
	@Autowired
	private BalanceLogMapper balanceLogMapper;
	@Autowired
	private UserShowListMapper userShowListMapper;
	@Autowired
	private UserInvitedLinkMapper userInvitedLinkMapper;
	@Autowired
	private DeliverAddrMapper deliverAddrMapper;
	@Autowired
	private AnnouncementMapper announcementMapper;
	@Autowired
	private AnnouncementUserLinkMapper announcementUserLinkMapper;
	@Autowired
	private StateMapper stateMapper;
	@Autowired
	private CityMapper cityMapper;
	@Autowired
	private RegionMapper regionMapper;
	@Autowired
	private UserShowImageLinkMapper userShowImageLinkMapper;
	@Autowired
	private PaymentOrderMapper paymentOrderMapper;
	@Autowired
	private PaymentMapper paymentMapper;
	@Autowired
	private BankMapper bankMapper;
	@Autowired
	private WithdrawMapper withdrawMapper;
	@Autowired
	private CaiPiaoMapper caiPiaoMapper;
	@Autowired
	private DuobaoServiceI duobaoService;
	@Autowired
	private StoreApplicationMapper storeApplicationMapper;
	@Autowired
	private CashCouponMapper cashCouponMapper;
	@Autowired
	private StoreMapper storeMapper;
	@Autowired
	private StoreCouponLinkMapper storeCouponLinkMapper;
	@Autowired
	private ProductManageServiceI productManageService;
	@Autowired
	private DelPaymentOrderMapper delPaymentOrderMapper;
	@Autowired
	private DelOrderMapper delOrderMapper;
	@Autowired
	private VarMapper varMapper;

	@Autowired
	private ChouJiangMapper chouJiangMapper;
	@Autowired
	private PointSigninMapper pointSigninMapper;
	
	
	private String alipay_notify_url = "http://m.uclee.com/duobao-user-web/alipayNotifyHandler";
	private String alipay_return_url = "http://cooka.vicp.cc/fastpaysuccess/";

	private String wc_notify_url = "http://m.uclee.com/seller/WCNotifyHandler";
	private String wc_general_order = "https://api.mch.weixin.qq.com/pay/unifiedorder";
	// 微信JSSDK的AccessToken请求URL地址
	final static String weixin_jssdk_acceToken_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx77164363cd4eb0e0&secret=bd047087a820fb26e7e87d00eabaa9fa";
	// 微信JSSDK的ticket请求URL地址
	final static String weixin_jssdk_ticket_url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi";
	public User getUserById(Integer userId) {
		return userMapper.selectByPrimaryKey(userId);
	}

	@Override
	public boolean hasMatchUserPwd(User user, String inputPassword) {
		logger.info("user: " + JSON.toJSONString(user));
		logger.info("inputPassword: " + JSON.toJSONString(inputPassword));
		boolean validatePwd = false;
		if (null == user || Strings.isNullOrEmpty(inputPassword) || user.getRegistTime() == null
				|| Strings.isNullOrEmpty(user.getPassword())) {
			logger.info("验证用户密码需要信息不完整\n" + JSON.toJSONString(user));
			return false;
		}
		String salt = UserUtil.getSalt(user.getRegistTime());
		validatePwd = user.getPassword().equals(SHA256.encrypt(inputPassword, salt));
		if(!validatePwd){
			logger.info("密码错误real");
			logger.info("user pass in database:"+user.getPassword());
			logger.info("user pass input:"+SHA256.encrypt(inputPassword, salt));
		}
		return validatePwd;
	}

	@Override
	public boolean updatePassword(User user) {
		if (Strings.isNullOrEmpty(user.getPassword()) || user.getUserId() == null) {
			logger.info("密码为空或者缺少用户id");
			return false;
		}

		UserProfile userProfile = new UserProfile(user.getUserId());
		userProfile = userProfileMapper.selectByUserProfile(userProfile);
		if (userProfile == null) {
			logger.info("错误，该用户没有userProfile 记录");
			return false;
		}

		String salt = UserUtil.getSalt(userProfile.getRegistTime());
		user.setPassword(SHA256.encrypt(user.getPassword(), salt));
		userMapper.updateByPrimaryKeySelective(user);
		return true;
	}

	@Override
	public int regUser(UserForm userForm) {
		if (userForm == null || StringUtils.isNullOrEmpty(userForm.getAccount())
				|| StringUtils.isNullOrEmpty(userForm.getPassword()) || userForm.getRoleId() == null) {
			logger.info("注册用户数据不完整" + JSON.toJSON(userForm));
			return -1;
		}

		if (isExistAccount(userForm.getAccount())) {
			logger.info("已经存在相同的账号\n" + userForm.getAccount());
			return -1;
		}

		UserProfile userProfile = new UserProfile();
		Date regTime = new Date();
		userProfile.setRegistTime(regTime);

		String salt = UserUtil.getSalt(regTime);
		User user = new User();
		// System.err.println(""userForm.getPassword());
		user.setPassword(SHA256.encrypt(userForm.getPassword(), salt));
		userMapper.insertSelective(user);

		// 插入用户信息
		userProfile.setUserId(user.getUserId());
		String account = userForm.getAccount();
		if (UserUtil.isPhone(account))
			userProfile.setPhone(account);
		else
			userProfile.setEmail(account);
		userProfileMapper.insertSelective(userProfile);

		// 为用户添加角色
		UserRoleLinkKey userRoleLinkKey = new UserRoleLinkKey();
		userRoleLinkKey.setRoleId(userForm.getRoleId());
		userRoleLinkKey.setUserId(user.getUserId());
		UserRoleLinkMapper.insert(userRoleLinkKey);

		// 默认开通金融账号
		FinancialAccount financialAccount = new FinancialAccount();
		financialAccount.setUserId(user.getUserId());
		return user.getUserId();
	}

	public int regUserWithoutPassword(UserForm userForm) {
		if (userForm == null || StringUtils.isNullOrEmpty(userForm.getAccount()) || userForm.getRoleId() == null) {
			logger.info("注册用户数据不完整" + JSON.toJSON(userForm));
			return -1;
		}

		if (isExistAccount(userForm.getAccount())) {
			logger.info("已经存在相同的账号\n" + userForm.getAccount());
			return -1;
		}

		UserProfile userProfile = new UserProfile();
		Date regTime = new Date();
		userProfile.setRegistTime(regTime);

		String salt = UserUtil.getSalt(regTime);
		User user = new User();

		String account = userForm.getAccount();
		String pswd = new Sha256Hash(account + salt).toBase64().substring(0, 20);
		user.setPassword(pswd);
		userMapper.insertSelective(user);

		// 插入用户信息
		userProfile.setUserId(user.getUserId());

		if (UserUtil.isPhone(account))
			userProfile.setPhone(account);
		else
			userProfile.setEmail(account);
		userProfileMapper.insertSelective(userProfile);

		// 为用户添加角色
		UserRoleLinkKey userRoleLinkKey = new UserRoleLinkKey();
		userRoleLinkKey.setRoleId(userForm.getRoleId());
		userRoleLinkKey.setUserId(user.getUserId());
		UserRoleLinkMapper.insert(userRoleLinkKey);

		// 默认开通金融账号
		FinancialAccount financialAccount = new FinancialAccount();
		financialAccount.setUserId(user.getUserId());
		return user.getUserId();
	}

	@Override
	public int socialRegister(OauthLogin oauthLogin) {
		if (oauthLogin == null || oauthLogin.getRoleId() == null || Strings.isNullOrEmpty(oauthLogin.getOauthId())
				|| Strings.isNullOrEmpty(oauthLogin.getOauthType())
				|| Strings.isNullOrEmpty(oauthLogin.getOauthExpires())
				|| Strings.isNullOrEmpty(oauthLogin.getOauthUserName())
				|| Strings.isNullOrEmpty(oauthLogin.getOauthAccessToken())
				|| Strings.isNullOrEmpty(oauthLogin.getPhone())) {
			logger.info("社会化登录信息为登陆 缺失" + JSON.toJSONString(oauthLogin));
			return -1;
		}

		if (getOauthLoginInfoByOauthId(oauthLogin.getOauthId()) != null) {
			logger.info("+++ 存在相同的oauthId");
			return -1;
		}
		User user = new User();
		String pswd = new Sha256Hash(oauthLogin.getOauthAccessToken()).toBase64().substring(0, 20);
		user.setPassword(pswd);
		userMapper.insertSelective(user);

		Integer userId = user.getUserId();

		// 为用户添加角色
		UserRoleLinkKey userRoleLinkKey = new UserRoleLinkKey();
		userRoleLinkKey.setRoleId(oauthLogin.getRoleId());
		userRoleLinkKey.setUserId(userId);
		UserRoleLinkMapper.insert(userRoleLinkKey);

		UserProfile userProfile = new UserProfile();
		userProfile.setUserId(user.getUserId());
		userProfile.setName(oauthLogin.getOauthUserName());
		userProfile.setPhone(oauthLogin.getPhone());
		userProfileMapper.insertSelective(userProfile);

		oauthLogin.setUserId(userId);
		oauthLogin.setOauthName(oauthLogin.getOauthType());
		oauthLoginMapper.insertSelective(oauthLogin);

		// 默认开通金融账号
		FinancialAccount financialAccount = new FinancialAccount();
		financialAccount.setUserId(userId);

		return userId;
	}

	public boolean isSettingPassword(Integer userId) {
		User user = userMapper.selectByPrimaryKey(userId);
		logger.info(user.getPassword().length());
		return user.getPassword().length() == 20 ? false : true;
	}

	public int deleByUserId(Integer userId) {
		return userMapper.deleteByPrimaryKey(userId);
	}

	public boolean addChiledUser(UserForm userForm) {
		if (userForm.getParentId() == null || userForm.getRoleId() == null
				|| Strings.isNullOrEmpty(userForm.getPassword()) || Strings.isNullOrEmpty(userForm.getEmail())
				|| Strings.isNullOrEmpty(userForm.getPhone()) || Strings.isNullOrEmpty(userForm.getName())) {
			logger.info("添加子账号 数据不完整" + JSON.toJSONString(userForm));
			return false;
		}
		User user = new User();
		user.setParentId(userForm.getParentId());
		user.setPassword(userForm.getPassword());

		UserProfile userProfile = new UserProfile();
		Date regTime = new Date();
		userProfile.setRegistTime(regTime);

		String salt = UserUtil.getSalt(regTime);
		user.setPassword(SHA256.encrypt(userForm.getPassword(), salt));
		userMapper.insertSelective(user);

		userProfile.setUserId(user.getUserId());
		userProfile.setEmail(userForm.getEmail());
		userProfile.setPhone(userForm.getPhone());
		userProfile.setName(userForm.getName());
		if (!Strings.isNullOrEmpty(userForm.getGender())) {
			userProfile.setGender(userForm.getGender());
		}
		userProfile.setIsActive(userForm.isActive());
		userProfileMapper.insertSelective(userProfile);

		// 为子账户新建角色,新角色不归属于角色管理列表
		Role role = new Role();
		role.setRole(userForm.getParentId() + "_" + user.getUserId() + "_" + userForm.getName());
		role.setIsInList(false);
		role.setParentId(-1);
		roleMapper.insertSelective(role);

		int roleId = role.getRoleId();
		// 角色权限关联
		List<Permission> permissions = permissionMapper.selectRolePermissions(userForm.getRoleId());
		addRolePermissions(permissions, roleId);

		// 为用户添加角色
		UserRoleLinkKey userRoleLinkKey = new UserRoleLinkKey();
		userRoleLinkKey.setRoleId(roleId);
		userRoleLinkKey.setUserId(user.getUserId());
		UserRoleLinkMapper.insert(userRoleLinkKey);

		return true;
	}

	private void addRolePermissions(List<Permission> permissions, Integer roleId) {
		if (CollectionUtils.isEmpty(permissions)) {
			logger.info("权限列表为空");
			return;
		}
		List<Permission> list = new ArrayList<Permission>();
		for (Permission per : permissions) {
			if (per.getPermissionId() != null) {
				list.add(per);
			}
		}
		Map<String, Object> map = new HashMap<>();

		map.put("permissions", list);
		map.put("roleId", roleId);
		rolePermissionLinkMapper.addRolePermissionsByList(map);
	}

	public List<UserProfile> getSubUserList(Integer parentId) {
		if (parentId == null) {
			logger.info("传入 的用户id  为空");
			return null;
		}
		return userProfileMapper.selectUserListByParentId(parentId);
	}

	@Override
	public OauthLogin getOauthLoginInfoByOauthId(String oauthId) {
		return oauthLoginMapper.getOauthLoginInfoByOauthId(oauthId);
	}

	@Override
	public int updateLoginUserMsg(UserProfile userProfile, String IP) {
		LoginHistory lgh = new LoginHistory();
		lgh.setUserId(userProfile.getUserId());
		lgh.setLoginIp(IP);
		lgh.setLoginTime(new Date());
		return loginHistoryMapper.insert(lgh);
	}

	@Override
	public boolean isExistAccount(String account) {
		if (Strings.isNullOrEmpty(account)) {
			logger.info("传入的account为空");
			return false;
		}
		UserProfile userProfile = new UserProfile();
		if (UserUtil.isPhone(account))
			userProfile.setPhone(account);
		else
			userProfile.setEmail(account);

		UserProfile result = userProfileMapper.selectByUserProfile(userProfile);
		if (null == result)
			return false;
		else
			return true;
	}


	/** 
	   * 获取用户真实IP地址，不使用request.getRemoteAddr();的原因是有可能用户使用了代理软件方式避免真实IP地址, 
	   * 
	   * 可是，如果通过了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP值，究竟哪个才是真正的用户端的真实IP呢？ 
	   * 答案是取X-Forwarded-For中第一个非unknown的有效IP字符串。 
	   * 
	   * 如：X-Forwarded-For：192.168.1.110, 192.168.1.120, 192.168.1.130, 
	   * 192.168.1.100 
	   * 
	   * 用户真实IP为： 192.168.1.110 
	   * 
	   * @param request 
	   * @return 
	   */
	@Override
	public String getIp(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for"); 
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getHeader("Proxy-Client-IP"); 
	    } 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getHeader("WL-Proxy-Client-IP"); 
	    } 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getHeader("HTTP_CLIENT_IP"); 
	    } 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getHeader("HTTP_X_FORWARDED_FOR"); 
	    } 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getRemoteAddr(); 
	    } 
	    logger.info("x-forwarded-for: " + ip);
	    return ip;
	}
	
	@Override
	public String getIpAddr(HttpServletRequest request) {
		String ip = getIp(request);
		JSONObject json;
		try {
			json = readJsonFromUrl("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip="+ip);
		    return (String) json.get("province") + (String) json.get("city");
		} catch (IOException | JSONException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	private static String readAll(Reader rd) throws IOException {
	    StringBuilder sb = new StringBuilder();
	    int cp;
	    while ((cp = rd.read()) != -1) {
	      sb.append((char) cp);
	    }
	    return sb.toString();
	  }
	 
	  public static JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
	    InputStream is = new URL(url).openStream();
	    try {
	      BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
	      String jsonText = readAll(rd);
	      JSONObject json = new JSONObject(jsonText);
	      return json;
	    } finally {
	      is.close();
	     // System.out.println("同时 从这里也能看出 即便return了，仍然会执行finally的！");
	    }
	  }
	 
	public List<String> getUserPermissions(Integer userId) {
		List<Role> roleList = roleMapper.selectUserRoles(userId);
		List<String> permissions = new ArrayList<String>();
		for (Role role : roleList) {
			if (role.getIsActive()) {
				List<Permission> permsList = permissionMapper.selectRolePermissions(role.getRoleId());
				for (Permission perms : permsList) {
					if (perms.getIsActive()) {
						permissions.add(perms.getPermission());
					}
				}
			} else {
				logger.info(role.getRole() + "is  not active");
			}
		}
		return removeDuplicate(permissions);
	}

	public List<Permission> getUserPermission(Integer userId) {
		List<Role> roleList = roleMapper.selectUserRoles(userId);
		Set<Permission> permissions = new HashSet<Permission>();
		for (Role role : roleList) {
			List<Permission> permsList = permissionMapper.selectRolePermissions(role.getRoleId());
			for (Permission perms : permsList) {
				if (perms.getIsActive()) {
					permissions.add(perms);
				}
			}
		}
		List<Permission> userPermissions = new ArrayList<Permission>();
		userPermissions.addAll(permissions);
		logger.info("用户ID为" + userId + "拥有的所有角色：" + JSON.toJSONString(roleList));
		logger.info("用户ID为" + userId + "拥有的所有权限：" + JSON.toJSONString(userPermissions));
		return userPermissions;
	}

	private List<String> removeDuplicate(List<String> list) {
		HashSet<String> h = new HashSet<String>(list);
		list.clear();
		list.addAll(h);
		return list;
	}

	@Override
	public User getUserByChild(Integer userId) {
		User user = getUserById(userId);
		if (user.getParentId() != 0) {
			user = getUserByChild(user.getParentId());
		}
		return user;
	}

	@Override
	public int updateUser(User user) {
		return userMapper.updateByPrimaryKeySelective(user);
	}

	@Override
	public UserProfile getBasicUserProfile(Integer userId) {
		UserProfile search = new UserProfile();
		search.setUserId(userId);
		UserProfile userProfile = userProfileMapper.selectByUserProfile(search);
		return userProfile;
	}
	@Override
	public String getRandomNum(){
		return new RandomNum().sixRandomNum();
	}

	@Override
	//duobao
	public boolean createNewAccount(OauthLogin oauthLogin,String headimgurl) {
		User user = new User();
		String pswd = new Sha256Hash(oauthLogin.getOauthAccessToken()).toBase64().substring(0, 20);
		user.setPassword(pswd);
		int max = 11;
		int min = 1;
		Random random = new Random();
		int randomNumber = random.nextInt(max) % (max - min + 1) + min;
		user.setSerialNum(NumberUtil.generateSerialNum(randomNumber));
		userMapper.insertSelective(user);

		Integer userId = user.getUserId();

		// 为用户添加角色
		UserRoleLinkKey userRoleLinkKey = new UserRoleLinkKey();
		userRoleLinkKey.setRoleId(DuobaoRoleConstant.user);
		userRoleLinkKey.setUserId(userId);
		UserRoleLinkMapper.insert(userRoleLinkKey);

		UserProfile userProfile = new UserProfile();
		userProfile.setUserId(user.getUserId());
		userProfile.setNickName(oauthLogin.getOauthUserName());
		userProfile.setName(oauthLogin.getOauthUserName());
		userProfile.setImage(headimgurl);
		userProfileMapper.insertSelective(userProfile);

		oauthLogin.setUserId(userId);
		oauthLogin.setOauthName(oauthLogin.getOauthType());
		oauthLoginMapper.insertSelective(oauthLogin);

		// 默认开通金融账号
		FinancialAccount financialAccount = new FinancialAccount();
		financialAccount.setUserId(userId);
		financialAccountMapper.insertSelective(financialAccount);
		return true;
	}

	@Override
	public UserCenter getUserCenterData(Integer userId, HttpServletRequest request) {
		UserCenter userCenter = new UserCenter();
		UserProfile userProfile = userProfileMapper.selectByUserId(userId);
		Thread t1=new Thread(new AddrRefreshThread(userProfile, request));
		t1.start();
		if(userProfile!=null){
			userCenter.setNickName(userProfile.getNickName());
			userCenter.setPhone(userProfile.getPhone());
			userCenter.setImage(userProfile.getImage());
		}
		FinancialAccount account = financialAccountMapper.selectByUserId(userId);
		if(account!=null){
			userCenter.setBalance(account.getBalance());
			userCenter.setCommission(account.getCommissionMoney());
			userCenter.setPoints(account.getPoints());
		}
		return userCenter;
	}

	@Override
	public PageInfo<Order> getRecordList(Order orderSearch,Integer page,Integer pageSize) {
		PageHelper.startPage(page, pageSize);
		List<Order> orders = orderMapper.selectByOrder(orderSearch);
		logger.info(JSON.toJSONString(orders));
		for(Order order : orders){
			if(!order.getIsPaid()){
				Date end = DateUtils.addMinute(order.getCreateTime(), 15);
				order.setTimeCountDown(end.getTime() - new Date().getTime() + 2000);
			}
			order.setCreateTimeStr(DateUtils.format(order.getCreateTime(), DateUtils.FORMAT_LONG));
			List<OrderNumber> orderNumber = orderNumberMapper.selectByOrderId(order.getOrderId());
			//order.setOrderNumber(orderNumber);	
			order.setNumberCount(orderNumber.size());
			Term term = termMapper.selectByPrimaryKey(order.getTermId());
			order.setTerm(term);
			order.setStatus(term.getStatus());
			if(term!=null&&term.getStatus().equals("opened")){
				term.setOpenTimeStr(DateUtils.format(term.getOpenTime(), DateUtils.FORMAT_LONG));
				Winner winner = new Winner();
				Order luckyOrder = orderMapper.selectByPrimaryKey(term.getLuckyOrder());
				if(luckyOrder!=null){
					UserProfile userProfile = userProfileMapper.selectByUserId(luckyOrder.getUserId());
					if(userProfile!=null){
						winner.setName(userProfile.getNickName());
					}
					//winner.setOrderNumber(orderNumber);
					OrderNumber luckyNumber = orderNumberMapper.selectByLuckyNumberByOrderId(luckyOrder.getOrderId());
					winner.setLuckyNumber(luckyNumber.getNumber());
					winner.setCount(orderNumber.size());
					User user = userMapper.selectByPrimaryKey(luckyOrder.getUserId());
					if(user!=null){
						winner.setSerialNum(user.getSerialNum());
					}
				}
				order.setWinner(winner);
			}
		}
		PageInfo<Order> pageInfo = new PageInfo<Order>(orders);
		return pageInfo;
	}
	@Override
	public PageInfo<Order> getWinRecordList(Order orderSearch,Integer page,Integer pageSize) {
		PageHelper.startPage(page, pageSize);
		orderSearch.setIsLuckyOrder(true);
		List<Order> orders = orderMapper.selectByOrder(orderSearch);
		for(Order order : orders){
			order.setCreateTimeStr(DateUtils.format(order.getCreateTime(), DateUtils.FORMAT_LONG));
			List<OrderNumber> orderNumber = orderNumberMapper.selectByOrderId(order.getOrderId());
			//order.setOrderNumber(orderNumber);
			order.setNumberCount(orderNumber.size());
			Term term = termMapper.selectByPrimaryKey(order.getTermId());
			order.setTerm(term);
			order.setStatus(term.getStatus());
			if(term!=null&&term.getStatus().equals("opened")){
				term.setOpenTimeStr(DateUtils.format(term.getOpenTime(), DateUtils.FORMAT_LONG));
				Winner winner = new Winner();
				Order luckyOrder = orderMapper.selectByPrimaryKey(term.getLuckyOrder());
				
				if(luckyOrder!=null){
					OrderNumber luckyOrderNumber = orderNumberMapper.selectByLuckyNumberByOrderId(luckyOrder.getOrderId());
					UserProfile userProfile = userProfileMapper.selectByUserId(luckyOrder.getUserId());
					if(userProfile!=null){
						winner.setName(userProfile.getNickName());
					}
					//winner.setOrderNumber(orderNumber);
					if(luckyOrderNumber!=null){
						winner.setLuckyNumber(luckyOrderNumber.getNumber());
					}
					winner.setCount(orderNumber.size());
					User user = userMapper.selectByPrimaryKey(luckyOrder.getUserId());
					if(user!=null){
						winner.setSerialNum(user.getSerialNum());
					}
				}
				order.setWinner(winner);
			}
		}
		PageInfo<Order> pageInfo = new PageInfo<Order>(orders);
		return pageInfo;
	}
	@Override
	public PageInfo<Order> getWinRecordListForUserHome(Order orderSearch,Integer page,Integer pageSize) {
		PageHelper.startPage(page, pageSize);
		orderSearch.setIsLuckyOrder(true);
		List<Order> orders = orderMapper.selectByWinOrderForUserHome(orderSearch);
		for(Order order : orders){
			order.setCreateTimeStr(DateUtils.format(order.getCreateTime(), DateUtils.FORMAT_LONG));
			List<OrderNumber> orderNumber = orderNumberMapper.selectByOrderId(order.getOrderId());
			//order.setOrderNumber(orderNumber);
			order.setNumberCount(orderNumber.size());
			Term term = termMapper.selectByPrimaryKey(order.getTermId());
			order.setTerm(term);
			order.setStatus(term.getStatus());
			if(term!=null&&term.getStatus().equals("opened")){
				term.setOpenTimeStr(DateUtils.format(term.getOpenTime(), DateUtils.FORMAT_LONG));
				Winner winner = new Winner();
				Order luckyOrder = orderMapper.selectByPrimaryKey(term.getLuckyOrder());
				
				if(luckyOrder!=null){
					OrderNumber luckyOrderNumber = orderNumberMapper.selectByLuckyNumberByOrderId(luckyOrder.getOrderId());
					UserProfile userProfile = userProfileMapper.selectByUserId(luckyOrder.getUserId());
					if(userProfile!=null){
						winner.setName(userProfile.getNickName());
					}
					//winner.setOrderNumber(orderNumber);
					if(luckyOrderNumber!=null){
						winner.setLuckyNumber(luckyOrderNumber.getNumber());
					}
					winner.setCount(orderNumber.size());
					User user = userMapper.selectByPrimaryKey(luckyOrder.getUserId());
					if(user!=null){
						winner.setSerialNum(user.getSerialNum());
					}
				}
				order.setWinner(winner);
			}
		}
		PageInfo<Order> pageInfo = new PageInfo<Order>(orders);
		return pageInfo;
	}

	@Override
	public List<CartItem> getCartList(Integer userId) {
		List<CartItem> cart = cartItemMapper.selectByUserId(userId);
		for(CartItem item : cart){
			item.setTimeStr(DateUtils.format(item.getTimestamp(), DateUtils.FORMAT_LONG));
			Term term = termMapper.selectByPrimaryKey(item.getTermId());
			item.setTerm(term);
		}
		return cart;
	}

	@Override
	public PageInfo<BalanceLog> getBalanceLog(BalanceLog logSearch, Integer page, Integer pageSize) {
		FinancialAccount account = financialAccountMapper.selectByUserId(logSearch.getUserId());
		if(account!=null){
			logSearch.setAccountId(account.getAccountId());
			PageHelper.startPage(page, pageSize);
			List<BalanceLog> log = balanceLogMapper.selectByBalanceLog(logSearch);
			for(BalanceLog item : log){
				item.setTimeStr(DateUtils.format(item.getTime(), DateUtils.FORMAT_SHORT));
			}
			PageInfo<BalanceLog> pageInfo = new PageInfo<BalanceLog>(log);
			return pageInfo;
		}
		
		return new PageInfo<BalanceLog>(new ArrayList<BalanceLog>());
	}
	
	@Override
	public FinancialAccount getFinancialAccount(Integer userId) {
		FinancialAccount account = financialAccountMapper.selectByUserId(userId);
		return account;
	}

	@Override
	public PageInfo<UserShowList> getUserShowList(Integer userId, Integer page, int pageSize) {
		PageHelper.startPage(page, pageSize);
		List<UserShowList> userShowList = userShowListMapper.selectByUserId(userId);
		for(UserShowList item : userShowList){
			List<String> images = new ArrayList<String>();
			item.setTimeStr(DateUtils.format(item.getTime(), DateUtils.FORMAT_LONG));
			List<UserShowImageLink> link = userShowImageLinkMapper.selectByShowId(item.getShowId());
			for(UserShowImageLink tmp : link){
				images.add(tmp.getImageUrl());
			}
			item.setImages(images);
			UserProfile profile = userProfileMapper.selectByUserId(item.getUserId());
			if(profile!=null){
				item.setNickName(profile.getNickName());
				item.setUserImage(profile.getImage());
			}
		}
		PageInfo<UserShowList> pageInfo = new PageInfo<UserShowList>(userShowList);
		return pageInfo;
	}
	
	@Override
	public PageInfo<UserShowList> getAllShowList(Integer page, Integer pageSize,Integer productId) {
		PageHelper.startPage(page, pageSize);
		List<UserShowList> userShowList = userShowListMapper.selectAll(productId);
		for(UserShowList item : userShowList){
			List<String> images = new ArrayList<String>();
			item.setTimeStr(DateUtils.format(item.getTime(), DateUtils.FORMAT_LONG));
			List<UserShowImageLink> link = userShowImageLinkMapper.selectByShowId(item.getShowId());
			for(UserShowImageLink tmp : link){
				images.add(tmp.getImageUrl());
			}
			item.setImages(images);
			UserProfile profile = userProfileMapper.selectByUserId(item.getUserId());
			if(profile!=null){
				item.setNickName(profile.getNickName());
				item.setUserImage(profile.getImage());
			}
		}
		PageInfo<UserShowList> pageInfo = new PageInfo<UserShowList>(userShowList);
		return pageInfo;
	}
	
	@Override
	public SharePage getSharePageData(Integer userId) {
		SharePage sharePage = new SharePage();
		FinancialAccount account = financialAccountMapper.selectByUserId(userId);
		if(account!=null){
			sharePage.setCommission(account.getCommissionMoney());
		}else{
			sharePage.setCommission(new BigDecimal(0));
		}
		List<UserInvitedLink> invited = userInvitedLinkMapper.selectByUserId(userId);
		if(invited!=null){
			sharePage.setNumber(invited.size());
		}else{
			sharePage.setNumber(0);
		}
		return sharePage;
	}

	@Override
	public PageInfo<DeliverAddr> getAddrList(Integer userId, Integer page, Integer pageSize) {
		PageHelper.startPage(page, pageSize);
		List<DeliverAddr> addr = deliverAddrMapper.selectByUserId(userId);
		PageInfo<DeliverAddr> pageInfo = new PageInfo<DeliverAddr>(addr);
		return pageInfo;
	}

	@Override
	public PageInfo<Announcement> getAnnouncementList(Integer userId, Integer page, Integer pageSize) {
		PageHelper.startPage(page, pageSize);
		List<Announcement> announcement = announcementMapper.selectByUserId(userId);
		for(Announcement item : announcement){
			item.setCreateTimeStr(DateUtils.format(item.getCreateTime(), DateUtils.FORMAT_LONG));
			item.setMessageUrl(FileUtil.UrlRequest(item.getMessageUrl()));
		}
		PageInfo<Announcement> pageInfo = new PageInfo<Announcement>(announcement);
		return pageInfo;
	}

	@Override
	public PageInfo<BalanceLog> getCommissionDetail(BalanceLog logSearch, Integer pageNum,Integer pageSize) {
		FinancialAccount account = financialAccountMapper.selectByUserId(logSearch.getUserId());
		if(account!=null){
			logSearch.setAccountId(account.getAccountId());
			logger.info(JSON.toJSONString(logSearch));
			PageHelper.startPage(pageNum, pageSize);
			List<BalanceLog> log = balanceLogMapper.selectByBalanceLog(logSearch);
			for(BalanceLog item : log){
				item.setTimeStr(DateUtils.format(item.getTime(), DateUtils.FORMAT_SHORT));
				PaymentOrder paymentOrder = paymentOrderMapper.selectByPaymentSerialNum(item.getPaymentSerialNum());
				if(paymentOrder!=null){
					UserProfile profile = userProfileMapper.selectByUserId(paymentOrder.getUserId());
					item.setUserProfile(profile);
					item.setConsumeMoney(paymentOrder.getMoney());
				}
			}			
			logger.info(JSON.toJSONString(log));
			PageInfo<BalanceLog> pageInfo = new PageInfo<BalanceLog>(log);
			logger.info(JSON.toJSONString(pageInfo));
			return pageInfo;
		}
		return new PageInfo<BalanceLog>(new ArrayList<BalanceLog>());
	}
	
	@Override
	public PageInfo<BalanceLog> getCouponBalanceDetail(BalanceLog logSearch, Integer pageNum,Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<BalanceLog> log = balanceLogMapper.selectByBalanceLog(logSearch);
		for(BalanceLog item : log){
			item.setTimeStr(DateUtils.format(item.getTime(), DateUtils.FORMAT_LONG));
		}
		PageInfo<BalanceLog> pageInfo = new PageInfo<BalanceLog>(log);
		return pageInfo;
	}

	@Override
	public PageInfo<UserInvitedLink> getInvitation(Integer userId, Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<UserInvitedLink> invitation = userInvitedLinkMapper.selectByUserId(userId);
		for(UserInvitedLink item : invitation){
			UserProfile profile = userProfileMapper.selectByUserId(item.getInvitedId());
			item.setTimeStr(DateUtils.format(item.getTime(), DateUtils.FORMAT_SHORT));
			item.setUserProfile(profile);
		}
		PageInfo<UserInvitedLink> pageInfo = new PageInfo<UserInvitedLink>(invitation);
		return pageInfo;
	}

	@Override
	public DeliverAddr getAddrInfo(Integer userId, Integer deliverAddrId) {
		DeliverAddr addr = deliverAddrMapper.selectByUserAndAddrId(userId,deliverAddrId);
		logger.info(JSON.toJSONString(addr));
		State state = stateMapper.selectByState(addr.getState());
		City city = cityMapper.selectByCity(addr.getCity());
		Region region = regionMapper.selectByRegionAndCityId(addr.getRegion(),city.getCityId());
		if(state!=null&&city!=null&&region!=null){
			addr.setStateId(state.getStateId());
			addr.setCityId(city.getCityId());
			addr.setRegionId(region.getRegionId());
		}
		return addr;
	}

	@Override
	public List<State> getAllState() {
		return stateMapper.selectAll();
	}

	@Override
	public List<City> getCities(Integer stateId) {
		return cityMapper.selectByStateId(stateId);
	}

	@Override
	public List<Region> getRegions(Integer cityId) {
		return regionMapper.selectByCityId(cityId);
	}

	@Override
	public String editAddrHandler(DeliverAddr addr) {
		if(addr.getStateId()!=null&&addr.getCityId()!=null&&addr.getRegionId()!=null&&addr.getAddrDetail()!=null&&addr.getName()!=null&&addr.getPhone()!=null){
			State state = stateMapper.selectByPrimaryKey(addr.getStateId());
			City city = cityMapper.selectByPrimaryKey(addr.getCityId());
			Region region = regionMapper.selectByPrimaryKey(addr.getRegionId());
			if(state==null||city==null){
				return "dataError";
			}
			addr.setCity(city.getCity());
			addr.setState(state.getState());
			addr.setRegion(region.getRegion());
			addr.setCountry("中国");
			if(addr.getDeliveraddrId()!=null){
				if(deliverAddrMapper.updateByPrimaryKeySelective(addr)>0){
					return "success";
				}else{
					return "failed";
				}
			}else{
				if(deliverAddrMapper.insertSelective(addr)>0){
					return "success";
				}else{
					return "failed";
				}
			}
		}else{
			return "dataEmpty";
		}
	}

	@Override
	public String delAddrHandler(DeliverAddr deliverAddr) {
		DeliverAddr addr = deliverAddrMapper.selectByUserAndAddrId(deliverAddr.getUserId(),deliverAddr.getDeliveraddrId());
		if(addr!=null&&addr.getIsDefault()){
			return "isDefault";
		}
		if(deliverAddr.getUserId()==null || deliverAddr.getDeliveraddrId()==null){
			return "dataEmpty";
		}
		if(deliverAddrMapper.deleteByUserIdAndAddrId(deliverAddr.getUserId(),deliverAddr.getDeliveraddrId())>0){
			return "success";
		}else{
			return "failed";
		}
	}

	@Override
	public String setDefaultAddr(DeliverAddr deliverAddr) {
		DeliverAddr defaultAddr = deliverAddrMapper.selectDefaultByUserId(deliverAddr.getUserId());
		defaultAddr.setIsDefault(false);
		DeliverAddr newDefaultAddr = deliverAddrMapper.selectByUserAndAddrId(deliverAddr.getUserId(),deliverAddr.getDeliveraddrId());
		newDefaultAddr.setIsDefault(true);
		if(deliverAddrMapper.updateByPrimaryKeySelective(defaultAddr)>0&&deliverAddrMapper.updateByPrimaryKeySelective(newDefaultAddr)>0){
			return "success";
		}else{
			return "failed";
		}
	}

	@Override
	public Order getRecordDetail(String orderSerailNum) {
		Order order = orderMapper.selectBySerialNum(orderSerailNum);
		if (order!=null) {
			order.setCreateTimeStr(DateUtils.format(order.getCreateTime(), DateUtils.FORMAT_LONG));
			if(order.getAddr()==null||order.getAddr().equals("")){
				order.setAddr(null);
			}
			/*List<AllOrderNumber> allOrderNumbers = new ArrayList<AllOrderNumber>();
			List<Order> orders = orderMapper.selectByTermIdAndUserId(order.getTermId(), order.getUserId());
			Integer totalNumber=0;
			for(Order item : orders){
				AllOrderNumber allOrderNumber = new AllOrderNumber();
				List<OrderNumber> orderNumber = orderNumberMapper.selectByOrderId(item.getOrderId());
				allOrderNumber.setOrderNumber(orderNumber);
				allOrderNumber.setSize(orderNumber.size());
				if(orderNumber.size()>=1){
					allOrderNumber.setTimeStr(DateUtils.format(orderNumber.get(0).getTime(), DateUtils.FORMAT_LONG));
				}
				totalNumber = totalNumber + orderNumber.size();
				allOrderNumbers.add(allOrderNumber);
			}
			order.setNumberCount(totalNumber);
			order.setAllOrderNumber(allOrderNumbers);*/
			List<AllOrderNumber> allOrderNumbers = new ArrayList<AllOrderNumber>();
			Integer totalNumber=0;
			AllOrderNumber allOrderNumber = new AllOrderNumber();
			List<OrderNumber> orderNumber = orderNumberMapper.selectByOrderId(order.getOrderId());
			allOrderNumber.setOrderNumber(orderNumber);
			allOrderNumber.setSize(orderNumber.size());
			if(orderNumber.size()>=1){
				allOrderNumber.setTimeStr(DateUtils.format(orderNumber.get(0).getTime(), DateUtils.FORMAT_LONG));
			}
			totalNumber = totalNumber + orderNumber.size();
			allOrderNumbers.add(allOrderNumber);
			order.setNumberCount(totalNumber);
			order.setAllOrderNumber(allOrderNumbers);
			Term term = termMapper.selectByPrimaryKey(order.getTermId());
			order.setTerm(term);
			order.setStatus(term.getStatus());
			if (term!=null&&term.getStatus().equals("opened")) {
				term.setOpenTimeStr(DateUtils.format(term.getOpenTime(), DateUtils.FORMAT_LONG));
				Winner winner = new Winner();
				Order luckyOrder = orderMapper.selectByPrimaryKey(term.getLuckyOrder());
				if (luckyOrder != null) {
					UserProfile userProfile = userProfileMapper.selectByUserId(luckyOrder.getUserId());
					if (userProfile != null) {
						winner.setName(userProfile.getNickName());
					}
					List<OrderNumber> winOrderNumber = orderNumberMapper.selectByOrderId(luckyOrder.getOrderId());
					OrderNumber luckyNumber = orderNumberMapper.selectByLuckyNumberByOrderId(luckyOrder.getOrderId());
					//winner.setOrderNumber(winOrderNumber);
					winner.setLuckyNumber(luckyNumber.getNumber());
					winner.setCount(winOrderNumber.size());
					User user = userMapper.selectByPrimaryKey(luckyOrder.getUserId());
					if(user!=null){
						winner.setSerialNum(user.getSerialNum());
					}
				}
				order.setWinner(winner);
			} 
		}
		return order;
	}

	@Override
	public User getUserBySerialNum(String serialNum) {
		return userMapper.selectBySerialNum(serialNum);
	}

	@Override
	public boolean cartHandler(Integer termId,Integer userId) {
		Term term = termMapper.selectByPrimaryKey(termId);
		if(term.getStatus().equals("opened")){
			term = termMapper.selectByTerm(term);
		}
		if(term!=null){
			CartItem existed = cartItemMapper.selectByUserIdAndTermId(userId,term.getTermId());
			if (existed==null) {
				CartItem cartItem = new CartItem();
				cartItem.setAmount(term.getMoneyLimit().shortValue());
				cartItem.setImageUrl(term.getProductImage());
				cartItem.setProductId(term.getProductId());
				cartItem.setTermId(term.getTermId());
				cartItem.setTitle(term.getProductTitle());
				cartItem.setUserId(userId);
				cartItem.setMoneyLimit(term.getMoneyLimit());
				logger.info(JSON.toJSONString(cartItem));
				if (cartItemMapper.insertSelective(cartItem) > 0) {
					return true;
				} else {
					return false;
				} 
			}
			return true;
		}else{
			return false;
		}
	}

	@Override
	public List<CartItem> selectCartItemForSchedule(Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<CartItem> cartItems = cartItemMapper.selectCartItemForSchedule();
		return cartItems;
	}

	@Override
	public int deleteCartItem(CartItem item) {
		return cartItemMapper.deleteByPrimaryKey(item.getItemId());
	}

	@Override
	public String orderHandler(Integer userId,String ipAddr) {
		List<CartItem> cartItems = cartItemMapper.selectByUserId(userId);
		PaymentOrder paymentOrder = new PaymentOrder();
		paymentOrder.setUserId(userId);
		paymentOrder.setTransactionType("payment");
		paymentOrder.setPaymentSerialNum(NumberUtil.generateSerialNum());
		paymentOrderMapper.insertSelective(paymentOrder);
		Integer totalMoney = 0;
		for(CartItem cartItem : cartItems ){
			Term term = termMapper.selectByPrimaryKey(cartItem.getTermId());
			if(term!=null){
				Order tmp = new Order();
				tmp.setOrderSerialnum(NumberUtil.generateSerialNum());
				tmp.setTermId(term.getTermId());
				tmp.setUserId(userId);
				tmp.setTotalPrice(new BigDecimal(cartItem.getAmount()));
				tmp.setProductImage(term.getProductImage());
				tmp.setProductPrice(term.getProductPrice());
				tmp.setProductTitle(term.getProductTitle());
				tmp.setIpAddr(ipAddr);
				tmp.setPaymentOrderId(paymentOrder.getPaymentOrderId());
				if(orderMapper.insertSelective(tmp)>0){					
					totalMoney = totalMoney + cartItem.getAmount();
					cartItemMapper.deleteByPrimaryKey(cartItem.getItemId());
				}
			}
		}
		paymentOrder.setMoney(new BigDecimal(totalMoney));
		paymentOrderMapper.updateByPrimaryKeySelective(paymentOrder);
		return paymentOrder.getPaymentSerialNum();
	}
	@Override
	public String preOrderHandler(String orderSerialnum) {
		logger.info(orderSerialnum);
		Order order = orderMapper.selectBySerialNum(orderSerialnum);
		logger.info(JSON.toJSONString(order));
		PaymentOrder paymentOrder;
		if (order!=null) {
			paymentOrder = new PaymentOrder();
			paymentOrder.setUserId(order.getUserId());
			paymentOrder.setTransactionType("payment");
			paymentOrder.setPaymentSerialNum(NumberUtil.generateSerialNum());
			paymentOrder.setMoney(order.getTotalPrice());
			paymentOrderMapper.insertSelective(paymentOrder);
			order.setPaymentOrderId(paymentOrder.getPaymentOrderId());
			orderMapper.updateByPrimaryKeySelective(order);
			return paymentOrder.getPaymentSerialNum();
		}
		return null;
	}

	@Override
	public boolean orderScheduleHandler(Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<Order> orders = orderMapper.selectForSchedule();
		for(Order order : orders){
			Date now = new Date();
			Date target = DateUtils.addMinute(order.getCreateTime(), 16);
			if(!now.before(target)){
				PaymentOrder paymentOrder = paymentOrderMapper.selectByPrimaryKey(order.getPaymentOrderId());
				if(paymentOrder!=null){
					DelPaymentOrder delPaymentOrder = new DelPaymentOrder();
					delPaymentOrder.setPaymentOrderId(paymentOrder.getPaymentOrderId());
					delPaymentOrder.setUserId(paymentOrder.getUserId());
					delPaymentOrder.setPaymentId(paymentOrder.getPaymentId());
					delPaymentOrder.setPaymentSerialNum(paymentOrder.getPaymentSerialNum());
					delPaymentOrder.setTransactionId(paymentOrder.getTransactionId());
					delPaymentOrder.setMoney(paymentOrder.getMoney());
					delPaymentOrder.setTransactionType(paymentOrder.getTransactionType());
					delPaymentOrder.setIsCompleted(paymentOrder.getIsCompleted());
					delPaymentOrder.setIsActive(paymentOrder.getIsActive());
					delPaymentOrder.setTimestamp(paymentOrder.getTimestamp());
					delPaymentOrder.setCompleteTime(paymentOrder.getCompleteTime());
					delPaymentOrderMapper.insertSelective(delPaymentOrder);
					paymentOrderMapper.deleteByPrimaryKey(paymentOrder.getPaymentOrderId());
				}
				DelOrder delOrder = new DelOrder();
				delOrder.setOrderId(order.getOrderId());
				delOrder.setOrderSerialnum(order.getOrderSerialnum());
				delOrder.setProductTitle(order.getProductTitle());
				delOrder.setProductImage(order.getProductImage());
				delOrder.setProductPrice(order.getProductPrice());
				delOrder.setTermId(order.getTermId());
				delOrder.setUserId(order.getUserId());
				delOrder.setPaymentOrderId(order.getPaymentOrderId());
				delOrder.setCreateTime(order.getCreateTime());
				delOrder.setPayTime(order.getPayTime());
				delOrder.setTotalPrice(order.getTotalPrice());
				delOrder.setIsPaid(order.getIsPaid());
				delOrder.setIsLuckyOrder(order.getIsLuckyOrder());
				delOrder.setIpAddr(order.getIpAddr());
				delOrder.setIsActive(order.getIsActive());
				delOrderMapper.insertSelective(delOrder);
				orderMapper.deleteByPrimaryKey(order.getOrderId());
			}
		}
		return true;
	}
	@Override
	public boolean pointTermOpenningHandler(Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<Term> terms = termMapper.selectForTermOpenningHandler();
		for(Term term:terms){
			if(term.getCurrentAmount()>=term.getTotalAmount()&&term.getFullTime()!=null&&term.getFullTime().before(new Date())){
				term.setStatus("openning");
				if(!term.getIsQuick()){
					Date target = DateUtils.addMinute(term.getFullTime(), 2);
					CaiPiao caiPiao = caiPiaoMapper.selectProperCaiPiao(target);
					logger.info(JSON.toJSONString(DateUtils.format(target, DateUtils.FORMAT_LONG)));
					//如果离最近开奖的时间不足一分钟，跳到下次开奖
					term.setCaipiaoTerm(caiPiao.getTermId());
					term.setOpenTime(caiPiao.getOpenTime());
					logger.info("合适的彩票期数：" + JSON.toJSONString(term));
				}
				termMapper.updateByPrimaryKeySelective(term);
			}
		}
		return true;
	}
	@Override
	public boolean pointTermOpenHandler(Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<Term> terms = termMapper.selectForTermOpenHandler();
		for(Term term:terms){
			if(term.getOpenTime().before(new Date())){
				
				term.setTotalAmount(term.getCurrentAmount());
				termMapper.updateByPrimaryKeySelective(term);
				duobaoService.openHandler(term);
				if(term.getCode().equals("")){
					Product product = productMapper.selectByPrimaryKey(term.getProductId());
					if(product!=null&&product.getIsActive()){
						duobaoService.createNewTerm(term.getTermId());
					}
				}
			}
		}
		return true;
	}
	
	@Override
	public void openPoint(Term term) {
		term.setTotalAmount(term.getCurrentAmount());
		termMapper.updateByPrimaryKeySelective(term);
		duobaoService.openHandler(term);
		if(term.getCode().equals("")){
			Product product = productMapper.selectByPrimaryKey(term.getProductId());
			if(product!=null&&product.getIsActive()){
				duobaoService.createNewTerm(term.getTermId());
			}
		}
	}
	
	@Override
	public boolean openCodeHandler(String code) {
		Term term = termMapper.selectByCode(code);
		if(term!=null){
			term.setTotalAmount(term.getCurrentAmount());
			termMapper.updateByPrimaryKeySelective(term);
			duobaoService.openHandler(term);
		}
		return true;
	}
	
	@Override
	public boolean openningCodeHandler(String code) {
		Term term = termMapper.selectByCode(code);
		if(term!=null){
			term.setStatus("openning");
			termMapper.updateByPrimaryKeySelective(term);
		}
		return true;
	}

	@Override
	public boolean cartDelHandler(Integer itemId, Integer userId) {
		CartItem item = cartItemMapper.selectByUserIdAndItemId(userId, itemId);
		if(item!=null){
			cartItemMapper.deleteByPrimaryKey(item.getItemId());
			return true;
		}
		return false;
	}
	@Override
	public boolean cartUpdateHandler(CartItem cartItem, Integer userId) {
		CartItem item = cartItemMapper.selectByUserIdAndItemId(userId, cartItem.getItemId());
		if(item!=null){
			cartItemMapper.updateByPrimaryKeySelective(cartItem);
			return true;
		}
		return false;
	}

	@Override
	public PaymentOrder getPaymentOrderBySerialNum(String paymentSerialNum) {
		return paymentOrderMapper.selectByPaymentSerialNum(paymentSerialNum);
	}

	@Override
	public List<Payment> selectPayment(PaymentOrder paymentOrder) {
		if(paymentOrder!=null&&paymentOrder.getIsPoint()){
			return paymentMapper.selectForPoint();
		}else{
			return paymentMapper.selectAllForPayment();
		}
	}

	@Override
	public FinancialAccount selectFinancialAcountByUserId(Integer userId) {
		return financialAccountMapper.selectByUserId(userId);
	}

	@Override
	public String isPaymentOrderNormal(String paymentSerialNum) {
		PaymentOrder paymentOrder = paymentOrderMapper.selectByPaymentSerialNum(paymentSerialNum);
		if(paymentOrder!=null){
			if(paymentOrder.getIsActive()&&!paymentOrder.getIsCompleted()){
				return "normal";
			}else{
				return "illegalPaymentOrder";
			}
		}else{
			return "notExisted";
		}
	}

	@Override
	public Payment getPaymentMethodById(Integer paymentId) {
		return paymentMapper.selectByPrimaryKey(paymentId);
	}

	@Override
	public PaymentStrategyResult getWCPayment(String openId, String paymentSerialNum, String title) throws PaymentHandlerException{
		PaymentOrder paymentOrder = getPaymentOrderBySerialNum(paymentSerialNum);
		PaymentStrategyResult wcPaymentResult = new PaymentStrategyResult();
		if(openId==null){
			wcPaymentResult.setResult(false);
			logger.info("openid为空");
			return wcPaymentResult;
		}
		logger.info("支付,openid : " + openId);
		try {
		
		String moneyPost = "";
		moneyPost = paymentOrder.getMoney().multiply(new BigDecimal(100)).setScale(0, BigDecimal.ROUND_UP).toString();
		
		UniteOrderResult result = getWCPayResult(paymentOrder.getUserId(), openId, moneyPost, paymentOrder,new String(title.getBytes("UTF-8"), "UTF-8"),new String(title.getBytes("UTF-8"), "UTF-8"));
		if(result.getReturn_code().equals("SUCCESS")){
			wcPaymentResult.setAppId(MerchantInfo.APPID);
			wcPaymentResult.setTimeStamp(Long.toString(System.currentTimeMillis()));
			wcPaymentResult.setNonceStr(result.getNonce_str());
			String preSign = "appId="+result.getAppid()+"&nonceStr="+result.getNonce_str()+"&package=prepay_id=" + result.getPrepay_id() + "&signType=" + "MD5" + "&timeStamp=" + Long.toString(System.currentTimeMillis()) + "&key=" + MerchantInfo.API_PASSWORD;
			wcPaymentResult.setPaySign(MyTool.getMD5(preSign.getBytes()).toUpperCase());
			wcPaymentResult.setPrePackage("prepay_id="+result.getPrepay_id());
			wcPaymentResult.setSignType("MD5");
			wcPaymentResult.setPaymentSerialNum(paymentOrder.getPaymentSerialNum());
			wcPaymentResult.setOrderSerialNum(paymentOrder.getPaymentSerialNum());
			logger.info("wcresult: " + JSON.toJSONString(wcPaymentResult));
			wcPaymentResult.setResult(true);
			return wcPaymentResult;
		}
		return wcPaymentResult;
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public UniteOrderResult getWCPayResult(Integer userId,String openId, String money,PaymentOrder paymentOrder,String body,String detail) {
		try {
		UniteOrder order = new UniteOrder();
		order.setAppid(MerchantInfo.APPID);
		order.setMch_id(MerchantInfo.MERCHANT_CODE);
		order.setOpenid(openId.toString());
		order.setDevice_info(PaymentTools.getServerIP());
		order.setNonce_str(PayMD5.GetMD5nonce_str());
		
			order.setBody(body);
		order.setDetail(detail);
		order.setOut_trade_no(paymentOrder.getPaymentSerialNum());
		order.setFee_type("CNY");
		
		
		logger.info("money1: " + money);
		order.setTotal_fee(money);
		order.setSpbill_create_ip(PaymentTools.getServerIP());
		order.setNotify_url(wc_notify_url);
		order.setTrade_type("JSAPI");  
		order.setProduct_id(paymentOrder.getPaymentSerialNum());
		String reqXML = PayImpl.generateXML(order, MerchantInfo.API_PASSWORD);
		reqXML = new String(reqXML.getBytes("UTF-8"), "UTF-8");
		System.out.println("reqXML:" + reqXML);
		
		String respXML = PayImpl.requestWechat(wc_general_order, reqXML);
		 //String respXML =HttpsPost.httpsPost(reqXML);			
		
		logger.info("respXML: " + JSON.toJSONString(respXML));
		UniteOrderResult result = (UniteOrderResult) PayImpl.turnObject(UniteOrderResult.class, respXML);
		logger.info("WXresult: " + JSON.toJSONString(result));
		return result;
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public PaymentStrategyResult paymentCommissionHandler(PaymentOrder paymentOrder, FinancialAccount account,PaymentStrategyResult result) {
		
		//更新余额
		account.setCommissionMoney(account.getCommissionMoney().subtract(paymentOrder.getMoney()));
		//发放积分
		financialAccountMapper.updateByPrimaryKeySelective(account);
		BalanceLog log = new BalanceLog();
		log.setAccountId(account.getAccountId());
		log.setBalance(account.getCommissionMoney());
		log.setConsumeMoney(paymentOrder.getMoney());
		log.setIsIn(false);
		log.setMoney(paymentOrder.getMoney());
		log.setNote("佣金支付消费");
		log.setPaymentSerialNum(paymentOrder.getPaymentSerialNum());
		log.setType(BalanceLogType.PAYMENT);
		log.setTitle("佣金支付消费");
		balanceLogMapper.insertSelective(log);
		
		//支付成功处理
		paymentSuccessHandler(paymentOrder, account, result);
		
		return result;
	}

	@Override
	public PaymentStrategyResult paymentBalanceHandler(PaymentOrder paymentOrder, FinancialAccount account,PaymentStrategyResult result) {
		
		//更新余额
		account.setBalance(account.getBalance().subtract(paymentOrder.getMoney()));
		financialAccountMapper.updateByPrimaryKeySelective(account);
		BalanceLog log = new BalanceLog();
		log.setAccountId(account.getAccountId());
		log.setBalance(account.getBalance());
		log.setConsumeMoney(paymentOrder.getMoney());
		log.setIsIn(false);
		log.setMoney(paymentOrder.getMoney());
		log.setNote("夺宝币支付消费");
		log.setPaymentSerialNum(paymentOrder.getPaymentSerialNum());
		log.setType(BalanceLogType.PAYMENT);
		log.setTitle("夺宝币支付消费");
		balanceLogMapper.insertSelective(log);
		//支付成功处理
		paymentSuccessHandler(paymentOrder, account, result);
		
		return result;
	}
	@Override
	public PaymentStrategyResult pointBalanceHandler(PaymentOrder paymentOrder, FinancialAccount account,PaymentStrategyResult result) {
		
		//更新余额
		account.setPoints(new BigDecimal(account.getPoints()).subtract(paymentOrder.getMoney()).intValue());
		financialAccountMapper.updateByPrimaryKeySelective(account);
		BalanceLog log = new BalanceLog();
		log.setAccountId(account.getAccountId());
		log.setBalance(new BigDecimal(account.getPoints()));
		log.setConsumeMoney(paymentOrder.getMoney());
		log.setIsIn(false);
		log.setMoney(paymentOrder.getMoney());
		log.setNote("积分支付消费");
		log.setPaymentSerialNum(paymentOrder.getPaymentSerialNum());
		log.setType(BalanceLogType.POINTS);
		log.setTitle("积分支付消费");
		balanceLogMapper.insertSelective(log);
		//支付成功处理
		paymentSuccessHandler(paymentOrder, account, result);
		
		return result;
	}
	
	
	private PaymentOrder createPaymentOrder(int money,Term term,UserProfile userProfile) {
		PaymentOrder paymentOrder = new PaymentOrder();
		paymentOrder.setUserId(userProfile.getUserId());
		if(!term.getIsPoint()){
			paymentOrder.setPaymentId(3);
		}else{
			paymentOrder.setPaymentId(5);
		}
		paymentOrder.setPaymentSerialNum(NumberUtil.generateSerialNum(userProfile.getUserId()));
		paymentOrder.setMoney(new BigDecimal(money));
		paymentOrder.setTransactionType("payment");
		paymentOrder.setIsPoint(term.getIsPoint());
		paymentOrderMapper.insertSelective(paymentOrder);
		Order order = new Order();
		order.setOrderSerialnum(NumberUtil.generateSerialNum(term.getTermId()));
		order.setTermId(term.getTermId());
		order.setUserId(userProfile.getUserId());
		order.setPaymentOrderId(paymentOrder.getPaymentOrderId());
		order.setTotalPrice(new BigDecimal(money));
		order.setProductImage(term.getProductImage());
		order.setProductPrice(term.getProductPrice());
		order.setProductTitle(term.getProductTitle());
		order.setIpAddr(userProfile.getIpAddr());
		order.setIsPoint(term.getIsPoint());
		order.setIsAutoBuy(true);
		orderMapper.insertSelective(order);
		return paymentOrderMapper.selectByPrimaryKey(paymentOrder.getPaymentOrderId());
	}

	
	private synchronized boolean paymentSuccessHandler(PaymentOrder paymentOrder, FinancialAccount account,
			PaymentStrategyResult paymentStrategyResult) {
		if (paymentOrder.getIsActive()&&!paymentOrder.getIsCompleted()) {
			paymentOrder.setIsActive(false);
			paymentOrder.setIsCompleted(true);
			paymentOrder.setCompleteTime(new Date());
			paymentOrderMapper.updateByPrimaryKeySelective(paymentOrder);
			Payment payment = paymentMapper.selectByPrimaryKey(paymentOrder.getPaymentId());
			if (!payment.getStrategyClassName().equals("PointPaymentStrategy")) {
				//佣金返利
				UserInvitedLink link = userInvitedLinkMapper.selectByInvitedId(paymentOrder.getUserId());
				if (link != null) {
					FinancialAccount commissionAccount = financialAccountMapper.selectByUserId(link.getUserId());
					if (commissionAccount != null) {
						logger.info("发放佣金，订单金额为： " + paymentOrder.getMoney() + "，佣金为： "
								+ MoneyFormat.moneyFormat(paymentOrder.getMoney().multiply(new BigDecimal(0.06))));
						commissionAccount.setCommissionMoney(commissionAccount.getCommissionMoney()
								.add(MoneyFormat.moneyFormat(paymentOrder.getMoney().multiply(new BigDecimal(0.06)))));
						financialAccountMapper.updateByPrimaryKeySelective(commissionAccount);
						BalanceLog log = new BalanceLog();
						log.setAccountId(commissionAccount.getAccountId());
						log.setBalance(commissionAccount.getCommissionMoney());
						log.setConsumeMoney(paymentOrder.getMoney().multiply(new BigDecimal(0.06)));
						log.setIsIn(true);
						log.setMoney(paymentOrder.getMoney().multiply(new BigDecimal(0.06)));
						log.setNote("邀请好友消费返佣");
						log.setPaymentSerialNum(paymentOrder.getPaymentSerialNum());
						log.setType(BalanceLogType.COMMISSION);
						log.setTitle("邀请好友消费返佣");
						balanceLogMapper.insertSelective(log);
					}
				} 
			}
			//生成幸运号
			List<Order> orders = orderMapper.selectByPaymentOrderId(paymentOrder.getPaymentOrderId());
			for (Order order : orders) {
				order.setIsPaid(true);
				orderMapper.updateIsPaidByOrderId(order.getOrderId());
				//记录成功购买人次
				int successCount = 0;
				Term term = termMapper.selectByPrimaryKey(order.getTermId());
				if (term != null) {
					OrderNumber orderNumber = orderNumberMapper.selectLatestNumberByTermId(term.getTermId());
					if (orderNumber == null) {
						orderNumber = new OrderNumber();
						orderNumber.setNumber(new Long(10000000));
						orderNumber.setRank(0);
					}
					List<OrderNumber> orderNumbers = new ArrayList<OrderNumber>();
					if (!paymentOrder.getIsPoint()) {
						for (int i = 1; i <= order.getTotalPrice().intValue(); i++) {

							if (term.getCurrentAmount() < term.getTotalAmount()) {
								//没达到总人次
								OrderNumber temp = new OrderNumber();
								temp.setNumber(orderNumber.getNumber() + i);
								temp.setOrderId(order.getOrderId());
								temp.setRank(orderNumber.getRank() + i);
								temp.setTermId(term.getTermId());
								temp.setUserId(account.getUserId());
								Date now = new Date();
								temp.setTime(now);

								String a = DateUtils.format(now, DateUtils.FORMAT_FULL);
								int index = a.lastIndexOf(".");
								String timeSufix = "";
								if (index != -1) {
									String tmp = a.substring(index, a.length());
									timeSufix = tmp;
									if (timeSufix.length() < 4) {
										for (int t = 0; t < 4 - tmp.length(); t++) {
											timeSufix = timeSufix + "0";
										}
									}
								} else {
									timeSufix = ".000";
								}
								temp.setTimeSufix(timeSufix);
								orderNumbers.add(temp);
								successCount++;
								term.setCurrentAmount(term.getCurrentAmount() + 1);
							}
						} 
					}else{
						//begin-如果是积分订单，因为积分积分订单的总价不是按人次算的，默认每个积分订单就一人次，只得一个幸运号
						OrderNumber temp = new OrderNumber();
						temp.setNumber(orderNumber.getNumber() + 1);
						temp.setOrderId(order.getOrderId());
						temp.setRank(orderNumber.getRank() + 1);
						temp.setTermId(term.getTermId());
						temp.setUserId(account.getUserId());
						Date now = new Date();
						temp.setTime(now);
						
						String a = DateUtils.format(now, DateUtils.FORMAT_FULL);
						int index = a.lastIndexOf(".");
						String timeSufix = "";
						if (index != -1) {
							String tmp = a.substring(index, a.length());
							timeSufix = tmp;
							if (timeSufix.length() < 4) {
								for (int t = 0; t < 4 - tmp.length(); t++) {
									timeSufix = timeSufix + "0";
								}
							}
						} else {
							timeSufix = ".000";
						}
						temp.setTimeSufix(timeSufix);
						orderNumbers.add(temp);
						successCount++;
						term.setCurrentAmount(term.getCurrentAmount()+1);
					}
					if(orderNumbers.size()>0){
						orderNumberMapper.batchInsert(orderNumbers);
						termMapper.updateCurrentAmountById(term.getTermId(),term.getCurrentAmount());
					}
					
					if (!paymentOrder.getIsPoint()) {
						//检测没成功购买的人次并处理
						int miss = order.getTotalPrice().intValue() - successCount;
						if (miss > 0) {
							//达到总人次，退还余额
							account.setBalance(account.getBalance().add(new BigDecimal(miss)));
							financialAccountMapper.updateByPrimaryKeySelective(account);
							BalanceLog log = new BalanceLog();
							log.setAccountId(account.getAccountId());
							log.setBalance(account.getBalance());
							log.setConsumeMoney(new BigDecimal(miss));
							log.setIsIn(true);
							log.setMoney(new BigDecimal(miss));
							log.setNote("库存不足，返还夺宝币");
							log.setPaymentSerialNum(paymentOrder.getPaymentSerialNum());
							log.setType(BalanceLogType.BALANCE);
							log.setTitle("库存不足，返还夺宝币");
							balanceLogMapper.insertSelective(log);
						}
						//给用户发送消息提醒
						UserProfile userProfile = userProfileMapper.selectByUserId(paymentOrder.getUserId());
						String message_failed = "";
						String message_success = "";
						if (userProfile != null) {
							message_failed = "尊敬的" + userProfile.getNickName() + "：\r\n" + "您的订单已处理完成，因库存不足，共计处理失败"
									+ miss + "个，支付金额已返还至个人夺宝优购夺宝币账户，点击“详情”查看订单信息。\r\n订单号：" + order.getOrderSerialnum()
									+ "\r\n订单状态：已支付" + "\r\n商品名称：" + term.getProductTitle()
									+ "\r\n如有疑问，请拨打服务手机：15902023879";
							message_success = "尊敬的" + userProfile.getNickName() + "：\r\n" + "您的订单已处理完成，共计获得夺宝号："
									+ order.getTotalPrice().intValue() + "个。" + "\r\n订单号：" + order.getOrderSerialnum()
									+ "\r\n订单状态：已支付" + "\r\n商品名称：" + term.getProductTitle() + "\r\n点击“详情”查看订单信息"
									+ "\r\n如有疑问，请拨打服务手机：15902023879";

						} else {
							message_failed = "亲，" + "您的订单已处理完成，因库存不足，共计处理失败" + miss
									+ "个，支付金额已返还至个人夺宝优购夺宝币账户，点击“详情”查看订单信息。</br>订单号：" + order.getOrderSerialnum()
									+ "\r\n订单状态：已支付" + "\r\n商品名称：" + term.getProductTitle()
									+ "\r\n如有疑问，请拨打服务手机：15902023879";
							message_success = "亲，" + "您的订单已处理完成，共计获得夺宝号：" + order.getTotalPrice().intValue() + "个。"
									+ "\r\n订单号：" + order.getOrderSerialnum() + "\r\n订单状态：已支付" + "\r\n商品名称："
									+ term.getProductTitle() + "\r\n点击“详情”查看订单信息" + "\r\n如有疑问，请拨打服务手机：15902023879";
						}
						Announcement announcement = new Announcement();
						announcement.setTitle("订单状态提醒");
						announcement.setIsForAll(false);
						if (miss > 0) {
							File file = FileUtil.convertToFile(message_failed);
							String url = null;
							url = fDFSFileUpload.getFileId(file);
							announcement.setMessageUrl(url);
							duobaoService.sendWXMessageMiss(paymentOrder.getUserId(), miss, order.getOrderSerialnum());
						} else {
							File file = FileUtil.convertToFile(message_success);
							String url = null;
							url = fDFSFileUpload.getFileId(file);
							announcement.setMessageUrl(url);
							duobaoService.sendWXMessageSuccess(paymentOrder.getUserId(), successCount,
									order.getOrderSerialnum());
						}
						announcementMapper.insertSelective(announcement);
						AnnouncementUserLinkKey key = new AnnouncementUserLinkKey();
						key.setMessageId(announcement.getMessageId());
						key.setUserId(paymentOrder.getUserId());
						announcementUserLinkMapper.insertSelective(key);
						//检测是否到达总期数
						if (term.getStatus().equals("running") && term.getCurrentAmount() >= term.getTotalAmount()) {
							term.setFullTime(new Date());
							if (!term.getIsQuick() && term.getCaipiaoTerm().equals("")) {
								Date target = DateUtils.addMinute(term.getFullTime(), 2);
								CaiPiao caiPiao = caiPiaoMapper.selectProperCaiPiao(target);
								logger.info(JSON.toJSONString(DateUtils.format(target, DateUtils.FORMAT_LONG)));
								//如果离最近开奖的时间不足一分钟，跳到下次开奖
								term.setCaipiaoTerm(caiPiao.getTermId());
								logger.info("合适的彩票期数：" + JSON.toJSONString(term));
								term.setStatus("openning");
								term.setOpenTime(caiPiao.getOpenTime());
								termMapper.updateByPrimaryKeySelective(term);
							} else {
								//duobaoService.openHandler(term);
								term.setStatus("openning");

								termMapper.updateByPrimaryKeySelective(term);
							}
							Product product = productMapper.selectByPrimaryKey(term.getProductId());
							if(product!=null&&product.getIsActive()){
								duobaoService.createNewTerm(term.getTermId());
							}
						} 
					}
				}
			}
			paymentStrategyResult.setResult(true);
			if (!paymentOrder.getIsPoint()) {
				//积分发放
				account.setPoints(
						account.getPoints() + paymentOrder.getMoney().multiply(new BigDecimal(100)).intValue());
				financialAccountMapper.updateByPrimaryKeySelective(account);
				BalanceLog pointLog = new BalanceLog();
				pointLog.setAccountId(account.getAccountId());
				pointLog.setMoney(paymentOrder.getMoney().multiply(new BigDecimal(100)));
				pointLog.setBalance(new BigDecimal(account.getPoints()));
				pointLog.setIsIn(true);
				pointLog.setNote("消费赠送积分");
				pointLog.setPaymentSerialNum(paymentOrder.getPaymentSerialNum());
				pointLog.setTitle("消费赠送积分");
				pointLog.setType(BalanceLogType.POINTS);
				balanceLogMapper.insertSelective(pointLog);
			}
			return true;
		}
		return false;
	}

	@Override
	public List<Bank> selectBankForWithdraw() {
		return bankMapper.selectAll();
	}

	@Override
	public String selectLatestBank(Integer userId) {
		Withdraw withdraw = withdrawMapper.selectLatestBankWithdraw(userId);
		if(withdraw!=null){
			return withdraw.getBank();
		}
		return "";
	}

	@Override
	public String withdrawHandler(Withdraw withdraw) throws PaymentHandlerException {
		FinancialAccount account = financialAccountMapper.selectByPrimaryKey(withdraw.getAccountId());
		if(withdraw.getMoney().compareTo(new BigDecimal(20))<0){
			return "money_limit";
		}
		if(account.getCommissionMoney().compareTo(withdraw.getMoney())>0){
			account.setCommissionMoney(account.getCommissionMoney().subtract(withdraw.getMoney()));
			
			if(financialAccountMapper.updateByPrimaryKeySelective(account)>0){
				
				withdraw.setType(BalanceLogType.COMMISSION);
				withdraw.setHandlingCharge(new BigDecimal(2));
				withdraw.setWithdrawSerialnum(NumberUtil.generateSerialNum());
				if(withdrawMapper.insertSelective(withdraw)>0){
					BalanceLog log = new BalanceLog();
					log.setAccountId(withdraw.getAccountId());
					log.setBalance(account.getCommissionMoney());
					log.setMoney(withdraw.getMoney());
					log.setIsIn(false);
					log.setPaymentSerialNum(withdraw.getWithdrawSerialnum());
					log.setType(BalanceLogType.WITHDRAW);
					log.setNote("提现扣除金额");
					log.setTitle("提现扣除金额");
					balanceLogMapper.insertSelective(log);
					return "success";
				}else{
					throw new PaymentHandlerException("系统插入错误");
				}
				
			}else{
				return "failed";
			}
		}else{
			return "money_not_enought";
		}
	}
	@Override
	public String couponWithdrawHandler(Withdraw withdraw) throws PaymentHandlerException {
		FinancialAccount account = financialAccountMapper.selectByPrimaryKey(withdraw.getAccountId());
		if(withdraw.getMoney().compareTo(new BigDecimal(20))<0){
			return "money_limit";
		}
		if(account.getCashCoupon().compareTo(withdraw.getMoney())>0){
			account.setCashCoupon(account.getCashCoupon().subtract(withdraw.getMoney()));
			
			if(financialAccountMapper.updateByPrimaryKeySelective(account)>0){
				
				withdraw.setType(BalanceLogType.CASHCOUPON);
				withdraw.setHandlingCharge(new BigDecimal(2));
				withdraw.setWithdrawSerialnum(NumberUtil.generateSerialNum());
				if(withdrawMapper.insertSelective(withdraw)>0){
					BalanceLog log = new BalanceLog();
					log.setAccountId(withdraw.getAccountId());
					log.setBalance(account.getCashCoupon());
					log.setMoney(withdraw.getMoney());
					log.setIsIn(false);
					log.setPaymentSerialNum(withdraw.getWithdrawSerialnum());
					log.setType(BalanceLogType.COUPONWITHDRAW);
					log.setNote("提现扣除代金券金额");
					log.setTitle("提现扣除代金券金额");
					balanceLogMapper.insertSelective(log);
					return "success";
				}else{
					throw new PaymentHandlerException("系统插入错误");
				}
				
			}else{
				return "failed";
			}
		}else{
			return "money_not_enought";
		}
	}

	@Override
	public PageInfo<Withdraw> getWithdrawList(Withdraw withdraw, Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		withdraw.setType(BalanceLogType.COMMISSION);
		List<Withdraw> withdrawList = withdrawMapper.selectByWithdraw(withdraw);
		for(Withdraw item : withdrawList){
			item.setApplyTimeStr(DateUtils.format(item.getApplyTime(), DateUtils.FORMAT_LONG));
		}
		PageInfo<Withdraw> pageInfo = new PageInfo<Withdraw>(withdrawList);
		return pageInfo;
	}
	@Override
	public PageInfo<Withdraw> getCouponWithdrawList(Withdraw withdraw, Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		withdraw.setType(BalanceLogType.CASHCOUPON);
		List<Withdraw> withdrawList = withdrawMapper.selectByWithdraw(withdraw);
		for(Withdraw item : withdrawList){
			item.setApplyTimeStr(DateUtils.format(item.getApplyTime(), DateUtils.FORMAT_LONG));
		}
		PageInfo<Withdraw> pageInfo = new PageInfo<Withdraw>(withdrawList);
		return pageInfo;
	}

	@Override
	public String shareHandler(String orderSerialnum, String title, MultipartFile[] images, Integer userId, String ipAddr) {
		UserShowList tmp = new UserShowList();
		Order order = orderMapper.selectBySerialNum(orderSerialnum);
		Term term = termMapper.selectByPrimaryKey(order.getTermId());
		if(order!=null&&term!=null){
			tmp.setTitle(title);
			tmp.setUserId(userId);
			tmp.setProductId(term.getProductId());
			tmp.setOrderId(order.getOrderId());
			tmp.setProductImage(order.getProductImage());
			tmp.setProductPrice(order.getProductPrice());
			tmp.setProductTitle(order.getProductTitle());
			tmp.setIpAddr(ipAddr);
			userShowListMapper.insertSelective(tmp);
			for(MultipartFile image: images){
				UserShowImageLink link = new UserShowImageLink();
				link.setImageUrl(productManageService.uploadImage(image));
				link.setShowId(tmp.getShowId());
				userShowImageLinkMapper.insertSelective(link);
			}
			return "success";
		}
		return "failed";
	}

	@Override
	public String storeApplication(StoreApplication storeApplication) {
		StoreApplication storeApplicationTmp = storeApplicationMapper.selectByUserId(storeApplication.getUserId());
		if(storeApplicationTmp!=null){
			return "existed";
		}
		String addr = "";
		State state = stateMapper.selectByPrimaryKey(storeApplication.getStateId());
		City city = cityMapper.selectByPrimaryKey(storeApplication.getCityId());
		Region region = regionMapper.selectByPrimaryKey(storeApplication.getRegionId());
		if(state!=null){
			addr = addr + state.getState();
		}
		if(city!=null){
			addr = addr + city.getCity();
		}
		if(region!=null){
			addr = addr + region.getRegion();
		}
		addr = addr + storeApplication.getAddrDetail();
		storeApplication.setAddr(addr);
		logger.info(JSON.toJSONString(storeApplication));
		if(storeApplicationMapper.insertSelective(storeApplication)>0){
			return "success";
		}
		return "failed";
	}

	@Override
	public StoreApplication getStoreApplicationByUserId(Integer userId) {
		return storeApplicationMapper.selectByUserId(userId);
	}

	@Override
	public Map<String, String> WCScan(String url, HttpServletRequest request) {
		logger.info(url);
		Map<String, String> map = new TreeMap<String, String>();
		WechatPay wechatPay = new WechatPay();
		wechatPay.setAppId(MerchantInfo.APPID);
		String nonceStr = PayMD5.GetMD5nonce_str();
		wechatPay.setNonceStr(nonceStr);
		wechatPay.setSignType("MD5");
		String timestamp = PaymentTools.getTimeStamp();
		wechatPay.setTimeStamp(timestamp);
		String appId = MerchantInfo.APPID;
		String preSignParam = "";
		HttpSession session = request.getSession();
		String jsapi_ticket = (String) session.getAttribute(GlobalSessionConstant.Ticket);
		// String jsapi_ticket = null;
		if (jsapi_ticket == null) {
			Var var = varMapper.selectByPrimaryKey(1);
			jsapi_ticket = getJSSDKTicket(var.getValue());
			session.setAttribute(GlobalSessionConstant.Ticket, jsapi_ticket);
			logger.info("设置ticket");
		}
		map.put("jsapi_ticket", jsapi_ticket);
		map.put("noncestr", nonceStr);
		map.put("timestamp", timestamp);
		for (Entry<String, String> s : map.entrySet()) {
			preSignParam = preSignParam.concat(s.getKey() + "=" + s.getValue() + "&");
		}
		preSignParam = preSignParam.concat("url=" + url);
		logger.info("preSignParam: " + preSignParam);
		String signature = EndecryptUtils.SHA1(preSignParam);
		logger.info("signature: " + signature);
		map.put("appId", appId);
		map.put("signature", signature);
		return map;
	}
	@Override
	public String getJSSDKAccessToken() {
		String requestUrl = weixin_jssdk_acceToken_url;
		Map<String, String> response = HttpUtils.transStringToMap(HttpUtils.sendGet(requestUrl, null));
		for (Entry<String, String> s : response.entrySet()) {
			logger.info("key: " + s.getKey() + "---" + "value: " + s.getValue());
		}
		return response.get("access_token");
	}
	@Override
	public String getJSSDKTicket(String access_token) {
		String requestUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi";
		Map<String, String> response = HttpUtils.transStringToMap(HttpUtils.sendGet(requestUrl, null));

		for (Entry<String, String> s : response.entrySet()) {
			logger.info("key: " + s.getKey() + "---" + "value: " + s.getValue());
		}
		return response.get("ticket");
	}

	@Override
	public CashCoupon getCashCoupon(String number) {
		return cashCouponMapper.selectByNumber(number);
	}

	@Override
	public Map<String,Object> couponHandler(String couponNumber, Integer userId) {
		Map<String,Object> map = new TreeMap<String,Object>();
		logger.info(couponNumber);
		CashCoupon coupon = cashCouponMapper.selectByNumber(couponNumber);
		if(coupon!=null){
			if(!coupon.getIsActive()){
				map.put("result", "disabled");
				return map;
			}
			
			
			//插入店铺兑换记录
			StoreCouponLinkKey key = new StoreCouponLinkKey();
			Store store = storeMapper.selectByUserId(userId);
			if(store==null){
				logger.error("用户没有拥有店铺");
				map.put("result", "error");
				return map;
			}
			//更新优惠券
			coupon.setIsActive(false);
			cashCouponMapper.updateByPrimaryKeySelective(coupon);
			
			key.setCouponId(coupon.getCouponId());
			key.setStoreId(store.getStoreId());
			storeCouponLinkMapper.insertSelective(key);
			
			//发放佣金
			FinancialAccount account = financialAccountMapper.selectByUserId(userId);
			account.setCashCoupon(account.getCashCoupon().add(coupon.getMoney()));
			financialAccountMapper.updateByPrimaryKeySelective(account);
			
			//增加流水记录
			BalanceLog log = new BalanceLog();
			log.setAccountId(account.getAccountId());
			log.setBalance(account.getCashCoupon());
			log.setIsIn(true);
			log.setMoney(coupon.getMoney());
			log.setNote("代金券兑换发放佣金");
			log.setPaymentSerialNum(coupon.getCouponNumber());
			log.setTitle("代金券兑换收入" + coupon.getMoney()  +"元");
			log.setType(BalanceLogType.CASHCOUPON);
			log.setUserId(userId);
			balanceLogMapper.insertSelective(log);
			map.put("result", "success");
			return map;
		}
		map.put("result", "notExisted");
		return map;
	}

	@Override
	public String pickAddrHandler(DeliverAddr deliverAddr) {
		Order order = orderMapper.selectBySerialNum(deliverAddr.getOrderNumber());
		DeliverAddr addr = deliverAddrMapper.selectByUserAndAddrId(deliverAddr.getUserId(),deliverAddr.getDeliveraddrId());
		if(order==null){
			return "order_not_existed";
		}
		if(!order.getIsLuckyOrder()){
			return "not_lucky_order";
		}
		if(addr==null){
			return "addr_illegle";
		}
		if(!order.getUserId().equals(deliverAddr.getUserId())){
			return "order_illegle";
		}
		order.setAddr(addr.getState() + addr.getCity() + addr.getAddrDetail());
		orderMapper.updateByPrimaryKeySelective(order);
		return "success";
	}

	@Override
	public List<Order> selectPaymentResult(String paymentSerialNum) {
		PaymentOrder paymentOrder = paymentOrderMapper.selectByPaymentSerialNum(paymentSerialNum);
		if(paymentOrder!=null){
			List<Order> orders = orderMapper.selectByPaymentOrderId(paymentOrder.getPaymentOrderId());
			for(Order order:orders){
				List<OrderNumber> orderNumber = orderNumberMapper.selectByOrderId(order.getOrderId());
				order.setAllNumberCount(orderNumber.size());
				Term term = termMapper.selectByPrimaryKey(order.getTermId());
				order.setCurrentTerm(term.getCurrentTerm());
			}
			return orders;
		}
		return null;
	}

	@Override
	public boolean invitationHandler(Integer userId, String serialNum) {
		User invitor = userMapper.selectBySerialNum(serialNum);
		User user = userMapper.selectByPrimaryKey(userId);
		if(!user.getSerialNum().equals(serialNum)&&invitor!=null){
			UserInvitedLink tmp = userInvitedLinkMapper.selectByInvitedId(userId);
			if(tmp==null){
				UserInvitedLink link = new UserInvitedLink();
				link.setUserId(invitor.getUserId());
				link.setInvitedId(userId);
				userInvitedLinkMapper.insertSelective(link);
				FinancialAccount account = financialAccountMapper.selectByUserId(userId);
				account.setPoints(account.getPoints()+50);
				financialAccountMapper.updateByPrimaryKeySelective(account);
				BalanceLog pointLog = new BalanceLog();
				pointLog.setAccountId(account.getAccountId());
				pointLog.setMoney(new BigDecimal(50));
				pointLog.setBalance(new BigDecimal(account.getPoints()));
				pointLog.setIsIn(true);
				pointLog.setNote("邀请好友赠送积分");
				pointLog.setTitle("邀请好友赠送积分");
				pointLog.setType(BalanceLogType.POINTS);
				balanceLogMapper.insertSelective(pointLog);
			}
		}
		return true;
	}

	@Override
	public boolean updateProfile(Integer userId, UserProfile userProfile) {
		UserProfile profile = userProfileMapper.selectByUserId(userId);
		if(!StringUtils.isNullOrEmpty(userProfile.getNickName())){
			profile.setNickName(userProfile.getNickName());
		}
		if(!StringUtils.isNullOrEmpty(userProfile.getPhone())){
			profile.setPhone(userProfile.getPhone());
		}
		if(userProfileMapper.updateByPrimaryKeySelective(profile)>0){
			return true;
		}
		return false;
	}
	
	@Override
	public String alipayNotifyHandle(HttpServletRequest request) {
		logger.info("支付宝异步通知开始");
		Map<String, String> params = new HashMap<String, String>();
		Map requestParams = request.getParameterMap();
		for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
			}
			// 乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
			// valueStr = new String(valueStr.getBytes("ISO-8859-1"), "gbk");
			params.put(name, valueStr);
		}
		logger.info(JSON.toJSONString(requestParams));
		// 获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以下仅供参考)//
		// 商户订单号
		String out_trade_no = null;
		String trade_no = null;
		String trade_status = null;
		String total_fee = null;
		String seller_id = null;
		try {
			out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"), "UTF-8");
			// 支付宝交易号

			trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"), "UTF-8");

			// 交易状态
			trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"), "UTF-8");
			logger.info("trade_status: " + trade_status);

			total_fee = new String(request.getParameter("total_fee").getBytes("ISO-8859-1"), "UTF-8");

			seller_id = new String(request.getParameter("seller_id").getBytes("ISO-8859-1"), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// 获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)//

		if (AlipayNotify.verify(params)) {// 验证成功
			//////////////////////////////////////////////////////////////////////////////////////////
			// 请在这里加上商户的业务逻辑程序代码

			// ——请根据您的业务逻辑来编写程序（以下代码仅作参考）——

			if (trade_status.equals("TRADE_FINISHED")) {
				// 判断该笔订单是否在商户网站中已经做过处理
				// 如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
				// 请务必判断请求时的total_fee、seller_id与通知时获取的total_fee、seller_id为一致的
				// 如果有做过处理，不执行商户的业务程序

				// 注意：
				// 退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知
			} else if (trade_status.equals("TRADE_SUCCESS")) {
				// 判断该笔订单是否在商户网站中已经做过处理
				// 如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
				// 请务必判断请求时的total_fee、seller_id与通知时获取的total_fee、seller_id为一致的
				// 如果有做过处理，不执行商户的业务程序
				if (alipayNotifySuccessHandle(out_trade_no, total_fee, seller_id,trade_no)) {
					return "success";
				}
				// 注意：
				// 付款完成后，支付宝系统发送该交易状态通知
			}

			// ——请根据您的业务逻辑来编写程序（以上代码仅作参考）——

			//////////////////////////////////////////////////////////////////////////////////////////
		} else {// 验证失败
			return "fail";
		}
		return "fail";
	}

	private boolean alipayNotifySuccessHandle(String out_trade_no, String total_fee, String seller_id,
			String trade_no) {
		PaymentOrder paymentOrder = paymentOrderMapper.selectByPaymentSerialNum(out_trade_no);
		DelPaymentOrder delPaymentOrder = delPaymentOrderMapper.selectByPaymentSerialNum(out_trade_no);
		FinancialAccount account = null;
		BigDecimal totalMoney = new BigDecimal(0);
		if(paymentOrder!=null&&delPaymentOrder==null){
			paymentOrder.setTransactionId(trade_no);
			account = financialAccountMapper.selectByUserId(paymentOrder.getUserId());
			totalMoney=paymentOrder.getMoney();
			if(paymentOrder.getIsActive()&&!paymentOrder.getIsCompleted()){
				paymentSuccessHandler(paymentOrder, account, new PaymentStrategyResult());
				return true;
			}
		}else if(delPaymentOrder!=null){
			delPaymentOrder.setTransactionId(trade_no);
			account = financialAccountMapper.selectByUserId(delPaymentOrder.getUserId());
			totalMoney=delPaymentOrder.getMoney();
			if(account!=null){
				account.setBalance(account.getBalance().add(delPaymentOrder.getMoney()));
				financialAccountMapper.updateByPrimaryKeySelective(account);
			}
			BalanceLog log = new BalanceLog();
			log.setAccountId(account.getAccountId());
			log.setBalance(account.getBalance());
			log.setIsIn(true);
			log.setMoney(delPaymentOrder.getMoney());
			log.setNote("支付逾期返还夺宝币");
			log.setPaymentSerialNum(delPaymentOrder.getPaymentSerialNum());
			log.setTitle("支付逾期返还夺宝币");
			log.setType(BalanceLogType.BALANCE);
			//订单超时没支付，退还夺宝币
			String message_failed = "亲，" + "您的订单已处理完成，因支付超时，支付失败，支付金额已全部返还至个人夺宝优购夺宝币账户，</br>订单号：" + out_trade_no + "，\r\n如有疑问，请拨打服务手机：15902023879" ;
			Announcement announcement = new Announcement();
			announcement.setTitle("订单状态提醒");
			announcement.setIsForAll(false);
			File file = FileUtil.convertToFile(message_failed);
			String url = null;
			url = fDFSFileUpload.getFileId(file);
			announcement.setMessageUrl(url);
			announcementMapper.insertSelective(announcement);
			AnnouncementUserLinkKey key = new AnnouncementUserLinkKey();
			key.setMessageId(announcement.getMessageId());
			key.setUserId(delPaymentOrder.getUserId());
			announcementUserLinkMapper.insertSelective(key);
			
			duobaoService.sendWXMessageMiss2(delPaymentOrder.getUserId(), delPaymentOrder.getPaymentSerialNum());
		}
		if (account!=null) {
			//发放积分
			account.setPoints(account.getPoints() + totalMoney.multiply(new BigDecimal(100)).intValue());
			financialAccountMapper.updateByPrimaryKeySelective(account);
			BalanceLog pointLog = new BalanceLog();
			pointLog.setAccountId(account.getAccountId());
			pointLog.setMoney(totalMoney.multiply(new BigDecimal(100)));
			pointLog.setBalance(new BigDecimal(account.getPoints()));
			pointLog.setIsIn(true);
			pointLog.setNote("消费赠送积分");
			pointLog.setPaymentSerialNum(out_trade_no);
			pointLog.setTitle("消费赠送积分");
			pointLog.setType(BalanceLogType.POINTS);
			balanceLogMapper.insertSelective(pointLog);
		}
		return false;
	}
	
	@Override
	public boolean wCNotifySuccessHandle(String paymentSerialNum,String transactionId) {
		
		PaymentOrder paymentOrder = paymentOrderMapper.selectByPaymentSerialNum(paymentSerialNum);
		DelPaymentOrder delPaymentOrder = delPaymentOrderMapper.selectByPaymentSerialNum(paymentSerialNum);
		FinancialAccount account = null;
		BigDecimal totalMoney = new BigDecimal(0);
		if(paymentOrder!=null&&delPaymentOrder==null){
			paymentOrder.setTransactionId(transactionId);
			account = financialAccountMapper.selectByUserId(paymentOrder.getUserId());
			if(paymentOrder.getIsActive()&&!paymentOrder.getIsCompleted()){
				paymentSuccessHandler(paymentOrder, account, new PaymentStrategyResult());
				return true;
			}
		}else if(delPaymentOrder!=null){
			delPaymentOrder.setTransactionId(transactionId);
			delPaymentOrderMapper.updateByPrimaryKeySelective(delPaymentOrder);
			account = financialAccountMapper.selectByUserId(delPaymentOrder.getUserId());
			if(account!=null){
				account.setBalance(account.getBalance().add(delPaymentOrder.getMoney()));
				financialAccountMapper.updateByPrimaryKeySelective(account);
			}
			BalanceLog log = new BalanceLog();
			log.setAccountId(account.getAccountId());
			log.setBalance(account.getBalance());
			log.setIsIn(true);
			log.setMoney(delPaymentOrder.getMoney());
			log.setNote("支付逾期返还夺宝币");
			log.setPaymentSerialNum(delPaymentOrder.getPaymentSerialNum());
			log.setTitle("支付逾期返还夺宝币");
			log.setType(BalanceLogType.BALANCE);
			//订单超时没支付，退还夺宝币
			String message_failed = "亲，" + "您的订单已处理完成，因支付超时，支付失败，支付金额已全部返还至个人夺宝优购夺宝币账户，</br>订单号：" + transactionId + "，\r\n如有疑问，请拨打服务手机：15902023879" ;
			Announcement announcement = new Announcement();
			announcement.setTitle("订单状态提醒");
			announcement.setIsForAll(false);
			File file = FileUtil.convertToFile(message_failed);
			String url = null;
			url = fDFSFileUpload.getFileId(file);
			announcement.setMessageUrl(url);
			announcementMapper.insertSelective(announcement);
			AnnouncementUserLinkKey key = new AnnouncementUserLinkKey();
			key.setMessageId(announcement.getMessageId());
			key.setUserId(delPaymentOrder.getUserId());
			announcementUserLinkMapper.insertSelective(key);
			
			duobaoService.sendWXMessageMiss2(delPaymentOrder.getUserId(), delPaymentOrder.getPaymentSerialNum());
		}
		if (account!=null) {
			//发放积分
			account.setPoints(account.getPoints() + totalMoney.multiply(new BigDecimal(100)).intValue());
			financialAccountMapper.updateByPrimaryKeySelective(account);
			BalanceLog pointLog = new BalanceLog();
			pointLog.setAccountId(account.getAccountId());
			pointLog.setMoney(totalMoney.multiply(new BigDecimal(100)));
			pointLog.setBalance(new BigDecimal(account.getPoints()));
			pointLog.setIsIn(true);
			pointLog.setNote("消费赠送积分");
			pointLog.setPaymentSerialNum(paymentSerialNum);
			pointLog.setTitle("消费赠送积分");
			pointLog.setType(BalanceLogType.POINTS);
			balanceLogMapper.insertSelective(pointLog);
		}
		return false;
	}
	@Override
	public PaymentStrategyResult getAlipayForFastPay(PaymentOrder paymentOrder,String title,String return_url) {
		logger.info("进入支付宝支付");
		PaymentStrategyResult alipaymentResult = new PaymentStrategyResult();
		
		String notify_url = alipay_notify_url;
		alipaymentResult.setHtml(AlipaySubmit.buildRequest("get", "确认", paymentOrder.getPaymentSerialNum(), title, paymentOrder.getMoney().toString(), "m.uclee.com", "",notify_url,return_url));
		alipaymentResult.setType("alipay");
		alipaymentResult.setResult(true);
		return alipaymentResult;
	}

	@Override
	public boolean isWC(HttpServletRequest request) {
		String browser = UserAgentUtils.getBrowserInfo(JSON.toJSONString(request.getHeader("User-Agent")));
		if (browser.contains("MicroMessenger")) {
			int version = Integer.parseInt(browser.substring(browser.length() - 1, browser.length()));
			if (version >= 5) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	@Override
	public void updateWXInfo() {
		List<OauthLogin> oauthLogins = oauthLoginMapper.selectForSchedule();
		for(OauthLogin oauthLogin : oauthLogins){
			Var var = varMapper.selectByPrimaryKey(new Integer(1));
			//获取微信用户的name 作为account
			String weiXinUserInfo = getWeiXinUserInfo(var.getValue(), oauthLogin.getOauthId());
			com.alibaba.fastjson.JSONObject weiXinUserInfoJsonData = JSON.parseObject(weiXinUserInfo);
			String errcode = weiXinUserInfoJsonData.getString("errcode");
			logger.info("erroCode: " + errcode);
			if(errcode!=null&&(errcode.equals("40001")||errcode.equals("42001"))){
				duobaoService.getGolbalAccessToken();
				var = varMapper.selectByPrimaryKey(new Integer(1));
				//获取微信用户的name 作为account
				weiXinUserInfo = getWeiXinUserInfo(var.getValue(), oauthLogin.getOauthId());
				weiXinUserInfoJsonData = JSON.parseObject(weiXinUserInfo);
			}
			String headimgurl;
			String weiXinNickName = "";
			String isSubcribe = weiXinUserInfoJsonData.getString("subscribe");
			if (isSubcribe!=null&&isSubcribe.equals("1")) {
				UserProfile profile = userProfileMapper.selectByUserId(oauthLogin.getUserId());
				weiXinNickName = EmojiFilter.filterEmoji(weiXinUserInfoJsonData.getString("nickname"));
				//headimgurl = headimgurl.replaceAll("\\", "");
				if (!Strings.isNullOrEmpty(weiXinNickName)) {
					profile.setNickName(weiXinNickName);
					profile.setName(weiXinNickName);
				}
				headimgurl = weiXinUserInfoJsonData.getString("headimgurl");
				profile.setImage(headimgurl);
				try {
					userProfileMapper.updateByPrimaryKeySelective(profile);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				oauthLogin.setIsSubcribe(true);
				oauthLoginMapper.updateByPrimaryKeySelective(oauthLogin);
			}else{
				oauthLogin.setIsSubcribe(false);
				oauthLoginMapper.updateByPrimaryKeySelective(oauthLogin);
			}
			try {
				Thread.sleep(3000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	@Override
	//通过全局的token 和 openId 获取用户的信息
	public String getWeiXinUserInfo(String token,String openId){  
		String url =  "https://api.weixin.qq.com/cgi-bin/user/info?access_token="+token+"&openid="+openId; 
        CloseableHttpClient httpclient = HttpClients.createDefault();  
        HttpGet httpget = new HttpGet(url);   
        CloseableHttpResponse response = null;  
        String content ="";  
        try {  
            response = httpclient.execute(httpget);  
            if(response.getStatusLine().getStatusCode()==200){  
                content = EntityUtils.toString(response.getEntity(),"utf-8");  
            }  
        } catch (ClientProtocolException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        return content;  
    }

	@Override
	public OauthLogin getOauthLoginInfoByUserId(Integer userId) {
		return oauthLoginMapper.selectByUserId(userId);
	}

	@Override
	public List<Order> getProductByPaymentSerialNum(String paymentSerialNum) {
		PaymentOrder paymentOrder = paymentOrderMapper.selectByPaymentSerialNum(paymentSerialNum);
		if(paymentOrder!=null){
			List<Order> orders = orderMapper.selectByPaymentOrderId(paymentOrder.getPaymentOrderId());
			return orders;
		}
		return null;
	}  
	
	public static int getRandom(int min,int max){
		Random random = new Random();
		return random.nextInt(max) % (max - min + 1) + min;
	}

	@Override
	public void updateOauthLogin(OauthLogin oauthLogin) {
		// TODO Auto-generated method stub
		oauthLoginMapper.updateByPrimaryKeySelective(oauthLogin);
	}

	@Override
	public void updatePaymentOrder(PaymentOrder paymentOrder) {
		// TODO Auto-generated method stub
		paymentOrderMapper.updateByPrimaryKeySelective(paymentOrder);
	}

	@Override
	public Term selectTermById(Integer termId) {
		return termMapper.selectByPrimaryKey(termId);
	}

	@Override
	public boolean getIsSubScribe(Integer userId) {
		OauthLogin oauthLogin = getOauthLoginInfoByUserId(userId);
		
		Var var = varMapper.selectByPrimaryKey(new Integer(1));
		//获取微信用户的name 作为account
		String weiXinUserInfo = getWeiXinUserInfo(var.getValue(), oauthLogin.getOauthId());
		com.alibaba.fastjson.JSONObject weiXinUserInfoJsonData = JSON.parseObject(weiXinUserInfo);
		String errcode = weiXinUserInfoJsonData.getString("errcode");
		logger.info("erroCode: " + errcode);
		if(errcode!=null&&(errcode.equals("40001")||errcode.equals("42001"))){
			duobaoService.getGolbalAccessToken();
			var = varMapper.selectByPrimaryKey(new Integer(1));
			//获取微信用户的name 作为account
			weiXinUserInfo = getWeiXinUserInfo(var.getValue(), oauthLogin.getOauthId());
			weiXinUserInfoJsonData = JSON.parseObject(weiXinUserInfo);
		}
		String isSubcribe = weiXinUserInfoJsonData.getString("subscribe");
		if (isSubcribe!=null&&isSubcribe.equals("1")) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean getHasChouJiangChange(Integer userId) {
		ChouJiang choujiang = chouJiangMapper.selectByUserId(userId);
		if(choujiang!=null){
			return false;
		}else{
			return true;
		}
	}

	@Override
	public Integer getChoujiangResult(Integer userId) {
		ChouJiang chouJiang = new ChouJiang();
		chouJiang.setResult("2090");
		chouJiang.setTag("一元红包");
		chouJiang.setUserId(userId);
		chouJiangMapper.insertSelective(chouJiang);
		FinancialAccount account = financialAccountMapper.selectByUserId(userId);
		if(account!=null){
			account.setCommissionMoney(account.getCommissionMoney().add(new BigDecimal(1)));
			financialAccountMapper.updateByPrimaryKeySelective(account);
			BalanceLog log = new BalanceLog();
			log.setAccountId(account.getAccountId());
			log.setBalance(account.getCommissionMoney());
			log.setConsumeMoney(new BigDecimal(1));
			log.setIsIn(true);
			log.setMoney(new BigDecimal(1));
			log.setNote("1元幸运抽奖红包");
			log.setPaymentSerialNum("");
			log.setType(BalanceLogType.COMMISSION);
			log.setTitle("1元幸运抽奖红包");
			balanceLogMapper.insertSelective(log);
		}
		return 3888;
	}

	@Override
	public String pointOrderHandler(Integer termId, String ipAddr,Integer userId) {
		Term term = termMapper.selectByPrimaryKey(termId);
		if(term!=null&&term.getIsPoint()){
			List<Order> order = orderMapper.selectByTermIdAndUserId(termId, userId);
			if(order.size()>0){
				return "existed";
			}
			PaymentOrder paymentOrder = new PaymentOrder();
			paymentOrder.setUserId(userId);
			paymentOrder.setTransactionType("payment");
			paymentOrder.setPaymentSerialNum(NumberUtil.generateSerialNum());
			paymentOrder.setMoney(new BigDecimal(term.getPoint()));
			paymentOrder.setIsPoint(true);
			paymentOrderMapper.insertSelective(paymentOrder);
			Order tmp = new Order();
			tmp.setOrderSerialnum(NumberUtil.generateSerialNum());
			tmp.setTermId(term.getTermId());
			tmp.setUserId(userId);
			tmp.setTotalPrice(new BigDecimal(term.getPoint()));
			tmp.setProductImage(term.getProductImage());
			tmp.setProductPrice(term.getProductPrice());
			tmp.setProductTitle(term.getProductTitle());
			tmp.setIsPoint(true);
			UserProfile profile = userProfileMapper.selectByUserId(userId);
			tmp.setIpAddr(profile.getIpAddr());
			tmp.setPaymentOrderId(paymentOrder.getPaymentOrderId());
			if(orderMapper.insertSelective(tmp)>0){
				return paymentOrder.getPaymentSerialNum();
			}
		}else{
			return "notPointProduct";
		}
		return "error";
	}

	@Override
	public List<CartItem> getCartListForPointOrder(String paymentSerialNum) {
		long a = System.currentTimeMillis();
		PaymentOrder paymentOrder = paymentOrderMapper.selectByPaymentSerialNum(paymentSerialNum);
		long b = System.currentTimeMillis();
		logger.info("b-a:" + (b-a));
		if(paymentOrder!=null){
			List<Order> orders = orderMapper.selectByPaymentOrderId(paymentOrder.getPaymentOrderId());
			long c = System.currentTimeMillis();
			logger.info("c-b:" + (c-b));
			List<CartItem> cartItems = new ArrayList<CartItem>();
			for(Order order:orders){
				CartItem cartItem = new CartItem();
				cartItem.setAmount(order.getTotalPrice().shortValue());
				cartItem.setImageUrl(order.getProductImage());
				cartItem.setTitle(order.getProductTitle());
				Term term = termMapper.selectByPrimaryKey(order.getTermId());
				if(term!=null){
					cartItem.setTerm(term);
				}
				cartItems.add(cartItem);
			}
			long d = System.currentTimeMillis();
			logger.info("d-c:" + (d-c));
			return cartItems;
		}
		return null;
	}

	@Override
	public void sendPointToSubscriber(int page, int pageSize) {
		// TODO Auto-generated method stub
		PageHelper.startPage(page, pageSize);
		List<OauthLogin> oauthLogins = oauthLoginMapper.selectNotSendPoint();
		for(OauthLogin oauthLogin:oauthLogins){
			FinancialAccount account = financialAccountMapper.selectByUserId(oauthLogin.getUserId());
			if (account!=null) {
				account.setPoints(account.getPoints()+100);
				financialAccountMapper.updateByPrimaryKeySelective(account);
				BalanceLog pointLog = new BalanceLog();
				pointLog.setAccountId(account.getAccountId());
				pointLog.setMoney(new BigDecimal(100));
				pointLog.setBalance(new BigDecimal(account.getPoints()));
				pointLog.setIsIn(true);
				pointLog.setNote("关注赠送积分");
				pointLog.setTitle("关注赠送积分");
				pointLog.setType(BalanceLogType.POINTS);
				balanceLogMapper.insertSelective(pointLog);
				oauthLogin.setIsPointSend(true);
				oauthLoginMapper.updateByPrimaryKeySelective(oauthLogin);
			}
		}
	}

	@Override
	public String pointSignin(Integer userId) {
		PointSignin pointSignin = pointSigninMapper.selectTodayByUserId(userId,DateUtils.getStartTime(),DateUtils.getEndTime());
		if(pointSignin==null){
			FinancialAccount account = financialAccountMapper.selectByUserId(userId);
			if (account!=null) {
				account.setPoints(account.getPoints()+50);
				financialAccountMapper.updateByPrimaryKeySelective(account);
				BalanceLog pointLog = new BalanceLog();
				pointLog.setAccountId(account.getAccountId());
				pointLog.setMoney(new BigDecimal(50));
				pointLog.setBalance(new BigDecimal(account.getPoints()));
				pointLog.setIsIn(true);
				pointLog.setNote("签到赠送积分");
				pointLog.setTitle("签到赠送积分");
				pointLog.setType(BalanceLogType.POINTS);
				balanceLogMapper.insertSelective(pointLog);
				PointSignin pointSigninTmp = new PointSignin();
				pointSigninTmp.setUserId(userId);
				pointSigninTmp.setTime(new Date());
				pointSigninMapper.insertSelective(pointSigninTmp);
				return account.getPoints().toString();
			}
		}
		return "existed";
	}
	
	
}
