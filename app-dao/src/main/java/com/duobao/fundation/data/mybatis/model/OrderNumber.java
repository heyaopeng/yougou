package com.duobao.fundation.data.mybatis.model;

import java.util.Date;

public class OrderNumber {
    private Integer numberId;

    private Integer orderId;

    private Integer termId;

    private Integer userId;

    private Long number;

    private Boolean isLuckyNumber;
    
    private Integer rank;
    
    private Date time;
    
    private String timeStr;
    
    private String timeSufix;

    public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getTimeStr() {
		return timeStr;
	}

	public void setTimeStr(String timeStr) {
		this.timeStr = timeStr;
	}

	public String getTimeSufix() {
		return timeSufix;
	}

	public void setTimeSufix(String timeSufix) {
		this.timeSufix = timeSufix;
	}

	public Integer getRank() {
		return rank;
	}

	public void setRank(Integer rank) {
		this.rank = rank;
	}

	public Integer getNumberId() {
        return numberId;
    }

    public void setNumberId(Integer numberId) {
        this.numberId = numberId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getTermId() {
        return termId;
    }

    public void setTermId(Integer termId) {
        this.termId = termId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public Boolean getIsLuckyNumber() {
        return isLuckyNumber;
    }

    public void setIsLuckyNumber(Boolean isLuckyNumber) {
        this.isLuckyNumber = isLuckyNumber;
    }
}