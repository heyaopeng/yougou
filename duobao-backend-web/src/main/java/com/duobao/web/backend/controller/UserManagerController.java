package com.duobao.web.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.apache.velocity.tools.generic.DateTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.backend.model.RoleForm;
import com.backend.model.UserRoleForm;
import com.backend.service.UserManageServiceI;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.data.mybatis.model.Permission;
import com.duobao.fundation.data.mybatis.model.Role;
import com.duobao.fundation.data.mybatis.model.StoreApplication;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.model.CookieVelocity;
import com.duobao.page.util.PageUtils;
import com.duobao.user.service.DuobaoServiceI;
import com.duobao.user.service.UserProfileServiceI;
import com.duobao.user.service.UserServiceI;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Controller
@EnableAutoConfiguration
@RequestMapping("/duobao-backend-web")
public class UserManagerController {

	@Autowired
	private UserManageServiceI userManageServiceI;
	
	@Autowired
	private UserProfileServiceI userProfileService;
	
	@Autowired
	private UserServiceI userServiceI;
	
	@Autowired
	private CookieVelocity cookieVelocity;
	
	@Autowired
	private ApplicationContext appContext;
	
	@Autowired
	private DuobaoServiceI duobaoService;
	
	private static final Logger logger = Logger.getLogger(UserManagerController.class);

	@RequestMapping(value="manageUsers")
	@RequiresPermissions("backend:userManage")
	public String  showManageUserList(
			@RequestParam(value="page",defaultValue="1",required=true)Integer page,
			@RequestParam(value="pageSize",defaultValue="30",required=true)Integer pageSize,
			@RequestParam(value="roleType",required=false	)Integer roleType,
			@RequestParam(value="isNeedDesc", required=false) String isNeedDesc,
			Map<String, Object> model,HttpSession session){
		
		List<Role> roles = getRoleListByStatus(session);    //当前用户所能管理的角色列表
		if(null == roleType){
			roleType = roles.get(0).getRoleId();				
		}else{
			Role tmp = userManageServiceI.seletRoleById(roleType);
			if(!roles.contains(tmp)){
				logger.info("越界访问");
				return "redirect:/unauthorized";
			}
		}
		
		if(isNeedDesc!=null){
			logger.info("要求降序");
			PageHelper.orderBy("regist_time desc");
			model.put("isDesc", "true");
		}else{
			PageHelper.orderBy("regist_time asc");
		}
		PageHelper.startPage(page, pageSize);
		List<UserProfile>  userList = userManageServiceI.getUsersByRoleType(roleType);
		
		PageInfo<UserProfile> users = new PageInfo<UserProfile>(userList);
		String pageDiv = PageUtils.getPageDiv(users);
		
		if(!userList.isEmpty()){
			Integer initId =( page - 1) * pageSize;
			model.put("initId",initId );
			model.put("pageDiv", pageDiv);
		}
		model.put("roles", roles);
		model.put("roleType",roleType);
		model.put("users", userList);
		model.put("date", new DateTool());
		return "usersManage";
	}


	@RequestMapping(value="updateUserRole")
	@RequiresPermissions("backend:roleManage")
	public String updateUserRole(@RequestParam(value="userId",required=true)Integer userId,ModelMap model,HttpSession session){
		model.put("type","editRole");
		UserProfile user = userProfileService.getUserProfileByUserId(userId);
		model.put("user", user);
		List<Role> loginUserRoles = getRoleListByStatus(session);
		List<Role> updateUserHasRoles = userManageServiceI.getUserRoles(userId);
		logger.info("--"+JSON.toJSONString(loginUserRoles.removeAll(updateUserHasRoles)));
		model.put("roles",updateUserHasRoles);
		if(!loginUserRoles.isEmpty()){
			model.put("roleUseNotHave", loginUserRoles);
			model.put("needButton","true");
		}
		return "updateUser";
	}

	@RequestMapping(value="updateUserPaswd")
	@RequiresPermissions("backend:userManage")
	public String updateUserPaswd(@RequestParam(value="userId",required=true)Integer userId,ModelMap model,HttpSession session){
		//if(isCrossover(session, userId, "user")){logger.info("越界访问");return "redirect:/unauthorized";}
		model.put("type","editPaswd");
		UserProfile user = userProfileService.getUserProfileByUserId(userId);
		model.put("user", user);
		return "updateUser";
	}
	

