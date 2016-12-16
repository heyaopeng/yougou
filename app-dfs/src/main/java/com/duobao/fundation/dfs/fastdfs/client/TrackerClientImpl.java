package com.duobao.fundation.dfs.fastdfs.client;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.List;

import com.duobao.fundation.dfs.fastdfs.FastdfsClientConfig;
import com.duobao.fundation.dfs.fastdfs.command.CloseCmd;
import com.duobao.fundation.dfs.fastdfs.command.Command;
import com.duobao.fundation.dfs.fastdfs.command.GroupInfoCmd;
import com.duobao.fundation.dfs.fastdfs.command.QueryDownloadCmd;
import com.duobao.fundation.dfs.fastdfs.command.QueryUpdateCmd;
import com.duobao.fundation.dfs.fastdfs.command.QueryUploadCmd;
import com.duobao.fundation.dfs.fastdfs.command.StorageInfoCmd;
import com.duobao.fundation.dfs.fastdfs.data.GroupInfo;
import com.duobao.fundation.dfs.fastdfs.data.Result;
import com.duobao.fundation.dfs.fastdfs.data.StorageInfo;
import com.duobao.fundation.dfs.fastdfs.data.UploadStorage;

public class TrackerClientImpl implements TrackerClient{
	
	private Socket socket;
	private String host;
	private Integer port;
	private Integer connectTimeout = FastdfsClientConfig.DEFAULT_CONNECT_TIMEOUT * 1000;
	private Integer networkTimeout = FastdfsClientConfig.DEFAULT_NETWORK_TIMEOUT * 1000;
	
	public TrackerClientImpl(String address){
		super();
		String[] hostport = address.split(":");
		this.host = hostport[0];
		this.port = Integer.valueOf(hostport[1]);
	}
	
	public TrackerClientImpl(String address,Integer connectTimeout, Integer networkTimeout){
		this(address);
		this.connectTimeout = connectTimeout;
		this.networkTimeout = networkTimeout;
	}
	
	private Socket getSocket() throws IOException{
		if(socket==null){
			socket = new Socket();
			socket.setSoTimeout(networkTimeout);
			socket.connect(new InetSocketAddress(host, port),connectTimeout);
		}
		return socket;
	}
	

	public void close() throws IOException{
		Socket socket = getSocket();
		Command<Boolean> command = new CloseCmd();
		command.exec(socket);
		socket.close();
		socket = null;
	}

	
	public Result<UploadStorage> getUploadStorage() throws IOException{
		Socket socket = getSocket();
		Command<UploadStorage> command = new QueryUploadCmd();
		return command.exec(socket);
	}
	
	public Result<String> getUpdateStorageAddr(String group,String fileName) throws IOException{
		Socket socket = getSocket();
		Command<String> cmd = new QueryUpdateCmd(group,fileName);
		return cmd.exec(socket);
	}
	
	public Result<String> getDownloadStorageAddr(String group,String fileName) throws IOException{
		Socket socket = getSocket();
		Command<String> cmd = new QueryDownloadCmd(group,fileName);
		return cmd.exec(socket);
	}
	
	public Result<List<GroupInfo>> getGroupInfos() throws IOException{
		Socket socket = getSocket();
		Command<List<GroupInfo>> cmd = new GroupInfoCmd();
		return cmd.exec(socket);
	}
	
	public Result<List<StorageInfo>> getStorageInfos(String group) throws IOException{
		Socket socket = getSocket();
		Command<List<StorageInfo>> cmd = new StorageInfoCmd(group);
		return cmd.exec(socket);
	}
	
}
