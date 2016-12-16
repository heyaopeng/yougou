package com.duobao.fundation.dfs.fastdfs.command;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.Socket;
import java.util.Arrays;

import com.duobao.fundation.dfs.fastdfs.data.Result;

/**
 * upload slave Command.
 * <pre>
 * STORAGE_PROTO_CMD_UPLOAD_SLAVE_FILE:
 8 bytes: master filename length
 8 bytes: meta data bytes
 8 bytes: file size
 FDFS_FILE_PREFIX_MAX_LEN bytes  : filename prefix
 FDFS_FILE_EXT_NAME_MAX_LEN bytes: file ext name, do not include dot (.)
 master filename bytes: master filename
 meta data bytes: each meta data seperated by \x01,
 name and value seperated by \x02
 file size bytes: file content
 * </pre>
 * @author bm888888@gmail.com
 */
public class UploadSlaveCmd extends AbstractCmd<String> {

	private File file;

    /**
     *
     * @param file 文件
     * @param masterfilename 主文件名
     * @param prefix 前缀
     * @param ext 后缀
     */
    public UploadSlaveCmd(File file, String masterfilename, String prefix, String ext){
        super();
        this.file = file;
        this.requestCmd = STORAGE_PROTO_CMD_UPLOAD_SLAVE_FILE;
        this.body2Len = file.length();
        this.responseCmd = STORAGE_PROTO_CMD_RESP;
        this.responseSize = -1;

        byte[] masterfileNameLenByte = long2buff(masterfilename.length());
        byte[] fileSizeLenByte = long2buff(file.length());
        byte[] prefixByte = prefix.getBytes(charset);
        byte[] fileExtNameByte = getFileExtNameByte(ext);
        int fileExtNameByteLen = fileExtNameByte.length;
        if(fileExtNameByteLen>FDFS_FILE_EXT_NAME_MAX_LEN){
            fileExtNameByteLen = FDFS_FILE_EXT_NAME_MAX_LEN;
        }

        byte[] masterfilenameBytes = masterfilename.getBytes(charset);

        // 2 * FDFS_PROTO_PKG_LEN_SIZE + FDFS_FILE_PREFIX_MAX_LEN + FDFS_FILE_EXT_NAME_MAX_LEN + master_filename_len
        this.body1 = new byte[2 * FDFS_PROTO_PKG_LEN_SIZE + FDFS_FILE_PREFIX_MAX_LEN + FDFS_FILE_EXT_NAME_MAX_LEN
                + masterfilenameBytes.length ];

        Arrays.fill(body1, (byte) 0);

        System.arraycopy(masterfileNameLenByte, 0, body1, 0, masterfileNameLenByte.length);
        System.arraycopy(fileSizeLenByte, 0, body1, FDFS_PROTO_PKG_LEN_SIZE , fileSizeLenByte.length);
        System.arraycopy(prefixByte, 0, body1, 2*FDFS_PROTO_PKG_LEN_SIZE , prefixByte.length);
        System.arraycopy(fileExtNameByte, 0, body1,2 * FDFS_PROTO_PKG_LEN_SIZE + FDFS_FILE_PREFIX_MAX_LEN , fileExtNameByteLen);
        System.arraycopy(masterfilenameBytes, 0, body1,2 * FDFS_PROTO_PKG_LEN_SIZE + FDFS_FILE_PREFIX_MAX_LEN + FDFS_FILE_EXT_NAME_MAX_LEN ,
                masterfilenameBytes.length);
    }

	@Override
	public Result<String> exec(Socket socket) throws IOException {
		InputStream is = new FileInputStream(file);
		request(socket.getOutputStream(), is);
		Response response = response(socket.getInputStream());
		if(response.isSuccess()){
			byte[] data = response.getData();
			String group = new String(data, 0,	FDFS_GROUP_NAME_MAX_LEN).trim();
			String remoteFileName = new String(data,FDFS_GROUP_NAME_MAX_LEN, data.length - FDFS_GROUP_NAME_MAX_LEN);
			Result<String> result = new Result<String>(response.getCode());
			result.setData(group + "/" + remoteFileName);
			return result;
		}else{
			Result<String> result = new Result<String>(response.getCode());
			result.setMessage("Error");
			return result;
		}
	}

	private byte[] getFileExtNameByte(String extName) {

		if (extName != null && extName.length() > 0) {
			return extName.getBytes(charset);
		}else{
			return new byte[0];
		}
	}
}
