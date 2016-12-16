package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.TermGroup;

public interface TermGroupMapper {
    int deleteByPrimaryKey(Integer groupId);

    int insert(TermGroup record);

    int insertSelective(TermGroup record);

    TermGroup selectByPrimaryKey(Integer groupId);

    int updateByPrimaryKeySelective(TermGroup record);

    int updateByPrimaryKey(TermGroup record);
    
    List<TermGroup> selectByTags(String[] tags);
}