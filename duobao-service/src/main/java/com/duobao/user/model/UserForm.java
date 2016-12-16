package com.duobao.user.model;

import java.util.List;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.duobao.fundation.data.mybatis.model.User;
import com.fasterxml.jackson.annotation.JsonInclude;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserForm extends User{
	
	@Size(max=7,message="{captcha_length_require}")
	@Pattern(regexp = "^[A-Za-z_0-9]*$", message="{captcha_require}")
	private String captcha;
	
	private String repeatPaswd;
	
	@Size(min=6, max=20)
	private String phoneCode;
	
	@Size(min=6, max=20)
	private String randomCode;
	
	private String error;
	
	private String result;
	
	@Size(min=6, max=30)
	private String account;
	
	private  Integer roleId;
	
	private String newPassword;
	
	private String email;
	
	private String phone;
	
	private String name;
	
	private String gender;
	
	private boolean isActive =true;
	
	private List<String> roles;
	
	private List<String> permissions;
	
	private String sellerStatus;
	
	private String token;
	
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}
	
	
	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getPhoneCode() {
		return phoneCode;
	}

	public void setPhoneCode(String phoneCode) {
		this.phoneCode = phoneCode;
	}

	public String getCaptcha() {
		return captcha;
	}

	public void setCaptcha(String captcha) {
		this.captcha = captcha;
	}



	public String getRepeatPaswd() {
		return repeatPaswd;
	}

	public void setRepeatPaswd(String repeatPaswd) {
		this.repeatPaswd = repeatPaswd;
	}

	public String getRandomCode() {
		return randomCode;
	}

	public void setRandomCode(String randomCode) {
		this.randomCode = randomCode;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public List<String> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<String> permissions) {
		this.permissions = permissions;
	}

	public String getSellerStatus() {
		return sellerStatus;
	}

	public void setSellerStatus(String sellerStatus) {
		this.sellerStatus = sellerStatus;
	}
}
