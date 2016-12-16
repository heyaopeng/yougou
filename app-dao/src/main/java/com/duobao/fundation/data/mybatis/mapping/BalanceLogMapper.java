package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.BalanceLog;

public interface BalanceLogMapper {
    int deleteByPrimaryKey(Integer logId);

    int insert(BalanceLog record);

    int insertSelective(BalanceLog record);

    BalanceLog selectByPrimaryKey(Integer logId);

    int updateByPrimaryKeySelective(BalanceLog record);

    int updateByPrimaryKey(BalanceLog record);

	List<BalanceLog> selectByBalanceLog(BalanceLog logSearch);
}