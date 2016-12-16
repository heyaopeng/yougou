package com.duobao.fundation.data.mybatis.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class Product {
    private Integer productId;

    private Boolean isActive;

    private Date timestamp;

    private BigDecimal marketPrice;

    private BigDecimal price;

    private String title;

    private String description;
    
    private List<ProductImageLink> image;
    
    private Boolean isCashCoupon;

    public Boolean getIsCashCoupon() {
		return isCashCoupon;
	}

	public void setIsCashCoupon(Boolean isCashCoupon) {
		this.isCashCoupon = isCashCoupon;
	}

	public List<ProductImageLink> getImage() {
		return image;
	}

	public void setImage(List<ProductImageLink> image) {
		this.image = image;
	}

	public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public BigDecimal getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(BigDecimal marketPrice) {
        this.marketPrice = marketPrice;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }
}