package com.duobao.user.service.impl;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TimeZone;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.map.LinkedMap;
import org.apache.commons.httpclient.util.DateUtil;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;
import org.springframework.beans.factory.annotation.Autowired;

import com.duobao.fundation.data.mybatis.mapping.TermGroupLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.TermGroupMapper;
import com.duobao.fundation.data.mybatis.mapping.TermMapper;
import com.duobao.fundation.data.mybatis.mapping.UserMapper;
import com.duobao.fundation.data.mybatis.mapping.UserProfileMapper;
import com.duobao.fundation.data.mybatis.mapping.UserRoleLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.VarMapper;
import com.alibaba.fastjson.JSON;
import com.duobao.date.util.DateUtils;
import com.duobao.file.util.FileUtil;
import com.duobao.format.util.MoneyFormat;
import com.duobao.fundation.config.links.WeiXinInfo;
import com.duobao.fundation.data.mybatis.mapping.AnnouncementMapper;
import com.duobao.fundation.data.mybatis.mapping.AnnouncementUserLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.CaiPiaoMapper;
import com.duobao.fundation.data.mybatis.mapping.CashCouponMapper;
import com.duobao.fundation.data.mybatis.mapping.CategoryMapper;
import com.duobao.fundation.data.mybatis.mapping.FinancialAccountMapper;
import com.duobao.fundation.data.mybatis.mapping.OauthLoginMapper;
import com.duobao.fundation.data.mybatis.mapping.OrderMapper;
import com.duobao.fundation.data.mybatis.mapping.OrderNumberMapper;
import com.duobao.fundation.data.mybatis.mapping.PaymentOrderMapper;
import com.duobao.fundation.data.mybatis.mapping.ProductImageLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.ProductMapper;
import com.duobao.fundation.data.mybatis.mapping.StoreApplicationMapper;
import com.duobao.fundation.data.mybatis.mapping.StoreMapper;
import com.duobao.fundation.data.mybatis.mapping.TableRowMapper;
import com.duobao.fundation.data.mybatis.model.Announcement;
import com.duobao.fundation.data.mybatis.model.AnnouncementUserLinkKey;
import com.duobao.fundation.data.mybatis.model.CaiPiao;
import com.duobao.fundation.data.mybatis.model.CashCoupon;
import com.duobao.fundation.data.mybatis.model.Category;
import com.duobao.fundation.data.mybatis.model.FinancialAccount;
import com.duobao.fundation.data.mybatis.model.OauthLogin;
import com.duobao.fundation.data.mybatis.model.Order;
import com.duobao.fundation.data.mybatis.model.OrderNumber;
import com.duobao.fundation.data.mybatis.model.PaymentOrder;
import com.duobao.fundation.data.mybatis.model.Product;
import com.duobao.fundation.data.mybatis.model.TermGroup;
import com.duobao.fundation.data.mybatis.model.TermGroupLink;
import com.duobao.fundation.data.mybatis.model.TermGroupLinkKey;
import com.duobao.fundation.data.mybatis.model.TermSearch;
import com.duobao.fundation.data.mybatis.model.TermStatic;
import com.duobao.fundation.data.mybatis.model.User;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.fundation.data.mybatis.model.UserRoleLinkKey;
import com.duobao.fundation.data.mybatis.model.Var;
import com.duobao.fundation.dfs.fastdfs.FDFSFileUpload;
import com.duobao.number.util.NumberUtil;
import com.duobao.payment.strategy.alipay.util.AlipayNotify;
import com.duobao.payment.strategy.alipay.util.AlipaySubmit;
import com.duobao.fundation.data.mybatis.model.ProductImageLink;
import com.duobao.fundation.data.mybatis.model.Store;
import com.duobao.fundation.data.mybatis.model.StoreApplication;
import com.duobao.fundation.data.mybatis.model.TableRow;
import com.duobao.fundation.data.mybatis.model.Term;
import com.duobao.user.model.AutoBuyThread;
import com.duobao.user.model.CaiPiaoData;
import com.duobao.user.model.CaiPiaoResponse;
import com.duobao.user.model.NumberA;
import com.duobao.user.model.PaymentStrategyResult;
import com.duobao.user.model.TermOpenningStatus;
import com.duobao.user.service.DuobaoServiceI;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import scala.io.BytePickle.PU;

public class DuobaoServiceImpl implements DuobaoServiceI {
	private final static Logger logger = Logger.getLogger(DuobaoServiceImpl.class);
	@Autowired
	private TermGroupMapper termGroupMapper;
	
	@Autowired
	private TermGroupLinkMapper termGroupLinkMapper;
	
	@Autowired
	private ProductMapper productMapper;
	
	@Autowired
	private ProductImageLinkMapper productImageLinkMapper;
	
	@Autowired
	private VarMapper varMapper;
	@Autowired
	private TermMapper termMapper;
	@Autowired
	private CategoryMapper categoryMapper;
	@Autowired
	private OrderMapper orderMapper;
	@Autowired
	private OrderNumberMapper orderNumberMapper;
	@Autowired
	private UserProfileMapper userProfileMapper;
	@Autowired
	private CaiPiaoMapper caiPiaoMapper;
	@Autowired
	private StoreApplicationMapper storeApplicationMapper;
	@Autowired
	private StoreMapper storeMapper;
	@Autowired
	private UserRoleLinkMapper userRoleLinkMapper;
	@Autowired
	private CashCouponMapper cashCouponMapper;
	@Autowired
	private UserMapper userMapper;

	@Autowired
	private PaymentOrderMapper paymentOrderMapper;
	
	@Autowired
	private FinancialAccountMapper financialAccountMapper;
	
	@Autowired
	private FDFSFileUpload fDFSFileUpload;
	
	@Autowired
	private AnnouncementMapper announcementMapper;
	
	@Autowired
	private OauthLoginMapper oauthLoginMapper;
	
	@Autowired
	private TableRowMapper tableRowMapper;
	
	@Autowired
	private AnnouncementUserLinkMapper announcementUserLinkMapper;
	
	private String wc_notify_url = "http://cooka.vicp.cc/seller/WCNotifyHandler";
	private String wc_general_order = "https://api.mch.weixin.qq.com/pay/unifiedorder";
	private String alipay_notify_url = "http://cooka.vicp.cc/cooka-finance-web/alipayNotifyHandler";
	private String alipay_return_url = "http://cooka.vicp.cc/fastpaysuccess/";
	@Override
	public List<TermGroup> getTermGroups(String[] tags) {
		
		List<TermGroup> groups = termGroupMapper.selectByTags(tags);
		for(TermGroup group : groups){
			List<Term> terms = new ArrayList<Term>();
			List<TermGroupLinkKey> links  = termGroupLinkMapper.selectByGroupId(group.getGroupId());
			for(TermGroupLinkKey link : links){
				long c = System.currentTimeMillis();
				
				Term term = termMapper.selectByPrimaryKey(link.getTermId());
				if(!term.getStatus().equals("running")){
					term = termMapper.selectByTerm(term);
				}
				if(term!=null){
					final int pos = term.getProductImage().lastIndexOf('.');
					String targetUrl = term.getProductImage().substring(0, pos) + "_" + 512 + "x" + 512 + "." + term.getProductImage().substring(pos + 1);
					term.setProductImage(targetUrl);
					if(term.getIsPoint()){
						term.setTag("活动专区");
					}else if(term.getIsQuick()){
						if(term.getMoneyLimit().equals(1)){
							term.setTag("一元速开");
						}else{
							term.setTag("十元速开");
						}
					}else if(term.getMoneyLimit().equals(10)){
						term.setTag("十元专区");
					}else if(term.getMoneyLimit().equals(1)){
						term.setTag("一元专区");
					}else if(term.getIsPk()){
						term.setTag("PK专区");
					}
					terms.add(term);
				}
			}
			group.setTerms(terms);
		}
		return groups;
	}

	@Override
	public PageInfo<Term> getAllProductSelective(TermSearch termSearch, Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<Term> terms = termMapper.getAllProductSelective(termSearch);
		for(Term term:terms){
			final int pos = term.getProductImage().lastIndexOf('.');
			String targetUrl = term.getProductImage().substring(0, pos) + "_" + 512 + "x" + 512 + "." + term.getProductImage().substring(pos + 1);
			term.setProductImage(targetUrl);
			//取得tag
			if(term.getIsPoint()){
				term.setTag("活动专区");
			}else if(term.getIsQuick()){
				if(term.getMoneyLimit().equals(1)){
					term.setTag("一元速开");
				}else{
					term.setTag("十元速开");
				}
			}else if(term.getMoneyLimit().equals(10)){
				term.setTag("十元专区");
			}else if(term.getMoneyLimit().equals(1)){
				term.setTag("一元专区");
			}else if(term.getIsPk()){
				term.setTag("PK专区");
			}
		}
		
		PageInfo<Term> page = new PageInfo<Term>(terms);
		return page;
	}

