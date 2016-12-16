package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.duobao.fundation.data.mybatis.model.Region;

public interface RegionMapper {
    int deleteByPrimaryKey(Integer regionId);

    int insert(Region record);

    int insertSelective(Region record);

    Region selectByPrimaryKey(Integer regionId);

    int updateByPrimaryKeySelective(Region record);

    int updateByPrimaryKey(Region record);

	List<Region> selectByCityId(Integer cityId);

	Region selectByRegion(String region);

	Region selectByRegionAndCityId(@Param("region")String region, @Param("cityId")Integer cityId);
}