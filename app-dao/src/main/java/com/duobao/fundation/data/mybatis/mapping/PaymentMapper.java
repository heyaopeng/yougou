package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.Payment;

public interface PaymentMapper {
    int deleteByPrimaryKey(Integer paymentId);

    int insert(Payment record);

    int insertSelective(Payment record);

    Payment selectByPrimaryKey(Integer paymentId);

    int updateByPrimaryKeySelective(Payment record);

    int updateByPrimaryKey(Payment record);

	List<Payment> selectAllForPayment();

	List<Payment> selectForPoint();
}