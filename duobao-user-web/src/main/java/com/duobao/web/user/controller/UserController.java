package com.duobao.web.user.controller;

import static org.springframework.web.context.request.RequestAttributes.SCOPE_SESSION;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.scribe.model.Token;
import org.scribe.model.Verifier;
import org.scribe.oauth.OAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.duobao.date.util.DateUtils;
import com.duobao.fundation.config.links.BalanceLogType;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.config.links.TermGroupTag;
import com.duobao.fundation.config.links.WeiXinInfo;
import com.duobao.fundation.data.mybatis.mapping.TermMapper;
import com.duobao.fundation.data.mybatis.model.Announcement;
import com.duobao.fundation.data.mybatis.model.BalanceLog;
import com.duobao.fundation.data.mybatis.model.Bank;
import com.duobao.fundation.data.mybatis.model.CartItem;
import com.duobao.fundation.data.mybatis.model.CashCoupon;
import com.duobao.fundation.data.mybatis.model.Category;
import com.duobao.fundation.data.mybatis.model.City;
import com.duobao.fundation.data.mybatis.model.DeliverAddr;
import com.duobao.fundation.data.mybatis.model.FinancialAccount;
import com.duobao.fundation.data.mybatis.model.OauthLogin;
import com.duobao.fundation.data.mybatis.model.Order;
import com.duobao.fundation.data.mybatis.model.Payment;
import com.duobao.fundation.data.mybatis.model.PaymentOrder;
import com.duobao.fundation.data.mybatis.model.Region;
import com.duobao.fundation.data.mybatis.model.State;
import com.duobao.fundation.data.mybatis.model.StoreApplication;
import com.duobao.fundation.data.mybatis.model.Term;
import com.duobao.fundation.data.mybatis.model.TermGroup;
import com.duobao.fundation.data.mybatis.model.TermSearch;
import com.duobao.fundation.data.mybatis.model.User;
import com.duobao.fundation.data.mybatis.model.UserInvitedLink;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.fundation.data.mybatis.model.UserShowList;
import com.duobao.fundation.data.mybatis.model.Withdraw;
import com.duobao.user.model.AccountCenter;
import com.duobao.user.model.SharePage;
import com.duobao.user.model.TermOpenningStatus;
import com.duobao.user.model.UserCenter;
import com.duobao.user.model.UserForm;
import com.duobao.user.model.WeixinLoginResult;
import com.duobao.user.scribe.OAuthServiceProvider;
import com.duobao.user.service.DuobaoServiceI;
import com.duobao.user.service.UserServiceI;
import com.duobao.userAgent.util.UserAgentUtils;
import com.github.pagehelper.PageInfo;
import com.google.common.base.Strings;

import scala.collection.mutable.HashMap;

@Controller
@EnableAutoConfiguration
@RequestMapping("/duobao-user-web")
public class UserController extends CommonUserHandler{

	@Autowired
	private UserServiceI userService;
	@Autowired
	private DuobaoServiceI duobaoService;
	@Autowired
	private TermMapper termMapper;
	@RequestMapping("/home")
	public @ResponseBody Map<String,Object> home(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		Map<String,Object> map = new TreeMap<String,Object>();
		Integer totalBuy = duobaoService.getTotalBuyCount();
		map.put("registNum", totalBuy);
		String[] tags = {TermGroupTag.HOME_HOT,TermGroupTag.QUICK,TermGroupTag.POINT_AREA};
		List<TermGroup> groups = duobaoService.getTermGroups(tags);
		map.put("groups", groups);
		return map;
	}
	@RequestMapping("/getTotalBuy")
	public @ResponseBody Integer getTotalBuy(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		Map<String,Object> map = new TreeMap<String,Object>();
		Integer totalBuy = duobaoService.getTotalBuyCount();
		return totalBuy;
	}
	
