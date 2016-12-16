package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.duobao.fundation.data.mybatis.model.Order;

public interface OrderMapper {
    int deleteByPrimaryKey(Integer orderId);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Integer orderId);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);

	List<Order> selectByUserId(Integer userId);

	List<Order> selectByOrder(Order orderSearch);
	
	List<Order> selectByWinOrderForUserHome(Order orderSearch);

	Order selectBySerialNum(String orderSerialnum);

	List<Order> selectByTermIdAndUserId(@Param("termId")Integer termId, @Param("userId")Integer userId);

	List<Order> selectByTermId(Integer termId);

	List<Order> selectForSchedule();

	List<Order> selectByPaymentOrderId(Integer paymentOrderId);

	int updateIsPaidByOrderId(Integer orderId);

}