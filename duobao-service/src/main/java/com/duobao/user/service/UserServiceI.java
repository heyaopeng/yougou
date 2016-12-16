package com.duobao.user.service;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.duobao.fundation.data.mybatis.model.Announcement;
import com.duobao.fundation.data.mybatis.model.BalanceLog;
import com.duobao.fundation.data.mybatis.model.Bank;
import com.duobao.fundation.data.mybatis.model.CartItem;
import com.duobao.fundation.data.mybatis.model.CashCoupon;
import com.duobao.fundation.data.mybatis.model.City;
import com.duobao.fundation.data.mybatis.model.DeliverAddr;
import com.duobao.fundation.data.mybatis.model.FinancialAccount;
import com.duobao.fundation.data.mybatis.model.OauthLogin;
import com.duobao.fundation.data.mybatis.model.Order;
import com.duobao.fundation.data.mybatis.model.Payment;
import com.duobao.fundation.data.mybatis.model.PaymentOrder;
import com.duobao.fundation.data.mybatis.model.Permission;
import com.duobao.fundation.data.mybatis.model.Product;
import com.duobao.fundation.data.mybatis.model.Region;
import com.duobao.fundation.data.mybatis.model.State;
import com.duobao.fundation.data.mybatis.model.StoreApplication;
import com.duobao.fundation.data.mybatis.model.Term;
import com.duobao.fundation.data.mybatis.model.User;
import com.duobao.fundation.data.mybatis.model.UserInvitedLink;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.fundation.data.mybatis.model.UserShowList;
import com.duobao.fundation.data.mybatis.model.Withdraw;
import com.duobao.payment.exception.PaymentHandlerException;
import com.duobao.user.model.AccountCenter;
import com.duobao.user.model.PaymentStrategyResult;
import com.duobao.user.model.SharePage;
import com.duobao.user.model.UserCenter;
import com.duobao.user.model.UserForm;
import com.github.pagehelper.PageInfo;

/**
 * @author lm
 *
 */
public interface UserServiceI {

	/*
	 * 验证用户密码
	 */
	boolean hasMatchUserPwd(User user, String inputPassword);

	int  regUser(UserForm userForm);
	
	int regUserWithoutPassword(UserForm userForm);
	
	User getUserById(Integer userId);
	
	boolean isExistAccount(String account);
	
	OauthLogin getOauthLoginInfoByOauthId(String oauthId);
	
	int socialRegister(OauthLogin oauthLogin);

	boolean updatePassword(User user);
	
	boolean addChiledUser(UserForm userForm);
	
	List<UserProfile> getSubUserList(Integer parentInd);
	
	boolean isSettingPassword(Integer userId);
	
	int deleByUserId(Integer userId);
	
	int updateUser(User user);
	int updateLoginUserMsg(UserProfile userProfile, String IP);
	 
	String getIp(HttpServletRequest request);
	 
	User getUserByChild(Integer userId);

	List<Permission> getUserPermission(Integer userId);

	UserProfile getBasicUserProfile(Integer userId);

	String getRandomNum();

	boolean createNewAccount(OauthLogin oauthLogin,String headimgurl);

	UserCenter getUserCenterData(Integer userId, HttpServletRequest request);

	PageInfo<Order> getRecordList(Order orderSearch, Integer page,Integer pageSize);

	List<CartItem> getCartList(Integer userId);

	PageInfo<BalanceLog> getBalanceLog(BalanceLog logSearch, Integer page, Integer pageSize);
	
	FinancialAccount getFinancialAccount(Integer userId);

	PageInfo<UserShowList> getUserShowList(Integer userId, Integer page, int i);

	SharePage getSharePageData(Integer userId);

	PageInfo<DeliverAddr> getAddrList(Integer userId, Integer page, Integer pageSize);

	PageInfo<Announcement> getAnnouncementList(Integer userId, Integer page, Integer pageSize);

	PageInfo<BalanceLog> getCommissionDetail(BalanceLog logSearch, Integer pageNum, Integer pageSize);

	PageInfo<UserInvitedLink> getInvitation(Integer userId, Integer pageNum, Integer pageSize);

	DeliverAddr getAddrInfo(Integer userId, Integer deliverAddrId);

	List<State> getAllState();

	List<City> getCities(Integer stateId);

	List<Region> getRegions(Integer cityId);

	String editAddrHandler(DeliverAddr addr);

	String delAddrHandler(DeliverAddr deliverAddr);

	String setDefaultAddr(DeliverAddr deliverAddr);

	Order getRecordDetail(String orderSerailNum);

	PageInfo<Order> getWinRecordList(Order orderSearch, Integer pageNum, Integer pageSize);

