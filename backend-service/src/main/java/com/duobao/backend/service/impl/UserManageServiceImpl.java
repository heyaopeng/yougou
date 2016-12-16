package com.duobao.backend.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.backend.model.RoleForm;
import com.backend.model.UserRoleForm;
import com.backend.service.UserManageServiceI;
import com.duobao.fundation.config.links.ConfigConstant;
import com.duobao.fundation.config.links.PermissionSetting;
import com.duobao.fundation.data.mybatis.mapping.PermissionMapper;
import com.duobao.fundation.data.mybatis.mapping.RoleMapper;
import com.duobao.fundation.data.mybatis.mapping.RolePermissionLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.UserMapper;
import com.duobao.fundation.data.mybatis.mapping.UserProfileMapper;
import com.duobao.fundation.data.mybatis.mapping.UserRoleLinkMapper;
import com.duobao.fundation.data.mybatis.model.FinancialAccount;
import com.duobao.fundation.data.mybatis.model.Permission;
import com.duobao.fundation.data.mybatis.model.Role;
import com.duobao.fundation.data.mybatis.model.RolePermissionLinkKey;
import com.duobao.fundation.data.mybatis.model.User;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.fundation.data.mybatis.model.UserRoleLinkKey;
import com.duobao.user.util.SHA256;
import com.duobao.user.util.UserUtil;
import com.google.common.base.Strings;

public class UserManageServiceImpl implements UserManageServiceI{
	@Autowired
	private RoleMapper roleMapper;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private UserRoleLinkMapper userRoleLinkMapper;
	
	@Autowired
	private UserProfileMapper userProfileMapper;
	
	@Autowired
	private RolePermissionLinkMapper rolePermissionLinkMapper;
	
	@Autowired
	private PermissionMapper permissionMapper;
	
	
	private static final Logger logger = Logger.getLogger(UserManageServiceImpl.class);
	
	/*
	 *用户列表，带权限
	 */
	public List<UserRoleForm> getUserAndRoleList(Integer  roleId){
		List<UserProfile> t =  getUsersByRoleType(roleId);
		List<UserRoleForm>  result = new ArrayList<UserRoleForm>();
		for(UserProfile userProfile:t){
			UserRoleForm userRoleForm = new UserRoleForm();
			userRoleForm.setEmail(userProfile.getEmail());
			userRoleForm.setPhone(userProfile.getPhone());
			userRoleForm.setIsActive(userProfile.getIsActive());
			userRoleForm.setRegistTime(userProfile.getRegistTime());
			userRoleForm.setRoleList(getUserRoles(userProfile.getUserId()));
			result.add(userRoleForm);
		}
		return result;
		
	}

	@Override
	public List<UserProfile> getUsersByRoleType(Integer  roleId) {
		return userProfileMapper.selectUserByRoleType(roleId);
	}
	
	@Override
	public List<UserProfile> getUsersByPhone(UserProfile userProfile) {
		return userProfileMapper.selectListByUserProfile(userProfile);
	}
	
	/*
	 * 获取用户所拥有的角色
	 * userId 为空的时候获取全部的角色 
	 */
	@Override
	public List<Role> getUserRoles(Integer userId){
		return roleMapper.selectUserRoles(userId);
	}

	public List<Role>  selectSubUserRoles(Integer userId){
		return roleMapper.selectSubUserRoles(userId);
	}
	/*
	 * 给定角色的parentId,获取其能管理的角色列表,并按树形结构排序
	 */
	public List<Role>  getTreeSortRoleList(Integer parentId){
		List<Role> allRoleList = getUserRoles(null);
		LinkedList<Role> result = new LinkedList<Role>() ;
		result = treeSort(allRoleList,result,parentId,0);
		logger.info(JSON.toJSONString(result));
		return result; 
	}
	
	
	/*
	 * 获取当前用户所不能管理的上级角色
	 */
	public List<Role> getHigherRoleList(Integer roleId){
		List<Role> allRoleList = getUserRoles(null);
		LinkedList<Role> result = new LinkedList<Role>();
		return getHighRoles(allRoleList,result,roleId);
	}
	@Override
	public int addUserRoles(List<UserRoleLinkKey> record) {
		return userRoleLinkMapper.batchAddUserRoles(record);
	}

	
	@Override
	public int deleUerRoles(Integer[] roleIds,Integer userId){
		Map<String, Object> map = new HashMap<>();
        map.put("roleIds", roleIds);
        map.put("userId", userId);
		return userRoleLinkMapper.batachDeleteUserRoles(map);
	}
	
	@Override
	public int addRoleAndPermissoin(RoleForm roleForm) {
		Role role = new Role();
		role.setIsActive(true);
		role.setRole(roleForm.getRole());
		if(roleForm.getParentId() != null)
			role.setParentId(roleForm.getParentId());
		if(roleMapper.insertSelective(role)>0){
			if(roleForm.getPermission()!=null){
				return addRolePermissions(roleForm.getPermission(),role.getRoleId());
			}else{
				return 1;  //添加用户而没有添加角色
			}
		}
		return role.getRoleId();
	}
	
