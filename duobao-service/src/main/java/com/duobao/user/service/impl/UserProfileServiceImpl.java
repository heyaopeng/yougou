package com.duobao.user.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.duobao.fundation.data.mybatis.mapping.PermissionMapper;
import com.duobao.fundation.data.mybatis.mapping.RoleMapper;
import com.duobao.fundation.data.mybatis.mapping.UserProfileMapper;
import com.duobao.fundation.data.mybatis.model.Permission;
import com.duobao.fundation.data.mybatis.model.Role;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.fundation.dfs.fastdfs.FDFSFileUpload;
import com.duobao.user.service.UserProfileServiceI;
import com.duobao.user.util.UserUtil;

@Service("userProfileService")
public class UserProfileServiceImpl implements UserProfileServiceI {

	
	@Autowired
	private UserProfileMapper userProfileMapper;

	@Autowired
	private RoleMapper roleMapper;
	
	@Autowired
	private PermissionMapper permissionMapper;

	@Autowired
	private FDFSFileUpload fDFSFileUpload;
	
	private static final Logger logger = Logger.getLogger(UserProfileServiceImpl.class);

	@Override
	public UserProfile getUserProfile(UserProfile userProfile) {
		if(userProfile == null){
			logger.info("传入 对象为空");
			return null;
		}
		return userProfileMapper.selectByUserProfile(userProfile);
	}
	
	@Override
	public UserProfile getUserProfileByEmailOrPhoneOrSerialNum(String account){
		if(StringUtils.isEmpty(account)){
			logger.info("传入 account 值 为空");
			return null;
		}
		UserProfile userProfile = new UserProfile();
		if(UserUtil.isPhone(account)){
			userProfile.setPhone(account);
		}else if(UserUtil.isEmail(account)){
			
			userProfile.setEmail(account);
		}else{
			userProfile.setSerialNum(account);
		}
		return  getUserProfile(userProfile);
	}
	
	@Override
	public UserProfile getUserProfileByUserId(Integer userId){
		if(userId == null){
			logger.info("userId  为空");
			return null;
		}
		UserProfile userProfile = new UserProfile();
		userProfile.setUserId(userId);
		return  getUserProfile(userProfile);
	}
	
	@Override
	public List<String> getRolesByUserId(Integer userId){
		List<String> t = new ArrayList<String>();
		List<Role> roleList = roleMapper.selectUserRoles(userId);
 		for(Role role:roleList){
			if(role.getIsActive()){	
				t.add(role.getRole());
			}
		}
		return t;
	}
	
	public int updateUserProfile(UserProfile userProfile) {
		if(null == userProfile || userProfile.getProfileId() == null){
			logger.info("对象为空 或者profile id 为空");
			return 0;
		}
		logger.info("userProfile: " + JSON.toJSONString(userProfile));
		return userProfileMapper.updateByPrimaryKeySelective(userProfile);
	}
	
	@Override
	public List<String> getUserPermissions(Integer userId) {
		List<Role> roleList = roleMapper.selectUserRoles(userId);
		List<String> permissions = new ArrayList<String>();
		for(Role role:roleList){
			if(role.getIsActive()){
				List<Permission> permsList = permissionMapper.selectRolePermissions(role.getRoleId());
				for(Permission perms:permsList){
					if(perms.getIsActive()){
						permissions.add(perms.getPermission());
					}
				}
			}
			else{
				logger.info(role.getRole() +"is  not active");
			}
		}
		return removeDuplicate(permissions);
	}
	
	private  List<String> removeDuplicate(List<String> list)  {
	    HashSet<String> h  =   new  HashSet<String>(list);
	    list.clear();
	    list.addAll(h);
	    return list;
	}

}
