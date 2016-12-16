package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.Country;

public interface CountryMapper {
    int deleteByPrimaryKey(Integer countryId);

    int insert(Country record);

    int insertSelective(Country record);

    Country selectByPrimaryKey(Integer countryId);

    int updateByPrimaryKeySelective(Country record);

    int updateByPrimaryKey(Country record);
}