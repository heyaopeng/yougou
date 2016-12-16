package com.duobao.fundation.data.mybatis.mapping;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.duobao.fundation.data.mybatis.model.Term;
import com.duobao.fundation.data.mybatis.model.TermSearch;

public interface TermMapper {
    int deleteByPrimaryKey(Integer termId);

    int insert(Term record);

    int insertSelective(Term record);

    Term selectByPrimaryKey(Integer termId);

    int updateByPrimaryKeySelective(Term record);

    int updateByPrimaryKey(Term record);

	List<Term> getAllProductSelective(TermSearch termSearch);

	List<Term> selectLatestForTermInfo(Term term);

	List<Term> selectLatestWinTermInfo(Term term);

	List<Term> selectByCaiPiao(String caipiaoTerm);

	List<Term> getLatestOpenList();

	List<Term> selectAllWinTermInfo(Term term);

	Term selectByTerm(Term search);

	List<Term> selectAll();

	List<Term> selectWaitingForOpen();

	List<Term> selectAllOneLimit();

	List<Term> selectAllTenLimit();

	List<Term> selectAllPK();

	int updateCurrentAmountById(@Param("termId")Integer termId, @Param("currentAmount")Integer currentAmount);

	List<Term> getWaitingOpenList();

	Term selectByCode(String code);

	List<Term> selectForTermOpenningHandler();
	
	List<Term> selectForTermOpenHandler();
}