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

import com.alibaba.fastjson.JSON;
import com.backend.model.RoleForm;
import com.backend.model.UserRoleForm;
import com.backend.service.UserManageServiceI;
import com.duobao.file.util.FileUtil;
import com.duobao.fundation.config.links.GlobalSessionConstant;
import com.duobao.fundation.data.mybatis.mapping.CategoryMapper;
import com.duobao.fundation.data.mybatis.mapping.ProductImageLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.ProductMapper;
import com.duobao.fundation.data.mybatis.model.Category;
import com.duobao.fundation.data.mybatis.model.Permission;
import com.duobao.fundation.data.mybatis.model.Product;
import com.duobao.fundation.data.mybatis.model.ProductImageLink;
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
public class ProductManagerController {
	
	private static final Logger logger = Logger.getLogger(ProductManagerController.class);
	
	
	@Autowired
	private CategoryMapper categoryMapper;
	@Autowired
	private ProductMapper productMapper;
	@Autowired
	private ProductImageLinkMapper productImageLinkMapper;
	
	@RequestMapping(value="addProduct")
	@RequiresPermissions("backend:productManage")
	public String addProduct(ModelMap model,HttpSession session){
		List<Category> cat = categoryMapper.selectAll();
		model.put("cat", cat);
		return "addProduct";
	}
	
	@RequestMapping(value="updateProduct")
	@RequiresPermissions("backend:productManage")
	public String updateProduct(ModelMap model,HttpSession session,Integer productId){
		List<Category> cat = categoryMapper.selectAll();
		Product product = productMapper.selectByPrimaryKey(productId);
		model.put("cat", cat);
		model.put("product", product);
		List<ProductImageLink> link = productImageLinkMapper.selectByProductId(productId);
		model.put("link", link);
		String description = FileUtil.UrlRequest(product.getDescription());
		logger.info(JSON.toJSONString(description));
		model.put("description", description);
		return "updateProduct";
	}

}
