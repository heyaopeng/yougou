package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.User;

public interface UserMapper {
    int deleteByPrimaryKey(Integer userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer userId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    
    User selectBySerialNum(String serialNum);
}