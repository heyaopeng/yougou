package com.duobao.web.user.controller;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.config.links.TermGroupTag;
import com.duobao.fundation.data.mybatis.mapping.TermMapper;
import com.duobao.fundation.data.mybatis.model.CartItem;
import com.duobao.fundation.data.mybatis.model.CashCoupon;
import com.duobao.fundation.data.mybatis.model.DeliverAddr;
import com.duobao.fundation.data.mybatis.model.FinancialAccount;
import com.duobao.fundation.data.mybatis.model.Order;
import com.duobao.fundation.data.mybatis.model.Payment;
import com.duobao.fundation.data.mybatis.model.PaymentOrder;
import com.duobao.fundation.data.mybatis.model.StoreApplication;
import com.duobao.fundation.data.mybatis.model.Term;
import com.duobao.fundation.data.mybatis.model.TermGroup;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.fundation.data.mybatis.model.UserShowList;
import com.duobao.fundation.data.mybatis.model.Withdraw;
import com.duobao.fundation.dfs.fastdfs.data.Result;
import com.duobao.payment.exception.PaymentHandlerException;
import com.duobao.payment.strategy.PaymentHandlerStrategy;
import com.duobao.user.service.DuobaoServiceI;
import com.duobao.user.service.UserServiceI;
import com.duobao.userAgent.util.UserAgentUtils;
import com.duobao.user.model.PaymentStrategyResult;

@Controller
@EnableAutoConfiguration
@RequestMapping("/duobao-user-web")
public class UserHandler {
	private static final Logger logger = Logger.getLogger(UserHandler.class);
	@Autowired
	private UserServiceI userService;
	@Autowired
	private DuobaoServiceI duobaoService;
	@Autowired
	private TermMapper termMapper;
	
