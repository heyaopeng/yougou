package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.OauthLogin;

public interface OauthLoginMapper {
    int deleteByPrimaryKey(Integer loginId);

    int insert(OauthLogin record);

    int insertSelective(OauthLogin record);

    OauthLogin selectByPrimaryKey(Integer loginId);

    int updateByPrimaryKeySelective(OauthLogin record);

    int updateByPrimaryKey(OauthLogin record);
    
    OauthLogin getOauthLoginInfoByOauthId(String oauthId);
    
    OauthLogin getOauthLoginInfoByUserId(Integer userId);

	OauthLogin selectByUserId(Integer userId);

	List<OauthLogin> selectForSchedule();

	List<OauthLogin> selectNotSendPoint();
}