package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.duobao.fundation.data.mybatis.model.CartItem;

public interface CartItemMapper {
    int deleteByPrimaryKey(Integer itemId);

    int insert(CartItem record);

    int insertSelective(CartItem record);

    CartItem selectByPrimaryKey(Integer itemId);

    int updateByPrimaryKeySelective(CartItem record);

    int updateByPrimaryKey(CartItem record);

	List<CartItem> selectByUserId(Integer userId);

	List<CartItem> selectCartItemForSchedule();

	CartItem selectByUserIdAndTermId(@Param("userId")Integer userId, @Param("termId")Integer termId);

	CartItem selectByUserIdAndItemId(@Param("userId")Integer userId, @Param("itemId")Integer itemId);
}