	@RequestMapping("/editAddrHandler")
	@RequiresPermissions("customer:editAddr")
	public @ResponseBody Map<String,Object> editAddrHandler(HttpServletRequest request,@RequestBody DeliverAddr deliverAddr) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		deliverAddr.setUserId(userId);
		logger.info(JSON.toJSONString(deliverAddr));
		String result = userService.editAddrHandler(deliverAddr);
		map.put("result", result);
		return map;
	}
	@RequestMapping("/updateUserInfo")
	@RequiresPermissions("customer:editAddr")
	public @ResponseBody Map<String,Object> updateUserInfo(HttpServletRequest request,@RequestBody UserProfile userProfile) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		boolean result = userService.updateProfile(userId,userProfile);
		map.put("result", result);
		return map;
	}
	
	@RequestMapping("/delAddrHandler")
	@RequiresPermissions("customer:editAddr")
	public @ResponseBody Map<String,Object> delAddrHandler(HttpServletRequest request,@RequestBody DeliverAddr deliverAddr) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		deliverAddr.setUserId(userId);
		logger.info(JSON.toJSONString(deliverAddr));
		String result = userService.delAddrHandler(deliverAddr);
		map.put("result", result);
		return map;
	}
	
	@RequestMapping("/pickAddrHandler")
	@RequiresPermissions("customer:editAddr")
	public @ResponseBody Map<String,Object> pickAddrHandler(HttpServletRequest request,@RequestBody DeliverAddr deliverAddr) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		deliverAddr.setUserId(userId);
		logger.info(JSON.toJSONString(deliverAddr));
		String result = userService.pickAddrHandler(deliverAddr);
		map.put("result", result);
		return map;
	}
	
	@RequestMapping("/setDefaultAddr")
	@RequiresPermissions("customer:editAddr")
	public @ResponseBody Map<String,Object> setDefaultAddr(HttpServletRequest request,@RequestBody DeliverAddr deliverAddr) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		deliverAddr.setUserId(userId);
		logger.info(JSON.toJSONString(deliverAddr));
		String result = userService.setDefaultAddr(deliverAddr);
		map.put("result", result);
		return map;
	}
	
	@RequestMapping("/cartHandler")
	@RequiresPermissions("customer:cart")
	public @ResponseBody Map<String,Object> cartHandler(HttpServletRequest request,Integer termId) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		if(userId==null){
			map.put("result", false);
		}
		/*if(userId.equals(1)){
			Term term = userService.selectTermById(termId);
			if(term.getStatus().equals("opened")){
				term = termMapper.selectByTerm(term);
			}
			if(term!=null){
				if(term.getMoneyLimit().equals(1)){
					userService.autoBuy(termId);
				}
				if(term.getMoneyLimit().equals(10)){
					userService.autoBuy10(termId);
				}
			}
			map.put("result", true);
			return map;
		}*/
		boolean result = userService.cartHandler(termId,userId);
		map.put("result", result);
		return map;
	}
	
	@RequestMapping("/cartUpdateHandler")
	@RequiresPermissions("customer:cart")
	public @ResponseBody Map<String,Object> cartUpdateHandler(HttpServletRequest request,@RequestBody CartItem cartItem) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		boolean result = userService.cartUpdateHandler(cartItem,userId);
		map.put("result", result);
		return map;
	}
	
	@RequestMapping("/cartDelHandler")
	@RequiresPermissions("customer:cart")
	public @ResponseBody Map<String,Object> cartDelHandler(HttpServletRequest request,@RequestBody CartItem cartItem) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		
		boolean result = userService.cartDelHandler(cartItem.getItemId(),userId);
		map.put("result", result);
		return map;
	}
	
	
	@RequestMapping("/orderHandler")
	@RequiresPermissions("customer:cart")
	public @ResponseBody Map<String,Object> orderHandler(HttpServletRequest request) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		String ipAddr = userService.getIpAddr(request);
		String paymentSerialNum = userService.orderHandler(userId,ipAddr);
		map.put("paymentSerialNum", paymentSerialNum);
		return map;
	}
	@RequestMapping("/preOrderHandler")
	@RequiresPermissions("customer:cart")
	public @ResponseBody Map<String,Object> preOrderHandler(HttpServletRequest request,String orderSerialnum) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		String ipAddr = userService.getIpAddr(request);
		String paymentSerialNum = userService.preOrderHandler(orderSerialnum);
		map.put("paymentSerialNum", paymentSerialNum);
		return map;
	}
	
	@RequestMapping("/pointOrderHandler")
	@RequiresPermissions("customer:cart")
	public @ResponseBody Map<String,Object> pointOrderHandler(HttpServletRequest request,Integer termId) {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		//String ipAddr = userService.getIpAddr(request);
		String paymentSerialNum = userService.pointOrderHandler(termId,"",userId);
		map.put("paymentSerialNum", paymentSerialNum);
		return map;
	}
	@Transactional(rollbackFor={Exception.class,RuntimeException.class})
	@RequestMapping("/paymentHandler")
	public @ResponseBody PaymentStrategyResult PaymentStrategyResult(HttpServletRequest request,@RequestBody PaymentOrder paymentOrder) throws PaymentHandlerException {
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		String paymentOrderStatus = userService.isPaymentOrderNormal(paymentOrder.getPaymentSerialNum());
		PaymentStrategyResult paymentStrategyResult = new PaymentStrategyResult();
		Payment payment = userService.getPaymentMethodById(paymentOrder.getPaymentId());
		//判断是否是微信浏览器
		boolean isWC = userService.isWC(request);
		paymentStrategyResult.setIsWC(isWC);
		if(payment.getStrategyClassName().equals("AlipayPaymentStrategy")&&isWC){
			paymentStrategyResult.setType("alipay");
			paymentStrategyResult.setResult(true);
			return paymentStrategyResult;
		}
		if(paymentOrderStatus.equals("normal")){
			if(payment!=null){
				PaymentHandlerStrategy paymentHandlerStrategy;
				try {
					paymentHandlerStrategy = (PaymentHandlerStrategy) Class
							.forName("com.duobao.payment.strategy." + payment.getStrategyClassName()).newInstance();
					paymentStrategyResult = paymentHandlerStrategy.payHandle(paymentOrder.getPaymentSerialNum(),payment.getPaymentId(), request, userId);
				} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
					e.printStackTrace();
				}
			}else{
				paymentStrategyResult.setReason("noPaymentMethod");
				paymentStrategyResult.setResult(false);
			}
		}else{
			paymentStrategyResult.setReason(paymentOrderStatus);
			paymentStrategyResult.setResult(false);
		}
		paymentStrategyResult.setPaymentSerialNum(paymentOrder.getPaymentSerialNum());
		return paymentStrategyResult;
	}
	@Transactional(rollbackFor={Exception.class,RuntimeException.class})
	@RequestMapping("/withdrawHandler")
	@RequiresPermissions("customer:withdraw")
	public @ResponseBody Map<String,Object> withdrawHandler(HttpServletRequest request,@RequestBody Withdraw withdraw) throws PaymentHandlerException {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		FinancialAccount account = userService.selectFinancialAcountByUserId(userId);
		withdraw.setAccountId(account.getAccountId());
		String result = userService.withdrawHandler(withdraw);
		map.put("result", result);
		return map;
	}
	
	@Transactional(rollbackFor={Exception.class,RuntimeException.class})
	@RequestMapping("/couponWithdrawHandler")
	@RequiresPermissions("store:couponWithdraw")
	public @ResponseBody Map<String,Object> couponWithdrawHandler(HttpServletRequest request,@RequestBody Withdraw withdraw) throws PaymentHandlerException {
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		FinancialAccount account = userService.selectFinancialAcountByUserId(userId);
		withdraw.setAccountId(account.getAccountId());
		String result = userService.couponWithdrawHandler(withdraw);
		map.put("result", result);
		return map;
	}
	
	@RequestMapping(value = "/shareHandler", method = RequestMethod.POST)
	@RequiresPermissions("customer:winList")
	public @ResponseBody Map<String,Object> shareHandler(HttpServletRequest request,String orderSerialnum,String title,@RequestParam(value="images", required=true)MultipartFile[] images){
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		String ipAddr = userService.getIpAddr(request);
		String result = userService.shareHandler(orderSerialnum,title,images,userId,ipAddr);
		map.put("result", result);
		return map;
	}
	
	@RequestMapping("/storeApplyHandler")
	public @ResponseBody Map<String,Object> storeApplyHandler(HttpServletRequest request,@RequestBody StoreApplication storeApplication){
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		storeApplication.setUserId(userId);
		String  result = userService.storeApplication(storeApplication);
		map.put("result", result);
		return map;
	}
	
	@RequestMapping("/invitationHandler")
	@RequiresPermissions("customer:share")
	public @ResponseBody Map<String,Object> invitationHandler(HttpServletRequest request,String serialNum){
		Map<String,Object> map = new TreeMap<String,Object>();
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		map.put("result", userService.invitationHandler(userId,serialNum));
		return map;
	}
	
	@Transactional
	@RequestMapping("/couponHandler")
	@RequiresPermissions("store:coupon")
	public @ResponseBody Map<String,Object> couponHandler(HttpServletRequest request,@RequestBody CashCoupon cashCoupon){
		HttpSession session = request.getSession();
		Integer userId = (Integer)session.getAttribute(GlobalSessionConstant.USER_ID);
		return userService.couponHandler(cashCoupon.getCouponNumber(),userId);
	}
}
