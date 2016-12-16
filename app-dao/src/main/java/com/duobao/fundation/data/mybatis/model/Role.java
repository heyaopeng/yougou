package com.duobao.fundation.data.mybatis.model;

public class Role {
    private Integer roleId;

    private String role;

    private Integer parentId;

    private Boolean isActive;

    private Boolean isInList;
    
    public Integer level;

    public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role == null ? null : role.trim();
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Boolean getIsInList() {
        return isInList;
    }

    public void setIsInList(Boolean isInList) {
        this.isInList = isInList;
    }
}