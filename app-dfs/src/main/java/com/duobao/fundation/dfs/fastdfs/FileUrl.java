package com.duobao.fundation.dfs.fastdfs;

import java.io.IOException;
import java.io.InputStream;


import java.util.Properties;

public class FileUrl {
	private final static String configFile = "FastdfsClient.properties";
	public String getFileUrl(String fileUrl){
		String host="";
		Properties prop =  new  Properties();    
        InputStream in = this.getClass().getClassLoader().getResourceAsStream(configFile);    
         try  {    
            prop.load(in);    
            host = prop.getProperty( "storage_server" ).trim();  
        }  catch  (IOException e) {    
            e.printStackTrace();    
        }  
		
		String result = host.concat(fileUrl);
		return result;
	}
}