	@Override
	public Term getTermInfo(Integer termId,Integer userId,boolean isNew) {
		Term term = termMapper.selectByPrimaryKey(termId);
		if(isNew){
			term = termMapper.selectByTerm(term);
		}
		
		if(term != null){
			//取得tag
			if(term.getIsPoint()){
				term.setTag("活动专区");
			}else if(term.getIsQuick()){
				if(term.getMoneyLimit().equals(1)){
					term.setTag("一元速开");
				}else{
					term.setTag("十元速开");
				}
			}else if(term.getMoneyLimit().equals(10)){
				term.setTag("十元专区");
			}else if(term.getMoneyLimit().equals(1)){
				term.setTag("一元专区");
			}else if(term.getIsPk()){
				term.setTag("PK专区");
			}
			
			//产品详情
			Product product = productMapper.selectByPrimaryKey(term.getProductId());
			if(product!=null){
				term.setDescription(FileUtil.UrlRequest(product.getDescription()));
			}
			if (term.getStatus().equals("openning")) {
				if (!term.getIsPoint()) {
					CaiPiao caiPiao = caiPiaoMapper.selectByPrimaryKey(term.getCaipiaoTerm());
					if (caiPiao != null) {
						term.setTimeCountDown(caiPiao.getOpenTime().getTime() - new Date().getTime());
					}
					logger.info(JSON.toJSONString(caiPiao));
				} else {
					term.setTimeCountDown(term.getOpenTime().getTime() - new Date().getTime());
				} 
			}
			if (term.getFullTime()!=null) {
				term.setFullTimeCountDown(term.getFullTime().getTime() - new Date().getTime());
			}
			//图片
			List<ProductImageLink> productImageLinks = productImageLinkMapper.selectByProductId(term.getProductId());
			List<String> images = new ArrayList<>();
			for(ProductImageLink item: productImageLinks){
				images.add(item.getImageUrl());
			}
			term.setProductImages(images);
			//我的参与次数
			List<Order> myOrders = orderMapper.selectByTermIdAndUserId(term.getTermId(),userId);
			Integer count = 0;
			for(Order order : myOrders){
				List<OrderNumber> numbers = orderNumberMapper.selectByOrderId(order.getOrderId());
				if(numbers!=null){
					count = count + numbers.size();
				}
			}
			term.setMyOrderNumberCount(count);
			//所有参与纪录
			/*long ta = System.currentTimeMillis();
			List<Order> orders = orderMapper.selectByTermId(termId);
			for(Order item : orders ){
				long tb = System.currentTimeMillis();
				UserProfile profile = userProfileMapper.selectByUserId(item.getUserId());
				if(profile!=null){
					item.setNickName(profile.getNickName());
					item.setUserImage(profile.getImage());
				}
				long tc = System.currentTimeMillis();
				logger.info("第二阶段:" + (tc-tb));
				List<OrderNumber> numbers = orderNumberMapper.selectByOrderId(item.getOrderId());
				long td = System.currentTimeMillis();
				logger.info("第三阶段:" + (td-tc));
				if(numbers!=null){
					item.setNumberCount(numbers.size());
				}
				item.setCreateTimeStr(DateUtils.format(item.getCreateTime(), DateUtils.FORMAT_LONG));
			}
			long td = System.currentTimeMillis();
			logger.info("总:" + (td-ta));
			term.setAllOrders(orders);*/
			//最近走势
			List<TermStatic> termStatics = new ArrayList<TermStatic>();
			List<Term> terms = termMapper.selectLatestForTermInfo(term);
			for(Term item : terms){
				TermStatic tmp = new TermStatic();
				tmp.setTermNumber(item.getCurrentTerm());
				tmp.setLuckyRank(1);
				Order lucky = orderMapper.selectByPrimaryKey(item.getLuckyOrder());
				if(lucky!=null){
					OrderNumber number = orderNumberMapper.selectByLuckyNumberByOrderId(lucky.getOrderId());
					if(number!=null){
						tmp.setLuckyRank(number.getRank());
					}
				}
				termStatics.add(tmp);
			}
			term.setTermStatics(termStatics);
			
			//最近三期中奖名单
			List<Term> latestWinInfo = termMapper.selectLatestWinTermInfo(term);
			for(Term item : latestWinInfo){
				item.setOpenTimeStr(DateUtils.format(item.getOpenTime(), DateUtils.FORMAT_LONG));
				Order lucky = orderMapper.selectByPrimaryKey(item.getLuckyOrder());
				if(lucky!=null){
					UserProfile profile = userProfileMapper.selectByUserId(lucky.getUserId());
					User user = userMapper.selectByPrimaryKey(lucky.getUserId());
					if(profile!=null){
						lucky.setNickName(profile.getNickName());
						lucky.setUserImage(profile.getImage());
						lucky.setUserSerialNum(user.getSerialNum());
					}
					List<OrderNumber> orderNumber = orderNumberMapper.selectByUserIdAndTermId(lucky.getUserId(),item.getTermId());
					//logger.info(JSON.toJSONString(orderNumber));
					if(orderNumber!=null){
						lucky.setAllNumberCount(orderNumber.size());
					}
					OrderNumber luckyOrderNumber = orderNumberMapper.selectByLuckyNumberByOrderId(lucky.getOrderId());
					if(luckyOrderNumber!=null){
						lucky.setLuckyNumber(luckyOrderNumber.getNumber());
					}
					item.setWinOrder(lucky);
				}
			}
			term.setLatestWinInfo(latestWinInfo);
		}
		return term;
	}
	
	@Override
	public Order getTermResult(Integer termId,boolean isNew) {
		Term term = termMapper.selectByPrimaryKey(termId);
		if(isNew){
			term = termMapper.selectByTerm(term);
		}
		if(term != null){
			if(term.getStatus().equals("opened")){
				Order lucky = orderMapper.selectByPrimaryKey(term.getLuckyOrder());
				if(lucky!=null){
					lucky.setCurrentTerm(term.getCurrentTerm());
					UserProfile profile = userProfileMapper.selectByUserId(lucky.getUserId());
					if(profile!=null){
						lucky.setNickName(profile.getNickName());
						lucky.setUserImage(profile.getImage());
					}
					List<OrderNumber> orderNumbers = orderNumberMapper.selectByUserIdAndTermId(lucky.getUserId(),termId);
					logger.info(JSON.toJSONString(orderNumbers));
					if(orderNumbers!=null){
						lucky.setAllNumberCount(orderNumbers.size());
					}
					OrderNumber orderNumber = orderNumberMapper.selectByLuckyNumberByOrderId(lucky.getOrderId());
					lucky.setLuckyNumber(orderNumber.getNumber());
					lucky.setIsOpen(true);
					lucky.setOpenTimeStr(DateUtils.format(term.getOpenTime(), DateUtils.FORMAT_LONG));
					lucky.setStatus(term.getStatus());
				}
				if (term.getFullTime()!=null) {
					lucky.setFullTimeCountDown(term.getFullTime().getTime() - new Date().getTime());
				}
				return lucky;
			}else{
				Order order = new Order();
				order.setStatus(term.getStatus());
				order.setIsOpen(false);
				order.setCurrentTerm(term.getCurrentTerm());
				order.setTermId(term.getTermId());
				if (term.getStatus().equals("openning")) {
					if (!term.getIsPoint()) {
						CaiPiao caiPiao = caiPiaoMapper.selectByPrimaryKey(term.getCaipiaoTerm());
						if (caiPiao != null) {
							order.setTimeCountDown(caiPiao.getOpenTime().getTime() - new Date().getTime());
						}
						logger.info(JSON.toJSONString(caiPiao));
					} else {
						order.setTimeCountDown(term.getOpenTime().getTime() - new Date().getTime());
					} 
				}
				if (term.getFullTime()!=null) {
					order.setFullTimeCountDown(term.getFullTime().getTime() - new Date().getTime());
				}
				return order;
			}
		}
		return null;
	}
	@Override
	public Term getTermResultForRecentOpen(Integer termId) {
		Term term = termMapper.selectByPrimaryKey(termId);
		if(term != null){
			term.setOpenTimeStr(DateUtils.format(term.getOpenTime(), DateUtils.FORMAT_LONG));
			Order lucky = orderMapper.selectByPrimaryKey(term.getLuckyOrder());
			if(lucky!=null){
				lucky.setCurrentTerm(term.getCurrentTerm());
				UserProfile profile = userProfileMapper.selectByUserId(lucky.getUserId());
				if(profile!=null){
					lucky.setNickName(profile.getNickName());
					lucky.setUserImage(profile.getImage());
				}
				List<OrderNumber> orderNumbers = orderNumberMapper.selectByUserIdAndTermId(lucky.getUserId(),termId);
				logger.info(JSON.toJSONString(orderNumbers));
				if(orderNumbers!=null){
					lucky.setAllNumberCount(orderNumbers.size());
				}
				OrderNumber orderNumber = orderNumberMapper.selectByLuckyNumberByOrderId(lucky.getOrderId());
				lucky.setLuckyNumber(orderNumber.getNumber());
				if(term.getStatus().equals("running")||term.getStatus().equals("openning")){
					lucky.setIsOpen(false);
				}else{
					lucky.setIsOpen(true);
					lucky.setOpenTimeStr(DateUtils.format(term.getOpenTime(), DateUtils.FORMAT_LONG));
				}
				lucky.setStatus(term.getStatus());
			}
			term.setWinOrder(lucky);
			return term;
		}
		return null;
	}

	@Override
	public List<Category> getAllCat() {
		return categoryMapper.selectAll();
	}

