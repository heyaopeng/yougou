package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.PaymentOrder;

public interface PaymentOrderMapper {
    int deleteByPrimaryKey(Integer paymentOrderId);

    int insert(PaymentOrder record);

    int insertSelective(PaymentOrder record);

    PaymentOrder selectByPrimaryKey(Integer paymentOrderId);

    int updateByPrimaryKeySelective(PaymentOrder record);

    int updateByPrimaryKey(PaymentOrder record);

	PaymentOrder selectByPaymentSerialNum(String paymentSerialNum);

	List<PaymentOrder> selectComissionPayByTermId(Integer termId);
}