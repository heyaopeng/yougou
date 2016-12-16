package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.Withdraw;

public interface WithdrawMapper {
    int deleteByPrimaryKey(Integer withdrawId);

    int insert(Withdraw record);

    int insertSelective(Withdraw record);

    Withdraw selectByPrimaryKey(Integer withdrawId);

    int updateByPrimaryKeySelective(Withdraw record);

    int updateByPrimaryKey(Withdraw record);

	Withdraw selectLatestBankWithdraw(Integer userId);

	List<Withdraw> selectByWithdraw(Withdraw withdraw);
}