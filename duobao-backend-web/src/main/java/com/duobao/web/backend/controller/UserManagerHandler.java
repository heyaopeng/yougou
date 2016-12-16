package com.duobao.web.backend.controller;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.mgt.RealmSecurityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.backend.model.RoleForm;
import com.backend.model.UserRoleForm;
import com.backend.service.UserManageServiceI;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.data.mybatis.model.Permission;
import com.duobao.fundation.data.mybatis.model.Role;
import com.duobao.fundation.data.mybatis.model.User;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.fundation.data.mybatis.model.UserRoleLinkKey;
import com.duobao.shiro.service.MonitorRealm;
import com.duobao.user.service.DuobaoServiceI;
import com.duobao.user.service.UserProfileServiceI;
import com.duobao.user.service.UserServiceI;

@Controller
@EnableAutoConfiguration
@RequestMapping("/duobao-backend-web")
public class UserManagerHandler {
	
	@Autowired
	private UserManageServiceI userManageServiceI;
	
	@Autowired
	private UserServiceI userServiceI;
	
	@Autowired
	private UserProfileServiceI userProfileServiceI;
	
	@Autowired
	private DuobaoServiceI duobaoService;
	
	private static final Logger logger = Logger.getLogger(UserManagerHandler.class);
	
	@RequestMapping(value="addUserRoles",method = RequestMethod.POST)
	@RequiresPermissions("backend:roleManage")
	public String doAddUserRoles(UserRoleForm userRoleForm,ModelMap model,HttpSession session) {
		logger.info("This is in add user roles "+JSON.toJSONString(userRoleForm));
		List<UserRoleLinkKey> list = new ArrayList<UserRoleLinkKey>();
		Integer userId = userRoleForm.getUserId();
		//if(isCrossover.isCrossover(session, userId, "user")){logger.info("越界访问");return "redirect:/unauthorized";}
		List<Role> roleIdList = userRoleForm.getRoleList();
		User user = userServiceI.getUserById(userId);
		if(roleIdList!=null){
			for(Role role:roleIdList){
				if(role.getRoleId()!=null){
					UserRoleLinkKey t = new UserRoleLinkKey();
					t.setRoleId(role.getRoleId());
					t.setUserId(userId);
					list.add(t);
				}
			}
			logger.info("The integer is "+JSON.toJSONString(list));
			userManageServiceI.addUserRoles(list);
			logger.info("为用户添加新角色");
			
			/*//fix
			 * if(user.getEmail()!=null)
				clearCachedAuthorizationInfoByUserName(user.getEmail());
			else
				clearCachedAuthorizationInfoByUserName(user.getPhone());*/
				
		}
		
		return "redirect:/duobao-backend-web/manageUsers";
	}
	
	@RequestMapping(value="updatePassword",method = RequestMethod.POST)
	@RequiresPermissions("backend:userManage")
	public String updateUserPassword(UserRoleForm userRoleForm,ModelMap model,HttpSession session){
		logger.info(JSON.toJSONString(userRoleForm));
		Integer userId = userRoleForm.getUserId();
		User user = userServiceI.getUserById(userId);
		
		if(null==user)
			return "error";
	 
		user.setPassword(userRoleForm.getPassword());
		if(userServiceI.updatePassword(user))
			return "redirect:/duobao-backend-web/manageUsers";
		else
			return "error";
	}
	
	@RequestMapping(value="deleUserRole",method = RequestMethod.POST)
	@RequiresPermissions("backend:roleManage")
	public @ResponseBody String deleUserRoles(@RequestParam(value = "roleId",required=true) Integer roleId,
			@RequestParam(value="userId", required=true)Integer userId,HttpSession session) {
		logger.info("This is in deleUserRole and  the roleId is "+ roleId + "userId is "+ userId);
		Integer roleIds[] = {roleId};
		if(roleIds.length>0){
			User  user = userServiceI.getUserById(userId);
			userManageServiceI.deleUerRoles(roleIds, userId);
			//fix
			/*if(user.getEmail()!=null)
				clearCachedAuthorizationInfoByUserName(user.getEmail());
			else
				clearCachedAuthorizationInfoByUserName(user.getPhone());			return "success";*/
		}
		return "fail";
				
	}
	
	//@RequestMapping(value="deleUserById",method = RequestMethod.POST  删除用户
	@RequiresPermissions("backend:userManage")
	public @ResponseBody String deleUser(@RequestParam(value="userId",required=true)Integer userId,HttpSession session){
		//return userServiceI.deleUser(userId)>0? "success":"fail";
		return "fial";
		
	}
	
	@RequestMapping(value="disableUser",method = RequestMethod.POST)
	@RequiresPermissions("backend:userManage")
	public @ResponseBody String disableUser(@RequestParam(value="userId", required=true)Integer userId
			,HttpSession session){
		UserProfile userProfile = userProfileServiceI.getUserProfileByUserId(userId);
		userProfileServiceI.updateUserProfile(userProfile);
		return "success";
	}

	@RequestMapping(value="deleRole",method = RequestMethod.POST)
	@RequiresPermissions("backend:roleManage")
	public @ResponseBody String deleRole(@RequestParam(value="roleId",required=true) Integer roleId,HttpSession session){
		Role deleRole = userManageServiceI.seletRoleById(roleId);
		if(userManageServiceI.deleRole(roleId)>0){
			userManageServiceI.updateRoleParentId(deleRole.getRoleId(), deleRole.getParentId());  //子树节点的parentId 上升
			return  "success";
		}
		return "fail";
	}
	
