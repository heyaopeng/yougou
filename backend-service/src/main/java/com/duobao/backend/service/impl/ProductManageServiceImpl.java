package com.duobao.backend.service.impl;

import java.io.File;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.backend.model.ProductForm;
import com.backend.service.ProductManageServiceI;
import com.duobao.file.util.FileUtil;
import com.duobao.fundation.data.mybatis.mapping.ProductCategoryLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.ProductImageLinkMapper;
import com.duobao.fundation.data.mybatis.mapping.ProductMapper;
import com.duobao.fundation.data.mybatis.model.ProductCategoryLink;
import com.duobao.fundation.data.mybatis.model.ProductImageLink;
import com.duobao.fundation.dfs.fastdfs.FDFSFileUpload;

public class ProductManageServiceImpl implements ProductManageServiceI{

	private static final Logger logger = Logger.getLogger(ProductManageServiceImpl.class);
	@Autowired
	private ProductMapper productMapper;
	@Autowired
	private FDFSFileUpload fDFSFileUpload;
	@Autowired
	private ProductImageLinkMapper productImageLinkMapper;
	@Autowired
	private ProductCategoryLinkMapper productCategoryLinkMapper;
	
	@Override
	public boolean addProduct(ProductForm product) {	
		//description 
		descriptionHandler(product);
		if(productMapper.insertSelective(product)>0){
			logger.info("productId:" + product.getProductId());
			// category link
			categoryHandler(product);
			
			//image 
			imageHandler(product);
			
			return true;
		}
		return false;
	}

	public String uploadFile(File file){
		String url = null;
		url = fDFSFileUpload.getFileId(file);
		return url;
	}
	
	private boolean imageHandler(ProductForm product) {
		if(product.getImages()!=null){
			int i=0;
			for(String url : product.getImages()){
				i++;
				if(i>6)break;//
				if(!url.isEmpty()){
					ProductImageLink productImage = new ProductImageLink();
					productImage.setProductId(product.getProductId());
					productImage.setImageUrl(url);
					fDFSFileUpload.getSlaveImage(url, 512, 512);
					productImageLinkMapper.insertSelective(productImage);
				}
			}
			return true;
		}
		return false;
	}
	
	private boolean updateImageHandler(ProductForm product) {
		List<ProductImageLink> links = productImageLinkMapper.selectByProductId(product.getProductId());
		for(ProductImageLink link : links){
			productImageLinkMapper.deleteByPrimaryKey(link.getLinkId());
		}
		if(product.getImages()!=null){
			int i=0;
			for(String url : product.getImages()){
				i++;
				if(i>6)break;//
				if(!url.isEmpty()){
					ProductImageLink productImage = new ProductImageLink();
					productImage.setProductId(product.getProductId());
					productImage.setImageUrl(url);
					fDFSFileUpload.getSlaveImage(url, 512, 512);
					productImageLinkMapper.insertSelective(productImage);
				}
			}
			return true;
		}
		return false;
	}
	
	private boolean categoryHandler(ProductForm product) {
		ProductCategoryLink productCategoryLink = new ProductCategoryLink();
		productCategoryLink.setCategoryId(product.getCategoryId());
		productCategoryLink.setProductId(product.getProductId());
		//fix:null value handle
		productCategoryLinkMapper.insertSelective(productCategoryLink);
		return true;
	}
	
	private boolean updateCategoryHandler(ProductForm product) {
		ProductCategoryLink tmp = productCategoryLinkMapper.selectByProductId(product.getProductId());
		productCategoryLinkMapper.deleteByPrimaryKey(tmp);
		ProductCategoryLink productCategoryLink = new ProductCategoryLink();
		productCategoryLink.setCategoryId(product.getCategoryId());
		productCategoryLink.setProductId(product.getProductId());
		//fix:null value handle
		productCategoryLinkMapper.insertSelective(productCategoryLink);
		return true;
	}

	private boolean descriptionHandler(ProductForm product) {
		if(product.getDescription()!=null){ 
        	File file = FileUtil.convertToFile(product.getDescription());
            String url = uploadFile(file);
            product.setDescription(url);
            file.delete();
		}
		return true;
	}
	@Override
	public String uploadImage(MultipartFile file) {
		String url = null;
		url = fDFSFileUpload.getFileId(file);
	
		return url;
	}

	@Override
	public boolean updateProduct(ProductForm productForm) {
		descriptionHandler(productForm);
		if(productMapper.updateByPrimaryKeySelective(productForm)>0){
			logger.info("productId:" + productForm.getProductId());
			// category link
			updateCategoryHandler(productForm);
			
			//image 
			updateImageHandler(productForm);
			
			return true;
		}
		return false;
	}

}
