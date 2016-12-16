package com.duobao.fundation.data.mybatis.model;

import java.util.Date;

import javax.validation.constraints.Size;

public class User {
    private Integer userId;

    private Integer parentId;

    @Size(min=6, max=32)
    private String password;

    private Date registTime;
    
    private String serialNum;
     
    public String getSerialNum() {
		return serialNum;
	}

	public void setSerialNum(String serialNum) {
		this.serialNum = serialNum;
	}

	public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }
    
    public Date getRegistTime() {
        return registTime;
    }

    public void setRegistTime(Date registTime) {
        this.registTime = registTime;
    }
    
    public boolean equals(Object obj){
    	if (obj == null) 
    		return false ;  
        if (this == obj)   
            return true;  
          
        if (obj instanceof User){  
        	User s = (User) obj;  
        	
            if(s.userId!=null && this.userId.equals(s.userId)){  
                return true;  
            }  
        }  
        return false; 
	}
}