	/*
	 * 给角色添加权限
	 * 参数：list  roleId
	 */
	public int  addRolePermissions(List<Permission> permissions,Integer roleId){
		List<Permission> list = new ArrayList<Permission>();
		for(Permission per:permissions){
			if(per.getPermissionId()!=null){
				list.add(per);
			}
		}
		Map<String, Object> map = new HashMap<>();
		
        map.put("permissions",list);
        map.put("roleId", roleId);
		return rolePermissionLinkMapper.addRolePermissionsByList(map);
	}
	
	/*
	 *通过tag  给角色添加权限 
	 */
	public int addRolePermissionByTag(String tags[],Integer roleId){
		Integer[] permissionIds = getPermissionIdsByTag(tags);
		if(permissionIds.length<1){
			logger.info("异常，所给的tag中，找不到对应的权限  ");
			return 0;
		}
		return addRolePermissions(permissionIds,  roleId);
	}
	
	
	public int deleteRolePermissionByTag(String tags[],Integer roleId){
		Integer[] permissionIds = getPermissionIdsByTag(tags);
		if(permissionIds.length<1){
			logger.info("异常，所给的tag中，找不到对应的权限  ");
			return 0;
		}
		return deleRolePermissions(permissionIds,  roleId);
	}
	public Integer[] getPermissionIdsByTag(String[] tags){
		ArrayList<Integer> permissionIds = new ArrayList<Integer>(); 
		for(String item:tags){
			List<Permission> permission = permissionMapper.selectPermissionsByTag(item);
			if(CollectionUtils.isEmpty(permission)){
				logger.info("tag  名为"+item+"的权限为空");
			}
			else{
				for(Permission per:permission)
					permissionIds.add(per.getPermissionId());
			}
		}
		return (Integer[])permissionIds.toArray(new Integer[permissionIds.size()]);
	}
	@Override
	public int addRolePermissions(Integer[] permissionIds,Integer roleId){
		Map<String, Object> map = new HashMap<>();
        map.put("permissionIds", permissionIds);
        map.put("roleId", roleId);
		return rolePermissionLinkMapper.addRolePermissions(map);
	}
	
	@Override
	public int deleRole(Integer roleId){
		return roleMapper.deleteByPrimaryKey(roleId);
	}
	
	@Override
	public int updateRoleParentId(Integer oldParentId,Integer newParentId){
		return roleMapper.updateRoleParentId(oldParentId, newParentId);
	}
	
	@Override
	public Role seletRoleById(Integer roleId) {
		return roleMapper.selectByPrimaryKey(roleId);
	}
	

	@Override
	public List<RoleForm> getRoleWithPermissions() {
		List<RoleForm> roleLists = new ArrayList<RoleForm>();
		List<Role> roles = getUserRoles(null);
		for(int i=0;i<roles.size();i++){
			RoleForm roleForm = new RoleForm();
			List<Permission> permissions = selectRolePermissions(roles.get(i).getRoleId());
			roleForm.setPermission(permissions);
			roleForm.setRole(roles.get(i).getRole());
			roleForm.setIsActive(roles.get(i).getIsActive());
			roleForm.setRoleId(roles.get(i).getRoleId());
			roleLists.add(roleForm);
		}
		return roleLists;
	}
	
	@Override
	public int updateRole(Role role){
		return roleMapper.updateByPrimaryKeySelective(role);
	}
	
	@Override
	public int deleRolePermissions(Integer[] permissionIds, Integer roleId) {
		Map<String, Object> map = new HashMap<>();
		logger.info("正在执行删除角色id 为"+roleId+"的权限,删除的权限数组为"+JSON.toJSONString(permissionIds));
        map.put("permissionIds", permissionIds);
        map.put("roleId", roleId);
        return rolePermissionLinkMapper.deleRolePermissions(map);
	}

	
	@Override
	public int addPermission(Permission record){
		record.setIsActive(true);           //默认启用权限
		permissionMapper.insertSelective(record);
		RolePermissionLinkKey admin = new RolePermissionLinkKey();
		admin.setRoleId(ConfigConstant.ROOT_ROLE_ID);
		admin.setPermissionId(record.getPermissionId());
		return rolePermissionLinkMapper.insertSelective(admin);   //为超级管理员插入权限
	}
	
	@Override
	public int updatePermission(Permission record){
		return permissionMapper.updateByPrimaryKeySelective(record);
	}
	
	public Set<String> selectTagByRoleId(Integer roleId){
		List<Permission> permissions = selectRolePermissions(roleId);
		if(CollectionUtils.isEmpty(permissions)){
			logger.info("roleId 为"+roleId+"权限为空");
			return null;
		}
		Set<String> tags = new HashSet<String>();
		for(Permission per:permissions){
			if(!Strings.isNullOrEmpty(per.getTag()))
					tags.add(per.getTag());
		}
		return tags;
	}
	
