package com.duobao.user.model;

import java.util.List;

public class CaiPiaoResponse {
	private Integer rows;
	
	private String code;
	
	private String info;
	
	private List<CaiPiaoData> data;

	public Integer getRows() {
		return rows;
	}

	public void setRows(Integer rows) {
		this.rows = rows;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public List<CaiPiaoData> getData() {
		return data;
	}

	public void setData(List<CaiPiaoData> data) {
		this.data = data;
	}
	
}
