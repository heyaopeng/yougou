package com.duobao.fundation.dfs.fastdfs.client;

import com.duobao.fundation.dfs.fastdfs.command.AbstractCmd;

/**
 * 提供一些公用的的方法
 * Created by sunbaoming on 2014/6/23.
 */
public abstract class AbstractClient {

    protected String[] splitFileId(String fileid) {
        return AbstractCmd.splitFileId(fileid);
    }
}