	@Override
	public boolean caipiao() {
		Date now  = new Date();
		List<CaiPiao> caiPiao = caiPiaoMapper.selectClosedTillNow(now);
		
		//取得开采网数据
		Date today = new Date();
		String todayStr = DateUtil.formatDate(today, DateUtils.FORMAT_SHORT);
		String result = request("http://t.apiplus.cn/daily.do", "code=gdklsf&date=" + todayStr + "&format=json");
		//logger.info("code=gdklsf&date=" + todayStr + "&format=json");
		JSONObject jSONObject=JSONObject.fromObject(result);
		Map<String, Class<CaiPiaoData>> classMap = new HashMap<String, Class<CaiPiaoData>>(); 
		classMap.put("data", CaiPiaoData.class); 
        CaiPiaoResponse caiPiaoResponse = (CaiPiaoResponse)JSONObject.toBean(jSONObject, CaiPiaoResponse.class,classMap);
		//处理数据
		for(int i = caiPiaoResponse.getData().size()-1;i>=0;i--){
			for(CaiPiao item : caiPiao){
				if(caiPiaoResponse.getData().get(i).getExpect().equals(item.getTermId())){
					item.setOpenCode(caiPiaoResponse.getData().get(i).getOpencode());
					item.setOpenTime(DateUtils.parse(caiPiaoResponse.getData().get(i).getOpentime()));
					item.setIsOpen(true);
					caiPiaoMapper.updateByPrimaryKeySelective(item);
					List<Term> terms = termMapper.selectByCaiPiao(item.getTermId());
					for(Term term : terms){
						if(term.getStatus().equals("openning")){
							logger.info("彩票开奖");
							//openHandler(term);
						}
					}
				}
			}
		}
		return false;
	}
	@Override
	public synchronized boolean openHandler(Term term) {
		List<OrderNumber> orderNumbers = orderNumberMapper.selectLastFiftyForOpenning(term.getTermId());
		Long numberA = new Long(0);
		for(OrderNumber number : orderNumbers){
			numberA = numberA + transferData(number.getTime(),number.getTimeSufix());
		}
		Long result = new Long(0);
		if(term.getIsQuick()){
			result = numberA%term.getTotalAmount()+10000001;
		}else{
			//加入时时彩
			logger.info("彩票期数: " + JSON.toJSONString(term.getCaipiaoTerm()));
			CaiPiao caiPiao = caiPiaoMapper.selectByPrimaryKey(term.getCaipiaoTerm());
			if(!caiPiao.getIsOpen()){
				return false;
			}
			String code = caiPiao.getOpenCode().replaceAll(",", "");
			code = code.substring(code.length()-4, code.length());
			Long numberB = new Long(code);
			logger.info("numberB: " + JSON.toJSONString(numberB));
			result = (numberA+numberB)%term.getTotalAmount()+10000001;
		}
		logger.info("开奖结果: " + result);
		logger.info("result,term.getTermId(): " +term.getTermId());
		//更新幸运号
		OrderNumber luckyOrderNumber = orderNumberMapper.selectByNumberAndTermId(result,term.getTermId());
		Order luckyOrder = orderMapper.selectByPrimaryKey(luckyOrderNumber.getOrderId());
		logger.info(JSON.toJSONString(luckyOrder));
		luckyOrderNumber.setIsLuckyNumber(true);
		orderNumberMapper.updateByPrimaryKeySelective(luckyOrderNumber);
		//更新订单
		luckyOrder.setIsLuckyOrder(true);
		orderMapper.updateByPrimaryKeySelective(luckyOrder);
		//更新该期的幸运号
		
		term.setLuckyOrder(luckyOrder.getOrderId());
		term.setOpenTime(new Date());
		term.setStatus("opened");
		term.setLuckyNum(luckyOrderNumber.getNumber());
		
		//判断是否是优惠券，如果是，生成优惠券
		Product product = productMapper.selectByPrimaryKey(term.getProductId());
		if(product.getIsCashCoupon()){
			CashCoupon coupon = new CashCoupon();
			coupon.setCouponNumber(NumberUtil.generateSerialNum(term.getTermId()));
			coupon.setMoney(product.getMarketPrice());
			coupon.setDuobaoMoney(product.getPrice());
			FDFSFileUpload upload = new FDFSFileUpload();
	    	coupon.setUrl(upload.getFileIdForCoupon(coupon.getCouponNumber()));
			cashCouponMapper.insertSelective(coupon);
			term.setCouponId(coupon.getCouponId());
		}
		termMapper.updateByPrimaryKeySelective(term);
		//发送信息
		sendWinMessage(luckyOrder.getUserId(),luckyOrder.getOrderSerialnum());
		return true;
	}
	
	private void sendWinMessage(Integer userId,String orderSerialNum){
		//给用户发送消息提醒
		UserProfile userProfile = userProfileMapper.selectByUserId(userId);
		String message = "";
		if(userProfile!=null){
			message = "尊敬的" + userProfile.getNickName() + "：\r\n" + "您所购买的订单已已中奖" + "订单号："+orderSerialNum+"订单状态：已中奖。请及时进入个人中心填写收货地址，系统会在第一时间为您发货，谢谢您的支持。";
			
		}else{
			message ="您所购买的订单已已中奖" + "订单号："+orderSerialNum+"订单状态：已中奖。请及时进入个人中心填写收货地址，系统会在第一时间为您发货，谢谢您的支持。";
			
		}
		
		Announcement announcement = new Announcement();
		announcement.setTitle("订单状态提醒");
		announcement.setIsForAll(false);
		
		File file = FileUtil.convertToFile(message);
		String url = null;
		url = fDFSFileUpload.getFileId(file);
		announcement.setMessageUrl(url);
		sendWXMessageWin(userId,orderSerialNum);
		announcementMapper.insertSelective(announcement);
		AnnouncementUserLinkKey key = new AnnouncementUserLinkKey();
		key.setMessageId(announcement.getMessageId());
		key.setUserId(userId);
		announcementUserLinkMapper.insertSelective(key);
	}
	
	public synchronized boolean openSecond(Term term) {
		logger.info("自动开奖");
		List<OrderNumber> orderNumbers = orderNumberMapper.selectLastFiftyForOpenning(term.getTermId());
		logger.info("修改前: " + JSON.toJSONString(orderNumbers));
		Map<Long,LinkedList<OrderNumber>> map = new LinkedHashMap<Long, LinkedList<OrderNumber>>();
		int totalNumberChange = 0;
		for(int i=10;i<=orderNumbers.size()-10;i++){
			if (orderNumbers.get(i)!=null) {
				LinkedList<OrderNumber> linked = map.get(orderNumbers.get(i).getTime().getTime());
				if (linked == null) {
					LinkedList<OrderNumber> tmp = new LinkedList<OrderNumber>();
					tmp.add(orderNumbers.get(i));
					map.put(orderNumbers.get(i).getTime().getTime(), tmp);
				} else {
					linked.add(orderNumbers.get(i));
				} 
				totalNumberChange++;
			}
		}
		logger.info(JSON.toJSONString(map));
		Long numberA = new Long(0);
		for(OrderNumber number : orderNumbers){
			numberA = numberA + transferData(number.getTime(),number.getTimeSufix());
		}
		Long sourceResult = new Long(0);
		if(term.getIsQuick()){
			sourceResult = numberA%term.getTotalAmount()+10000001;
		}else{
			//加入时时彩
			CaiPiao caiPiao = caiPiaoMapper.selectByPrimaryKey(term.getCaipiaoTerm());
			if(!caiPiao.getIsOpen()){
				return false;
			}
			String code = caiPiao.getOpenCode().replaceAll(",", "");
			code = code.substring(code.length()-4, code.length());
			Long numberB = new Long(code);
			sourceResult = (numberA+numberB)%term.getTotalAmount()+10000001;
		}
		OrderNumber luckyOrderNumber = orderNumberMapper.selectByNumberAndTermId(sourceResult,term.getTermId());
		Order sourceOrder = orderMapper.selectByPrimaryKey(luckyOrderNumber.getOrderId()); 
		if(sourceOrder.getIsAutoBuy()){
			return true;
		}
		//选出最近的自动购买的号码
		OrderNumber orderNumber = null;
		orderNumber = orderNumberMapper.selectPreAutoBuy(luckyOrderNumber.getNumberId(),luckyOrderNumber.getTermId());
		if(orderNumber==null){
			orderNumber = orderNumberMapper.selectNextAutoBuy(luckyOrderNumber.getNumberId(),luckyOrderNumber.getTermId());
		}
		if(orderNumber==null){
			return false;
		}
		long targetAbs = orderNumber.getNumber()-sourceResult;
		long tmpAbs= 0;
		if(targetAbs>0){
			int i=0;
			for (Map.Entry<Long,LinkedList<OrderNumber>> entry : map.entrySet()) { 
				for(int j = entry.getValue().size()-1;j>=0;j--){
					OrderNumber item = entry.getValue().get(j);
					if (item!=null) {
						if (tmpAbs<targetAbs) {
							if (i < totalNumberChange) {
								Long numberTmp = transferData(item.getTime(), item.getTimeSufix());
								long tmp = targetAbs / totalNumberChange;
								if (tmp == 0) {
									tmp = 1;
								}
								logger.info("numberTmp: " + JSON.toJSONString(numberTmp));
								numberTmp = numberTmp + tmp;
								tmpAbs = tmpAbs + tmp;
								String number = numberTmp.toString();
								if(number.toString().length()==8){
									number = "0"+number.toString();
								}
								if(Integer.valueOf(number.substring(4, 6))>=60||Integer.valueOf(number.substring(2, 4))>=60){
									i++;
									continue;
								}
								reTransferData(item, number);
							} else {
								Long numberTmp = transferData(item.getTime(), item.getTimeSufix());
								numberTmp = numberTmp + targetAbs - tmpAbs;
								String number = numberTmp.toString();
								if(number.toString().length()==8){
									number = "0"+number.toString();
								}
								if(Integer.valueOf(number.substring(4, 6))>=60||Integer.valueOf(number.substring(2, 4))>=60){
									i++;
									continue;
								}
								reTransferData(item, number);
								logger.info("numberTmp: " + JSON.toJSONString(numberTmp));
							}
							i++;
						}else{
							break;
						}
					}
				}
			}
		}else{
			int i=0;
			for (Map.Entry<Long,LinkedList<OrderNumber>> entry : map.entrySet()) { 
				for(int j =0;j< entry.getValue().size();j++){
					OrderNumber item = entry.getValue().get(j);
					if (item!=null) {
						if (tmpAbs>targetAbs) {
							if (i < totalNumberChange) {
								Long numberTmp = transferData(item.getTime(), item.getTimeSufix());
								long tmp = targetAbs / totalNumberChange;
								if (tmp == 0) {
									tmp = -1;
								}
								numberTmp = numberTmp + tmp;
								tmpAbs = tmpAbs + tmp;
								String number = numberTmp.toString();
								if(number.toString().length()==8){
									number = "0"+number.toString();
								}
								if(Integer.valueOf(number.substring(4, 6))>=60||Integer.valueOf(number.substring(2, 4))>=60){
									i++;
									continue;
								}
								reTransferData(item, number);
							} else {
								Long numberTmp = transferData(item.getTime(), item.getTimeSufix());
								numberTmp = numberTmp + targetAbs - tmpAbs;
								String number = numberTmp.toString();
								if(number.toString().length()==8){
									number = "0"+number.toString();
								}
								if(Integer.valueOf(number.substring(4, 6))>=60||Integer.valueOf(number.substring(2, 4))>=60){
									i++;
									continue;
								}
								reTransferData(item, number);
								logger.info("numberTmp: " + JSON.toJSONString(numberTmp));
							}
							i++;
						}else{
							break;
						}
					}
				}
			}
		}
		List<OrderNumber> orderNumbersSecond = orderNumberMapper.selectLastFiftyForOpenning(term.getTermId());
		logger.info("修改后: " + JSON.toJSONString(orderNumbersSecond));
		openHandler(term);
		return true;
	}
	
