package com.duobao.fundation.dfs.fastdfs;

import static org.junit.Assert.*;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.List;

import com.duobao.fundation.dfs.fastdfs.client.TrackerClient;
import com.duobao.fundation.dfs.fastdfs.client.TrackerClientImpl;
import com.duobao.fundation.dfs.fastdfs.data.GroupInfo;
import com.duobao.fundation.dfs.fastdfs.data.Result;
import com.duobao.fundation.dfs.fastdfs.data.UploadStorage;

import org.junit.Test;

public class TrackerClientTest {

	@Test
	public void testGetUploadStorageAddr() throws NumberFormatException, UnknownHostException, IOException {
		TrackerClient trackerClient = new TrackerClientImpl("119.28.11.157:22122");
		Result<UploadStorage> result = trackerClient.getUploadStorage();
		assertEquals(0, result.getCode());
		//assertEquals("119.28.11.157:23000",result.getData().getAddress());
		trackerClient.close();
	}
	
	@Test
	public void testGetDownloadStorageAddr() throws IOException {
		TrackerClient trackerClient = new TrackerClientImpl("192.168.1.131:22122");
		Result<String> result = trackerClient.getDownloadStorageAddr("group1","M00/00/00/wKgBhVVDanWARBuoAAvqH_kipG8454.jpg");
		assertEquals(0, result.getCode());
		assertEquals("192.168.1.133:23000",result.getData());
		trackerClient.close();
	}
	
	@Test
	public void testGetUpdateStorageAddr() throws IOException {
		TrackerClient trackerClient = new TrackerClientImpl("192.168.1.131:22122");
		Result<String> result = trackerClient.getUpdateStorageAddr("group1","M00/00/00/Cn2wilM00puAa0xSAANVQ4eIxAM143.jpg");
		assertEquals(0, result.getCode());
		assertEquals("192.168.1.132:23000",result.getData());
		trackerClient.close();
	}
	
	@Test
	public void testGetGroupInfos() throws NumberFormatException, UnknownHostException, IOException{
		TrackerClient trackerClient = new TrackerClientImpl("192.168.1.131:22122");
		Result<List<GroupInfo>> groupInfos = trackerClient.getGroupInfos();
		assertNotNull(groupInfos);
		trackerClient.close();
	}
}
