package com.duobao.fundation.data.mybatis.model;

public class AnnouncementReceiver {
    private Integer messageId;

    private Integer receiverId;

    private Boolean isDelete;

    private Boolean isShiftDelete;

    private Boolean isMarked;

    private Boolean isRead;

    public Integer getMessageId() {
        return messageId;
    }

    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    public Integer getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Integer receiverId) {
        this.receiverId = receiverId;
    }

    public Boolean getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Boolean isDelete) {
        this.isDelete = isDelete;
    }

    public Boolean getIsShiftDelete() {
        return isShiftDelete;
    }

    public void setIsShiftDelete(Boolean isShiftDelete) {
        this.isShiftDelete = isShiftDelete;
    }

    public Boolean getIsMarked() {
        return isMarked;
    }

    public void setIsMarked(Boolean isMarked) {
        this.isMarked = isMarked;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }
}