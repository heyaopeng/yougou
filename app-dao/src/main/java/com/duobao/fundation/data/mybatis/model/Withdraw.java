package com.duobao.fundation.data.mybatis.model;

import java.math.BigDecimal;
import java.util.Date;

public class Withdraw {
    private Integer withdrawId;

    private String withdrawSerialnum;

    private Integer accountId;

    private Byte accountType;

    private String accountNum;

    private BigDecimal money;

    private BigDecimal handlingCharge;

    private Date applyTime;
    
    private String applyTimeStr;

    private Date dealTime;

    private String operator;

    private String remittanceNum;

    private String evidenceUrl;

    private String rejectReason;

    private Byte status;
    
    private String name;
    
    private String bank;
    
    private Byte type;

    public String getApplyTimeStr() {
		return applyTimeStr;
	}

	public void setApplyTimeStr(String applyTimeStr) {
		this.applyTimeStr = applyTimeStr;
	}

	public Byte getType() {
		return type;
	}

	public void setType(Byte type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	public Integer getWithdrawId() {
        return withdrawId;
    }

    public void setWithdrawId(Integer withdrawId) {
        this.withdrawId = withdrawId;
    }

    public String getWithdrawSerialnum() {
        return withdrawSerialnum;
    }

    public void setWithdrawSerialnum(String withdrawSerialnum) {
        this.withdrawSerialnum = withdrawSerialnum == null ? null : withdrawSerialnum.trim();
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Byte getAccountType() {
        return accountType;
    }

    public void setAccountType(Byte accountType) {
        this.accountType = accountType;
    }

    public String getAccountNum() {
        return accountNum;
    }

    public void setAccountNum(String accountNum) {
        this.accountNum = accountNum == null ? null : accountNum.trim();
    }

    public BigDecimal getMoney() {
        return money;
    }

    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    public BigDecimal getHandlingCharge() {
        return handlingCharge;
    }

    public void setHandlingCharge(BigDecimal handlingCharge) {
        this.handlingCharge = handlingCharge;
    }

    public Date getApplyTime() {
        return applyTime;
    }

    public void setApplyTime(Date applyTime) {
        this.applyTime = applyTime;
    }

    public Date getDealTime() {
        return dealTime;
    }

    public void setDealTime(Date dealTime) {
        this.dealTime = dealTime;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator == null ? null : operator.trim();
    }

    public String getRemittanceNum() {
        return remittanceNum;
    }

    public void setRemittanceNum(String remittanceNum) {
        this.remittanceNum = remittanceNum == null ? null : remittanceNum.trim();
    }

    public String getEvidenceUrl() {
        return evidenceUrl;
    }

    public void setEvidenceUrl(String evidenceUrl) {
        this.evidenceUrl = evidenceUrl == null ? null : evidenceUrl.trim();
    }

    public String getRejectReason() {
        return rejectReason;
    }

    public void setRejectReason(String rejectReason) {
        this.rejectReason = rejectReason == null ? null : rejectReason.trim();
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }
}