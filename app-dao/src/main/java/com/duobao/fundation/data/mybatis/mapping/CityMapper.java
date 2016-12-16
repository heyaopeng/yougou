package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.City;

public interface CityMapper {
    int deleteByPrimaryKey(Integer cityId);

    int insert(City record);

    int insertSelective(City record);

    City selectByPrimaryKey(Integer cityId);

    int updateByPrimaryKeySelective(City record);

    int updateByPrimaryKey(City record);

	List<City> selectByStateId(Integer stateId);

	City selectByCity(String city);
}