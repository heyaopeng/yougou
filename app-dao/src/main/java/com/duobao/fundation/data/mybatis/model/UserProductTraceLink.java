package com.duobao.fundation.data.mybatis.model;

import java.util.Date;

public class UserProductTraceLink extends UserProductTraceLinkKey {
    private Date timestamp;

    private Integer count;

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}