	@RequestMapping(value="disableRole",method = RequestMethod.POST)
	@RequiresPermissions("backend:roleManage")
	public @ResponseBody String disableRole(@RequestParam(value="roleId",required=true) Integer roleId,@RequestParam(value="isAble")Integer isAble){
		Role role = new Role();
		if(isAble==1)
			role.setIsActive(true);
		else
			role.setIsActive(false);
		
		role.setRoleId(roleId);
		if(userManageServiceI.updateRole(role)>0){
			clearAllCachedAuthorizationInfo();
			return  "success";
		}
		return "fail";
	}
	
	@RequestMapping(value="deleRolePermission",method = RequestMethod.POST)
	@RequiresPermissions("backend:roleManage")
	public @ResponseBody String deleRolePermission(@RequestParam(value = "roleId",required=true) Integer roleId,
			@RequestParam(value="permissionId", required=true)Integer permissionId)  {
		Integer permissionIds[]={permissionId};
		if(userManageServiceI.deleRolePermissions(permissionIds, roleId)>0){
			clearAllCachedAuthorizationInfo();           //fix
			 return "success";
		}
		return "fail";
	}
	
	@RequestMapping(value="doAddRole",method = RequestMethod.POST)
	@RequiresPermissions("backend:roleManage")
	public String addRole(@Valid  @ModelAttribute("roleForm") RoleForm roleForm,
			BindingResult bindingResult,ModelMap model){
		if(bindingResult.hasErrors()){
			logger.info(JSON.toJSONString(bindingResult.getAllErrors()));
			return "updateRole";
		}
		else{
			userManageServiceI.addRoleAndPermissoin(roleForm);
			return "redirect:/duobao-backend-web/manageRoles";
		}
	}
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
	    binder.setAutoGrowCollectionLimit(1024);
	}
	
	@RequestMapping(value="doUpdateRole",method = RequestMethod.POST)
	@RequiresPermissions("backend:roleManage")
	public String  doUpdateRole(@Valid  @ModelAttribute("roleForm") RoleForm roleForm,BindingResult bindingResult,ModelMap model,HttpSession session){
		logger.info("This is in do updateRole"+JSON.toJSONString(roleForm));
		
		//添加角色权限
		if(roleForm.getPermission()!=null){
			userManageServiceI.addRolePermissions(roleForm.getPermission(), roleForm.getRoleId());
			//clearAllCachedAuthorizationInfo();
		}
	
		//修改角色的名称或者父亲节点
		userManageServiceI.updateRole(roleForm);
		return "redirect:/duobao-backend-web/manageRoles";
	}
	
	@RequestMapping(value="doAddPermission",method = RequestMethod.POST)
	@RequiresPermissions("backend:permissionManage")
	public String addPermission(@Valid  @ModelAttribute("permissionForm") Permission record,BindingResult bindingResult,ModelMap model){
		if(bindingResult.hasErrors()){
			logger.info(JSON.toJSONString(bindingResult.getAllErrors()));
			return "updatePermission";
		}
		userManageServiceI.addPermission(record);
		//clearAllCachedAuthorizationInfo();
		return "redirect:/duobao-backend-web/managePermission";
		
	}
	
	@RequestMapping(value="doUpdatePermission",method = RequestMethod.POST)
	@RequiresPermissions("backend:permissionManage")
	public String updatePermission(@Valid  @ModelAttribute("permissionForm") Permission record,BindingResult bindingResult,ModelMap model){
		if(bindingResult.hasErrors()){
			logger.info(JSON.toJSONString(bindingResult.getAllErrors()));
			return "updatePermission";
		}
		userManageServiceI.updatePermission(record);
		//clearAllCachedAuthorizationInfo();
		return "redirect:/duobao-backend-web/managePermission";
	}
	
	@RequestMapping(value="delePermission",method = RequestMethod.POST)
	@RequiresPermissions("backend:permissionManage")
	public @ResponseBody String delePermission(@RequestParam(value="permissionId", required=true)Integer permissionId){
		if(userManageServiceI.delePermission(permissionId)>0){
			//clearAllCachedAuthorizationInfo();
			return "success";
		}
		return "fail";
	}
	
	@RequestMapping(value="disablePermission",method = RequestMethod.POST)
	@RequiresPermissions("backend:permissionManage")
	public @ResponseBody String disablePermission(@RequestParam(value="permissionId", required=true)Integer permissionId,
			@RequestParam(value="isAble")Integer isAble){
		
		Permission record = userManageServiceI.selePermissionById(permissionId);
		record.setIsActive(!record.getIsActive());
		logger.info("This is disablePermission"+JSON.toJSONString(record));
		if(userManageServiceI.updatePermission(record)>0){
			//clearAllCachedAuthorizationInfo();
			return "success";
		}
		return "false";
		
	}
	
	private void clearAllCachedAuthorizationInfo(){
		logger.info("清除权限缓存");
		 RealmSecurityManager securityManager = (RealmSecurityManager) SecurityUtils.getSecurityManager();
		 MonitorRealm userRealm = (MonitorRealm) securityManager.getRealms().iterator().next();
		 userRealm.clearAllCachedAuthorizationInfo();
	}
	
	private void clearCachedAuthorizationInfoByUserName(String name){
		logger.info("清除单个用户权限缓存");
		 RealmSecurityManager securityManager = (RealmSecurityManager) SecurityUtils.getSecurityManager();
		 MonitorRealm userRealm = (MonitorRealm) securityManager.getRealms().iterator().next();
		 userRealm.clearCachedAuthorizationInfoByUserName(name);
	}
	
	@RequestMapping(value="storeAuthHandler")
	@RequiresPermissions("backend:storeManage")
	public @ResponseBody String storeAuthHandler(Integer applyId,Integer status){
		
		return duobaoService.storeAuthHandler(applyId,status);
	}
}