	public List<Permission> getMarketcontrolPermission(Integer roleId){
		Set<String> roleHasPermission = selectTagByRoleId(roleId);
		List<Permission> permissions = new ArrayList<Permission>();
		
		if(CollectionUtils.isEmpty(roleHasPermission)){
			logger.info("市场子帐号 对应角色"+roleId+"没有任何tag 的权限");
 			for(PermissionSetting.MarketPermission item:PermissionSetting.MarketPermission.values()){
				String permissionName = item.toString();
				Permission permission = new Permission();
				permission.setIsActive(false);
				permission.setPermission(permissionName);
				permissions.add(permission);
			}
 			return permissions;
		}
		
		for(PermissionSetting.MarketPermission item:PermissionSetting.MarketPermission.values()){
			String permissionName = item.toString();
			Permission permission = new Permission();
			if(roleHasPermission.contains(permissionName)){
				permission.setIsActive(true);
			}
			else{
				permission.setIsActive(false);
			}
			permission.setPermission(permissionName);
			permissions.add(permission);
		}
		logger.info("该角色的权限 列表是"+JSON.toJSONString(permissions));
		return permissions;
	}
	
	public List<Permission> getStorecontrolPermission(Integer roleId){
		Set<String> roleHasPermission = selectTagByRoleId(roleId);
		List<Permission> permissions = new ArrayList<Permission>();
		if(CollectionUtils.isEmpty(roleHasPermission)){
			logger.info("市场子帐号 对应角色"+roleId+"没有任何tag 的权限");
			for(PermissionSetting.StorePermission item:PermissionSetting.StorePermission.values()){
				String permissionName = item.toString();
				Permission permission = new Permission();
				permission.setIsActive(false);
				permission.setPermission(permissionName);
				permissions.add(permission);
			}
		}
		else{
			logger.info("已有的tag 权限标签"+JSON.toJSONString(roleHasPermission));
		}
		
		
		for(PermissionSetting.StorePermission item:PermissionSetting.StorePermission.values()){
			String permissionName = item.toString();
			Permission permission = new Permission();
			//System.err.println(permissionName);
			if(roleHasPermission.contains(permissionName)){
				permission.setIsActive(true);
			}
			else{
				permission.setIsActive(false);
			}
			permission.setPermission(permissionName);
			permissions.add(permission);
		}
		return permissions;
	}
	
	@Override
	public List<Permission> selectRolePermissions(Integer roleId) {
		return permissionMapper.selectRolePermissions(roleId);
	}

	@Override
	public int delePermission(Integer permissionId){
		return permissionMapper.deleteByPrimaryKey(permissionId);
	}

	@Override
	public Permission selePermissionById(Integer permissionId) {
		return permissionMapper.selectByPrimaryKey(permissionId);
	}

	@Override
	public List<Role> getUserRoles(Integer userId, boolean isInList) {
		 return  roleMapper.getUserRoles(userId, isInList);
	}
	
	@Override
	public List<User> getUserListByUserIdAndRoleId(Integer userId,
			Integer roleId) {
		// TODO Auto-generated method stub
		//return userMapper.selectUserListByUserIdAndRoleId(userId, roleId);
		return null;
	}
	
	
	public  LinkedList<Role> getHighRoles(List<Role> list,LinkedList<Role> result,Integer parentId){
		Role temp = seletRoleById(parentId);
		if(temp!=null){
			result.add(temp);
			list.remove(temp);
			return getHighRoles(list,result,temp.getParentId());
		}else{
			return result;
		}
		
	}
	
	/*
	 * 将role list 进行排序，使得输出 为 树形结构
	 */
	public  LinkedList<Role> treeSort(List<Role> list,LinkedList<Role> result,Integer parentId,Integer level){
		level++;
		//System.out.println("水平位置"+level);
    	List<Role> temp = new ArrayList<Role>();
    	for(int i=0;i<list.size();i++){
    		if(list.get(i).getParentId().equals(parentId)){
    			temp.add(list.get(i));
    			//System.out.println(" ++ "+JSON.toJSONString(list.get(i)));
    		}
    	}
    	if(temp.size()<1){
			return result;
		}else{
	    	for(int i = 0; i < list.size(); i++){
	    		if(list.get(i).getParentId().equals( parentId)){
	    			list.remove(list.get(i));
	    		}
	    	}
	    
	    	
	    	for (int i = 0; i < temp.size(); i++) 
            {
	    		//System.out.println("-----------"+JSON.toJSONString(temp.get(i)));
	    		temp.get(i).setLevel(level);
                result.add(temp.get(i));
                treeSort(list, result, temp.get(i).getRoleId(),level);
            }
            return result;
		}
    }
	
	private String getSalt(Date date) {
		return String.format("%1$tY-%1$tm-%1$td %1$tH:%1$tM:%1$tS",date);
	
	}

}
