package com.duobao.user.model;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.BalanceLog;
import com.duobao.fundation.data.mybatis.model.FinancialAccount;

public class AccountCenter {
	
	private FinancialAccount financialAccount;
	
	private List<BalanceLog> log;
	
	private Integer pageNum;
	
	private Boolean hasNextPage;

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public Boolean getHasNextPage() {
		return hasNextPage;
	}

	public void setHasNextPage(Boolean hasNextPage) {
		this.hasNextPage = hasNextPage;
	}

	public FinancialAccount getFinancialAccount() {
		return financialAccount;
	}

	public void setFinancialAccount(FinancialAccount financialAccount) {
		this.financialAccount = financialAccount;
	}

	public List<BalanceLog> getLog() {
		return log;
	}

	public void setLog(List<BalanceLog> log) {
		this.log = log;
	}

}
