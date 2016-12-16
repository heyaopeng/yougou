package com.duobao.fundation.dfs.fastdfs;

import java.util.List;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.pool2.impl.GenericKeyedObjectPool;
import org.apache.commons.pool2.impl.GenericKeyedObjectPoolConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.duobao.fundation.dfs.fastdfs.client.StorageClient;
import com.duobao.fundation.dfs.fastdfs.client.StorageClientFactory;
import com.duobao.fundation.dfs.fastdfs.client.TrackerClient;
import com.duobao.fundation.dfs.fastdfs.client.TrackerClientFactory;

public class FastdfsClientFactory {

    private static Logger logger = LoggerFactory.getLogger(FastdfsClientFactory.class);
	
	private static volatile FastdfsClient fastdfsClient;
    private static FastdfsClientConfig config = null;

    private final static String configFile = "FastdfsClient.properties";

    public FastdfsClientFactory() {
    }

    public static FastdfsClient getFastdfsClient(){
        if (fastdfsClient == null) {
            synchronized (FastdfsClient.class) {
                if (fastdfsClient == null) {
                    try {
                        config = new FastdfsClientConfig(configFile);
                    } catch (ConfigurationException e) {
                        logger.warn("Load fastdfs config failed.",e);
                    }
                    int connectTimeout = config.getConnectTimeout();
                    int networkTimeout = config.getNetworkTimeout();
                    TrackerClientFactory trackerClientFactory = new TrackerClientFactory(connectTimeout, networkTimeout);
                    StorageClientFactory storageClientFactory = new StorageClientFactory(connectTimeout, networkTimeout);
                    GenericKeyedObjectPoolConfig trackerClientPoolConfig = config.getTrackerClientPoolConfig();
                    GenericKeyedObjectPoolConfig storageClientPoolConfig = config.getStorageClientPoolConfig();
                    GenericKeyedObjectPool<String,TrackerClient> trackerClientPool = new GenericKeyedObjectPool<String,TrackerClient>(trackerClientFactory, trackerClientPoolConfig);
                    GenericKeyedObjectPool<String,StorageClient> storageClientPool = new GenericKeyedObjectPool<String,StorageClient>(storageClientFactory, storageClientPoolConfig);
                    List<String> trackerAddrs = config.getTrackerAddrs();
                    fastdfsClient = new FastdfsClientImpl(trackerAddrs,trackerClientPool,storageClientPool);
                }
            }
        }
        return fastdfsClient;
    }


	

}
