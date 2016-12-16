package com.duobao.fundation.data.mybatis.mapping;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.duobao.fundation.data.mybatis.model.PointSignin;

public interface PointSigninMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(PointSignin record);

    int insertSelective(PointSignin record);

    PointSignin selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PointSignin record);

    int updateByPrimaryKey(PointSignin record);

	PointSignin selectTodayByUserId(@Param("userId")Integer userId, @Param("startTime")Date startTime, @Param("endTime")Date endTime);
}