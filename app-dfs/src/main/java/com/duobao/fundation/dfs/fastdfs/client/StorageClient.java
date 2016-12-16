package com.duobao.fundation.dfs.fastdfs.client;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import com.duobao.fundation.dfs.fastdfs.data.Result;

public interface StorageClient {
	
	public Result<String> upload(File file,String fileName,byte storePathIndex) throws IOException;
	public Result<Boolean> delete(String group,String fileName) throws IOException;
	public Result<Boolean> setMeta(String group,String fileName,Map<String,String> meta) throws IOException;
	public Result<Map<String,String>> getMeta(String group,String fileName) throws IOException;
	public void close() throws IOException;

    /**
     * 指定主文件id,存为slave
     * @param file 文件
     * @param fileid 主文件id,带group,如 g1/M00/00/00/aaaabbbbccc.jpg
     * @param slavePrefix slave的后缀名 如200x200,最终的文件名将为g1/M00/00/00/aaaabbbbccc_200x200.jpg
     * @param ext 扩展文件名，可以为null,如果为null，则从fileid里取
     * @param meta 文件元数据，可以为null
     * @return fileid 带group的文件fileid
     * @throws IOException
     */
    public Result<String> uploadSlave(File file, String fileid,String slavePrefix,String ext,Map<String,String> meta) throws IOException;

    /**
     * check storage client socket is closed
     * @return boolean
     */
    public boolean isClosed();
}
