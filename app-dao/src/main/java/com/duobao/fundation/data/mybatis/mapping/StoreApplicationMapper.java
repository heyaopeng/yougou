package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.StoreApplication;

public interface StoreApplicationMapper {
    int deleteByPrimaryKey(Integer applicationId);

    int insert(StoreApplication record);

    int insertSelective(StoreApplication record);

    StoreApplication selectByPrimaryKey(Integer applicationId);

    int updateByPrimaryKeySelective(StoreApplication record);

    int updateByPrimaryKey(StoreApplication record);

	StoreApplication selectByUserId(Integer userId);

	List<StoreApplication> selectProcessingApplications();
}