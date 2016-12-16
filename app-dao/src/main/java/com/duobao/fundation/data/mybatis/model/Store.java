package com.duobao.fundation.data.mybatis.model;

public class Store {
    private Integer storeId;

    private String storeSerialNum;

    private Integer userId;

    private String name;

    private String shopkeeper;

    private String phone;
    
    private String addr;

    public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public Integer getStoreId() {
        return storeId;
    }

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
    }

    public String getStoreSerialNum() {
        return storeSerialNum;
    }

    public void setStoreSerialNum(String storeSerialNum) {
        this.storeSerialNum = storeSerialNum == null ? null : storeSerialNum.trim();
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
}