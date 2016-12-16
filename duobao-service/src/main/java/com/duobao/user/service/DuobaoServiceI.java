package com.duobao.user.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.duobao.fundation.data.mybatis.model.CaiPiao;
import com.duobao.fundation.data.mybatis.model.Category;
import com.duobao.fundation.data.mybatis.model.Order;
import com.duobao.fundation.data.mybatis.model.PaymentOrder;
import com.duobao.fundation.data.mybatis.model.StoreApplication;
import com.duobao.fundation.data.mybatis.model.Term;
import com.duobao.fundation.data.mybatis.model.TermGroup;
import com.duobao.fundation.data.mybatis.model.TermSearch;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.user.model.PaymentStrategyResult;
import com.duobao.user.model.TermOpenningStatus;
import com.github.pagehelper.PageInfo;

public interface DuobaoServiceI {
	List<TermGroup> getTermGroups(String[] tags);

	PageInfo<Term> getAllProductSelective(TermSearch termSearch, Integer pageNum, Integer pageSize);

	Term getTermInfo(Integer termId,Integer userId,boolean isNew);

	List<Category> getAllCat();

	boolean caipiao();

	TermOpenningStatus getTermOpenningStatus(Integer termId);

	boolean createCaiPiaoTerm();

	Long transferData(Date time, String timeSufix);

	boolean openHandler(Term term);

	Order getTermResult(Integer termId,boolean isNew);

	String storeAuthHandler(Integer applyId, Integer status);

	List<StoreApplication> selectProcessingApplications();

	PageInfo<Term> getLatestOpenList(Integer pageNum, Integer pageSize);

	Term getTermResultForRecentOpen(Integer termId);

	PageInfo<Order> getJoinList(Integer termId,Integer isNew,Integer pageNum,Integer pageSize);

	PageInfo<Term> getLuckyList(Integer termId, Integer pageNum, Integer pageSize);
	
	Term createNewTerm(Integer termId);

	void openHandlerSchedule();

	boolean autoBuyHandler(Term term, BigDecimal money, UserProfile profile);
	
	String sendWXMessageSuccess(Integer userId,Integer successCount,String orderSerialNum);

	String getGolbalAccessToken();

	String sendWXMessageMiss(Integer userId, Integer successCount, String orderSerialNum);

	Integer getTotalBuyCount();

	List<Term> selectAllTerm();

	String sendWXMessageMiss2(Integer userId, String paymentSerialNum);

	String sendWXMessageWin(Integer userId, String orderSerialNum);

	PageInfo<Term> getWaitingOpenList(Integer pageNum, Integer pageSize);

	String sendWXMessageWuliu(Integer userId, String orderSerialNum,String logisticComp,String logisticNum);

	Term getTermByCode(String code);

	void sendWXMessageBalance(Integer userId, Integer count);

}
