package com.duobao.page.util;

import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

import org.apache.commons.collections.CollectionUtils;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;

public abstract class PageUtils {
	public static <T> String getPageDiv(PageInfo<T> p){
		
		String head="<div data-j=\"pagination\"><ul class='pagination'>";
		String pre="";
		String mid="";
		String post="";
		
		if(p==null||CollectionUtils.isEmpty(p.getList())){
			return null;
		}
		if(!p.isIsFirstPage()){
			pre="<li><a href='' data-page=\""+p.getPrePage()+"\">&laquo;</a></li>";
		}
		if(!p.isIsLastPage()&&p.getSize()!=0){
			post="<li><a href='' data-page=\""+p.getNextPage()+"\">&raquo;</a></li>";
		}
		for(int i=0;i<p.getNavigatepageNums().length;i++){
			if(p.getNavigatepageNums()[i]==p.getPageNum()){
				mid+="<li class='active'><span>" + p.getNavigatepageNums()[i] + "</span></li>";
			}else{
				mid+="<li><a href='{{PAGE_URL}}' data-page=\""+p.getNavigatepageNums()[i]+"\">"+p.getNavigatepageNums()[i]+"</a></li>";
			}
		}
		// post+="</ul>\n<div class=\"pagination-stat\">\n<span>" + p.getPages() + " pages " + p.getTotal() + " items</span>\n</div>";
		//ResourceBundle re = ResourceBundle.getBundle("i18n/messages", Locale.getDefault());
		post+="</ul>\n";
		if (p.getSize() > 0) {
			post+="<div class=\"pagination-control\" data-max=\"" + p.getPages() + "\">\n" +
					"<span>"+"totalPages: " + p.getPages() + "</span>\n" + "<span>"+"TotalSize: " +p.getTotal()+ "</span>\n"+
					"<span><input type=\"text\" class=\"pagination-input\" maxlength=\"10\"></span>\n" +
					"<span><button type=\"button\" class=\"btn btn-secondary pagination-go\">Go</button></span>\n" +
					"</div>\n</div>";
		}else{
			return null;
		}
		

		return head+pre+mid+post;
		//return JSON.toJSONString(p);
	}
	
	public static <E, T> PageInfo<E> changeList(List<T> oldPage,List<E> list ){
		Page<E> page=null;
		if(oldPage instanceof Page){
			@SuppressWarnings("unchecked")
			Page<E> old=(Page<E>)oldPage;
			page= new Page<E>();
			page.addAll(list);
			page.setPageNum(old.getPageNum());
			page.setPageSize(old.getPageSize());
			page.setPageSizeZero(old.getPageSizeZero());
			page.setReasonable(old.getReasonable());
			page.setTotal(old.getTotal());
		}
		return new PageInfo<E> (page);
	}
	
	public static <E, T> PageInfo<E> addDivPageDetail(List<T> oldList,List<E> list ){
		if(CollectionUtils.isEmpty(list)||CollectionUtils.isEmpty(list)){
			return null;
		}
		
		Page<T> oldpage= (Page<T>)oldList;
		Page<E> page= new Page<E>();
		
		page.addAll(list);
		page.setPageNum(oldpage.getPageNum());
		page.setPageSize(oldpage.getPageSize());
		page.setPageSizeZero(oldpage.getPageSizeZero());
		page.setReasonable(oldpage.getReasonable());
		page.setTotal(oldpage.getTotal());
		return  new PageInfo<E>(page);
	}
	
}
