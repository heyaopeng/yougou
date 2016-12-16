package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.Bank;

public interface BankMapper {
    int deleteByPrimaryKey(String bankId);

    int insert(Bank record);

    int insertSelective(Bank record);

    Bank selectByPrimaryKey(String bankId);
    
    List<Bank> selectAll();

    int updateByPrimaryKeySelective(Bank record);

    int updateByPrimaryKey(Bank record);
}