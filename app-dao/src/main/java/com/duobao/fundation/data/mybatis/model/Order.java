package com.duobao.fundation.data.mybatis.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class Order {
    private Integer orderId;

    private String orderSerialnum;

    private String productTitle;
    
    private String productImage;
    
    private BigDecimal productPrice;

    private Integer termId;

    private Integer userId;
    
    private String addr;
    private String name;
    private String phone;

    private Integer paymentOrderId;

    private Date createTime;
    
    private String createTimeStr;

    private Date payTime;

    private BigDecimal totalPrice;

    private Boolean isPaid;

    private Boolean isLuckyOrder;
    
    private String ipAddr;
    
    private String nickName;
    
    private String userImage;
    
    private String userSerialNum;
    
    private Term term;
    
    private List<OrderNumber> orderNumber;
    
    private List<AllOrderNumber> allOrderNumber;
    
    private Integer allNumberCount;
    
    private int numberCount;
    
    private Winner winner;
    
    private String status;
    
    private Boolean isOpen;
    
    private String openTimeStr;
    
    private Long luckyNumber;
    
    private Boolean isActive;
    
    private Boolean isAutoBuy;
    
    private Integer currentTerm;
    
    private Boolean isPoint;

    private long fullTimeCountDown;
    
	public long getFullTimeCountDown() {
		return fullTimeCountDown;
	}

	public void setFullTimeCountDown(long fullTimeCountDown) {
		this.fullTimeCountDown = fullTimeCountDown;
	}

	public Boolean getIsPoint() {
		return isPoint;
	}

	public void setIsPoint(Boolean isPoint) {
		this.isPoint = isPoint;
	}

	public Boolean getIsAutoBuy() {
		return isAutoBuy;
	}

	public void setIsAutoBuy(Boolean isAutoBuy) {
		this.isAutoBuy = isAutoBuy;
	}

	public String getProductTitle() {
		return productTitle;
	}

	public String getUserSerialNum() {
		return userSerialNum;
	}

	public void setUserSerialNum(String userSerialNum) {
		this.userSerialNum = userSerialNum;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Integer getCurrentTerm() {
		return currentTerm;
	}

	public void setCurrentTerm(Integer currentTerm) {
		this.currentTerm = currentTerm;
	}

	public String getOpenTimeStr() {
		return openTimeStr;
	}

	public void setOpenTimeStr(String openTimeStr) {
		this.openTimeStr = openTimeStr;
	}

	private Long timeCountDown;
	public Integer getAllNumberCount() {
		return allNumberCount;
	}

	public void setAllNumberCount(Integer allNumberCount) {
		this.allNumberCount = allNumberCount;
	}

	public List<AllOrderNumber> getAllOrderNumber() {
		return allOrderNumber;
	}

	public void setAllOrderNumber(List<AllOrderNumber> allOrderNumber) {
		this.allOrderNumber = allOrderNumber;
	}

	public Long getTimeCountDown() {
		return timeCountDown;
	}

	public void setTimeCountDown(Long timeCountDown) {
		this.timeCountDown = timeCountDown;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public Long getLuckyNumber() {
		return luckyNumber;
	}

	public void setLuckyNumber(Long luckyNumber) {
		this.luckyNumber = luckyNumber;
	}

	public String getUserImage() {
		return userImage;
	}

	public void setUserImage(String userImage) {
		this.userImage = userImage;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getIpAddr() {
		return ipAddr;
	}

	public void setIpAddr(String ipAddr) {
		this.ipAddr = ipAddr;
	}

	public Boolean getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(Boolean isOpen) {
		this.isOpen = isOpen;
	}

	public String getCreateTimeStr() {
		return createTimeStr;
	}

	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<OrderNumber> getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(List<OrderNumber> orderNumber) {
		this.orderNumber = orderNumber;
	}

	public int getNumberCount() {
		return numberCount;
	}

	public void setNumberCount(int numberCount) {
		this.numberCount = numberCount;
	}

	public Winner getWinner() {
		return winner;
	}

	public void setWinner(Winner winner) {
		this.winner = winner;
	}

	public Term getTerm() {
		return term;
	}

	public void setTerm(Term term) {
		this.term = term;
	}

	public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getOrderSerialnum() {
        return orderSerialnum;
    }

    public void setOrderSerialnum(String orderSerialnum) {
        this.orderSerialnum = orderSerialnum == null ? null : orderSerialnum.trim();
    }

	public void setProductTitle(String productTitle) {
		this.productTitle = productTitle;
	}

	public String getProductImage() {
		return productImage;
	}

	public void setProductImage(String productImage) {
		this.productImage = productImage;
	}

	public BigDecimal getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(BigDecimal productPrice) {
		this.productPrice = productPrice;
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

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public Integer getPaymentOrderId() {
        return paymentOrderId;
    }

    public void setPaymentOrderId(Integer paymentOrderId) {
        this.paymentOrderId = paymentOrderId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getPayTime() {
        return payTime;
    }

    public void setPayTime(Date payTime) {
        this.payTime = payTime;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Boolean getIsPaid() {
        return isPaid;
    }

    public void setIsPaid(Boolean isPaid) {
        this.isPaid = isPaid;
    }

    public Boolean getIsLuckyOrder() {
        return isLuckyOrder;
    }

    public void setIsLuckyOrder(Boolean isLuckyOrder) {
        this.isLuckyOrder = isLuckyOrder;
    }
}