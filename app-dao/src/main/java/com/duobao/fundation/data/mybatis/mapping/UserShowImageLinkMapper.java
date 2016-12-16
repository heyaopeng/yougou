package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.UserShowImageLink;

public interface UserShowImageLinkMapper {
    int deleteByPrimaryKey(Integer linkId);

    int insert(UserShowImageLink record);

    int insertSelective(UserShowImageLink record);

    UserShowImageLink selectByPrimaryKey(Integer linkId);

    int updateByPrimaryKeySelective(UserShowImageLink record);

    int updateByPrimaryKey(UserShowImageLink record);

	List<UserShowImageLink> selectByShowId(Integer showId);
}