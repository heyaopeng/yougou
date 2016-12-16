package com.duobao.user.util;
import java.util.Properties;

import org.springframework.beans.BeansException; 
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory; 
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer; 
public class PropertyPlaceholderConfigurerExt extends PropertyPlaceholderConfigurer{ 

    @Override 
    protected void processProperties(ConfigurableListableBeanFactory beanFactory, Properties props) 
                    throws BeansException { 
            String password = props.getProperty("dataSource.password"); 
            String username = props.getProperty("dataSource.username"); 
            if (password != null) { 
                    //解密jdbc.password属性值，并重新设置 
                    props.setProperty("dataSource.password", AESCoder.decrypt(password)); 
            } 
            if(username!=null){
            	props.setProperty("dataSource.username",  AESCoder.decrypt(username)); 
            }
            super.processProperties(beanFactory, props); 

    } 
}