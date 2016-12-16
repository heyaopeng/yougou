package com.duobao.fundation.dfs.fastdfs.client;

import java.io.IOException;
import java.util.List;

import com.duobao.fundation.dfs.fastdfs.data.GroupInfo;
import com.duobao.fundation.dfs.fastdfs.data.Result;
import com.duobao.fundation.dfs.fastdfs.data.StorageInfo;
import com.duobao.fundation.dfs.fastdfs.data.UploadStorage;

public interface TrackerClient {

	public Result<UploadStorage> getUploadStorage() throws IOException;
	public Result<String> getUpdateStorageAddr(String group,String fileName) throws IOException;
	public Result<String> getDownloadStorageAddr(String group,String fileName) throws IOException;
	public Result<List<GroupInfo>> getGroupInfos() throws IOException;
	public Result<List<StorageInfo>> getStorageInfos(String group) throws IOException;
	public void close() throws IOException;
	
}
