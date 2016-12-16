package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.AnnouncementUserLinkKey;

public interface AnnouncementUserLinkMapper {
    int deleteByPrimaryKey(AnnouncementUserLinkKey key);

    int insert(AnnouncementUserLinkKey record);

    int insertSelective(AnnouncementUserLinkKey record);
}