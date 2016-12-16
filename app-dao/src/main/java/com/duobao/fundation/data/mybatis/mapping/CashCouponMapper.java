package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.CashCoupon;

public interface CashCouponMapper {
    int deleteByPrimaryKey(Integer couponId);

    int insert(CashCoupon record);

    int insertSelective(CashCoupon record);

    CashCoupon selectByPrimaryKey(Integer couponId);

    int updateByPrimaryKeySelective(CashCoupon record);

    int updateByPrimaryKey(CashCoupon record);

	CashCoupon selectByNumber(String couponNumber);
}