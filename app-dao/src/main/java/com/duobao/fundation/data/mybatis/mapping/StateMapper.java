package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.State;

public interface StateMapper {
    int deleteByPrimaryKey(Integer stateId);

    int insert(State record);

    int insertSelective(State record);

    State selectByPrimaryKey(Integer stateId);

    int updateByPrimaryKeySelective(State record);

    int updateByPrimaryKey(State record);

	List<State> selectAll();

	State selectByState(String state);
}