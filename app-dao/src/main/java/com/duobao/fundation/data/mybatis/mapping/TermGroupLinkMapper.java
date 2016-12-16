package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.TermGroupLink;
import com.duobao.fundation.data.mybatis.model.TermGroupLinkKey;

public interface TermGroupLinkMapper {
    int deleteByPrimaryKey(TermGroupLinkKey key);

    int insert(TermGroupLink record);

    int insertSelective(TermGroupLink record);

    TermGroupLink selectByPrimaryKey(TermGroupLinkKey key);

    int updateByPrimaryKeySelective(TermGroupLink record);

    int updateByPrimaryKey(TermGroupLink record);
    
    List<TermGroupLinkKey> selectByGroupId(Integer groupId);
}