	PageInfo<UserShowList> getAllShowList(Integer page, Integer pageSize, Integer termId);

	User getUserBySerialNum(String serialNum);

	boolean cartHandler(Integer termIds,Integer userId);

	List<CartItem> selectCartItemForSchedule(Integer pageNum, Integer pageSize);

	int deleteCartItem(CartItem item);

	String orderHandler(Integer userId,String ipAddr);

	String getIpAddr(HttpServletRequest request);

	boolean orderScheduleHandler(Integer pageNum, Integer pageSize);

	boolean cartDelHandler(Integer itemId, Integer userId);

	boolean cartUpdateHandler(CartItem cartItem, Integer userId);

	PaymentOrder getPaymentOrderBySerialNum(String paymentSerialNum);

	List<Payment> selectPayment(PaymentOrder paymentOrder);

	FinancialAccount selectFinancialAcountByUserId(Integer userId);

	String isPaymentOrderNormal(String paymentSerialNum);

	Payment getPaymentMethodById(Integer paymentId);

	PaymentStrategyResult getWCPayment(String openId, String paymentSerialNum, String title) throws PaymentHandlerException;

	PaymentStrategyResult paymentCommissionHandler(PaymentOrder paymentOrder, FinancialAccount account,PaymentStrategyResult result);

	PaymentStrategyResult paymentBalanceHandler(PaymentOrder paymentOrder, FinancialAccount account,PaymentStrategyResult result);

	List<Bank> selectBankForWithdraw();

	String selectLatestBank(Integer userId);

	String withdrawHandler(Withdraw withdraw) throws PaymentHandlerException;
	String couponWithdrawHandler(Withdraw withdraw) throws PaymentHandlerException;

	PageInfo<Withdraw> getWithdrawList(Withdraw withdraw, Integer pageNum, Integer pageSize);

	String storeApplication(StoreApplication storeApplication);

	StoreApplication getStoreApplicationByUserId(Integer userId);

	Map<String, String> WCScan(String string, HttpServletRequest request);

	String getJSSDKAccessToken();

	String getJSSDKTicket(String access_token);

	CashCoupon getCashCoupon(String number);

	Map<String, Object> couponHandler(String couponNumber, Integer userId);

	PageInfo<BalanceLog> getCouponBalanceDetail(BalanceLog logSearch, Integer pageNum, Integer pageSize);

	PageInfo<Withdraw> getCouponWithdrawList(Withdraw withdraw, Integer pageNum, Integer pageSize);

	String pickAddrHandler(DeliverAddr deliverAddr);

	String shareHandler(String orderSerialnum, String title, MultipartFile[] images, Integer userId, String ipAddr);

	List<Order> selectPaymentResult(String paymentSerialNum);

	boolean invitationHandler(Integer userId, String serialNum);

	String preOrderHandler(String orderSerialnum);

	boolean updateProfile(Integer userId, UserProfile userProfile);

	String alipayNotifyHandle(HttpServletRequest request);

	boolean wCNotifySuccessHandle(String out_trade_no, String transaction_id);
	
	PaymentStrategyResult getAlipayForFastPay(PaymentOrder paymentOrder, String title, String return_url);
	
	boolean isWC(HttpServletRequest request);

	void updateWXInfo();

	String getWeiXinUserInfo(String token, String openId);

	PageInfo<Order> getWinRecordListForUserHome(Order orderSearch, Integer pageNum, Integer pageSize);

	OauthLogin getOauthLoginInfoByUserId(Integer userId);

	List<Order> getProductByPaymentSerialNum(String paymentSerialNum);

	void updateOauthLogin(OauthLogin oauthLogin);

	void updatePaymentOrder(PaymentOrder paymentOrder);

	Term selectTermById(Integer termId);

	boolean getIsSubScribe(Integer userId);

	boolean getHasChouJiangChange(Integer userId);

	Integer getChoujiangResult(Integer userId);

	String pointOrderHandler(Integer termId, String ipAddr,Integer userId);

	List<CartItem> getCartListForPointOrder(String paymentSerialNum);

	PaymentStrategyResult pointBalanceHandler(PaymentOrder paymentOrder, FinancialAccount account,
			PaymentStrategyResult result);

	boolean pointTermOpenningHandler(Integer pageNum, Integer pageSize);

	boolean pointTermOpenHandler(Integer pageNum, Integer pageSize);

	void sendPointToSubscriber(int i, int j);

	String pointSignin(Integer userId);

	boolean openCodeHandler(String code);

	boolean openningCodeHandler(String code);

	void openPoint(Term term);

}