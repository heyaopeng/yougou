package com.duobao.fundation.data.mybatis.mapping;

import java.util.Date;
import java.util.List;

import com.duobao.fundation.data.mybatis.model.CaiPiao;

public interface CaiPiaoMapper {
	
	int deleteByPrimaryKey(String termId);

    int insert(CaiPiao caiPiao);

    int insertSelective(CaiPiao caiPiao);

    CaiPiao selectByPrimaryKey(String termId);

    int updateByPrimaryKeySelective(CaiPiao caiPiao);

    int updateByPrimaryKey(CaiPiao caiPiao);

	CaiPiao selectLastClose();

	List<CaiPiao> selectClosedTillNow(Date now);

	CaiPiao selectNextClose(Date openTime);

	CaiPiao selectProperCaiPiao(Date target);
}
