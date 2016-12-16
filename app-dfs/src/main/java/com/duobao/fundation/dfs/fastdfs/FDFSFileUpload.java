package com.duobao.fundation.dfs.fastdfs;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.csource.common.NameValuePair;
import org.csource.fastdfs.ClientGlobal;
import org.csource.fastdfs.StorageClient1;
import org.csource.fastdfs.StorageServer;
import org.csource.fastdfs.TrackerClient;
import org.csource.fastdfs.TrackerServer;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.multipart.MultipartFile;

import com.duobao.file.util.FileUtil;
import com.duobao.file.util.ImageUtils;
import com.duobao.model.SpringContextUtil;

public class FDFSFileUpload {
	private final static String conf_filename = "fdfs_client.properties";
	private final static String conf_properties = "FastdfsClient.properties";

	public String getFileId(File file) {
		String fileId = null;
		try {
			ClientGlobal.init(conf_filename);
			//System.out.println("network_timeout=" + ClientGlobal.g_network_timeout + "ms");
			//System.out.println("charset=" + ClientGlobal.g_charset);

			TrackerClient tracker = new TrackerClient();
			TrackerServer trackerServer = tracker.getConnection();
			StorageServer storageServer = null;
			StorageClient1 client = new StorageClient1(trackerServer, storageServer);

			NameValuePair[] metaList = new NameValuePair[1];
			metaList[0] = new NameValuePair("fileName", file.getName());
			fileId = client.upload_file1(file.getPath(), "file", metaList);

			//System.out.println("upload success. file id is: " + fileId);

			trackerServer.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		if (fileId != null)
			return getFileUrl(fileId);
		return null;
	}

	public String getFileId(String fileBase64) {
		File temp = FileUtil.base64ConvertToFile(fileBase64);
		System.out.println("tempname :" + temp.getName());
		String fileUrl = null;
		try {
			fileUrl = getFileId(temp);
			System.out.println("return fileUrl:" + fileUrl);
		} catch (Exception e) {
			e.printStackTrace();
		}
		temp.delete();
		return fileUrl;
	}
	
	public String getFileId(MultipartFile file) {
		File temp = FileUtil.convertToFile(file);
		System.out.println("tempname :" + temp.getName());
		String fileUrl = null;
		try {
			fileUrl = getFileId(temp);
			System.out.println("return fileUrl:" + fileUrl);
		} catch (Exception e) {
			e.printStackTrace();
		}
		temp.delete();
	
		return fileUrl;
	}
	public String getFileIdForCoupon(String couponNumber) {
		File temp = FileUtil.convertToFileForCoupon(couponNumber);
		System.out.println("tempname :" + temp.getName());
		String fileUrl = null;
		try {
			fileUrl = getFileId(temp);
			System.out.println("return fileUrl:" + fileUrl);
		} catch (Exception e) {
			e.printStackTrace();
		}
		temp.delete();
		return fileUrl;
	}

	public String getResizedFileId(MultipartFile file, int width, int height) {
		File temp = FileUtil.convertToFile(file);
		System.out.println("tempname :" + temp.getName());
		temp = ImageUtils.resize(temp, width, height, 1.0f);
		String fileUrl = null;
		try {
			fileUrl = getFileId(temp);
			System.out.println("return fileUrl:" + fileUrl);
		} catch (Exception e) {
			e.printStackTrace();
		}
		temp.delete();
		return fileUrl;
	}

	public String uploadSlave(File file, String master_file_id, String prefix_name, String ext) {
		String fileId = null;
		try {
			ClientGlobal.init(conf_filename);
			System.out.println("network_timeout=" + ClientGlobal.g_network_timeout + "ms");
			System.out.println("charset=" + ClientGlobal.g_charset);

			TrackerClient tracker = new TrackerClient();
			TrackerServer trackerServer = tracker.getConnection();
			StorageServer storageServer = null;
			StorageClient1 client = new StorageClient1(trackerServer, storageServer);

			NameValuePair[] metaList = new NameValuePair[1];
			metaList[0] = new NameValuePair("fileName", file.getName());
			fileId = client.upload_file1(master_file_id, prefix_name, file.getPath(), ext, metaList);

			System.out.println("upload success. file id is: " + fileId);

			trackerServer.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		if (fileId != null)
			return getFileUrl(fileId);
		return null;
	}

	@Cacheable(value = "cookaCache", key = "'image'+#url+'_'+#height+'_'+#width", cacheManager = "springCM")
	public String getSlaveImage(final String url, final int width, final int height) {
		try {
			final int pos = url.lastIndexOf('.');
			String targetUrl = url.substring(0, pos) + "_" + width + "x" + height + "." + url.substring(pos + 1);
			//System.out.println("没有缓存，targetUrl:" + targetUrl);
			if (!FileUtil.isImageOnServer(targetUrl)) {
				ThreadPoolTaskExecutor threadPoolTaskExecutor = (ThreadPoolTaskExecutor) SpringContextUtil.getBean("threadPoolTaskExecutor");
				threadPoolTaskExecutor.execute(new Thread() {
					public void run() {
						String newUrl = null;
						System.out.println("in");
						int pos1 = url.indexOf("group");
						if (pos1 > 0) {
							String fileId = url.substring(pos1);
							System.out.println("fileId:" + fileId);
							File file = FileUtil.urlRequestToGetFile(url);
							File newFile = ImageUtils.resize(file, width, height, 1.0f);
							System.out.println("newFileSize:" + newFile.getTotalSpace());
							newUrl = uploadSlave(newFile, fileId, "_" + width + "x" + height, url.substring(pos + 1));
							System.out.println("targetUrl After upload" + newUrl);
							file.deleteOnExit();
							newFile.delete();
						}
					}
				});
				System.out.println("threadPoolTaskExecutor Active Count :" + threadPoolTaskExecutor.getActiveCount());
				return url;
			}
			return targetUrl;
		} catch (Exception e) {
			e.printStackTrace();
			return url;
		}
	}

	public String getSlaveImageNoThread(final String url, final int height, final int width) {
		final int pos = url.lastIndexOf('.');
		String targetUrl = url.substring(0, pos) + "_" + height + "x" + width + "." + url.substring(pos + 1);
		System.out.println("targetUrl:" + targetUrl);
		String newUrl = null;
		System.out.println("in");
		int pos1 = url.indexOf("group");
		if (pos1 > 0) {
			String fileId = url.substring(pos1);
			System.out.println("fileId:" + fileId);
			File file = FileUtil.urlRequestToGetFile(url);
			File newFile = ImageUtils.resize(file, height, width, 1.0f);
			System.out.println("newFileSize:" + newFile.getTotalSpace());
			newUrl = uploadSlave(newFile, fileId, "_" + height + "x" + width, url.substring(pos + 1));
			System.out.println("targetUrl After upload" + newUrl);
			file.delete();
			newFile.delete();
		}
		return newUrl;
	}

	private String getFileUrl(String fileUrl) {
		String host = "";
		Properties prop = new Properties();
		InputStream in = FDFSFileUpload.class.getClassLoader().getResourceAsStream(conf_properties);
		try {
			prop.load(in);
			host = prop.getProperty("storage_server").trim();
		} catch (IOException e) {
			e.printStackTrace();
		}

		String result = host.concat(fileUrl);
		return result;
	}
}