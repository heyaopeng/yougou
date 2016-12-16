package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.Store;

public interface StoreMapper {
    int deleteByPrimaryKey(Integer storeId);

    int insert(Store record);

    int insertSelective(Store record);

    Store selectByPrimaryKey(Integer storeId);

    int updateByPrimaryKeySelective(Store record);

    int updateByPrimaryKey(Store record);

	Store selectByUserId(Integer userId);
}