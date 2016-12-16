package com.duobao.fundation.data.mybatis.model;

import java.util.Date;

public class Announcement {
    private Integer messageId;

    private String title;

    private String messageUrl;

    private Date createTime;
    
    private String createTimeStr;

    private Integer readCount;

    private Boolean isForAll;

    public String getCreateTimeStr() {
		return createTimeStr;
	}

	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
	}

	public Integer getMessageId() {
        return messageId;
    }

    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getMessageUrl() {
        return messageUrl;
    }

    public void setMessageUrl(String messageUrl) {
        this.messageUrl = messageUrl == null ? null : messageUrl.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getReadCount() {
        return readCount;
    }

    public void setReadCount(Integer readCount) {
        this.readCount = readCount;
    }

    public Boolean getIsForAll() {
        return isForAll;
    }

    public void setIsForAll(Boolean isForAll) {
        this.isForAll = isForAll;
    }
}