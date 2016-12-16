package com.backend.service;

import java.util.LinkedList;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.backend.model.RoleForm;
import com.backend.model.UserRoleForm;
import com.duobao.fundation.data.mybatis.model.Permission;
import com.duobao.fundation.data.mybatis.model.Role;
import com.duobao.fundation.data.mybatis.model.User;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.fundation.data.mybatis.model.UserRoleLinkKey;

public interface UserManageServiceI {
	List<UserProfile> getUsersByRoleType(Integer  roleId);
	
	
	List<UserRoleForm> getUserAndRoleList(Integer  roleId);
	List<Role> getUserRoles(Integer userId);
	int  addUserRoles(List<UserRoleLinkKey> record);
	int deleUerRoles(Integer[] roleIds, Integer userId);
	
	int addRoleAndPermissoin(RoleForm roleForm);
	int  deleRole(Integer  roleId);
	int  updateRole(Role role);
	Role seletRoleById(Integer roleId);
	List<RoleForm> getRoleWithPermissions();
	
	int addRolePermissionByTag(String tags[],Integer roleId);
	int addRolePermissions(List<Permission> permissions,Integer roleId);
	int addRolePermissions(Integer[] permissionIds,Integer roleId);
	int deleRolePermissions(Integer permissionIds[],Integer roleId);
	
	
	int deleteRolePermissionByTag(String tags[],Integer roleId);
	int updatePermission(Permission record);
	int addPermission(Permission record);
	int delePermission(Integer permissionId);
	Permission selePermissionById(Integer permissionId);
	List<Permission> selectRolePermissions(Integer roleId);
	
    List<User> getUserListByUserIdAndRoleId(Integer userId,Integer roleId);
    List<Role>  getTreeSortRoleList(Integer parentId);
    LinkedList<Role> treeSort(List<Role> list,LinkedList<Role> result,Integer parentId,Integer level);
    int updateRoleParentId(Integer oldParentId,Integer newParentId);
    
    List<Role> getHigherRoleList(Integer userId);
    Integer[] getPermissionIdsByTag(String[] tags);
    
    List<Permission> getStorecontrolPermission(Integer roleId);
    List<Permission> getMarketcontrolPermission(Integer roleId);
    
    List<Role> selectSubUserRoles(Integer userId);
    
    List<Role> getUserRoles(Integer userId,boolean isInList);


	List<UserProfile> getUsersByPhone(UserProfile userProfile);
}
