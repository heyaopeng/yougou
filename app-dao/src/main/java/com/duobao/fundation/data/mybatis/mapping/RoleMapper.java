package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.duobao.fundation.data.mybatis.model.Role;

public interface RoleMapper {
    int deleteByPrimaryKey(Integer roleId);

    int insert(Role record);

    int insertSelective(Role record);

    Role selectByPrimaryKey(Integer roleId);
    
    //不会把子帐号的角色 查询出来   即为 is_in_list = 1
    List<Role> selectUserRoles(@Param(value="userId")Integer userId);

    List<Role> selectSubUserRoles(@Param(value="userId")Integer   userId);
    
    /**
     *isInList  列表 显示的时候是否显示子帐号
     *userId    为null 的是否 会查询全部的role 
     */
    List<Role> getUserRoles(@Param(value="userId")Integer userId,@Param(value="isInList")boolean isInList);
    
    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);
    
    int updateRoleParentId(@Param(value="parentId")Integer oleParentId,@Param(value="newParentId")Integer newParentId);
    
}