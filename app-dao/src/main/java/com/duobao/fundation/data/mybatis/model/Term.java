package com.duobao.fundation.data.mybatis.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class Term {
    private Integer termId;

    private String productTitle;
    
    private String productImage;
    
    private BigDecimal productPrice;

    private Integer totalAmount;

    private Integer currentAmount;
    
    private Integer currentTerm;

    private Long luckyNum;
    
    private Integer luckyOrder;

    private Date startTime;
    
    private Date fullTime;
    
    private long fullTimeCountDown;
    
    private String startTimeStr;

    private String openTimeStr;
    
    private Date openTime;

    private String status;

    private Boolean isQuick;
    
    private Boolean isPk;
    
    private Integer couponId;
    
    private String caipiaoTerm;

    private Integer moneyLimit;
    
    private Integer productId;
    
    private String keyWord;
    
    private List<String> productImages;
    
    private Integer myOrderNumberCount;
    
    private Order winOrder;
    
    private List<Order> allOrders;
    
    private List<TermStatic> termStatics;
    
    private String tag;
    
    private List<Term> latestWinInfo;
    
    private long timeCountDown;
    
    private String description;

    private String serialNum;
    
    private Boolean isSubscribeShow;
    
    private Boolean isPoint;
    
    private String code;
    
    public long getFullTimeCountDown() {
		return fullTimeCountDown;
	}

	public void setFullTimeCountDown(long fullTimeCountDown) {
		this.fullTimeCountDown = fullTimeCountDown;
	}

	private Integer point;

	public Integer getPoint() {
		return point;
	}

	public void setPoint(Integer point) {
		this.point = point;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Boolean getIsPoint() {
		return isPoint;
	}

	public void setIsPoint(Boolean isPoint) {
		this.isPoint = isPoint;
	}

	public Boolean getIsSubscribeShow() {
		return isSubscribeShow;
	}

	public void setIsSubscribeShow(Boolean isSubscribeShow) {
		this.isSubscribeShow = isSubscribeShow;
	}

	public String getSerialNum() {
		return serialNum;
	}

	public void setSerialNum(String serialNum) {
		this.serialNum = serialNum;
	}

	public Boolean getIsPk() {
		return isPk;
	}

	public void setIsPk(Boolean isPk) {
		this.isPk = isPk;
	}

	public Integer getCouponId() {
		return couponId;
	}

	public void setCouponId(Integer couponId) {
		this.couponId = couponId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getTimeCountDown() {
		return timeCountDown;
	}

	public void setTimeCountDown(long timeCountDown) {
		this.timeCountDown = timeCountDown;
	}

	public Date getFullTime() {
		return fullTime;
	}

	public void setFullTime(Date fullTime) {
		this.fullTime = fullTime;
	}

	public String getCaipiaoTerm() {
		return caipiaoTerm;
	}

	public void setCaipiaoTerm(String caipiaoTerm) {
		this.caipiaoTerm = caipiaoTerm;
	}

	public List<Term> getLatestWinInfo() {
		return latestWinInfo;
	}

	public void setLatestWinInfo(List<Term> latestWinInfo) {
		this.latestWinInfo = latestWinInfo;
	}

	public List<Order> getAllOrders() {
		return allOrders;
	}

	public void setAllOrders(List<Order> allOrders) {
		this.allOrders = allOrders;
	}

	public List<TermStatic> getTermStatics() {
		return termStatics;
	}

	public void setTermStatics(List<TermStatic> termStatics) {
		this.termStatics = termStatics;
	}

	public Integer getMyOrderNumberCount() {
		return myOrderNumberCount;
	}

	public void setMyOrderNumberCount(Integer myOrderNumberCount) {
		this.myOrderNumberCount = myOrderNumberCount;
	}

	public Order getWinOrder() {
		return winOrder;
	}

	public void setWinOrder(Order winOrder) {
		this.winOrder = winOrder;
	}

	public List<String> getProductImages() {
		return productImages;
	}

	public void setProductImages(List<String> productImages) {
		this.productImages = productImages;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Integer getCurrentTerm() {
		return currentTerm;
	}

	public void setCurrentTerm(Integer currentTerm) {
		this.currentTerm = currentTerm;
	}

	public String getStartTimeStr() {
		return startTimeStr;
	}

	public void setStartTimeStr(String startTimeStr) {
		this.startTimeStr = startTimeStr;
	}

	public String getOpenTimeStr() {
		return openTimeStr;
	}

	public void setOpenTimeStr(String openTimeStr) {
		this.openTimeStr = openTimeStr;
	}

	public Integer getLuckyOrder() {
		return luckyOrder;
	}

	public void setLuckyOrder(Integer luckyOrder) {
		this.luckyOrder = luckyOrder;
	}

	public Integer getTermId() {
        return termId;
    }

    public void setTermId(Integer termId) {
        this.termId = termId;
    }

    public String getProductTitle() {
		return productTitle;
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

	public Integer getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Integer totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Integer getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount(Integer currentAmount) {
        this.currentAmount = currentAmount;
    }

    public Long getLuckyNum() {
        return luckyNum;
    }

    public void setLuckyNum(Long luckyNum) {
        this.luckyNum = luckyNum;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getOpenTime() {
        return openTime;
    }

    public void setOpenTime(Date openTime) {
        this.openTime = openTime;
    }

    public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getKeyWord() {
		return keyWord;
	}

	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
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