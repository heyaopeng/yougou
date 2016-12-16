package com.duobao.user.model;

import java.util.List;

import com.duobao.fundation.data.mybatis.model.CaiPiao;

public class TermOpenningStatus {
	
	private Boolean isOpen;
	
	private List<NumberA> numberA;
	
	private Long numberACount;
	
	private Long numberB;
	
	private Boolean isNeedCiaoPiao;
	
	private CaiPiao caiPiao;
	
	private Long result;

	public Boolean getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(Boolean isOpen) {
		this.isOpen = isOpen;
	}

	public Long getResult() {
		return result;
	}

	public void setResult(Long result) {
		this.result = result;
	}

	public Long getNumberACount() {
		return numberACount;
	}

	public void setNumberACount(Long numberACount) {
		this.numberACount = numberACount;
	}

	public Long getNumberB() {
		return numberB;
	}

	public void setNumberB(Long numberB) {
		this.numberB = numberB;
	}

	public Boolean getIsNeedCiaoPiao() {
		return isNeedCiaoPiao;
	}

	public void setIsNeedCiaoPiao(Boolean isNeedCiaoPiao) {
		this.isNeedCiaoPiao = isNeedCiaoPiao;
	}

	public List<NumberA> getNumberA() {
		return numberA;
	}

	public void setNumberA(List<NumberA> numberA) {
		this.numberA = numberA;
	}

	public CaiPiao getCaiPiao() {
		return caiPiao;
	}

	public void setCaiPiao(CaiPiao caiPiao) {
		this.caiPiao = caiPiao;
	}

}
