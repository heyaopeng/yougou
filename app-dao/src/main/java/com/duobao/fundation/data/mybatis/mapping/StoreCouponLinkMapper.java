package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.StoreCouponLinkKey;

public interface StoreCouponLinkMapper {
    int deleteByPrimaryKey(StoreCouponLinkKey key);

    int insert(StoreCouponLinkKey record);

    int insertSelective(StoreCouponLinkKey record);
}