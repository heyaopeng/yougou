package com.duobao.fundation.data.mybatis.model;

import java.math.BigDecimal;
import java.util.Date;

public class CashCoupon {
    private Integer couponId;

    private String couponNumber;

    private Date createTime;

    private Boolean isActive;
    
    private BigDecimal money;
    
    private BigDecimal duobaoMoney;
	
	private String url;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

    public BigDecimal getDuobaoMoney() {
		return duobaoMoney;
	}

	public void setDuobaoMoney(BigDecimal duobaoMoney) {
		this.duobaoMoney = duobaoMoney;
	}

	public BigDecimal getMoney() {
		return money;
	}

	public void setMoney(BigDecimal money) {
		this.money = money;
	}

	public Integer getCouponId() {
        return couponId;
    }

    public void setCouponId(Integer couponId) {
        this.couponId = couponId;
    }

    public String getCouponNumber() {
        return couponNumber;
    }

    public void setCouponNumber(String couponNumber) {
        this.couponNumber = couponNumber == null ? null : couponNumber.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}