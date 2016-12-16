package com.duobao.fundation.data.mybatis.model;

public class TermSearch extends Term {
	
	private Integer categoryId;
	
	private Boolean isQuick;
	
	private Integer moneyLimit;	
	
	private String filterType;

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getFilterType() {
		return filterType;
	}

	public void setFilterType(String filterType) {
		this.filterType = filterType;
	}

	public Boolean getIsQuick() {
		return isQuick;
	}

	public void setIsQuick(Boolean isQuick) {
		this.isQuick = isQuick;
	}

	public Integer getMoneyLimit() {
		return moneyLimit;
	}

	public void setMoneyLimit(Integer moneyLimit) {
		this.moneyLimit = moneyLimit;
	}

}
