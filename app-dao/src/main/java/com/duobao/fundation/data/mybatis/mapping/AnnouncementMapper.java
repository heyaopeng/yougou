package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.Announcement;

public interface AnnouncementMapper {
    int deleteByPrimaryKey(Integer messageId);

    int insert(Announcement record);

    int insertSelective(Announcement record);

    Announcement selectByPrimaryKey(Integer messageId);

    int updateByPrimaryKeySelective(Announcement record);

    int updateByPrimaryKey(Announcement record);

	List<Announcement> selectByUserId(Integer userId);
}