	private synchronized boolean openHandlerAuto(Term term) {
		List<OrderNumber> orderNumbers = orderNumberMapper.selectLastFiftyForOpenning(term.getTermId());
		Long numberA = new Long(0);
		for(OrderNumber number : orderNumbers){
			numberA = numberA + transferData(number.getTime(),number.getTimeSufix());
		}
		Long result = new Long(0);
		if(term.getIsQuick()){
			result = numberA%term.getTotalAmount()+10000001;
		}else{
			//加入时时彩
			logger.info("彩票期数: " + JSON.toJSONString(term.getCaipiaoTerm()));
			CaiPiao caiPiao = caiPiaoMapper.selectByPrimaryKey(term.getCaipiaoTerm());
			if(!caiPiao.getIsOpen()){
				return false;
			}
			String code = caiPiao.getOpenCode().replaceAll(",", "");
			code = code.substring(code.length()-4, code.length());
			Long numberB = new Long(code);
			logger.info("numberB: " + JSON.toJSONString(numberB));
			result = (numberA+numberB)%term.getTotalAmount()+10000001;
		}
		logger.info("快速开奖结果: " + result);
		logger.info("result,term.getTermId(): " +term.getTermId());
		//更新幸运号
		OrderNumber luckyOrderNumber = orderNumberMapper.selectByNumberAndTermId(result,term.getTermId());
		luckyOrderNumber.setIsLuckyNumber(true);
		orderNumberMapper.updateByPrimaryKeySelective(luckyOrderNumber);
		//更新订单
		Order luckyOrder = orderMapper.selectByPrimaryKey(luckyOrderNumber.getOrderId());
		luckyOrder.setIsLuckyOrder(true);
		orderMapper.updateByPrimaryKeySelective(luckyOrder);
		//更新该期的幸运号
		
		term.setLuckyOrder(luckyOrder.getOrderId());
		term.setOpenTime(new Date());
		term.setStatus("opened");
		
		//判断是否是优惠券，如果是，生成优惠券
		Product product = productMapper.selectByPrimaryKey(term.getProductId());
		if(product.getIsCashCoupon()){
			CashCoupon coupon = new CashCoupon();
			coupon.setCouponNumber(NumberUtil.generateSerialNum(term.getTermId()));
			coupon.setMoney(product.getMarketPrice());
			coupon.setDuobaoMoney(product.getPrice());
			FDFSFileUpload upload = new FDFSFileUpload();
	    	coupon.setUrl(upload.getFileIdForCoupon(coupon.getCouponNumber()));
			cashCouponMapper.insertSelective(coupon);
			term.setCouponId(coupon.getCouponId());
		}
		termMapper.updateByPrimaryKeySelective(term);
		
		return true;
	}

	@Override
	public  boolean createCaiPiaoTerm() {
		Date today = new Date();
		Date tomorrow = DateUtils.addDay(today, 1);
		logger.info("today:" + DateUtils.format(today));
		logger.info("tomorrow:" + DateUtils.format(tomorrow, DateUtils.FORMAT_LONG));
		String todayStr = DateUtils.format(today, DateUtils.FORMAT_SHORT);
		Date todayStartTime = DateUtils.parse(todayStr+" 09:22:25", DateUtils.FORMAT_LONG);
		logger.info("todayStr:" + todayStr);
		todayStr = todayStr.replaceAll("-", "");
		todayStr = todayStr + "001";
		Long termId = new Long(todayStr);
		for(int i=1;i<84;i++){
			CaiPiao tmp = new CaiPiao();
			termId = termId + 1;
			tmp.setTermId(termId.toString());
			tmp.setOpenTime(todayStartTime);
			todayStartTime = DateUtils.addMinute(todayStartTime, 10);
			caiPiaoMapper.insertSelective(tmp);
		}
		
		String tomorrowStr = DateUtils.format(tomorrow, DateUtils.FORMAT_SHORT);
		CaiPiao tmp = new CaiPiao();
		tmp.setOpenTime((DateUtils.parse(tomorrowStr+" 09:12:25", DateUtils.FORMAT_LONG)));
		tomorrowStr = tomorrowStr.replaceAll("-", "");
		tomorrowStr = tomorrowStr + "001";
		tmp.setTermId(tomorrowStr);	
		caiPiaoMapper.insertSelective(tmp);
		return true;
	}
	
