package com.duobao.fundation.data.mybatis.model;

public class OauthLogin {
    private Integer loginId;

    private String oauthId;

    private Integer userId;

    private String oauthName;

    private String oauthAccessToken;

    private String oauthExpires;
    
    private String oauthType;
    
    private Integer roleId;
    
    private String oauthUserName;
    
    private String phone ;

    private String image;
    
    private Boolean isSubcribe;
    
    private Boolean isSubscribeShow;
    
    private Boolean isPointSend;
    
    public Boolean getIsPointSend() {
		return isPointSend;
	}

	public void setIsPointSend(Boolean isPointSend) {
		this.isPointSend = isPointSend;
	}

	public Boolean getIsSubscribeShow() {
		return isSubscribeShow;
	}

	public void setIsSubscribeShow(Boolean isSubscribeShow) {
		this.isSubscribeShow = isSubscribeShow;
	}

	public Boolean getIsSubcribe() {
		return isSubcribe;
	}

	public void setIsSubcribe(Boolean isSubcribe) {
		this.isSubcribe = isSubcribe;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getOauthType() {
		return oauthType;
	}

	public void setOauthType(String oauthType) {
		this.oauthType = oauthType;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getOauthUserName() {
		return oauthUserName;
	}

	public void setOauthUserName(String oauthUserName) {
		this.oauthUserName = oauthUserName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Integer getLoginId() {
        return loginId;
    }

    public void setLoginId(Integer loginId) {
        this.loginId = loginId;
    }

    public String getOauthId() {
        return oauthId;
    }

    public void setOauthId(String oauthId) {
        this.oauthId = oauthId == null ? null : oauthId.trim();
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getOauthName() {
        return oauthName;
    }

    public void setOauthName(String oauthName) {
        this.oauthName = oauthName == null ? null : oauthName.trim();
    }

    public String getOauthAccessToken() {
        return oauthAccessToken;
    }

    public void setOauthAccessToken(String oauthAccessToken) {
        this.oauthAccessToken = oauthAccessToken == null ? null : oauthAccessToken.trim();
    }

    public String getOauthExpires() {
        return oauthExpires;
    }

    public void setOauthExpires(String oauthExpires) {
        this.oauthExpires = oauthExpires == null ? null : oauthExpires.trim();
    }
}