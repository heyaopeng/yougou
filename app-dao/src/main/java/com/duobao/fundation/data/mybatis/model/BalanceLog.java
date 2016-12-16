package com.duobao.fundation.data.mybatis.model;

import java.math.BigDecimal;
import java.util.Date;

public class BalanceLog {
    private Integer logId;

    private Integer accountId;

    private String paymentSerialNum;

    private String title;

    private String operator;

    private Byte type;
    
    private String typeQuery;

    private BigDecimal money;

    private BigDecimal balance;

    private Date time;
    
    private String timeStr;

    private String note;

    private Boolean isIn;
    
    private Integer userId;

    private UserProfile userProfile;
    
    private BigDecimal consumeMoney;
    
    public BigDecimal getConsumeMoney() {
		return consumeMoney;
	}

	public void setConsumeMoney(BigDecimal consumeMoney) {
		this.consumeMoney = consumeMoney;
	}

	public UserProfile getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}

	public String getTypeQuery() {
		return typeQuery;
	}

	public void setTypeQuery(String typeQuery) {
		this.typeQuery = typeQuery;
	}

	public String getTimeStr() {
		return timeStr;
	}

	public void setTimeStr(String timeStr) {
		this.timeStr = timeStr;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getLogId() {
        return logId;
    }

    public void setLogId(Integer logId) {
        this.logId = logId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getPaymentSerialNum() {
        return paymentSerialNum;
    }

    public void setPaymentSerialNum(String paymentSerialNum) {
        this.paymentSerialNum = paymentSerialNum == null ? null : paymentSerialNum.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator == null ? null : operator.trim();
    }

    public Byte getType() {
        return type;
    }

    public void setType(Byte type) {
        this.type = type;
    }

    public BigDecimal getMoney() {
        return money;
    }

    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note == null ? null : note.trim();
    }

    public Boolean getIsIn() {
        return isIn;
    }

    public void setIsIn(Boolean isIn) {
        this.isIn = isIn;
    }
}