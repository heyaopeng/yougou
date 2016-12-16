package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.DelPaymentOrder;

public interface DelPaymentOrderMapper {
    int deleteByPrimaryKey(Integer paymentOrderId);

    int insert(DelPaymentOrder record);

    int insertSelective(DelPaymentOrder record);

    DelPaymentOrder selectByPrimaryKey(Integer paymentOrderId);

    int updateByPrimaryKeySelective(DelPaymentOrder record);

    int updateByPrimaryKey(DelPaymentOrder record);

    DelPaymentOrder selectByPaymentSerialNum(String paymentSerialNum);
}