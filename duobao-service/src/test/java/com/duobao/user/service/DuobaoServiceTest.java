package com.duobao.user.service;

import java.io.File;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.regex.Pattern;

import org.apache.shiro.authc.UnknownAccountException;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.backend.service.ProductManageServiceI;
import com.duobao.date.util.DateUtils;
import com.duobao.fundation.data.mybatis.mapping.CaiPiaoMapper;
import com.duobao.fundation.data.mybatis.mapping.FinancialAccountMapper;
import com.duobao.fundation.data.mybatis.mapping.OauthLoginMapper;
import com.duobao.fundation.data.mybatis.mapping.OrderNumberMapper;
import com.duobao.fundation.data.mybatis.mapping.ProductImageLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.ProductMapper;
import com.duobao.fundation.data.mybatis.mapping.TableRowMapper;
import com.duobao.fundation.data.mybatis.mapping.TermMapper;
import com.duobao.fundation.data.mybatis.mapping.UserMapper;
import com.duobao.fundation.data.mybatis.mapping.UserProfileMapper;
import com.duobao.fundation.data.mybatis.mapping.UserRoleLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.VarMapper;
import com.duobao.fundation.data.mybatis.model.CaiPiao;
import com.duobao.fundation.data.mybatis.model.FinancialAccount;
import com.duobao.fundation.data.mybatis.model.OauthLogin;
import com.duobao.fundation.data.mybatis.model.OrderNumber;
import com.duobao.fundation.data.mybatis.model.PaymentOrder;
import com.duobao.fundation.data.mybatis.model.Product;
import com.duobao.fundation.data.mybatis.model.ProductImageLink;
import com.duobao.fundation.data.mybatis.model.TableRow;
import com.duobao.fundation.data.mybatis.model.Term;
import com.duobao.fundation.data.mybatis.model.User;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.fundation.data.mybatis.model.UserRoleLinkKey;
import com.duobao.fundation.data.mybatis.model.Var;
import com.duobao.fundation.dfs.fastdfs.FDFSFileUpload;
import com.duobao.number.util.NumberUtil;
import com.duobao.user.model.PaymentStrategyResult;
import com.duobao.weixin.util.EmojiFilter;
import com.google.common.base.Strings;

public class DuobaoServiceTest extends AbstractServiceTests {

	@Autowired
	private DuobaoServiceI duobaoService;
	
	@Autowired
	private ProductMapper productMapper;
	@Autowired
	private FDFSFileUpload fDFSFileUpload;
	
	@Autowired
	private ProductImageLinkMapper productImageMapper;
	
	@Autowired
	private TermMapper termMapper;
	@Autowired
	private ProductManageServiceI productManageService;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private UserServiceI userService;
	@Autowired
	private UserProfileMapper userProfileMapper;
	
	@Autowired
	private FinancialAccountMapper financialAccountMapper;
	@Autowired
	private OrderNumberMapper orderNumberMapper;
	
	@Autowired
	private CaiPiaoMapper caiPiaoMapper;
	
	@Autowired
	private TableRowMapper tableRowMapper;
	
	@Autowired
	private ProductImageLinkMapper productImageLinkMapper;
	@Autowired
	private UserProfileServiceI userProfileServiceI;
	@Autowired
	private OauthLoginMapper oauthLoginMapper;
	@Autowired
	private VarMapper varMapper;
	@Autowired
	private UserRoleLinkMapper userRoleLinkMapper;
	
