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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.alibaba.fastjson.JSON;
import com.backend.model.ProductForm;
import com.backend.model.RoleForm;
import com.backend.model.UserRoleForm;
import com.backend.service.ProductManageServiceI;
import com.backend.service.UserManageServiceI;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.data.mybatis.model.Permission;
import com.duobao.fundation.data.mybatis.model.Role;
import com.duobao.fundation.data.mybatis.model.UserProfile;
import com.duobao.model.CookieVelocity;
import com.duobao.page.util.PageUtils;
import com.duobao.user.service.UserProfileServiceI;
import com.duobao.user.service.UserServiceI;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Controller
@EnableAutoConfiguration
@RequestMapping("/duobao-product-web")
public class ProductManagerHandler {
	
	private static final Logger logger = Logger.getLogger(ProductManagerHandler.class);
	@Autowired
	private ProductManageServiceI productManageService;
	
	@RequestMapping(value = "/doAddProductHandler", method = RequestMethod.POST)
	@RequiresPermissions("backend:productManage")
	public String addProductHandler(@Valid @ModelAttribute("productForm") ProductForm productForm,HttpSession session,
			MultipartHttpServletRequest multipartrequest, Map<String, Object> model) throws Exception {
	
		logger.info("----------------" + JSON.toJSONString(productForm));
		productManageService.addProduct(productForm);
		return "redirect:/duobao-product-web/productManage";
		
	}
	
	@RequestMapping(value = "/doUpdateProductHandler", method = RequestMethod.POST)
	@RequiresPermissions("backend:productManage")
	public String doUpdateProductHandler(@Valid @ModelAttribute("productForm") ProductForm productForm,HttpSession session,
			MultipartHttpServletRequest multipartrequest, Map<String, Object> model) throws Exception {
	
		logger.info("----------------" + JSON.toJSONString(productForm));
		productManageService.updateProduct(productForm);
		return "redirect:/duobao-product-web/productManage";
		
	}
	
	@RequestMapping(value = "/doUploadImage", method = RequestMethod.POST)
	public @ResponseBody String uploadImage(MultipartFile file) {
		logger.info(JSON.toJSONString(file));
		String url=null;
		if(file != null){
			url = productManageService.uploadImage(file);
			logger.info(url);
    	}
		return url;
	}

}
