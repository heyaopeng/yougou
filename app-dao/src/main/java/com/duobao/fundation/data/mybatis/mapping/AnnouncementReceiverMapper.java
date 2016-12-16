package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.AnnouncementReceiver;

public interface AnnouncementReceiverMapper {
    int insert(AnnouncementReceiver record);

    int insertSelective(AnnouncementReceiver record);
}