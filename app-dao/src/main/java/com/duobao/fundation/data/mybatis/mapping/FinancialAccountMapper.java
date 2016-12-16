package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.FinancialAccount;

public interface FinancialAccountMapper {
    int deleteByPrimaryKey(Integer accountId);

    int insert(FinancialAccount record);

    int insertSelective(FinancialAccount record);

    FinancialAccount selectByPrimaryKey(Integer accountId);

    int updateByPrimaryKeySelective(FinancialAccount record);

    int updateByPrimaryKey(FinancialAccount record);

	FinancialAccount selectByUserId(Integer userId);
}