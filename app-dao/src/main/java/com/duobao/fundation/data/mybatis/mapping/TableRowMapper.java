package com.duobao.fundation.data.mybatis.mapping;

import com.duobao.fundation.data.mybatis.model.TableRow;

public interface TableRowMapper {
	
	int deleteByPrimaryKey(Integer rowId);

    int insert(TableRow tableRow);

    int insertSelective(TableRow tableRow);

    TableRow selectByPrimaryKey(Integer rowId);

    int updateByPrimaryKeySelective(TableRow tableRow);

    int updateByPrimaryKey(TableRow tableRow);

	TableRow selectByTableName(String tableName);

}