	@Test
	public void testApi(){
		//Term term = termMapper.selectByPrimaryKey(2468);
		//duobaoService.openHandler(term);
		/*int[] a = {4764,4765,4766,4767,4768,4769,4770,4771,4772,4787,4793,4824,4828,4829,4832,4833,4837,4844,4845,4856};
		for(int item:a){
			duobaoService.createNewTerm(item);
		}*/
		//duobaoService.testOpen(term);
		
		//logger.info(userService.getIsSubScribe(468));
		//userService.updateWXInfo();
		//duobaoService.createCaiPiaoTerm();
		//duobaoService.sendWXMessageWin(1, "14802188471904352");
		//duobaoService.caipiao();
		/*String a = "20161010084";
		String date = a.substring(0,a.length()-3);
		int tmpTerm = Integer.valueOf(a.substring(a.length()-3, a.length()));
		date = date.substring(0,4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
		Date now = DateUtils.parse(date,DateUtils.FORMAT_SHORT);
		Date tomorrow = DateUtils.addDay(now, 1);
		String tomorrowStr = DateUtils.format(tomorrow, DateUtils.FORMAT_SHORT);
		tomorrowStr = tomorrowStr.replaceAll("-", "");
		logger.info(tomorrowStr);
		logger.info(date);
		logger.info(tmpTerm);*/
		
		/*String a = "**,14,10,08,09,05,08,12";
		a = a.replaceAll(",", "");
		a = a.substring(a.length()-4, a.length());
		System.out.println(new Long(a));*/
		
		
		//duobaoService.createCaiPiaoTerm();
		OauthLogin oauthLogin = oauthLoginMapper.selectByUserId(888);
		
		Var var = varMapper.selectByPrimaryKey(new Integer(1));
		//获取微信用户的name 作为account
		String weiXinUserInfo = userService.getWeiXinUserInfo(var.getValue(), oauthLogin.getOauthId());
		com.alibaba.fastjson.JSONObject weiXinUserInfoJsonData = JSON.parseObject(weiXinUserInfo);
		String errcode = weiXinUserInfoJsonData.getString("errcode");
		logger.info("erroCode: " + errcode);
		if(errcode!=null&&(errcode.equals("40001")||errcode.equals("42001"))){
			duobaoService.getGolbalAccessToken();
			var = varMapper.selectByPrimaryKey(new Integer(1));
			//获取微信用户的name 作为account
			weiXinUserInfo = userService.getWeiXinUserInfo(var.getValue(), oauthLogin.getOauthId());
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
		//duobaoService.sendWXMessageBalance(1,1);
		//fDFSFileUpload.getSlaveImage("http://120.25.193.220/group1/M00/2D/0F/eBnB3FhMvtmAWHS9AAGpPLD7ONQ79.file", 512, 512);
		
		//duobaoService.getGolbalAccessToken();
		/*for(int i=2;i<=400;i++){
			UserProfile profile = userProfileMapper.selectByUserId(i);
			profile.setEmail("cookabuy"+i+"@163.com");
			userProfileMapper.updateByPrimaryKeySelective(profile);
		}*/
		/*for(int i=2;i<=400;i++){
			try {
				UserRoleLinkKey key = new UserRoleLinkKey();
				key.setRoleId(2);
				key.setUserId(i);
				userRoleLinkMapper.insertSelective(key);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}*/
		/*for(int i=1;i<=400;i++){
			OauthLogin login = oauthLoginMapper.selectByUserId(401);
			login.setUserId(i);
			login.setLoginId(null);
			oauthLoginMapper.insertSelective(login);
		}*/
	}
	@Test
	public void termInitPoint(){
		
		Product product = productMapper.selectByPrimaryKey(197);
		if (product!=null) {
			List<ProductImageLink> images = productImageMapper.selectByProductId(product.getProductId());
			//非快速
			Term newTerm = new Term();
			newTerm.setTotalAmount((int)(product.getPrice().intValue()*1.5));
			newTerm.setStatus("running");
			newTerm.setIsQuick(false);
			newTerm.setMoneyLimit(1);
			//TODO这个要适当改
			newTerm.setPoint(150);
			newTerm.setProductId(product.getProductId());
			newTerm.setProductImage(images.get(0).getImageUrl());
			newTerm.setProductPrice(product.getPrice());
			newTerm.setProductTitle(product.getTitle());
			newTerm.setCurrentTerm(1);
			newTerm.setIsPoint(true);
			Term search = new Term();
			search.setProductId(product.getProductId());
			search.setMoneyLimit(1);
			search.setIsQuick(false);
			Term isExisted = termMapper.selectByTerm(search);
			if(isExisted==null){
				termMapper.insertSelective(newTerm);
			}else{
				logger.info("已存在： " + JSON.toJSONString(isExisted));
			}
		}
	}
	
	@Test
	public void termInitPointCode(){
		
		Product product = productMapper.selectByPrimaryKey(198);
		if (product!=null) {
			List<ProductImageLink> images = productImageMapper.selectByProductId(product.getProductId());
			//非快速
			Term newTerm = new Term();
			newTerm.setTotalAmount(1);//活动商品设定为1，因为积分商品规则是满人并且过了fulltime
			newTerm.setStatus("running");
			newTerm.setIsQuick(true);
			newTerm.setMoneyLimit(1);
			newTerm.setPoint(0);
			newTerm.setProductId(product.getProductId());
			newTerm.setProductImage(images.get(0).getImageUrl());
			newTerm.setProductPrice(product.getPrice());
			newTerm.setProductTitle(product.getTitle());
			newTerm.setIsPoint(true);
			newTerm.setCurrentTerm(1);
			Term search = new Term();
			search.setProductId(product.getProductId());
			search.setMoneyLimit(1);
			search.setIsQuick(true);
			Term isExisted = termMapper.selectByTerm(search);
			if(isExisted==null){
				termMapper.insertSelective(newTerm);
			}else{
				logger.info("已存在： " + JSON.toJSONString(isExisted));
			}
		}
	}
	
	
	@Test
	public void termInit(){
		
		//一元区
		Integer[] productId = {151,152,153,154,155};
		List<Product> products = productMapper.selectAll();
		Collections.shuffle(products);
		/*for(Integer i : productId){
			Product product = productMapper.selectByPrimaryKey(i);
			if (product!=null) {
				List<ProductImageLink> images = productImageMapper.selectByProductId(i);
				//非快速
				Term newTerm = new Term();
				newTerm.setTotalAmount(product.getPrice().intValue());
				newTerm.setStatus("running");
				newTerm.setIsQuick(false);
				newTerm.setMoneyLimit(1);
				newTerm.setProductId(i);
				newTerm.setProductImage(images.get(0).getImageUrl());
				newTerm.setProductPrice(product.getPrice());
				newTerm.setProductTitle(product.getTitle());
				newTerm.setCurrentTerm(1);
				Term search = new Term();
				search.setProductId(i);
				search.setMoneyLimit(1);
				search.setIsQuick(false);
				Term isExisted = termMapper.selectByTerm(search);
				if(isExisted==null){
					termMapper.insertSelective(newTerm);
					//快速
					
					
				}else{
					logger.info("已存在： " + JSON.toJSONString(isExisted));
				}
				search.setIsQuick(true);
				Term isquickExisted = termMapper.selectByTerm(search);
				if(isquickExisted==null){
					newTerm.setIsQuick(true);newTerm.setTermId(null);
					termMapper.insertSelective(newTerm);
				}else{
					logger.info("快开已存在： " + JSON.toJSONString(isExisted));
				}
			}
			
		}*/
		for(Product product:products){
			if (product!=null) {
				List<ProductImageLink> images = productImageMapper.selectByProductId(product.getProductId());
				//非快速
				Term newTerm = new Term();
				newTerm.setTotalAmount(product.getPrice().intValue());
				newTerm.setStatus("running");
				newTerm.setIsQuick(false);
				newTerm.setMoneyLimit(1);
				newTerm.setProductId(product.getProductId());
				newTerm.setProductImage(images.get(0).getImageUrl());
				newTerm.setProductPrice(product.getPrice());
				newTerm.setProductTitle(product.getTitle());
				newTerm.setCurrentTerm(1);
				Term search = new Term();
				search.setProductId(product.getProductId());
				search.setMoneyLimit(1);
				search.setIsQuick(false);
				Term isExisted = termMapper.selectByTerm(search);
				if(isExisted==null){
					termMapper.insertSelective(newTerm);
					//快速
					
					
				}else{
					logger.info("已存在： " + JSON.toJSONString(isExisted));
				}
			}
			
		}
		for(Product product:products){
			if (product!=null) {
				List<ProductImageLink> images = productImageMapper.selectByProductId(product.getProductId());
				//非快速
				Term newTerm = new Term();
				newTerm.setTotalAmount(product.getPrice().intValue());
				newTerm.setStatus("running");
				newTerm.setIsQuick(false);
				newTerm.setMoneyLimit(1);
				newTerm.setProductId(product.getProductId());
				newTerm.setProductImage(images.get(0).getImageUrl());
				newTerm.setProductPrice(product.getPrice());
				newTerm.setProductTitle(product.getTitle());
				newTerm.setCurrentTerm(1);
				Term search = new Term();
				search.setProductId(product.getProductId());
				search.setMoneyLimit(1);
				search.setIsQuick(true);
				Term isquickExisted = termMapper.selectByTerm(search);
				if(isquickExisted==null){
					newTerm.setIsQuick(true);newTerm.setTermId(null);
					termMapper.insertSelective(newTerm);
				}else{
					logger.info("快开已存在： " + JSON.toJSONString(isquickExisted));
				}
			}
			
		}
		
	}
	@Test
	public void termInit10(){
		
		//十元区
		Integer[] productId = {151,152,153,154,155};
		List<Product> products = productMapper.selectAllForTen();
		logger.info(JSON.toJSONString(products));
		Collections.shuffle(products);
		/*for(Integer i : productId){
			
			Product product = productMapper.selectByPrimaryKey(i);
			if (product!=null) {
				List<ProductImageLink> images = productImageMapper.selectByProductId(i);
				//非快速
				Term newTerm = new Term();
				newTerm.setTotalAmount(product.getPrice().intValue());
				newTerm.setStatus("running");
				newTerm.setIsQuick(false);
				newTerm.setMoneyLimit(10);
				newTerm.setProductId(i);
				newTerm.setProductImage(images.get(0).getImageUrl());
				newTerm.setProductPrice(product.getPrice());
				newTerm.setProductTitle(product.getTitle());
				newTerm.setCurrentTerm(1);
				Term search = new Term();search.setProductId(i);
				search.setMoneyLimit(10);
				search.setIsQuick(false);
				Term isExisted = termMapper.selectByTerm(search);
				if(isExisted==null){
					termMapper.insertSelective(newTerm);
				}else{
					logger.info("已存在： " + JSON.toJSONString(isExisted));
				}	
				search.setIsQuick(true);
				Term isquickExisted = termMapper.selectByTerm(search);
				if(isquickExisted==null){
					newTerm.setIsQuick(true);
					newTerm.setTermId(null);
					termMapper.insertSelective(newTerm);
				}else{
					logger.info("快开已存在： " + JSON.toJSONString(isExisted));
				}
			}
			
		}*/
		for(Product product:products){
			
			if (product!=null) {
				List<ProductImageLink> images = productImageMapper.selectByProductId(product.getProductId());
				//非快速
				Term newTerm = new Term();
				newTerm.setTotalAmount(product.getPrice().intValue());
				newTerm.setStatus("running");
				newTerm.setIsQuick(false);
				newTerm.setMoneyLimit(10);
				newTerm.setProductId(product.getProductId());
				newTerm.setProductImage(images.get(0).getImageUrl());
				newTerm.setProductPrice(product.getPrice());
				newTerm.setProductTitle(product.getTitle());
				newTerm.setCurrentTerm(1);
				Term search = new Term();search.setProductId(product.getProductId());
				search.setMoneyLimit(10);
				search.setIsQuick(false);
				Term isExisted = termMapper.selectByTerm(search);
				if(isExisted==null){
					termMapper.insertSelective(newTerm);
				}else{
					logger.info("已存在： " + JSON.toJSONString(isExisted));
				}
			}
			
		}
		for(Product product:products){
			
			if (product!=null&&product.getProductId()!=148&&product.getProductId()!=149&&product.getProductId()!=150) {
				List<ProductImageLink> images = productImageMapper.selectByProductId(product.getProductId());
				//非快速
				Term newTerm = new Term();
				newTerm.setTotalAmount(product.getPrice().intValue());
				newTerm.setStatus("running");
				newTerm.setIsQuick(false);
				newTerm.setMoneyLimit(10);
				newTerm.setProductId(product.getProductId());
				newTerm.setProductImage(images.get(0).getImageUrl());
				newTerm.setProductPrice(product.getPrice());
				newTerm.setProductTitle(product.getTitle());
				newTerm.setCurrentTerm(1);
				Term search = new Term();search.setProductId(product.getProductId());
				search.setMoneyLimit(10);
				search.setIsQuick(true);
				Term isquickExisted = termMapper.selectByTerm(search);
				if(isquickExisted==null){
					newTerm.setIsQuick(true);
					newTerm.setTermId(null);
					termMapper.insertSelective(newTerm);
				}else{
					logger.info("快开已存在： " + JSON.toJSONString(isquickExisted));
				}
			}
			
		}
		
	}
	@Test
	public void termInitpk(){
		
		//pk区
		Integer[] productId = {151,152,153,154,155};
		List<Product> products = productMapper.selectAllForPk();
		logger.info(JSON.toJSONString(products));
		Collections.shuffle(products);
		for(Product product : products){
			if (product!=null) {
				List<ProductImageLink> images = productImageMapper.selectByProductId(product.getProductId());
				//非快速
				Term newTerm = new Term();
				newTerm.setTotalAmount(product.getPrice().intValue());
				newTerm.setStatus("running");
				newTerm.setIsQuick(false);
				newTerm.setMoneyLimit(product.getPrice().divide(new BigDecimal(2)).intValue());
				if(new BigDecimal(newTerm.getMoneyLimit()*2).compareTo(product.getPrice())<0){
					newTerm.setMoneyLimit(newTerm.getMoneyLimit()+1);
				}
				newTerm.setIsPk(true);
				newTerm.setProductId(product.getProductId());
				newTerm.setProductImage(images.get(0).getImageUrl());
				newTerm.setProductPrice(product.getPrice());
				newTerm.setProductTitle(product.getTitle());
				newTerm.setCurrentTerm(1);
				Term search = new Term();
				search.setProductId(product.getProductId());
				search.setIsPk(true);
				search.setIsQuick(false);
				Term isExisted = termMapper.selectByTerm(search);
				if(isExisted==null){
					termMapper.insertSelective(newTerm);
				}else{
					logger.info("已存在： " + JSON.toJSONString(isExisted));
				}				
			}
			
		}
		
	}
	@Test
	public void insertUser(){
		String[] name = {"jacky","pom","anglaaaa","悉数沉淀","暖寄归人","瞎闹腾i","?独美i","林明友","刘语熙","厌世症i","人心可畏","你真逗比","前凸后翘","可喜可乐","以心换心","?或许?","渣中王?","一干为尽","你的愚忠","就是任性","缺氧患人！","住进时光里","难免心酸°","只为你生！","前后都是你","?陌离女王","香烟520、","默默的承受、","骄傲到自负。","Dissappear。","释怀╮","笑叹。红尘","花花花、小伙","Au revoir、","墨尔本╮情","女人、玩的是命","妞╮笑个","一半╮眼线","这样就好╮","郭青龙","何明伟","辛友佳","豆芽菜╮","過客。","solo　-","忘了他╮","粉红。顽皮豹","小心翼翼","°別敷衍涐","恋人爱成路人","昔日餘光。","放肆丶小侽人","微信网名","今非昔比’","孤单*无名指","莫名的青春","灬一抹丶苍白","笑叹★尘世美","爱你心口难开","那傷。眞美","命運不堪浮華","々爱被冰凝固ゝ","一生承诺","↘▂_倥絔","只求一份安定","齐定喜","李美君","冯柳喜","哭花了素颜、","浮殇年華","焚心劫","ー 半 憂 傷","余温散尽 ぺ","执念，爱","漫长の人生","迷路的男人","ˉ夨落旳尐孩。","蝶恋花╮","。婞褔ｖīｐ","丶演绎悲伤","怀念·最初","回忆未来","簡單灬愛","请在乎我１秒","昂贵的、背影","日久见人心","无可置疑◆","*丶 海阔天空","虚伪了的真心","最迷人的危险","有妳，很幸福","相知相惜","◆乱世梦红颜","残花为谁悲丶","淡淡の、清香","齐定丽","肖美君","吴美茹","代价是折磨╳","吥↘恠侑噯↘","?、花容月貌","﹎℡默默的爱","穿越古代","习惯","石头剪子布","言己","肖世军","金宝喜","李洪庆","爱你太久i","慢热型男","爱我所爱@","疯格@","ㄜ~{离隹}、","仺白了青春","黒色ン誘惑灬","累@","@重返20岁","步非+烟花","背叛的报应。","彼此爱人i@","白美玲","朱志芳","易晓霞","吴海燕","长欢尽","◤　　戏子°","爱情自以为是","釹王控。","对半感情","ら樱雪之城ペ","蝼蚁@","无 、尽 寂寞","分开走@","颓废式╭流年","萌主﹫","花香洇染","智商╮偏d1。","阳光下的少年。","冷酷‰杀神","邵佳俊","叶连安","刘青云","C丶F灬梦之队","ɡ1rl。女孩","女孩般的幸福","我姓黄我心慌！","烟染╰　素人颜","丿super丶潮流灬","奥利奥╮","青春的爱恋","Ｓòrγy︶ㄣ","萌爹爹","女王(Queen)ゆ性","- Vie","爱情有保质期","最爱还是你","罗美芳","骆彩霞","季克浩","掌心温差","玫瑰香旳誘惑","柠栀@","分开也不一定分手","Queenie. 女帝","万能男神经i","糕富帅#","愛上╮寂寞","人情薄如纸","◆帅气范儿つ","沙继军","毛麒麟","李鑫","这年头、寂寞","揍性！","℡懒懒DE猪","乱的很有节奏ゆ","婚姻终结者","曾经飞蛾扑火","颓废囧妳","杯中酒，鸳鸯情。","繁复","苏如才","林华春","ご沿海哋带づ","﹏繁花°似景","刪蒢ゝ鐹呿","浅浅dē伤","一無所冇","海綿bāo寶り","無處葬心","伱個禽獸丶","夏末未了°","半夢__半醒","蜡笔小旧","一季花开ˇ","■□後知後覺","淺憶微涼∞","小嘴欠吻","1/2的愛情","梅俊凯","李俊昊","蔡建军","哆啦ā夢り","爲愛癡狂","╰╮強顔歡笑","旧人不覆","米熙小夏","淫而不Se丶","人小鬼大","独奏ヽ 情歌","迷乱浮生﹡","冷暖自知","半夏时光","浅笑ヽ微凉","花骨朵er","爲 迩 封 鈊","藍色灬飛揚","屎性ハ改°","易晓霞","梅丽旭","情 比 紙 薄","「似水流年」°","浅陌凉汐﹋","思念成瘾","じ十指相扣☆","╰素顔小姐","甯缺勿濫丶","____落盡殘殇","心如死灰゛","後知後覺","七星瓢蟲⊕","︶ε╰叽叽歪歪","後會無期","空城旧梦","辛嘉健","皮成丽","夏殤¤落樱","没 心 没 肺 °","ぃ绣滊泡泡℃","嘟嘟⊕糖果","晴天。小曦","孤獨患者","暇裝bu愛","夏智","迩媞壞銀","嘘！安静点","不痛不癢≈","夏末°微傷","洞房不败~","梦醒时分°","旧人成梦","陈锡联","顺萁咱然丶","紫蝶之纞","安然失笑ゝ","屁颠屁颠-->","∝逢床作戏","浮浮沉沉﹋","㊣兒⑧經","hero","夏至ゝ未至","心力憔悴〤","緦唸λ蓇",".·☆蝶舞飛揚☆·.","故作堅強","本人已屎","Summer·不離不棄","So丶各自安好","行尸走肉","麦芽糖糖ぴ","易喜璐","梅丽丽","空城旧颜°","゛浮殇若梦╮","三好先森","正二8紧","浅夏﹌初凉","一紙荒年","╬茡潞釦","私定终生ら","尐貓咪咪","じ浮浮沉沉☆","櫻婲の涙","郭光正","赵晓曦","吴康木","麽心麽肺","旧 情 未 了","半醉〞巴黎づ","果冻布丁℃","薄暮凉年∞","毁了 悔了","浅心蓝染△","黯繎落泪〃","神经兮兮°","﹏诉丶那鍛綪","ˊ命鍾鉒顁","卑微旳嗳","陌路离殇","肖林霞","付玉军","安颜如夏","此號已封","安之若素","罌粟Ω妖嬈","κiζs呆呆尐糖","二無止境","間間單單ヾ","自欺欺人","陌落ミ繁華﹏","花落な莫离い","Mé、尐捣蛋","查理德","莫宇飞","陈明","容晓霞","あ為谁痴狂ゼ","魔鬼先森","天意弄人","覆水难收╰","童心未泯","誮舞⊕霓裳","不爱我？滚！","墨羽尘曦","独守空城","赵喜琴","# 念念不忘丶","╰流年已逝╮","尐嘴゛親親","流年、獨殤","紫陌≈紅塵","神经兮兮°","浮生若梦ァ","一 念 执 著","查无此人","妖言惑衆","莫泆莫忘","齐连喜","謹色安年","三寸日光¤","紅塵殇雪","煙花易涼","冯少军","郭启祥","彭丽丽","斯文敗類","一曲離殇","笑靥っ如誮","吧唧吧唧","雨dē印記","半糖主義","旧日巴黎﹏","蛋疼先森","冷月葬魂","简李娟","彩霞","赵宝杰","那時°年少","一世妖娆","絕蝂de愛♂","勿念心安。","誮開一夏","淺眸丶流年","何必再忆","墨染孤舟","你把矫情当成爱情","简单灬爱","张杰","谢佳俊","别在我面前犯贱","__没有背景","丶猫猫er","雪花ミ飞舞","淡抹丶悲伤","メ稀饭你的笑","纯真ブ已不复存在","开心的笨小孩","梅丽佳","虚 张 声 势","姬〆小溅","倾听冷暖丿","巴黎铁塔","_倾月轩萱_","相见不如怀念","沵算what°","有妳很瞞促","冷落了","帶著面具過日子~","體溫","冷凤奇","戚临夏","哥，淫领时尚","从未消失的孤独","班提喜","白梦萍","吴佳杰","孔丽奇","丶七炫灬","哼唱 小情歌"};
		String[] ip = {"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳",
				"广东湛江","广东湛江","广东清远","广东茂名","广东信宜","广东佛山","广东广州","广东广州","广东深圳","广东深圳"
		};
		for(int i=2;i<=401;i++){
			User user = new User();
			user.setPassword("gca7NbU8GLeXvDtVxJApBtj6bB+aWBBW6j93TzZthv8=");
			user.setSerialNum(NumberUtil.generateSerialNum());
			user.setUserId(i);
			userMapper.insertSelective(user);
			UserProfile profile = new UserProfile();
			File file = new File("D://pingtuan/image/" + i + ".jpg");
			String url = fDFSFileUpload.getFileId(file);
			logger.info(url);
			profile.setImage(url);
			profile.setUserId(i);
			profile.setProfileId(i);
			profile.setName(name[i]);
			profile.setNickName(name[i]);
			profile.setIpAddr(ip[i]);
			userProfileMapper.insertSelective(profile);
			FinancialAccount account = new FinancialAccount();
			account.setAccountId(i);
			account.setUserId(i);
			financialAccountMapper.insertSelective(account);
		}
	}
	
	@Test
	public void updateUserImage(){
		Integer[] userId = {107,155,160,211,215,321,339};
		for(Integer i : userId){
			UserProfile profile = userProfileMapper.selectByUserId(i);
			File file = new File("D://pingtuan/image/" + (i) + ".jpg");
			String url = fDFSFileUpload.getFileId(file);
			logger.info(url);
			profile.setImage(url);
			userProfileMapper.updateByPrimaryKeySelective(profile);
		}
	}
	
	@Test
	public void testRandom(){
		HashSet<Integer> h=new HashSet<Integer>();
		while(h.size()<10){
			int max=101;
	        int min=2;
			Random random = new Random();
			int tmp = random.nextInt(max)%(max-min+1) + min;
			h.add(tmp);
		}
		logger.info(JSON.toJSONString(h));
	}
	
	@Test
	public void insertAccount(){
		for(int i=0;i<100;i++){
			FinancialAccount account = new FinancialAccount();
			account.setAccountId(i+2);
			account.setUserId(i+2);

			financialAccountMapper.insertSelective(account);
		}
	}
	
	@Test
	public void tersAutoBuy(){
		/*List<Term> terms = termMapper.selectAll();
		for(Term term:terms){
			duobaoService.autoBuy(term);
		}*/
		//duobaoService.autoBuy(1);
	}
	@Test
	public void testStr(){
		/*List<Term> terms = termMapper.selectAll();
		for(Term term:terms){
			duobaoService.autoBuy(term);
		}*/
		Long number = (long) 143225565;
		String timeStrPost = number.toString().substring(0, 2)+":"+number.toString().substring(2, 4)+":"+number.toString().substring(4, 6);
		String timefix = number.toString().substring(6, 9);
		logger.info(timeStrPost);
		logger.info(timefix);
	}
	@Test
	public void tersTimeSuffix(){
		String a = "2016-10-27 11:29:23";
		int index = a.lastIndexOf(".");
		String timeSufix = "";
		if(index!=-1){
			String tmp = a.substring(index, a.length());
			System.err.println(tmp.length());
			timeSufix = tmp;
			if(timeSufix.length()<4){
				for(int t=0;t<4-tmp.length();t++){
					timeSufix = timeSufix + "0";
				}
			}
		}else{
			timeSufix=".000";
		}
		
		System.err.println(timeSufix);
	}
	@Test
	public void tersWxMessage(){
		//duobaoService.sendWXMessageSuccess(105,5,"14782464907416592");
		//System.err.println(Pattern.matches("^m.uclee.com/duobao.*$","m.uclee.com/duobao-user-web/login"));
		int count = orderNumberMapper.getTotalBuyCount();
		TableRow table = tableRowMapper.selectByTableName("db_order_numbers");
		table.setRows(count);
		tableRowMapper.updateByPrimaryKeySelective(table);
	}
	@Test
	public void tersAlipay(){
		PaymentOrder paymentOrder = userService.getPaymentOrderBySerialNum("147869681446513462");
		PaymentStrategyResult paymentStrategyResult = userService.getAlipayForFastPay(paymentOrder, "夺宝优购订单支付", "http://m.uclee.com/paymentResult?paymentSerialNum="+paymentOrder.getPaymentSerialNum());
		logger.info(JSON.toJSONString(paymentStrategyResult));
	}
}
