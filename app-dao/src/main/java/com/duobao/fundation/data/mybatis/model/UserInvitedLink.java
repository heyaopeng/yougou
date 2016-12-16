package com.duobao.fundation.data.mybatis.model;

import java.util.Date;

public class UserInvitedLink {
    private Integer linkId;

    private Integer userId;

    private Integer invitedId;
    
    private Date time;
    
    private String timeStr;
    
    private UserProfile userProfile;

    public UserProfile getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getTimeStr() {
		return timeStr;
	}

	public void setTimeStr(String timeStr) {
		this.timeStr = timeStr;
	}

	public Integer getLinkId() {
        return linkId;
    }

    public void setLinkId(Integer linkId) {
        this.linkId = linkId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getInvitedId() {
        return invitedId;
    }

    public void setInvitedId(Integer invitedId) {
        this.invitedId = invitedId;
    }
}