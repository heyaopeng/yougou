package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.duobao.fundation.data.mybatis.model.Order;
import com.duobao.fundation.data.mybatis.model.OrderNumber;

public interface OrderNumberMapper {
    int deleteByPrimaryKey(Integer numberId);

    int insert(OrderNumber record);

    int insertSelective(OrderNumber record);

    OrderNumber selectByPrimaryKey(Integer numberId);

    int updateByPrimaryKeySelective(OrderNumber record);

    int updateByPrimaryKey(OrderNumber record);

	List<OrderNumber> selectByOrderId(Integer orderId);

	OrderNumber selectByLuckyNumberByOrderId(Integer orderId);

	OrderNumber selectLatestNumberByTermId(Integer termId);

	List<OrderNumber> selectLastFiftyForOpenning(Integer termId);

	OrderNumber selectByNumberAndTermId(@Param("number")Long number, @Param("termId")Integer termId);

	OrderNumber selectByLuckyNumberByTermId(Integer termId);

	List<OrderNumber> selectByUserIdAndTermId(@Param("userId")Integer userId, @Param("termId")Integer termId);

	Integer getTotalBuyCount();

	int batchInsert(List<OrderNumber> orderNumbers);

	OrderNumber selectPreAutoBuy(@Param("numberId")Integer numberId,@Param("termId")Integer termId);
	
	OrderNumber selectNextAutoBuy(@Param("numberId")Integer numberId,@Param("termId")Integer termId);
}