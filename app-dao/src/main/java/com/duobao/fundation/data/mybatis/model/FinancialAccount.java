package com.duobao.fundation.data.mybatis.model;

import java.math.BigDecimal;

public class FinancialAccount {
    private Integer accountId;

    private Integer userId;

    private BigDecimal balance;

    private BigDecimal commissionMoney;
    
    private BigDecimal cashCoupon;

    private Integer points;

    public BigDecimal getCashCoupon() {
		return cashCoupon;
	}

	public void setCashCoupon(BigDecimal cashCoupon) {
		this.cashCoupon = cashCoupon;
	}

	public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getCommissionMoney() {
        return commissionMoney;
    }

    public void setCommissionMoney(BigDecimal commissionMoney) {
        this.commissionMoney = commissionMoney;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }
}