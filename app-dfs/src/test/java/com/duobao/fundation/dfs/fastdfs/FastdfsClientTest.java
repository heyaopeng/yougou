package com.duobao.fundation.dfs.fastdfs;

import static org.junit.Assert.*;

import java.io.File;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.duobao.file.util.ImageUtils;
import com.duobao.fundation.dfs.fastdfs.FDFSFileUpload;
import com.duobao.fundation.dfs.fastdfs.FastdfsClient;
import com.duobao.fundation.dfs.fastdfs.FastdfsClientFactory;

public class FastdfsClientTest {

	@Test
	public void testFastdfsClient() throws Exception {
		FastdfsClient fastdfsClient = FastdfsClientFactory.getFastdfsClient();
		URL fileUrl = this.getClass().getResource("/Users/Cooka/Documents/a6.jpg");
		File file = new File("/Users/Cooka/Documents/a6.jpg");
		String fileId = fastdfsClient.upload(file);
		System.out.println("fileId:"+fileId);
		assertNotNull(fileId);
		String url = fastdfsClient.getUrl(fileId);
		assertNotNull(url);
		System.out.println("url:"+url);
		Map<String,String> meta = new HashMap<String, String>();
		meta.put("fileName", file.getName());
		boolean result = fastdfsClient.setMeta(fileId, meta);
		assertTrue(result);
		Map<String,String> meta2 = fastdfsClient.getMeta(fileId);
		assertNotNull(meta2);
		System.out.println(meta2.get("fileName"));
		result = fastdfsClient.delete(fileId);
		assertTrue(result);
		fastdfsClient.close();
	}


    @Test
    public void testUploadSlave() throws Exception {
        FastdfsClient fastdfsClient = FastdfsClientFactory.getFastdfsClient();
        URL fileUrl = this.getClass().getResource("/CvOC0VZtvg6AA5JfAAJgDEKtzGE55.jpg");
        File file = new File(fileUrl.getPath());
        String fileId = fastdfsClient.upload(file);
        System.out.println("fileId:"+fileId);
        assertNotNull(fileId);

        String result = fastdfsClient.uploadSlave(file,fileId,"_512x615","jpg");
        assertNotNull(result);
        System.out.println(result);
        fastdfsClient.close();
    }

    @Test
    public void testUploadMeta() throws Exception {
        FastdfsClient fastdfsClient = FastdfsClientFactory.getFastdfsClient();
        URL fileUrl = this.getClass().getResource("/IMG_0016.JPG");
        File file = new File(fileUrl.getPath());
        Map<String,String> meta = new HashMap<String, String>();
        meta.put("size","200x200");

        String fileId = fastdfsClient.upload(file,null,meta);
        System.out.println("fileId:"+fileId);
        assertNotNull(fileId);

        //set second meta
        meta.put("size","300x300");
        meta.put("nickname","nickname");
        fastdfsClient.setMeta(fileId,meta);

        Map<String,String> a = fastdfsClient.getMeta(fileId);
        assertNotNull(a);
        assertEquals(a.get("size"),"300x300");
        assertEquals(a.get("nickname"),"nickname");
        fastdfsClient.close();
    }
    
    @Test
    public void myTest() throws Exception{
        FastdfsClient fastdfsClient = FastdfsClientFactory.getFastdfsClient();
    	URL fileUrl = this.getClass().getResource("/2083726.jpg");
        File file = new File(fileUrl.getPath());
        String fileId = fastdfsClient.upload(file);
        System.out.println("fileId:"+fileId);
        File  newFile =ImageUtils.resize(file, 50, 50, 0.8f);
        String result = fastdfsClient.uploadSlave(newFile,fileId,"_50x50","JPG");
        assertNotNull(result);
        System.out.println(result);
    }
    
    @Test
    public void testUpload() throws Exception{
    	for(int i=0;i<3;i++){
	    	URL fileUrl = this.getClass().getResource("/CvOC0VZtvg6AA5JfAAJgDEKtzGE55.jpg");
	        File file = new File(fileUrl.getPath());
	        if(new FDFSFileUpload().getFileId(file)==null)
	        	System.out.println("6666");
    	}
    }    
    
    @Test
    public void testGetSlaveImage() throws Exception{
    	System.out.println("6666"+new FDFSFileUpload().getSlaveImageNoThread("http://dev.cookabuy.com/group1/M00/00/79/wKgL6FaLi1yANeDqAAJgDAtddqA801.jpg", 512, 614));
    }
    
    @Test
	public void testFDFSFileUpload() {
    	FDFSFileUpload upload = new FDFSFileUpload();
    	upload.getFileIdForCoupon("Sa146AB78800339709794");

	}
}