	/*
	 * 查看角色列表
	 * 拥有不同角色的人查看的角色树是不一样的，admin是树的最顶端，拥有几个角色，就会查看到几个角色树
	 */
	@RequestMapping(value="manageRoles")
	@RequiresPermissions("backend:roleManage")
	public String showRolesManage(ModelMap model,HttpSession session){
		Integer userId = (Integer) session.getAttribute(GlobalSessionConstant.USER_ID);
		List<Role> roleList =  userManageServiceI.getUserRoles(userId);
		Map<Integer,List<Role>> map = new HashMap<Integer,List<Role>>();
		
		for(int i=0;i<roleList.size();i++){
			map.put(i, userManageServiceI.getTreeSortRoleList(roleList.get(i).getRoleId()));
		}
		
		/* 显示全部角色含有超级管理员的角色
		Subject subject = SecurityUtils.getSubject();
		if(subject.isPermitted("admin_view_allUsers")){
			map.put(0, userManageServiceI.getTreeSortRoleList(0));
		}else{
			for(int i=0;i<roleList.size();i++){
				map.put(i, userManageServiceI.getTreeSortRoleList(roleList.get(i).getRoleId()));
			}
		}*/
		model.put("roles",map);
		return "rolesManage";
	}
	
	
	@RequestMapping(value="updateRole")
	@RequiresPermissions("backend:roleManage")
	public String updateRole(@RequestParam(value="roleId",required=true)Integer roleId,
			ModelMap model,HttpSession session){
		List<Role> roles = getRoleListByStatus(session);    //当前用户所能管理的角色列表
		Set<Integer> roleIds = new HashSet<Integer>();
		for(Role role:roles){
			roleIds.add(role.getRoleId());
		}
		
		//if(isCrossover(session, roleId, "role")){logger.info("越界访问");return "redirect:/unauthorized";}
		List<Permission> rolePermissions = userManageServiceI.selectRolePermissions(roleId);   //需要更新的角色所有的权限
		List<Permission> userPermissions = getPermisssionByStatus(session);
		
		logger.info("--"+JSON.toJSONString(userPermissions.removeAll(rolePermissions)));       //当前登录用户的权限 - 待更新角色的权限
		model.put("type", "edit");
		model.put("userPermissions",rolePermissions);
		model.put("roles", roles);
		model.put("roleIds", roleIds);
		if(!userPermissions.isEmpty()){
			model.put("needButton","true");
			model.put("permissionsUserNotHave",userPermissions);
		}
		
		Role role = userManageServiceI.seletRoleById(roleId);
		model.put("role", role);
		return "updateRole";
	}
	
	
	@RequestMapping(value="addRole")
	@RequiresPermissions("backend:roleManage")
	public String addRole(ModelMap model,HttpSession session){
		List<Role> roles = getRoleListByStatus(session);    //当前用户所能管理的角色列表
		
		Set<Integer> roleIds = new HashSet<Integer>();
		for(Role role:roles){
			roleIds.add(role.getRoleId());
		}
		List<Permission> permissions = getPermisssionByStatus(session);
		model.put("type","add");
		model.put("roles", roles);
		model.put("roleIds", roleIds);
		model.put("roleForm", new RoleForm());
		model.put("permissions",permissions);
		return "updateRole";
	}
	
	@RequestMapping(value="managePermission")
	@RequiresPermissions("backend:permissionManage")
	public String permissionManage(ModelMap model,HttpSession session){
		List<Permission> permissions = getPermisssionByStatus(session);
		model.put("permissions", permissions);
		return "permissionManage";
	}
	@RequestMapping(value="addPermission")
	@RequiresPermissions("backend:permissionManage")
	public String addPermission(ModelMap model){
		model.put("type", "add");
		model.put("permissionForm",new Permission());
		return "updatePermission";
	}
	
	@RequestMapping(value="updatePermissoin")
	@RequiresPermissions("backend:permissionManage")
	public String updatePermission(@RequestParam(value="permissionId" ,required=true)Integer permissionId,
			ModelMap model){
		model.put("type", "edit");
		Permission t = userManageServiceI.selePermissionById(permissionId);
		model.put("permission", t);
		return "updatePermission";
	}
	
	@RequestMapping(value="storeAuth")
	@RequiresPermissions("backend:storeManage")
	public  String storeAuth(ModelMap model){
		List<StoreApplication> applications = duobaoService.selectProcessingApplications();
		model.put("applications", applications);
		return "storeManage";
	}
	
	/*
	 *用户登录后台,仅显示当前登录用户所拥有的权限,管理员可以查看全部的权限,此方法避免新添加权限后,要直接往数据库给admin添加权限的步骤 
	 */
	private  List<Permission> getPermisssionByStatus(HttpSession session){
		Integer userId = (Integer) session.getAttribute(GlobalSessionConstant.USER_ID);
		List<Permission> permissions = new ArrayList<Permission>();
		Subject subject = SecurityUtils.getSubject();
		if(subject.isPermitted("admin_view_allPermissions")){
			permissions =  userManageServiceI.selectRolePermissions(null);
		}
		else{
			permissions = userServiceI.getUserPermission(userId);   
		}
		return permissions;
	}
	
	
	/*
	 * 返回用户所能管理的role,无需树形结构
	 * 超级管理员能够查看所有的角色,其他的则只能管理其子树下的角色
	 */
	private List<Role> getRoleListByStatus(HttpSession session){
		Integer userId = (Integer) session.getAttribute(GlobalSessionConstant.USER_ID);
		List<Role> roleList = new ArrayList<Role>();
		Subject subject = SecurityUtils.getSubject();
		if(subject.isPermitted("admin_view_allRoles")){
			 roleList =  userManageServiceI.getTreeSortRoleList(0);   //管理员   
		}
		else{
			List<Role> roles =  userManageServiceI.getUserRoles(userId);
			logger.info("用户拥有的角色是"+JSON.toJSONString(roles));
			for(int i=0;i<roles.size();i++){
				roleList.addAll(userManageServiceI.getTreeSortRoleList(roles.get(i).getRoleId()));
			}
		}
		return roleList; 
	}
	
	
	/*
	 * 查询当前用户所不能控制的用户
	 */
	private List<UserProfile> getUserExtraUsers(HttpSession session){
		List<Role> loginUserRoles = getRoleListByStatus(session);	
		List<Role> userNotHaveRoles = userManageServiceI.getUserRoles(null);
		userNotHaveRoles.removeAll(loginUserRoles);
		
		List<UserProfile> extraUserList = new ArrayList<UserProfile>();
		Set<UserProfile> extraUsers = new HashSet<UserProfile>();
		for(Role role:userNotHaveRoles){
			List<UserProfile> userList = userManageServiceI.getUsersByRoleType(role.getRoleId());
			extraUsers.addAll(userList);
		}
		extraUserList.addAll(extraUsers);
		logger.info("====用户不能控制的用户列表页是"+JSON.toJSONString(extraUserList));
		return extraUserList;
	}
}
