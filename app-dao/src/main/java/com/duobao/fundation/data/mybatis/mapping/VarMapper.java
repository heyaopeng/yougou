package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.Var;

public interface VarMapper {
	
	int deleteByPrimaryKey(Integer varId);

    int insert(Var var);

    int insertSelective(Var var);

    Var selectByPrimaryKey(Integer varId);

    int updateByPrimaryKeySelective(Var var);

    int updateByPrimaryKey(Var var);
}
