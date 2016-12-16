package com.duobao.fundation.data.mybatis.model;

import java.util.Date;

public class Var {
    private Integer varId;
    
    private String platform;
    
    private String name;
    private String value;
    
    private Date storageTime;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Integer getVarId() {
		return varId;
	}

	public void setVarId(Integer varId) {
		this.varId = varId;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getStorageTime() {
		return storageTime;
	}

	public void setStorageTime(Date storageTime) {
		this.storageTime = storageTime;
	}
    
}