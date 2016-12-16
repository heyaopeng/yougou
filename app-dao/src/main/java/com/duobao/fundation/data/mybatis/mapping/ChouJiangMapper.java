package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.ChouJiang;

public interface ChouJiangMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ChouJiang record);

    int insertSelective(ChouJiang record);

    ChouJiang selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ChouJiang record);

    int updateByPrimaryKey(ChouJiang record);

	ChouJiang selectByUserId(Integer userId);
}