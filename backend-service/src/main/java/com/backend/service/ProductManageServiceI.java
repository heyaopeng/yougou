package com.backend.service;


import org.springframework.web.multipart.MultipartFile;

import com.backend.model.ProductForm;


public interface ProductManageServiceI {
	boolean addProduct(ProductForm productForm);

	String uploadImage(MultipartFile file);

	boolean updateProduct(ProductForm productForm);
}
