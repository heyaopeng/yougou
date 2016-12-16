package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.UserProductTraceLink;
import com.duobao.fundation.data.mybatis.model.UserProductTraceLinkKey;

public interface UserProductTraceLinkMapper {
    int deleteByPrimaryKey(UserProductTraceLinkKey key);

    int insert(UserProductTraceLink record);

    int insertSelective(UserProductTraceLink record);

    UserProductTraceLink selectByPrimaryKey(UserProductTraceLinkKey key);

    int updateByPrimaryKeySelective(UserProductTraceLink record);

    int updateByPrimaryKey(UserProductTraceLink record);
}