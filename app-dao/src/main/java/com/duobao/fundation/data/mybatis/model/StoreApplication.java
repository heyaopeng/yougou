package com.duobao.fundation.data.mybatis.model;

public class StoreApplication {
    private Integer applicationId;

    private Integer userId;

    private String name;

    private String shopkeeper;

    private String phone;

    private String authenticatedStatus;
    
    private String addr;
    
    private Integer stateId;
    
    private Integer cityId;
    
    private Integer regionId;
    
    private String addrDetail;

    public String getAddrDetail() {
		return addrDetail;
	}

	public void setAddrDetail(String addrDetail) {
		this.addrDetail = addrDetail;
	}

	public Integer getStateId() {
		return stateId;
	}

	public void setStateId(Integer stateId) {
		this.stateId = stateId;
	}

	public Integer getCityId() {
		return cityId;
	}

	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}

	public Integer getRegionId() {
		return regionId;
	}

	public void setRegionId(Integer regionId) {
		this.regionId = regionId;
	}

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public Integer getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Integer applicationId) {
        this.applicationId = applicationId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getShopkeeper() {
        return shopkeeper;
    }

    public void setShopkeeper(String shopkeeper) {
        this.shopkeeper = shopkeeper == null ? null : shopkeeper.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

	public String getAuthenticatedStatus() {
		return authenticatedStatus;
	}

	public void setAuthenticatedStatus(String authenticatedStatus) {
		this.authenticatedStatus = authenticatedStatus;
	}
    
}