	@RequestMapping("/getTermByCode")
	public @ResponseBody Map<String,Object> getTermByCode(HttpServletRequest request,String code) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		Term term = duobaoService.getTermByCode(code);
		if(term!=null){
			map.put("termId", term.getTermId());
		}else{
			map.put("termId", null);
		}
		return map;
	}
	
	@RequestMapping("/allProducts")
	public @ResponseBody Map<String,Object> allProducts(TermSearch termSearch,HttpServletRequest request,Integer pageNum,Integer pageSize) {
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=16;
		}
		Map<String,Object> map = new TreeMap<String,Object>();
		PageInfo<Term> terms = duobaoService.getAllProductSelective(termSearch,pageNum,pageSize);
		List<Category> cats = duobaoService.getAllCat();
		map.put("terms", terms.getList());
		map.put("pageNum", terms.getPageNum());
		map.put("hasNextPage", terms.isHasNextPage());
		map.put("cats", cats);
		return map;
	}
	
	@RequestMapping("/term")
	public @ResponseBody Map<String,Object> term(Integer termId,boolean isNew,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		User user = userService.getUserById(userId);
		Map<String,Object> map = new TreeMap<String,Object>();
		Term term = duobaoService.getTermInfo(termId,userId,isNew);
		if(user!=null){
			term.setSerialNum(user.getSerialNum());
		}
		map.put("term", term);
		return map;
	}
	
	@RequestMapping("/termResult")
	public @ResponseBody Map<String,Object> termResult(HttpServletRequest request,Integer termId,boolean isNew) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		Map<String,Object> map = new TreeMap<String,Object>();
		Order order = duobaoService.getTermResult(termId,isNew);
		map.put("order", order);
		return map;
	}
	
	@RequestMapping("/joinList")
	public @ResponseBody Map<String,Object> joinList(HttpServletRequest request,Integer termId,Integer isNew,Integer pageNum,Integer pageSize) {
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=10;
		}
		HttpSession session = request.getSession();
		Map<String,Object> map = new TreeMap<String,Object>();
		PageInfo<Order> orders = duobaoService.getJoinList(termId,isNew,pageNum,pageSize);
		map.put("pageNum", orders.getPageNum());
		map.put("hasNextPage", orders.isHasNextPage());
		map.put("orders", orders.getList());
		return map;
	}
	
	@RequestMapping("/luckyList")
	public @ResponseBody Map<String,Object> luckyList(HttpServletRequest request,Integer termId,Integer pageNum,Integer pageSize) {
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=10;
		}
		HttpSession session = request.getSession();
		Map<String,Object> map = new TreeMap<String,Object>();
		PageInfo<Term> terms = duobaoService.getLuckyList(termId,pageNum,pageSize);
		map.put("pageNum", terms.getPageNum());
		map.put("hasNextPage", terms.isHasNextPage());
		map.put("terms", terms.getList());
		return map;
	}
	
	@RequestMapping("/termResultForRecentOpen")
	public @ResponseBody Map<String,Object> termResultForRecentOpen(HttpServletRequest request,Integer termId) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		Map<String,Object> map = new TreeMap<String,Object>();
		Term term = duobaoService.getTermResultForRecentOpen(termId);
		map.put("term", term);
		return map;
	}
	
	@RequestMapping("/termStatus")
	public @ResponseBody Map<String,Object> termStatus(Integer termId,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		Map<String,Object> map = new TreeMap<String,Object>();
		TermOpenningStatus status = duobaoService.getTermOpenningStatus(termId);
		map.put("isOpen", status.getIsOpen());
		map.put("numberA", status.getNumberA());
		map.put("numberACount", status.getNumberACount());
		map.put("numberB", status.getNumberB());
		map.put("isNeedCaiPiao", status.getIsNeedCiaoPiao());
		map.put("caiPiao", status.getCaiPiao());
		map.put("result", status.getResult());
		return map;
	}
	
	
	@RequestMapping("/userCenter")
	@RequiresPermissions("customer:userCenter")
	public @ResponseBody UserCenter userCenter(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		UserCenter userCenter = new UserCenter();
		userCenter = userService.getUserCenterData(userId,request);
		return userCenter;
	}
	
	@RequestMapping("/recordList")
	@RequiresPermissions("customer:recordList")
	public @ResponseBody Map<String,Object> recordList(HttpServletRequest request,Order orderSearch,Integer pageNum,Integer pageSize) {
		Map<String,Object> map = new TreeMap<String,Object>();
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=10;
		}
		
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		if(userId==null){
			map.put("orders", new ArrayList<Order>());
			return map;
		}
		orderSearch.setUserId(userId);
		PageInfo<Order> orders = userService.getRecordList(orderSearch,pageNum,pageSize);
		map.put("pageNum", orders.getPageNum());
		map.put("hasNextPage", orders.isHasNextPage());
		map.put("orders", orders.getList());
		return map;
	}
	@RequestMapping("/winList")
	@RequiresPermissions("customer:winList")
	public @ResponseBody Map<String,Object> winList(HttpServletRequest request,Order orderSearch,Integer pageNum,Integer pageSize) {
		Map<String,Object> map = new TreeMap<String,Object>();
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=10;
		}
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		if(userId==null){
			map.put("orders", new ArrayList<Order>());
			return map;
		}
		orderSearch.setUserId(userId);
		PageInfo<Order> orders = userService.getWinRecordList(orderSearch,pageNum,pageSize);
		map.put("pageNum", orders.getPageNum());
		map.put("hasNextPage", orders.isHasNextPage());
		map.put("orders", orders.getList());
		return map;
	}
	
	@RequestMapping("/recordDetail")
	public @ResponseBody Map<String,Object> recordDetail(HttpServletRequest request,String orderSerialNum) {
		Map<String,Object> map = new TreeMap<String,Object>();
		Order order = userService.getRecordDetail(orderSerialNum);
		map.put("order", order);
		return map;
	}
	
	@RequestMapping("/cart")
	@RequiresPermissions("customer:cart")
	public @ResponseBody Map<String,Object> cart(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		List<CartItem> cart = userService.getCartList(userId);
		Integer totalMoney = 0;
		for(CartItem cartItem : cart){
			totalMoney = totalMoney + cartItem.getAmount();
		}
		Map<String,Object> map = new TreeMap<String,Object>();
		map.put("cart", cart);
		map.put("totalMoney", totalMoney);
		String[] tags = {TermGroupTag.CART_RECOMMEND};
		List<TermGroup> groups = duobaoService.getTermGroups(tags);
		map.put("groups", groups);
		return map;
	}
	
	@RequestMapping("/getPointOrderData")
	@RequiresPermissions("customer:cart")
	public @ResponseBody Map<String,Object> getPointOrderData(HttpServletRequest request,String paymentSerialNum) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		List<CartItem> cart = userService.getCartListForPointOrder(paymentSerialNum);
		Integer totalMoney = 0;
		for(CartItem cartItem : cart){
			totalMoney = totalMoney + cartItem.getAmount();
		}
		Map<String,Object> map = new TreeMap<String,Object>();
		map.put("cart", cart);
		map.put("totalMoney", totalMoney);
		/*String[] tags = {TermGroupTag.CART_RECOMMEND};
		List<TermGroup> groups = duobaoService.getTermGroups(tags);
		map.put("groups", groups);*/
		map.put("isPoint", true);
		return map;
	}
	
	@RequestMapping("/order")
	@RequiresPermissions("customer:cart")
	public @ResponseBody Map<String,Object> order(HttpServletRequest request,String orderSerialnum) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		List<CartItem> cart = userService.getCartList(userId);
		Integer totalMoney = 0;
		for(CartItem cartItem : cart){
			totalMoney = totalMoney + cartItem.getAmount();
		}
		Map<String,Object> map = new TreeMap<String,Object>();
		map.put("cart", cart);
		map.put("totalMoney", totalMoney);
		String[] tags = {TermGroupTag.CART_RECOMMEND};
		List<TermGroup> groups = duobaoService.getTermGroups(tags);
		map.put("groups", groups);
		return map;
	}
	
	@RequestMapping("/accountCenter")
	@RequiresPermissions("customer:accountCenter")
	public @ResponseBody Map<String,Object> accountCenter(HttpServletRequest request,BalanceLog logSearch,Integer pageNum,Integer pageSize) {
		Map<String,Object> map = new TreeMap<String,Object>();
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=15;
		}
		if (logSearch.getTypeQuery()!=null && !logSearch.getTypeQuery().equals("bill")) {
			logSearch.setType(BalanceLogType.POINTS);
		} else {
			logSearch.setType(BalanceLogType.PAYMENT);
		} 
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		logSearch.setUserId(userId);
		PageInfo<BalanceLog> balanceLog = userService.getBalanceLog(logSearch,pageNum,pageSize);
		FinancialAccount account = userService.getFinancialAccount(userId);
		if(balanceLog.getList()==null){
			map.put("balanceLog", new ArrayList<BalanceLog>());
		}else{
			map.put("balanceLog", balanceLog.getList());
		}
		map.put("account", account);
		map.put("pageNum", balanceLog.getPageNum());
		map.put("hasNextPage", balanceLog.isHasNextPage());
		map.put("type", logSearch.getType());
		return map;
	}
	
	@RequestMapping("/userShowList")
	@RequiresPermissions("customer:userShowList")
	public @ResponseBody Map<String,Object> userShowList(HttpServletRequest request,Integer pageNum,Integer pageSize) {
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=10;
		}
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		PageInfo<UserShowList> userShowList = userService.getUserShowList(userId,pageNum,pageSize);
		Map<String,Object> map = new TreeMap<String,Object>();
		map.put("pageNum", userShowList.getPageNum());
		map.put("hasNextPage", userShowList.isHasNextPage());
		map.put("userShowList", userShowList.getList());
		return map;
	}
	@RequestMapping("/showList")
	public @ResponseBody Map<String,Object> showList(HttpServletRequest request,Integer pageNum,Integer pageSize,Integer productId) {
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=10;
		}
		PageInfo<UserShowList> userShowList = userService.getAllShowList(pageNum,pageSize,productId);
		Map<String,Object> map = new TreeMap<String,Object>();
		map.put("pageNum", userShowList.getPageNum());
		map.put("hasNextPage", userShowList.isHasNextPage());
		map.put("userShowList", userShowList.getList());
		return map;
	}
	@RequestMapping("/share")
	@RequiresPermissions("customer:share")
	public @ResponseBody Map<String,Object> share(HttpServletRequest request,Integer pageNum) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		if(!userService.getIsSubScribe(userId)){
			map.put("isSubscribeShow", true);
		}else{
			map.put("isSubscribeShow", false);
		}
		SharePage sharePage = userService.getSharePageData(userId);
		User user = userService.getUserById(userId);
		map.put("commission", sharePage.getCommission());
		map.put("number", sharePage.getNumber());
		map.put("serialNum", user.getSerialNum());
		return map;
	}
	@RequestMapping("/addrList")
	@RequiresPermissions("customer:addrList")
	public @ResponseBody Map<String,Object> addrList(HttpServletRequest request,Integer pageNum,Integer pageSize) {
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=10;
		}
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		PageInfo<DeliverAddr> addrList = userService.getAddrList(userId,pageNum,pageSize);
		Map<String,Object> map = new TreeMap<String,Object>();
		map.put("pageNum", addrList.getPageNum());
		map.put("hasNextPage", addrList.isHasNextPage());
		map.put("addrList", addrList.getList());
		return map;
	}
	@RequestMapping("/annoucementList")
	@RequiresPermissions("customer:annoucementList")
	public @ResponseBody Map<String,Object> annoucementList(HttpServletRequest request,Integer pageNum,Integer pageSize) {
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=10;
		}
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		PageInfo<Announcement> announcement = userService.getAnnouncementList(userId,pageNum,pageSize);
		Map<String,Object> map = new TreeMap<String,Object>();
		map.put("pageNum", announcement.getPageNum());
		map.put("hasNextPage", announcement.isHasNextPage());
		map.put("announcement", announcement.getList());	
		return map;
	}
	
	@RequestMapping("/commissionDetail")
	@RequiresPermissions("customer:commissionDetail")
	public @ResponseBody Map<String,Object> commissionDetail(HttpServletRequest request,BalanceLog logSearch,Integer pageNum,Integer pageSize) {
		Map<String,Object> map = new TreeMap<String,Object>();
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=10;
		}
		logSearch.setType(BalanceLogType.COMMISSION);
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		logSearch.setUserId(userId);
		PageInfo<BalanceLog> balanceLog = userService.getCommissionDetail(logSearch,pageNum,pageSize);
		logger.info(JSON.toJSONString(balanceLog));
		if(balanceLog.getList()==null){
			map.put("balanceLog", new ArrayList<BalanceLog>());
		}else{
			map.put("balanceLog", balanceLog.getList());
		}
		map.put("pageNum", balanceLog.getPageNum());
		map.put("hasNextPage", balanceLog.isHasNextPage());
		return map;
	}
	
	@RequestMapping("/couponBalanceDetail")
	@RequiresPermissions("store:couponBalanceDetail")
	public @ResponseBody Map<String,Object> couponBalanceDetail(HttpServletRequest request,BalanceLog logSearch,Integer pageNum,Integer pageSize) {
		Map<String,Object> map = new TreeMap<String,Object>();
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=15;
		}
		logSearch.setType(BalanceLogType.CASHCOUPON);
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		logSearch.setUserId(userId);
		FinancialAccount account = userService.getFinancialAccount(userId);
		PageInfo<BalanceLog> balanceLog = userService.getCouponBalanceDetail(logSearch,pageNum,pageSize);
		map.put("balanceLog", balanceLog.getList());
		map.put("account", account);
		map.put("pageNum", balanceLog.getPageNum());
		map.put("hasNextPage", balanceLog.isHasNextPage());
		return map;
	}
	
	@RequestMapping("/invitation")
	@RequiresPermissions("customer:invitation")
	public @ResponseBody Map<String,Object> invitation(HttpServletRequest request,Integer pageNum,Integer pageSize) {
		Map<String,Object> map = new TreeMap<String,Object>();
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=15;
		}
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		PageInfo<UserInvitedLink> invitation = userService.getInvitation(userId,pageNum,pageSize);
		map.put("invitation", invitation.getList());
		map.put("pageNum", invitation.getPageNum());
		map.put("hasNextPage", invitation.isHasNextPage());
		return map;
	}
	
	@RequestMapping("/editAddr")
	@RequiresPermissions("customer:editAddr")
	public @ResponseBody Map<String,Object> editAddr(HttpServletRequest request,Integer deliverAddrId) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		if(deliverAddrId!=null){
			DeliverAddr deliverAddr = userService.getAddrInfo(userId,deliverAddrId);
			map.put("deliverAddr", deliverAddr);
			List<City> city = userService.getCities(deliverAddr.getStateId());
			map.put("city", city);
			List<Region> region = userService.getRegions(deliverAddr.getCityId());
			map.put("region", region);
		}
		List<State> state = userService.getAllState();
		map.put("state", state);
		return map;
	}
	
	@RequestMapping("/getStateForStore")
	public @ResponseBody Map<String,Object> getStateForStore(HttpServletRequest request) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		List<State> state = userService.getAllState();
		map.put("state", state);
		return map;
	}
	
	@RequestMapping("/getCities")
	public @ResponseBody Map<String,Object> getCities(HttpServletRequest request,Integer stateId) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		if(stateId!=null){
			List<City> city = userService.getCities(stateId);
			logger.info(JSON.toJSONString(city));
			map.put("city", city);
		}
		return map;
	}
	
	@RequestMapping("/getRegions")
	public @ResponseBody Map<String,Object> getRegions(HttpServletRequest request,Integer cityId) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		if(cityId!=null){
			List<Region> region = userService.getRegions(cityId);
			map.put("region", region);
		}
		return map;
	}
	
	@RequestMapping("/userHome")
	public @ResponseBody Map<String,Object> userHome(Integer type,String serialNum,Integer pageNum,HttpServletRequest request,Integer cityId) {
		if(pageNum==null){
			pageNum=1;
		}
		Map<String,Object> map = new TreeMap<String,Object>();
		User user = userService.getUserBySerialNum(serialNum);
		if(type==null){
			type=1;
		}
		if(user!=null){
			if(type.equals(1)){
				Order orderSearch = new Order();
				orderSearch.setUserId(user.getUserId());
				PageInfo<Order> orders = userService.getRecordList(orderSearch,pageNum,20);
				map.put("pageNum", orders.getPageNum());
				map.put("hasNextPage", orders.isHasNextPage());
				map.put("orders", orders.getList());
			}else if(type.equals(2)){
				Order orderSearch = new Order();
				orderSearch.setUserId(user.getUserId());
				PageInfo<Order> orders = userService.getWinRecordListForUserHome(orderSearch,pageNum,20);
				map.put("pageNum", orders.getPageNum());
				map.put("hasNextPage", orders.isHasNextPage());
				map.put("orders", orders.getList());
			}else if(type.equals(3)){
				PageInfo<UserShowList> userShowList = userService.getUserShowList(user.getUserId(),pageNum,20);
				map.put("pageNum", userShowList.getPageNum());
				map.put("hasNextPage", userShowList.isHasNextPage());
				map.put("userShowList", userShowList.getList());
			}
			UserProfile profile = userService.getBasicUserProfile(user.getUserId());
			map.put("image", profile.getImage());
			map.put("nickName", profile.getNickName());
			map.put("phone", profile.getPhone());
			map.put("ipAddr", profile.getIpAddr());
		}
		return map;
	}
	
	@RequestMapping(value = "/getUserInfo")
	@ResponseBody
	public Map<String,Object> getUserInfo(ModelMap model, HttpServletRequest request,
			HttpServletResponse response) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		UserProfile profile = userService.getBasicUserProfile(userId);
		map.put("phone", profile.getPhone());
		map.put("nickName", profile.getNickName());
		return map;
	}
	
	@RequestMapping("/ipAddr")
	public @ResponseBody Map<String,Object> ipAddr(HttpServletRequest request,Integer cityId) {
		Map<String,Object> map = new TreeMap<String,Object>();
		String ipAddr = userService.getIpAddr(request);
		map.put("ipAddr", ipAddr);
		return map;
	}
	
	@RequestMapping("/payment")
	@RequiresPermissions("customer:payment")
	public @ResponseBody Map<String,Object> payment(HttpServletRequest request,String paymentSerialNum) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		Map<String,Object> map = new TreeMap<String,Object>();
		PaymentOrder paymentOrder  = userService.getPaymentOrderBySerialNum(paymentSerialNum);
		List<Payment> payments = userService.selectPayment(paymentOrder);
		map.put("payment", payments);
		FinancialAccount account = userService.selectFinancialAcountByUserId(userId);
		if(account!=null){
			map.put("balance", account.getBalance());
			map.put("commission", account.getCommissionMoney());
			map.put("points", account.getPoints());
		}
		long c = System.currentTimeMillis();
		if(paymentOrder==null){
			PaymentOrder tmp = new PaymentOrder();
			tmp.setIsActive(false);
			map.put("paymentOrder", tmp);
			return map;
		}else{
			map.put("paymentOrder", paymentOrder);
		}
		long d = System.currentTimeMillis();
		Date end = DateUtils.addMinute(paymentOrder.getTimestamp(), 15);
		map.put("timeCountDown", end.getTime() - new Date().getTime() + 1000);
		
		map.put("totalMoney", paymentOrder.getMoney());
		return map;
	}
	
	@RequestMapping("/prePaymentForAlipay")
	public @ResponseBody Map<String,Object> prePaymentForAlipay(HttpServletRequest request,String paymentSerialNum) {
		Map<String,Object> map = new TreeMap<String,Object>();
		PaymentOrder paymentOrder  = userService.getPaymentOrderBySerialNum(paymentSerialNum);
		if(paymentOrder==null){
			map.put("paymentOrder", null);
			return map;
		}
		Date end = DateUtils.addMinute(paymentOrder.getTimestamp(), 15);
		map.put("timeCountDown", end.getTime() - new Date().getTime() + 1000);
		map.put("paymentOrder", paymentOrder);
		map.put("isWC", userService.isWC(request));
		return map;
	}
	
	@RequestMapping("/choujiang")
	@RequiresPermissions("customer:choujiang")
	public @ResponseBody Map<String,Object> choujiang(HttpServletRequest request) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		boolean isSubscribe = userService.getIsSubScribe(userId);
		map.put("isSubscribe", isSubscribe);
		boolean hasChance = userService.getHasChouJiangChange(userId);
		map.put("hasChance", hasChance);
		if(isSubscribe&&hasChance){
			Integer result = userService.getChoujiangResult(userId);
			map.put("result", result);
		}
		return map;
	}
	@RequestMapping("/isSubscribe")
	public @ResponseBody Map<String,Object> isSubscribe(HttpServletRequest request) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		boolean isSubscribe = userService.getIsSubScribe(userId);
		map.put("isSubscribe", isSubscribe);
		return map;
	}
	@RequestMapping("/getSerialNum")
	public @ResponseBody Map<String,Object> getSerialNum(HttpServletRequest request) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		User user = userService.getUserById(userId);
		if(user!=null){
			map.put("serialNum", user.getSerialNum());
		}else{
			map.put("serialNum", "");
		}
		return map;
	}
	
	@RequestMapping("/withdraw")
	@RequiresPermissions("customer:withdraw")
	public @ResponseBody Map<String,Object> withdraw(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		Map<String,Object> map = new TreeMap<String,Object>();
		FinancialAccount account = userService.selectFinancialAcountByUserId(userId);
		List<Bank> bank = userService.selectBankForWithdraw();
		String latestBank = userService.selectLatestBank(userId);
		map.put("account", account);
		map.put("banks", bank);
		map.put("latestBank", latestBank);
		return map;
	}
	
	@RequestMapping("/couponWithdraw")
	@RequiresPermissions("store:couponWithdraw")
	public @ResponseBody Map<String,Object> couponWithdraw(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		Map<String,Object> map = new TreeMap<String,Object>();
		FinancialAccount account = userService.selectFinancialAcountByUserId(userId);
		List<Bank> bank = userService.selectBankForWithdraw();
		String latestBank = userService.selectLatestBank(userId);
		map.put("account", account);
		map.put("bank", bank);
		map.put("latestBank", latestBank);
		return map;
	}
	
	@RequestMapping("/withdrawList")
	@RequiresPermissions("customer:withdrawList")
	public @ResponseBody Map<String,Object> withdrawList(HttpServletRequest request,Integer pageNum,Integer pageSize,Withdraw withdraw) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=20;
		}
		FinancialAccount account = userService.selectFinancialAcountByUserId(userId);
		withdraw.setAccountId(account.getAccountId());
		PageInfo<Withdraw> withdrawList = userService.getWithdrawList(withdraw,pageNum,pageSize);
		Map<String,Object> map = new TreeMap<String,Object>();
		map.put("pageNum", withdrawList.getPageNum());
		map.put("hasNextPage", withdrawList.isHasNextPage());
		map.put("withdrawList", withdrawList.getList());
		return map;
	}
	@RequestMapping("/couponWithdrawList")
	@RequiresPermissions("store:couponWithdrawList")
	public @ResponseBody Map<String,Object> couponWithdrawList(HttpServletRequest request,Integer pageNum,Integer pageSize,Withdraw withdraw) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=20;
		}
		FinancialAccount account = userService.selectFinancialAcountByUserId(userId);
		withdraw.setAccountId(account.getAccountId());
		PageInfo<Withdraw> withdrawList = userService.getCouponWithdrawList(withdraw,pageNum,pageSize);
		Map<String,Object> map = new TreeMap<String,Object>();
		map.put("pageNum", withdrawList.getPageNum());
		map.put("hasNextPage", withdrawList.isHasNextPage());
		map.put("withdrawList", withdrawList.getList());
		return map;
	}
	
	@RequestMapping("/storeApplyStatus")
	@RequiresPermissions("store:storeApplication")
	public @ResponseBody Map<String,Object> storeApplyStatus(HttpServletRequest request){
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		StoreApplication storeApplication = userService.getStoreApplicationByUserId(userId);
		if(storeApplication==null){
			map.put("isExisted", false);
		}
		map.put("status", storeApplication.getAuthenticatedStatus());
		map.put("isExisted", true);
		return map;
	}
	@RequestMapping(value = "/isWC")
	@ResponseBody
	public Map<String, Object> isWC(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> map = new TreeMap<String, Object>();
		String browser = UserAgentUtils.getBrowserInfo(JSON.toJSONString(request.getHeader("User-Agent")));
		if (browser.contains("MicroMessenger")) {
			int version = Integer.parseInt(browser.substring(browser.length() - 1, browser.length()));
			if (version >= 5) {
				map.put("isWC", true);
			} else {
				map.put("isWC", false);
			}
		} else {
			map.put("isWC", false);
		}
		return map;
	}

	@RequestMapping(value = "/fastPaymentScan")
	@ResponseBody
	public Map<String, String> fastPaymentScan(ModelMap model, HttpServletRequest request,
			HttpServletResponse response,String url) {
		logger.info("进入fastPaymentScan");
		logger.info(url);
		url = url.replaceAll("\\+", "&");
		return userService.WCScan(url, request);
	}
	@RequestMapping(value = "/getCouponData")
	@RequiresPermissions("store:coupon")
	@ResponseBody
	public Map<String, Object> getCouponData(ModelMap model, HttpServletRequest request,
			HttpServletResponse response,String number) {
		Map<String, Object> map = new TreeMap<String, Object>();
		CashCoupon coupon = userService.getCashCoupon(number);
		if(coupon==null){
			map.put("isExisted", false);
			return map;
		}
		map.put("number", coupon.getCouponNumber());
		map.put("money", coupon.getMoney());
		map.put("in", coupon.getDuobaoMoney().subtract(coupon.getMoney()).multiply(new BigDecimal(0.6)).add(coupon.getMoney()));
		map.put("isExisted", true);
		map.put("isActive", coupon.getIsActive());
		return map;
	}
	
	@RequestMapping(value = "/getCouponDetail")
	@RequiresPermissions("customer:getCouponDetail")
	@ResponseBody
	public Map<String, Object> getCouponDetail(ModelMap model, HttpServletRequest request,
			HttpServletResponse response,String number) {
		Map<String, Object> map = new TreeMap<String, Object>();
		CashCoupon coupon = userService.getCashCoupon(number);
		if(coupon==null){
			map.put("isExisted", false);
			return map;
		}
		map.put("number", coupon.getCouponNumber());
		map.put("money", coupon.getMoney());
		map.put("url", coupon.getUrl());
		map.put("isExisted", true);
		map.put("isActive", coupon.getIsActive());
		return map;
	}
	
	@RequestMapping(value = "/latestOpen")
	@ResponseBody
	public Map<String, Object> latestOpen(ModelMap model, HttpServletRequest request,
			HttpServletResponse response,Integer pageNum,Integer pageSize) {
		Map<String, Object> map = new TreeMap<String, Object>();
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=10;
		}
		PageInfo<Term> terms = duobaoService.getLatestOpenList(pageNum,pageSize);
		map.put("terms", terms.getList());
		map.put("pageNum", terms.getPageNum());
		map.put("hasNextPage", terms.isHasNextPage());
		return map;
	}
	@RequestMapping(value = "/waitingOpen")
	@ResponseBody
	public Map<String, Object> waitingOpen(ModelMap model, HttpServletRequest request,
			HttpServletResponse response,Integer pageNum,Integer pageSize) {
		Map<String, Object> map = new TreeMap<String, Object>();
		if(pageNum==null){
			pageNum=1;
		}
		if(pageSize==null){
			pageSize=10;
		}
		PageInfo<Term> terms = duobaoService.getWaitingOpenList(pageNum,pageSize);
		map.put("terms", terms.getList());
		map.put("pageNum", terms.getPageNum());
		map.put("hasNextPage", terms.isHasNextPage());
		return map;
	}
	/*@RequestMapping(value = "/testAutoBuy")
	public void testAutoBuy(ModelMap model, HttpServletRequest request,
			HttpServletResponse response,Integer pageNum,Integer pageSize,Integer termId) {
		for(int i=1;i<=5;i++){
			List<Term> terms = duobaoService.selectAllTerm();
			for(Term term:terms){
				if(term.getCurrentAmount().equals(0)){
					duobaoService.autoBuy(term.getTermId());
				}
			}
		}
	}*/
	@RequestMapping(value = "/testCaiPiao")
	public void testCaiPiao(ModelMap model, HttpServletRequest request,
			HttpServletResponse response,Integer pageNum,Integer pageSize) {
		duobaoService.createCaiPiaoTerm();
	}
	
	@RequestMapping(value = "/getPaymentResult")
	@ResponseBody
	public Map<String, Object> getPaymentResult(ModelMap model, HttpServletRequest request,
			HttpServletResponse response,String paymentSerialNum) {
		Map<String, Object> map = new TreeMap<String, Object>();
		PaymentOrder paymentOrder = userService.getPaymentOrderBySerialNum(paymentSerialNum);
		if(paymentOrder==null){
			return map;
		}
		map.put("isPaid", paymentOrder.getIsCompleted());
		return map;
	}
	
	@RequestMapping(value = "/wCVerify")
	@ResponseBody
	public String wCVerify(ModelMap model, HttpServletRequest request,
			HttpServletResponse response,String echostr) {
		return echostr;
	}
	@RequestMapping(value = "/paymentResult")
	@RequiresPermissions("customer:paymentResult")
	@ResponseBody
	public Map<String, Object> paymentResult(ModelMap model, HttpServletRequest request,
			HttpServletResponse response,String paymentSerialNum) {
		Map<String, Object> map = new TreeMap<String, Object>();
		List<Order> orders = userService.selectPaymentResult(paymentSerialNum);
		map.put("orders", orders);
		return map;
	}
	
	@RequestMapping(value = "/pointSignin")
	@ResponseBody
	public Map<String, Object> pointSignin(ModelMap model, HttpServletRequest request,
			HttpServletResponse response) {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		Map<String, Object> map = new TreeMap<String, Object>();
		String result = userService.pointSignin(userId);
		map.put("result", result);
		return map;
	}
	
	@RequestMapping(value = "/testWXMessage")
	@ResponseBody
	public String testWXMessage(ModelMap model, HttpServletRequest request,
			HttpServletResponse response) {
		duobaoService.sendWXMessageSuccess(105,5,"14782464907416592");
		return "";
	}
}
