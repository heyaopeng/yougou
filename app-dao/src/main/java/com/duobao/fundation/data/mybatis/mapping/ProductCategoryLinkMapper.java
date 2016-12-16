package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.ProductCategoryLink;
import com.duobao.fundation.data.mybatis.model.ProductCategoryLinkKey;

public interface ProductCategoryLinkMapper {
    int deleteByPrimaryKey(ProductCategoryLinkKey key);

    int insert(ProductCategoryLink record);

    int insertSelective(ProductCategoryLink record);

    ProductCategoryLink selectByPrimaryKey(ProductCategoryLinkKey key);

    int updateByPrimaryKeySelective(ProductCategoryLink record);

    int updateByPrimaryKey(ProductCategoryLink record);

	ProductCategoryLink selectByProductId(Integer productId);
}