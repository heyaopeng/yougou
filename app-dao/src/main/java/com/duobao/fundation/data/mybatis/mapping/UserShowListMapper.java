package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.duobao.fundation.data.mybatis.model.UserShowList;

public interface UserShowListMapper {
    int deleteByPrimaryKey(Integer showId);

    int insert(UserShowList record);

    int insertSelective(UserShowList record);

    UserShowList selectByPrimaryKey(Integer showId);

    int updateByPrimaryKeySelective(UserShowList record);

    int updateByPrimaryKey(UserShowList record);

	List<UserShowList> selectByUserId(Integer userId);

	List<UserShowList> selectAll(@Param("productId")Integer productId);
}