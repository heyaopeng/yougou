package com.duobao.fundation.data.mybatis.mapping;

import java.util.Map;

import com.duobao.fundation.data.mybatis.model.RolePermissionLinkKey;

public interface RolePermissionLinkMapper {
    int deleteByPrimaryKey(RolePermissionLinkKey key);

    int insert(RolePermissionLinkKey record);

    int insertSelective(RolePermissionLinkKey record);
    
    int addRolePermissions(Map<String,Object> map);
    
    int addRolePermissionsByList(Map<String,Object> map);
    
    int deleRolePermissions(Map<String,Object> map);
    
    int delePermissionsByRoleId(Integer roleId);
}