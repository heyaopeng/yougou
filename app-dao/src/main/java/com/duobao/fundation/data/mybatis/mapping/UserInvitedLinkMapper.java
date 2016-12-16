package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.duobao.fundation.data.mybatis.model.UserInvitedLink;

public interface UserInvitedLinkMapper {
    int deleteByPrimaryKey(Integer linkId);

    int insert(UserInvitedLink record);

    int insertSelective(UserInvitedLink record);

    UserInvitedLink selectByPrimaryKey(Integer linkId);

    int updateByPrimaryKeySelective(UserInvitedLink record);

    int updateByPrimaryKey(UserInvitedLink record);

	List<UserInvitedLink> selectByUserId(Integer userId);

	UserInvitedLink selectByUserIdAndInvitedId(@Param("userId")Integer userId, @Param("invitedId")Integer invitedId);

	UserInvitedLink selectByInvitedId(Integer userId);
}