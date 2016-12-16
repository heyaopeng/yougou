package com.duobao.fundation.dfs.fastdfs;

import java.io.File;
import java.util.Map;

public interface FastdfsClient {
	
	public String upload(File file) throws Exception;
	public String upload(File file,String fileName) throws Exception;
	public String getUrl(String fileId) throws Exception;
	public Boolean setMeta(String fileId,Map<String,String> meta) throws Exception;
	public Map<String,String> getMeta(String fileId) throws Exception;
	public Boolean delete(String fileId) throws Exception;
	public void close();


    /**
     * 上传一个文件
     * @param file 要上传的文件
     * @param ext 文件扩展名
     * @param meta meta key/value的meta data，可为null
     * @return fileid 带group的fileid
     * @throws Exception
     */
    public String upload(File file,String ext,Map<String,String> meta) throws Exception;

    /**
     * upload slave
     * @param file
     * @param fileid 带group的fileid,like group1/M00/00/01/abc.jpg
     * @param prefix slave的扩展名，如200x200
     * @param ext 文件扩展名，like jpg，不带.
     * @return 上传后的fileid   group1/M00/00/01/abc_200x200.jpg
     * @throws Exception
     */
    public String uploadSlave(File file,String fileid, String prefix, String ext) throws Exception;

}
