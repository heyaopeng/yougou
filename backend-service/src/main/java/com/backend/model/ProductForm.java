package com.backend.model;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.duobao.fundation.data.mybatis.model.Product;
import com.duobao.fundation.data.mybatis.model.ProductImageLink;

public class ProductForm extends Product {
    
    private List<ProductImageLink> productImages;
    
    private Integer categoryId;
    
    private String keyword;
    
    private String[] keywords;

    private String[] images;
    
    private MultipartFile[] imageFiles;

    private Integer saleUnitId;

    private Integer unitAmount;

    private String information;

    private Integer shelves;
    
    private Integer templateId;

	public Integer getTemplateId() {
		return templateId;
	}

	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
	}

	public MultipartFile[] getImageFiles() {
		return imageFiles;
	}

	public void setImageFiles(MultipartFile[] imageFiles) {
		this.imageFiles = imageFiles;
	}

	public String[] getKeywords() {
		return keywords;
	}

	public void setKeywords(String[] keywords) {
		this.keywords = keywords;
	}

	public Integer getShelves() {
		return shelves;
	}

	public void setShelves(Integer shelves) {
		this.shelves = shelves;
	}

	public Integer getSaleUnitId() {
		return saleUnitId;
	}

	public void setSaleUnitId(Integer saleUnitId) {
		this.saleUnitId = saleUnitId;
	}

	public Integer getUnitAmount() {
		return unitAmount;
	}

	public void setUnitAmount(Integer unitAmount) {
		this.unitAmount = unitAmount;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String[] getImages() {
		return images;
	}

	public void setImages(String[] images) {
		this.images = images;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public List<ProductImageLink> getProductImages() {
		return productImages;
	}

	public void setProductImages(List<ProductImageLink> productImages) {
		this.productImages = productImages;
	}

	public String getInformation() {
		return information;
	}

	public void setInformation(String information) {
		this.information = information;
	}

}
