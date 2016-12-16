package com.backend.model;

import java.util.List;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import com.duobao.fundation.data.mybatis.model.Role;
import com.duobao.fundation.data.mybatis.model.UserProfile;

public class UserRoleForm extends UserProfile{
	@NotEmpty
	private List<Role>  roleList;
	
	private Integer parentId;
	
	@NotBlank
	private String  name;
	
	private String password;
	
	private String account;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
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
		this.password = password;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}
 
}
