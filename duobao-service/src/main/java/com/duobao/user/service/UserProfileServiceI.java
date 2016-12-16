package com.duobao.user.service;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.UserProfile;

public interface UserProfileServiceI {
	
	/*
	 * userProfile  可以传入phone、email、userId、profileId
	 */
	UserProfile getUserProfile(UserProfile userProfile);
	
	UserProfile getUserProfileByUserId(Integer userId);
	
	UserProfile getUserProfileByEmailOrPhoneOrSerialNum(String account);
	
	int updateUserProfile(UserProfile userProfile);
	
	List<String> getRolesByUserId(Integer userId);
	
	List<String> getUserPermissions(Integer userId);
}
