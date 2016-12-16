package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.duobao.fundation.data.mybatis.model.DelOrder;

public interface DelOrderMapper {
    int deleteByPrimaryKey(Integer orderId);

    int insert(DelOrder record);

    int insertSelective(DelOrder record);

    DelOrder selectByPrimaryKey(Integer orderId);

    int updateByPrimaryKeySelective(DelOrder record);

    int updateByPrimaryKey(DelOrder record);

	List<DelOrder> selectByUserId(Integer userId);

	List<DelOrder> selectByOrder(DelOrder orderSearch);

	DelOrder selectBySerialNum(String orderSerialnum);

	List<DelOrder> selectByTermIdAndUserId(@Param("termId")Integer termId, @Param("userId")Integer userId);

	List<DelOrder> selectByTermId(Integer termId);

	List<DelOrder> selectForSchedule();

	List<DelOrder> selectByPaymentOrderId(Integer paymentOrderId);

}