package com.duobao.user.model;


public class OauthLoginInfo {
	private String oauthType;
	private String oauthUserName;
	private String oauthUserImage;
	
	public OauthLoginInfo(){
		super();
	}
	
	public OauthLoginInfo(String oauthType, String oauthUserName,
			String oauthUserImage) {
		super();
		this.oauthType = oauthType;
		this.oauthUserName = oauthUserName;
		this.oauthUserImage = oauthUserImage;
	}
	public String getOauthType() {
		return oauthType;
	}
	public void setOauthType(String oauthType) {
		this.oauthType = oauthType;
	}
	public String getOauthUserName() {
		return oauthUserName;
	}
	public void setOauthUserName(String oauthUserName) {
		this.oauthUserName = oauthUserName;
	}
	public String getOauthUserImage() {
		return oauthUserImage;
	}
	public void setOauthUserImage(String oauthUserImage) {
		this.oauthUserImage = oauthUserImage;
	}
	

}
