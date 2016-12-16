package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;
import java.util.Map;

import com.duobao.fundation.data.mybatis.model.UserRoleLinkKey;

public interface UserRoleLinkMapper {
    int deleteByPrimaryKey(UserRoleLinkKey key);

    int insert(UserRoleLinkKey record);

    int insertSelective(UserRoleLinkKey record);
    
    int batchAddUserRoles(List<UserRoleLinkKey> record);
    
    int batachDeleteUserRoles(Map<String,Object> map);
    
    List<UserRoleLinkKey> selectByUserId(Integer userId);
}