	public static String request(String httpUrl, String httpArg) {
	    BufferedReader reader = null;
	    String result = null;
	    StringBuffer sbf = new StringBuffer();
	    httpUrl = httpUrl + "?" + httpArg;

	    try {
	        URL url = new URL(httpUrl);
	        HttpURLConnection connection = (HttpURLConnection) url
	                .openConnection();
	        connection.setRequestMethod("GET");
	        connection.connect();
	        InputStream is = connection.getInputStream();
	        reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
	        String strRead = null;
	        while ((strRead = reader.readLine()) != null) {
	            sbf.append(strRead);
	            sbf.append("\r\n");
	        }
	        reader.close();
	        result = sbf.toString();
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    return result;
	}

	@Override
	public TermOpenningStatus getTermOpenningStatus(Integer termId) {
		TermOpenningStatus status = new TermOpenningStatus();
		Term term = termMapper.selectByPrimaryKey(termId);
		List<NumberA> numberAList = new ArrayList<NumberA>();
		List<OrderNumber> orderNumbers = orderNumberMapper.selectLastFiftyForOpenning(termId);
		Long numberACount = new Long(0);
		for(OrderNumber number : orderNumbers){
			UserProfile profile = userProfileMapper.selectByUserId(number.getUserId());
			NumberA numberA = new NumberA();
			if(profile!=null){
				numberA.setName(profile.getNickName());
			}
			numberA.setTimeStr(DateUtils.format(number.getTime(), DateUtils.FORMAT_LONG)+number.getTimeSufix());
			numberA.setTransferData(transferData(number.getTime(),number.getTimeSufix()).toString());
			numberAList.add(numberA);
			numberACount = numberACount + transferData(number.getTime(),number.getTimeSufix());
		}
		status.setNumberACount(numberACount);
		status.setNumberA(numberAList);
		if(term.getIsQuick()){
			status.setIsNeedCiaoPiao(false);
		}else{
			status.setIsNeedCiaoPiao(true);
		}
		if(term.getStatus().equals("opened")){
			status.setIsOpen(true);
		}else{
			status.setIsOpen(false);
		}
		CaiPiao caiPiao = caiPiaoMapper.selectByPrimaryKey(term.getCaipiaoTerm());
		if (caiPiao!=null) {
			if (caiPiao.getIsOpen()) {
				String code = caiPiao.getOpenCode().replaceAll(",", "");
				code = code.substring(code.length() - 4, code.length());
				Long numberB = new Long(code);
				status.setNumberB(numberB);
			}
			status.setCaiPiao(caiPiao);
		}
		if(term.getStatus().equals("opened")){
			OrderNumber luckyNumber = orderNumberMapper.selectByLuckyNumberByTermId(termId);
			if(luckyNumber!=null){
				status.setResult(luckyNumber.getNumber());
			}
		}
		return status;
	}
	
	@Override
	public Long transferData(Date time, String timeSufix) {
		timeSufix = timeSufix.substring(1,timeSufix.length());
		String timeStr = DateUtils.format(time, DateUtils.FORMAT_TIME);
		timeStr = timeStr.replaceAll(":", "");
		timeStr = timeStr + timeSufix;
		Long timeNumber = new Long(timeStr);
		return timeNumber;
	}
	
	//@Override
	public boolean reTransferData(OrderNumber orderNumber,String number) {
		String timeStrPre = DateUtils.format(orderNumber.getTime(), DateUtils.FORMAT_SHORT);
		if(number.toString().length()==8){
			number = "0"+number.toString();
		}
		String timeStrPost = number.substring(0, 2)+":"+number.substring(2, 4)+":"+number.substring(4, 6);
		String timefix = number.substring(6, number.length());
		orderNumber.setTime(DateUtils.parse(timeStrPre+" "+ timeStrPost, DateUtils.FORMAT_LONG));
		orderNumber.setTimeSufix("."+timefix);
		orderNumberMapper.updateByPrimaryKeySelective(orderNumber);
		return true;
	}

	@Override
	public String storeAuthHandler(Integer applyId, Integer status) {
		StoreApplication storeApplication = storeApplicationMapper.selectByPrimaryKey(applyId);
		if(storeApplication!=null){
			if(!storeApplication.getAuthenticatedStatus().equals("processing")){
				return "allReadyHandle";
			}
			if(status==1){
				storeApplication.setAuthenticatedStatus("approve");
			}else{
				storeApplication.setAuthenticatedStatus("reject");
			}
			storeApplicationMapper.updateByPrimaryKeySelective(storeApplication);
			Store store = new Store();
			store.setAddr(storeApplication.getAddr());
			store.setName(storeApplication.getName());
			store.setPhone(storeApplication.getPhone());
			store.setShopkeeper(storeApplication.getShopkeeper());
			store.setStoreSerialNum(NumberUtil.generateSerialNum());
			store.setUserId(storeApplication.getUserId());
			storeMapper.insertSelective(store);
			
			UserRoleLinkKey key = new UserRoleLinkKey();
			key.setRoleId(3);
			key.setUserId(storeApplication.getUserId());
			userRoleLinkMapper.insertSelective(key);
			
			return "success";
		}
		return "noSuchApplication";
	}

	@Override
	public List<StoreApplication> selectProcessingApplications() {
		return storeApplicationMapper.selectProcessingApplications();
	}

	@Override
	public PageInfo<Term> getLatestOpenList(Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<Term> terms = termMapper.getLatestOpenList();
		for(Term term : terms){
			if(term.getIsPoint()){
				term.setTag("活动专区");
			}else if(term.getIsQuick()){
				if(term.getMoneyLimit().equals(1)){
					term.setTag("一元速开");
				}else{
					term.setTag("十元速开");
				}
			}else if(term.getMoneyLimit().equals(10)){
				term.setTag("十元专区");
			}else if(term.getMoneyLimit().equals(1)){
				term.setTag("一元专区");
			}else if(term.getIsPk()){
				term.setTag("PK专区");
			}
			final int pos = term.getProductImage().lastIndexOf('.');
			String targetUrl = term.getProductImage().substring(0, pos) + "_" + 512 + "x" + 512 + "." + term.getProductImage().substring(pos + 1);
			term.setProductImage(targetUrl);
			if(term.getStatus().equals("opened")){
				term.setOpenTimeStr(DateUtils.format(term.getOpenTime(), DateUtils.FORMAT_LONG));
				Order lucky = orderMapper.selectByPrimaryKey(term.getLuckyOrder());
				if(lucky!=null){
					UserProfile profile = userProfileMapper.selectByUserId(lucky.getUserId());
					if(profile!=null){
						lucky.setNickName(profile.getNickName());
						lucky.setUserImage(profile.getImage());
					}
					List<OrderNumber> orderNumber = orderNumberMapper.selectByUserIdAndTermId(lucky.getUserId(),term.getTermId());
					//logger.info(JSON.toJSONString(orderNumber));
					if(orderNumber!=null){
						lucky.setAllNumberCount(orderNumber.size());
					}
					OrderNumber luckyOrderNumber = orderNumberMapper.selectByLuckyNumberByOrderId(lucky.getOrderId());
					if(luckyOrderNumber!=null){
						lucky.setLuckyNumber(luckyOrderNumber.getNumber());
					}
					term.setWinOrder(lucky);
				}
			}
			CaiPiao caiPiao = caiPiaoMapper.selectByPrimaryKey(term.getCaipiaoTerm());
			if(caiPiao!=null){
				term.setTimeCountDown(caiPiao.getOpenTime().getTime()-new Date().getTime());
			}
		}
		PageInfo<Term> page = new PageInfo<Term>(terms);
		return page;
	}
	@Override
	public PageInfo<Term> getWaitingOpenList(Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<Term> terms = termMapper.getWaitingOpenList();
		for(Term term : terms){
			if(term.getIsPoint()){
				term.setTag("活动专区");
			}else if(term.getIsQuick()){
				if(term.getMoneyLimit().equals(1)){
					term.setTag("一元速开");
				}else{
					term.setTag("十元速开");
				}
			}else if(term.getMoneyLimit().equals(10)){
				term.setTag("十元专区");
			}else if(term.getMoneyLimit().equals(1)){
				term.setTag("一元专区");
			}else if(term.getIsPk()){
				term.setTag("PK专区");
			}
			final int pos = term.getProductImage().lastIndexOf('.');
			String targetUrl = term.getProductImage().substring(0, pos) + "_" + 512 + "x" + 512 + "." + term.getProductImage().substring(pos + 1);
			term.setProductImage(targetUrl);
		}
		PageInfo<Term> page = new PageInfo<Term>(terms);
		return page;
	}

	@Override
	public PageInfo<Order> getJoinList(Integer termId,Integer isNew,Integer pageNum,Integer pageSize) {
		Term term = termMapper.selectByPrimaryKey(termId);
		if(isNew!=null&&isNew.equals(1)){
			term = termMapper.selectByTerm(term);
		}
		if(term!=null){
			termId = term.getTermId();
		}
		PageHelper.startPage(pageNum,pageSize);
		List<Order> orders = orderMapper.selectByTermId(termId);
		for(Order order:orders){
			UserProfile profile = userProfileMapper.selectByUserId(order.getUserId());
			if(profile!=null){
				order.setNickName(profile.getNickName());
				order.setUserImage(profile.getImage());
			}
			order.setCreateTimeStr(DateUtils.format(order.getCreateTime(), DateUtils.FORMAT_LONG));
			List<OrderNumber> numbers = orderNumberMapper.selectByOrderId(order.getOrderId());
			if(numbers.size()==0){
				orders.remove(order);
			}
			if(numbers!=null){
				order.setAllNumberCount(numbers.size());
			}
		}
		PageInfo<Order> page = new PageInfo<Order>(orders);
		return page;
	}

	@Override
	public PageInfo<Term> getLuckyList(Integer termId, Integer pageNum, Integer pageSize) {
		// TODO Auto-generated method stub
		
		Term tmp = termMapper.selectByPrimaryKey(termId);
		Term term = termMapper.selectByTerm(tmp);
		PageHelper.startPage(pageNum,pageSize);
		List<Term> latestWinInfo = termMapper.selectAllWinTermInfo(term);
		for(Term item : latestWinInfo){
			item.setOpenTimeStr(DateUtils.format(item.getOpenTime(), DateUtils.FORMAT_LONG));
			Order lucky = orderMapper.selectByPrimaryKey(item.getLuckyOrder());
			if(lucky!=null){
				UserProfile profile = userProfileMapper.selectByUserId(lucky.getUserId());
				User user = userMapper.selectByPrimaryKey(lucky.getUserId());
				if(profile!=null){
					lucky.setNickName(profile.getNickName());
					lucky.setUserImage(profile.getImage());
					lucky.setUserSerialNum(user.getSerialNum());
				}
				List<OrderNumber> orderNumber = orderNumberMapper.selectByUserIdAndTermId(lucky.getUserId(),item.getTermId());
				logger.info(JSON.toJSONString(orderNumber));
				if(orderNumber!=null){
					lucky.setAllNumberCount(orderNumber.size());
				}
				OrderNumber luckyOrderNumber = orderNumberMapper.selectByLuckyNumberByOrderId(lucky.getOrderId());
				if(luckyOrderNumber!=null){
					lucky.setLuckyNumber(luckyOrderNumber.getNumber());
				}
				item.setWinOrder(lucky);
			}
		}
		PageInfo<Term> page = new PageInfo<Term>(latestWinInfo);
		return page;
	}

	@Override
	public Term createNewTerm(Integer termId) {
		Term currentTerm = termMapper.selectByPrimaryKey(termId);
		Term tmp = termMapper.selectByTerm(currentTerm);
		if(tmp.getTermId().equals(currentTerm.getTermId())){
			if(currentTerm!=null){
				Term newTerm = new Term();
				newTerm.setTotalAmount(currentTerm.getTotalAmount());
				newTerm.setStatus("running");
				newTerm.setIsQuick(currentTerm.getIsQuick());
				newTerm.setMoneyLimit(currentTerm.getMoneyLimit());
				newTerm.setProductId(currentTerm.getProductId());
				newTerm.setProductImage(currentTerm.getProductImage());
				newTerm.setProductPrice(currentTerm.getProductPrice());
				newTerm.setProductTitle(currentTerm.getProductTitle());
				newTerm.setCurrentTerm(currentTerm.getCurrentTerm()+1);
				newTerm.setIsPk(currentTerm.getIsPk());
				newTerm.setIsPoint(currentTerm.getIsPoint());
				newTerm.setPoint(currentTerm.getPoint());
				newTerm.setCode(currentTerm.getCode());
				termMapper.insertSelective(newTerm);
				return newTerm;
			}
		}
		return null;
	}

	/*@Override
	public synchronized void autoBuy(Integer termId) {
		Term term = termMapper.selectByPrimaryKey(termId);
		if (term.getMoneyLimit().equals(1)) {
			HashSet<Integer> h = new HashSet<Integer>();
			while (h.size() < 30) {
				int max = 101;
				int min = 2;
				Random random = new Random();
				int tmp = random.nextInt(max) % (max - min + 1) + min;
				h.add(tmp);
			}
			double[] rate = { 0.03, 0.03, 0.01, 0.05, 0.02, 0.03, 0.04, 0.03, 0.02, 0.02, 0.01, 0.03, 0.02, 0.07,
					0.08, 0.04, 0.06, 0.03, 0.01, 0.07, 0.02, 0.05, 0.04, 0.05, 0.03, 0.02, 0.03, 0.01, 0.03,
					0.02 };
			int[] count = new int[30];
			int totalTmp = 0;
			for (int k = 0; k < 30; k++) {
				if (k == 29) {
					count[k] = term.getTotalAmount() - totalTmp;
				} else {
					count[k] = (int) (term.getTotalAmount() * rate[k]);
					if(count[k]==0){
						count[k]=1;
					}
					totalTmp += count[k];
				}
			}
			int step = 0;
			Iterator<Integer> iterator = h.iterator();
			while (iterator.hasNext()) {
					Term termTmp = termMapper.selectByPrimaryKey(termId);
					UserProfile userProfile = userProfileMapper.selectByUserId(iterator.next());
					AutoBuyThread myThread = new AutoBuyThread(term, new BigDecimal(count[step]), userProfile);
					Thread thread = new Thread(myThread);
					thread.start();
					logger.info(userProfile.getName() + "正在消费,所在线程： " + thread.getName());
					logger.info(userProfile.getName() + "正在消费");
					autoBuyHandler(term, new BigDecimal(count[step]), userProfile);
					logger.info(userProfile.getName() + "消费结束");
					step++;

			}
		} else if (term.getMoneyLimit().equals(10)) {
			long total = 0;
			while (total < term.getTotalAmount()) {
				int max = 101;
				int min = 2;
				Random random = new Random();
				int tmp = random.nextInt(max) % (max - min + 1) + min;
				UserProfile userProfile = userProfileMapper.selectByUserId(tmp);
				if(term.getTotalAmount() - term.getCurrentAmount()==0){
					break;
				}
				if (term.getTotalAmount() - term.getCurrentAmount() >= 10) {
					autoBuyHandler(term, new BigDecimal(10), userProfile);
					total += 10;
				} else {
					total = total + (term.getTotalAmount() - term.getCurrentAmount());
					autoBuyHandler(term, new BigDecimal(term.getTotalAmount() - term.getCurrentAmount()),
							userProfile);
				}
				logger.info("total: " + total);
			}
		} else if (term.getIsPk()) {
			int max = 101;
			int min = 2;
			Random random = new Random();
			int tmp = random.nextInt(max) % (max - min + 1) + min;
			UserProfile userProfile = userProfileMapper.selectByUserId(tmp);
			autoBuyHandler(term, new BigDecimal((int) (term.getMoneyLimit())), userProfile);
			int tmp1 = tmp;
			while (tmp1 == tmp) {
				tmp1 = random.nextInt(max) % (max - min + 1) + min;
			}
			UserProfile userProfile1 = userProfileMapper.selectByUserId(tmp1);
			autoBuyHandler(term, new BigDecimal(term.getTotalAmount() - term.getCurrentAmount()), userProfile1);
		} 
	}*/
	@Override
	public  boolean autoBuyHandler(Term term,BigDecimal money, UserProfile userProfile) {
		PaymentOrder paymentOrder = new PaymentOrder();
		paymentOrder.setUserId(userProfile.getUserId());
		paymentOrder.setPaymentId(3);
		paymentOrder.setPaymentSerialNum(NumberUtil.generateSerialNum(1));
		paymentOrder.setMoney(money);
		paymentOrder.setTransactionType("payment");
		paymentOrder.setIsCompleted(true);
		paymentOrder.setIsActive(false);
		paymentOrder.setTimestamp(new Date());
		paymentOrder.setCompleteTime(new Date(System.currentTimeMillis()+500));
		paymentOrderMapper.insertSelective(paymentOrder);
		Order order = new Order();
		order.setOrderSerialnum(NumberUtil.generateSerialNum(2));
		order.setTermId(term.getTermId());
		order.setUserId(userProfile.getUserId());
		order.setPaymentOrderId(paymentOrder.getPaymentOrderId());
		order.setCreateTime(new Date());
		order.setPayTime(paymentOrder.getCompleteTime());
		order.setTotalPrice(money);
		order.setIsPaid(true);
		order.setProductTitle(term.getProductTitle());
		order.setProductImage(term.getProductImage());
		order.setProductPrice(term.getProductPrice());
		order.setIpAddr(userProfile.getIpAddr());
		orderMapper.insertSelective(order);
		FinancialAccount account = financialAccountMapper.selectByUserId(userProfile.getUserId());
		int successCount = 0;
		if (term != null) {
			OrderNumber orderNumber = orderNumberMapper.selectLatestNumberByTermId(term.getTermId());
			if(orderNumber==null){
				orderNumber = new OrderNumber();
				orderNumber.setNumber(new Long(10000000));
				orderNumber.setRank(0);
			}
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
					if(index!=-1){
						String tmp = a.substring(index, a.length());
						timeSufix = tmp;
						if(timeSufix.length()<4){
							for(int t=0;t<4-tmp.length();t++){
								timeSufix = timeSufix + "0";
							}
						}
					}else{
						timeSufix=".000";
					}
					temp.setTimeSufix(timeSufix);
					orderNumberMapper.insertSelective(temp);
					term.setCurrentAmount(term.getCurrentAmount() + 1);
					termMapper.updateByPrimaryKeySelective(term);
					successCount++;
				}
			}

			//检测没成功购买的人次并处理
			int miss = paymentOrder.getMoney().intValue() - successCount;
			if (miss > 0) {
				//达到总人次，退还余额
				account.setBalance(account.getBalance().add(new BigDecimal(miss)));
				financialAccountMapper.updateByPrimaryKeySelective(account);
			}
			logger.info(userProfile.getNickName() + "正在购买 ,购买总额:" + order.getTotalPrice()+ "  现在人次: " + term.getCurrentAmount()); 
			//检测是否到达总期数
			if (term.getCurrentAmount() >= term.getTotalAmount()) {
				term.setFullTime(new Date());
				if(!term.getIsQuick()&&term.getCaipiaoTerm().equals("")){
					Date target = DateUtils.addMinute(term.getFullTime(), 2);
					CaiPiao caiPiao = caiPiaoMapper.selectProperCaiPiao(target);
					logger.info(JSON.toJSONString(DateUtils.format(target, DateUtils.FORMAT_LONG)));
					//如果离最近开奖的时间不足一分钟，跳到下次开奖
					term.setCaipiaoTerm(caiPiao.getTermId());
					logger.info("合适的彩票期数：" + JSON.toJSONString(term));
					term.setStatus("openning");
					
					termMapper.updateByPrimaryKeySelective(term);
				}else{
					openHandler(term);	
				}
				Product product = productMapper.selectByPrimaryKey(term.getProductId());
				if(product!=null&&product.getIsActive()){
					createNewTerm(term.getTermId());
				}
			}
			
			
			//给用户发送消息提醒
			/*String message_failed = "";
			String message_success = "";
			if(userProfile!=null){
				message_failed = "尊敬的" + userProfile.getNickName() + "：</br>" + "您的订单已处理完成，因库存不足，共计处理失败" + miss + "个，支付金额已返还至个人夺宝优购夺宝币账户，点击“详情”查看订单信息。</br>订单号：" + order.getOrderSerialnum() + "</br>订单状态：已支付" + "</br>商品名称：" + term.getProductTitle() + "</br>如有疑问，请拨打服务手机：15902023879" ;
				message_success = "尊敬的" + userProfile.getNickName() + "：</br>" + "您的订单已处理完成，共计获得夺宝号：" + order.getTotalPrice().intValue() + "个。" + "</br>订单号：" + order.getOrderSerialnum() + "</br>订单状态：已支付" + "</br>商品名称：" + term.getProductTitle() + "<br/>点击“详情”查看订单信息" + "</br>如有疑问，请拨打服务手机：15902023879";
			}else{
				message_failed = "亲，" + "您的订单已处理完成，因库存不足，共计处理失败" + miss + "个，支付金额已返还至个人夺宝优购夺宝币账户，点击“详情”查看订单信息。</br>订单号：" + order.getOrderSerialnum() + "</br>订单状态：已支付" + "</br>商品名称：" + term.getProductTitle() + "</br>如有疑问，请拨打服务手机：15902023879" ;
				message_success = "亲，" + "您的订单已处理完成，共计获得夺宝号：" + order.getTotalPrice().intValue() + "个。" + "</br>订单号：" + order.getOrderSerialnum() + "</br>订单状态：已支付" + "</br>商品名称：" + term.getProductTitle() + "<br/>点击“详情”查看订单信息" + "</br>如有疑问，请拨打服务手机：15902023879";
			}
			Announcement announcement = new Announcement();
			announcement.setTitle("订单状态提醒");
			announcement.setIsForAll(false);
			
			if(miss>0){
				File file = FileUtil.convertToFile(message_failed);
				String url = null;
				url = fDFSFileUpload.getFileId(file);
				announcement.setMessageUrl(url);
			}else{
				File file = FileUtil.convertToFile(message_success);
				String url = null;
				url = fDFSFileUpload.getFileId(file);
				announcement.setMessageUrl(url);
			}
			announcementMapper.insertSelective(announcement);
			AnnouncementUserLinkKey key = new AnnouncementUserLinkKey();
			key.setMessageId(announcement.getMessageId());
			key.setUserId(paymentOrder.getUserId());*/
		}
		return true;
	}

	@Override
	public void openHandlerSchedule() {
		List<Term> terms = termMapper.selectWaitingForOpen();
		for(Term term : terms){
			CaiPiao caiPiao = caiPiaoMapper.selectByPrimaryKey(term.getCaipiaoTerm());
			if(caiPiao!=null){
				if(caiPiao.getIsOpen()&&term.getStatus().equals("openning")){
					openHandler(term);
				}
			}else{
				logger.error("无彩票期次：" + term.getCaipiaoTerm());
			}
		}
	}

	@Override
	public String sendWXMessageSuccess(Integer userId,Integer successCount,String orderSerialNum) {
		OauthLogin oauthLogin = oauthLoginMapper.selectByUserId(userId);
		UserProfile profile = userProfileMapper.selectByUserId(userId);
		Order order = orderMapper.selectBySerialNum(orderSerialNum);
		Map<String,Object> map1 = new LinkedHashMap<String,Object>();
		if(oauthLogin!=null){
			map1.put("touser", oauthLogin.getOauthId());
			map1.put("template_id", "OnZuzHm3q4n2kuc3Fq-VJv6e_3hs5vkXlJAviqb44uA");
			map1.put("topcolor", "#FF0000");
			map1.put("url", "m.uclee.com/recordDetail?orderSerialNum=" +orderSerialNum);
			Map<String,Object> map2 = new TreeMap<String,Object>();
			Map<String,Object> mapFirst = new TreeMap<String,Object>();
			if(profile!=null){
				mapFirst.put("value", "亲爱的"+ profile.getNickName() + "：您的订单已处理完成，共计成功购得夺宝号" + successCount +  "个。");
			}else{
				mapFirst.put("value", "您的订单已处理完成，共计成功购得夺宝号" + successCount +  "个。");
			}
			map2.put("first", mapFirst);
			Map<String,Object> mapKeyword1 = new TreeMap<String,Object>();
			if(profile!=null){
				mapKeyword1.put("value", profile.getNickName());
			}else{
				mapKeyword1.put("value", "");
			}
			map2.put("keyword1", mapKeyword1);
			Map<String,Object> mapKeyword2 = new TreeMap<String,Object>();
			mapKeyword2.put("value", orderSerialNum);
			map2.put("keyword2", mapKeyword2);
			Map<String,Object> mapKeyword3 = new TreeMap<String,Object>();
			logger.info(MoneyFormat.moneyFormat(order.getTotalPrice()));
			mapKeyword3.put("value", MoneyFormat.moneyFormat(order.getTotalPrice().doubleValue())+"元");
			map2.put("keyword3", mapKeyword3);
			Map<String,Object> mapKeyword4 = new TreeMap<String,Object>();
			mapKeyword4.put("value", order.getProductTitle());
			map2.put("keyword4", mapKeyword4);
			Map<String,Object> mapRemark = new TreeMap<String,Object>();
			mapRemark.put("value", "点击详情查看夺宝详情，如有问题请致电客服手机号15902023879或直接在微信留言，客服在线时间为工作日10:00-18:00.客服人员将第一时间为您服务。");
			mapRemark.put("color", "#173177");
			map2.put("remark", mapRemark);
			map1.put("data", map2);
			logger.info(JSON.toJSONString(map1));
			try {
 	        Var var = varMapper.selectByPrimaryKey(new Integer(1));
            URL url = new URL("https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + var.getValue());// 创建连接  
            HttpURLConnection connection = (HttpURLConnection) url  
                    .openConnection();  
            connection.setDoOutput(true);  
            connection.setDoInput(true);  
            connection.setUseCaches(false);  
            connection.setInstanceFollowRedirects(true);  
            connection.setRequestMethod("POST"); // 设置请求方式  
            connection.setRequestProperty("Accept", "application/json"); // 设置接收数据的格式  
            connection.setRequestProperty("Content-Type", "application/json"); // 设置发送数据的格式  
            connection.connect();  
            OutputStreamWriter out = new OutputStreamWriter(  
                    connection.getOutputStream(), "UTF-8"); // utf-8编码  
            out.append(JSON.toJSONString(map1));  
            out.flush();  
            out.close();
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
            String lines;
            StringBuffer sb = new StringBuffer("");
            while ((lines = reader.readLine()) != null) {
                lines = new String(lines.getBytes(), "utf-8");
                sb.append(lines);
            }
            System.err.println(sb);
            reader.close();
            // 断开连接
            connection.disconnect();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return null;
	}
	
	@Override
	public String sendWXMessageMiss(Integer userId,Integer missCount,String orderSerialNum) {
		OauthLogin oauthLogin = oauthLoginMapper.selectByUserId(userId);
		UserProfile profile = userProfileMapper.selectByUserId(userId);
		Order order = orderMapper.selectBySerialNum(orderSerialNum);
		Map<String,Object> map1 = new LinkedHashMap<String,Object>();
		if(oauthLogin!=null){
			map1.put("touser", oauthLogin.getOauthId());
			map1.put("template_id", "OnZuzHm3q4n2kuc3Fq-VJv6e_3hs5vkXlJAviqb44uA");
			map1.put("topcolor", "#FF0000");
			map1.put("url", "m.uclee.com/recordDetail?orderSerialNum=" +orderSerialNum);
			Map<String,Object> map2 = new TreeMap<String,Object>();
			Map<String,Object> mapFirst = new TreeMap<String,Object>();
			if(profile!=null){
				mapFirst.put("value", "亲爱的"+ profile.getNickName() + "：您的订单已处理完成，因库存不足，共计处理失败"+ missCount + "个夺宝号。支付金额已返至个人夺宝币账户余额中，详情请查看账户余额");
			}else{
				mapFirst.put("value",  "您的订单已处理完成，因库存不足，共计处理失败"+ missCount + "个夺宝号。支付金额已返至个人夺宝币账户余额中，详情请查看账户余额");
			}
			map2.put("first", mapFirst);
			Map<String,Object> mapKeyword1 = new TreeMap<String,Object>();
			if(profile!=null){
				mapKeyword1.put("value", profile.getNickName());
			}else{
				mapKeyword1.put("value", "");
			}
			map2.put("keyword1", mapKeyword1);
			Map<String,Object> mapKeyword2 = new TreeMap<String,Object>();
			mapKeyword2.put("value", orderSerialNum);
			map2.put("keyword2", mapKeyword2);
			Map<String,Object> mapKeyword3 = new TreeMap<String,Object>();
			logger.info(MoneyFormat.moneyFormat(order.getTotalPrice()));
			mapKeyword3.put("value", MoneyFormat.moneyFormat(order.getTotalPrice().doubleValue())+"元");
			map2.put("keyword3", mapKeyword3);
			Map<String,Object> mapKeyword4 = new TreeMap<String,Object>();
			mapKeyword4.put("value", order.getProductTitle());
			map2.put("keyword4", mapKeyword4);
			Map<String,Object> mapRemark = new TreeMap<String,Object>();
			mapRemark.put("value", "点击详情查看夺宝详情，如有问题请致电客服手机号15902023879或直接在微信留言，客服在线时间为工作日10:00-18:00.客服人员将第一时间为您服务。");
			mapRemark.put("color", "#173177");
			map2.put("remark", mapRemark);
			map1.put("data", map2);
			logger.info(JSON.toJSONString(map1));
			try {
 	        Var var = varMapper.selectByPrimaryKey(new Integer(1));
            URL url = new URL("https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + var.getValue());// 创建连接  
            HttpURLConnection connection = (HttpURLConnection) url  
                    .openConnection();  
            connection.setDoOutput(true);  
            connection.setDoInput(true);  
            connection.setUseCaches(false);  
            connection.setInstanceFollowRedirects(true);  
            connection.setRequestMethod("POST"); // 设置请求方式  
            connection.setRequestProperty("Accept", "application/json"); // 设置接收数据的格式  
            connection.setRequestProperty("Content-Type", "application/json"); // 设置发送数据的格式  
            connection.connect();  
            OutputStreamWriter out = new OutputStreamWriter(  
                    connection.getOutputStream(), "UTF-8"); // utf-8编码  
            out.append(JSON.toJSONString(map1));  
            out.flush();  
            out.close();
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
            String lines;
            StringBuffer sb = new StringBuffer("");
            while ((lines = reader.readLine()) != null) {
                lines = new String(lines.getBytes(), "utf-8");
                sb.append(lines);
            }
            System.err.println(sb);
            reader.close();
            // 断开连接
            connection.disconnect();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return null;
	}
	
	@Override
	public String sendWXMessageWin(Integer userId,String orderSerialNum) {
		OauthLogin oauthLogin = oauthLoginMapper.selectByUserId(userId);
		UserProfile profile = userProfileMapper.selectByUserId(userId);
		Map<String,Object> map1 = new LinkedHashMap<String,Object>();
		getGolbalAccessToken();
		if(oauthLogin!=null){
			map1.put("touser", oauthLogin.getOauthId());
			map1.put("template_id", "lPKTNYPlugdPDyRF_jNIB3dkL8ehDAT6SxSz3PlsUp0");
			map1.put("topcolor", "#FF0000");
			map1.put("url", "m.uclee.com/winrecord");
			Map<String,Object> map2 = new TreeMap<String,Object>();
			Map<String,Object> mapFirst = new TreeMap<String,Object>();
			if(profile!=null){
				mapFirst.put("value", "尊敬的" + profile.getNickName() + "您所购买的订单已已中奖" + "订单号："+orderSerialNum+"订单状态：已中奖。请及时进入个人中心填写收货地址，系统会在第一时间为您发货，谢谢您的支持。");
			}else{
				mapFirst.put("value",  "您所购买的订单已中奖" + "订单号："+orderSerialNum+"订单状态：已中奖。请及时进入个人中心填写收货地址，系统会在第一时间为您发货，谢谢您的支持。");
			}
			map2.put("first", mapFirst);
			Map<String,Object> mapKeyword1 = new TreeMap<String,Object>();
			mapKeyword1.put("value", orderSerialNum);
			map2.put("OrderSn", mapKeyword1);
			Map<String,Object> mapKeyword2 = new TreeMap<String,Object>();
			mapKeyword2.put("value", "已中奖");
			map2.put("OrderStatus", mapKeyword2);
			Map<String,Object> mapRemark = new TreeMap<String,Object>();
			mapRemark.put("value", "点击详情查看中奖详情，如有问题请致电客服手机号15902023879或直接在微信留言，客服在线时间为工作日10:00-18:00.客服人员将第一时间为您服务。");
			mapRemark.put("color", "#173177");
			map2.put("remark", mapRemark);
			map1.put("data", map2);
			logger.info(JSON.toJSONString(map1));
			try {
 	        Var var = varMapper.selectByPrimaryKey(new Integer(1));
            URL url = new URL("https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + var.getValue());// 创建连接  
            HttpURLConnection connection = (HttpURLConnection) url  
                    .openConnection();  
            connection.setDoOutput(true);  
            connection.setDoInput(true);  
            connection.setUseCaches(false);  
            connection.setInstanceFollowRedirects(true);  
            connection.setRequestMethod("POST"); // 设置请求方式  
            connection.setRequestProperty("Accept", "application/json"); // 设置接收数据的格式  
            connection.setRequestProperty("Content-Type", "application/json"); // 设置发送数据的格式  
            connection.connect();  
            OutputStreamWriter out = new OutputStreamWriter(  
                    connection.getOutputStream(), "UTF-8"); // utf-8编码  
            out.append(JSON.toJSONString(map1));  
            out.flush();  
            out.close();
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
            String lines;
            StringBuffer sb = new StringBuffer("");
            while ((lines = reader.readLine()) != null) {
                lines = new String(lines.getBytes(), "utf-8");
                sb.append(lines);
            }
            System.err.println(sb);
            reader.close();
            // 断开连接
            connection.disconnect();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return null;
	}
	@Override
	public String sendWXMessageWuliu(Integer userId,String orderSerialNum,String logisticComp,String logisticNum) {
		OauthLogin oauthLogin = oauthLoginMapper.selectByUserId(userId);
		UserProfile profile = userProfileMapper.selectByUserId(userId);
		Order order = orderMapper.selectBySerialNum(orderSerialNum);
		Map<String,Object> map1 = new LinkedHashMap<String,Object>();
		getGolbalAccessToken();
		if(oauthLogin!=null){
			map1.put("touser", oauthLogin.getOauthId());
			map1.put("template_id", "lPKTNYPlugdPDyRF_jNIB3dkL8ehDAT6SxSz3PlsUp0");
			map1.put("topcolor", "#FF0000");
			map1.put("url", null);
			Map<String,Object> map2 = new TreeMap<String,Object>();
			Map<String,Object> mapFirst = new TreeMap<String,Object>();
			if(profile!=null){
				mapFirst.put("value", "尊敬的" + profile.getNickName() + ",您所购买的商品" + order.getProductTitle() + "已发货" + ",物流公司："+logisticComp+ "物流单号：" + logisticNum + ",请保持通讯手机畅通，注意查收");
			}else{
				mapFirst.put("value",  "您所购买的商品" + order.getProductTitle() + "已发货" + ",物流公司："+logisticComp+ "物流单号：" + logisticNum + ",请保持通讯手机畅通，注意查收");
			}
			map2.put("first", mapFirst);
			Map<String,Object> mapKeyword1 = new TreeMap<String,Object>();
			mapKeyword1.put("value", orderSerialNum);
			map2.put("OrderSn", mapKeyword1);
			Map<String,Object> mapKeyword2 = new TreeMap<String,Object>();
			mapKeyword2.put("value", "已中奖");
			map2.put("OrderStatus", mapKeyword2);
			Map<String,Object> mapRemark = new TreeMap<String,Object>();
			mapRemark.put("value", "收到货品后别忘了晒单给朋友看哦~进入中奖商品页查看并分享详情，邀请好友还有更多佣金返现奖励呢~");
			mapRemark.put("color", "#173177");
			map2.put("remark", mapRemark);
			map1.put("data", map2);
			logger.info(JSON.toJSONString(map1));
			try {
 	        Var var = varMapper.selectByPrimaryKey(new Integer(1));
            URL url = new URL("https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + var.getValue());// 创建连接  
            HttpURLConnection connection = (HttpURLConnection) url  
                    .openConnection();  
            connection.setDoOutput(true);  
            connection.setDoInput(true);  
            connection.setUseCaches(false);  
            connection.setInstanceFollowRedirects(true);  
            connection.setRequestMethod("POST"); // 设置请求方式  
            connection.setRequestProperty("Accept", "application/json"); // 设置接收数据的格式  
            connection.setRequestProperty("Content-Type", "application/json"); // 设置发送数据的格式  
            connection.connect();  
            OutputStreamWriter out = new OutputStreamWriter(  
                    connection.getOutputStream(), "UTF-8"); // utf-8编码  
            out.append(JSON.toJSONString(map1));  
            out.flush();  
            out.close();
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
            String lines;
            StringBuffer sb = new StringBuffer("");
            while ((lines = reader.readLine()) != null) {
                lines = new String(lines.getBytes(), "utf-8");
                sb.append(lines);
            }
            System.err.println(sb);
            reader.close();
            // 断开连接
            connection.disconnect();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return null;
	}
	
	@Override
	public String sendWXMessageMiss2(Integer userId,String paymentSerialNum) {
		OauthLogin oauthLogin = oauthLoginMapper.selectByUserId(userId);
		UserProfile profile = userProfileMapper.selectByUserId(userId);
		//改成已删的
		PaymentOrder paymentOrder = paymentOrderMapper.selectByPaymentSerialNum(paymentSerialNum);
		Map<String,Object> map1 = new LinkedHashMap<String,Object>();
		if(oauthLogin!=null){
			map1.put("touser", oauthLogin.getOauthId());
			map1.put("template_id", "OnZuzHm3q4n2kuc3Fq-VJv6e_3hs5vkXlJAviqb44uA");
			map1.put("topcolor", "#FF0000");
			Map<String,Object> map2 = new TreeMap<String,Object>();
			Map<String,Object> mapFirst = new TreeMap<String,Object>();
			if(profile!=null){
				mapFirst.put("value", "亲爱的"+ profile.getNickName() + "：您的订单已处理完成，因支付超时，支付失败，支付金额已全部返还至个人夺宝优购夺宝币账户"+"详情请查看账户余额。");
			}else{
				mapFirst.put("value",  "您的订单已处理完成，因支付超时，支付失败，支付金额已全部返还至个人夺宝优购夺宝币账户，详情请查看账户余额。");
			}
			map2.put("first", mapFirst);
			Map<String,Object> mapKeyword1 = new TreeMap<String,Object>();
			if(profile!=null){
				mapKeyword1.put("value", profile.getNickName());
			}else{
				mapKeyword1.put("value", "");
			}
			map2.put("keyword1", mapKeyword1);
			Map<String,Object> mapKeyword2 = new TreeMap<String,Object>();
			mapKeyword2.put("value", paymentSerialNum);
			map2.put("keyword2", mapKeyword2);
			Map<String,Object> mapKeyword3 = new TreeMap<String,Object>();
			mapKeyword3.put("value", MoneyFormat.moneyFormat(MoneyFormat.moneyFormat(paymentOrder.getMoney()))+"元");
			map2.put("keyword3", mapKeyword3);
			Map<String,Object> mapKeyword4 = new TreeMap<String,Object>();
			mapKeyword4.put("value", "暂无");
			map2.put("keyword4", mapKeyword4);
			Map<String,Object> mapRemark = new TreeMap<String,Object>();
			mapRemark.put("value", "如有问题请致电客服手机号15902023879或直接在微信留言，客服在线时间为工作日10:00-18:00.客服人员将第一时间为您服务。");
			mapRemark.put("color", "#173177");
			map2.put("remark", mapRemark);
			map1.put("data", map2);
			logger.info(JSON.toJSONString(map1));
			try {
 	        Var var = varMapper.selectByPrimaryKey(new Integer(1));
            URL url = new URL("https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + var.getValue());// 创建连接  
            HttpURLConnection connection = (HttpURLConnection) url  
                    .openConnection();  
            connection.setDoOutput(true);  
            connection.setDoInput(true);  
            connection.setUseCaches(false);  
            connection.setInstanceFollowRedirects(true);  
            connection.setRequestMethod("POST"); // 设置请求方式  
            connection.setRequestProperty("Accept", "application/json"); // 设置接收数据的格式  
            connection.setRequestProperty("Content-Type", "application/json"); // 设置发送数据的格式  
            connection.connect();  
            OutputStreamWriter out = new OutputStreamWriter(  
                    connection.getOutputStream(), "UTF-8"); // utf-8编码  
            out.append(JSON.toJSONString(map1));  
            out.flush();  
            out.close();
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
            String lines;
            StringBuffer sb = new StringBuffer("");
            while ((lines = reader.readLine()) != null) {
                lines = new String(lines.getBytes(), "utf-8");
                sb.append(lines);
            }
            System.err.println(sb);
            reader.close();
            // 断开连接
            connection.disconnect();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return null;
	}
	@Override
	public  String getGolbalAccessToken(){
		String url_to_golbal_get_access_token = 
					"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+ WeiXinInfo.appid +
			"&secret=" + WeiXinInfo.appSecret;
		
        CloseableHttpClient httpclient = HttpClients.createDefault();  
        HttpGet httpget = new HttpGet(url_to_golbal_get_access_token);
        CloseableHttpResponse response = null;
        String content ="";  
        try {  
            //执行get方法  
            response = httpclient.execute(httpget);  
            if(response.getStatusLine().getStatusCode()==200){  
                content = EntityUtils.toString(response.getEntity(),"utf-8");  
                com.alibaba.fastjson.JSONObject data = JSON.parseObject(content);
                String access_token=data.getString("access_token");
                Var var = varMapper.selectByPrimaryKey(new Integer(1));
                var.setValue(access_token);
                var.setStorageTime(new Date());
                varMapper.updateByPrimaryKeySelective(var);
                return content;
            }  
            
        } catch (ClientProtocolException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
	    
        return content; 
	}

	@Override
	public Integer getTotalBuyCount() {
		TableRow table = tableRowMapper.selectByTableName("db_order_numbers");
		return table.getRows();
	}

	@Override
	public List<Term> selectAllTerm() {
		return termMapper.selectAll();
	}
	
	public static int getRandom(int min,int max){
		Random random = new Random();
		return random.nextInt(max) % (max - min + 1) + min;
	}

	@Override
	public Term getTermByCode(String code) {
		
		return termMapper.selectByCode(code);
	}

	@Override
	public void sendWXMessageBalance(Integer userId, Integer count) {
		OauthLogin oauthLogin = oauthLoginMapper.selectByUserId(userId);
		FinancialAccount account = financialAccountMapper.selectByUserId(userId);
		UserProfile profile = userProfileMapper.selectByUserId(userId);
		Map<String,Object> map1 = new LinkedHashMap<String,Object>();
		getGolbalAccessToken();
		if(oauthLogin!=null){
			map1.put("touser", oauthLogin.getOauthId());
			map1.put("template_id", "2_Kwjp3CkC3bDL8R1S9Rgm7nd1ZT9WBALUvzwBZ3dmE");
			map1.put("topcolor", "#FF0000");
			map1.put("url", "http://m.uclee.com/accountcenter");
			Map<String,Object> map2 = new TreeMap<String,Object>();
			Map<String,Object> mapFirst = new TreeMap<String,Object>();
			if(profile!=null){
				mapFirst.put("value", "尊敬的" + profile.getNickName() + "！为感谢您一路对UC优购的支持与信任，小U特意发放一波U币至您的平台账户中啦！");
			}else{
				mapFirst.put("value",  "为感谢您一路对UC优购的支持与信任，小U特意发放一波U币至您的平台账户中啦！");
			}
			map2.put("first", mapFirst);
			Map<String,Object> mapKeyword1 = new TreeMap<String,Object>();
			mapKeyword1.put("value", DateUtils.format(new Date(), DateUtils.FORMAT_LONG));
			map2.put("keyword1", mapKeyword1);
			Map<String,Object> mapKeyword2 = new TreeMap<String,Object>();
			mapKeyword2.put("value", count);
			map2.put("keyword2", mapKeyword2);
			Map<String,Object> mapKeyword3 = new TreeMap<String,Object>();
			mapKeyword3.put("value", account.getBalance());
			map2.put("keyword3", mapKeyword3);
			Map<String,Object> mapRemark = new TreeMap<String,Object>();
			mapRemark.put("value", "敬请查收，如有问题请致电客服手机号15902023879或直接在微信留言，客服在线时间为工作日10:00-18:00.客服人员将第一时间为您服务，U币可用于任何商品的购买，祝您生活愉快，购物愉快！");
			mapRemark.put("color", "#173177");
			map2.put("remark", mapRemark);
			map1.put("data", map2);
			logger.info(JSON.toJSONString(map1));
			try {
 	        Var var = varMapper.selectByPrimaryKey(new Integer(1));
            URL url = new URL("https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + var.getValue());// 创建连接  
            HttpURLConnection connection = (HttpURLConnection) url  
                    .openConnection();  
            connection.setDoOutput(true);  
            connection.setDoInput(true);  
            connection.setUseCaches(false);  
            connection.setInstanceFollowRedirects(true);  
            connection.setRequestMethod("POST"); // 设置请求方式  
            connection.setRequestProperty("Accept", "application/json"); // 设置接收数据的格式  
            connection.setRequestProperty("Content-Type", "application/json"); // 设置发送数据的格式  
            connection.connect();  
            OutputStreamWriter out = new OutputStreamWriter(  
                    connection.getOutputStream(), "UTF-8"); // utf-8编码  
            out.append(JSON.toJSONString(map1));  
            out.flush();  
            out.close();
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
            String lines;
            StringBuffer sb = new StringBuffer("");
            while ((lines = reader.readLine()) != null) {
                lines = new String(lines.getBytes(), "utf-8");
                sb.append(lines);
            }
            System.err.println(sb);
            reader.close();
            // 断开连接
            connection.disconnect();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
}
