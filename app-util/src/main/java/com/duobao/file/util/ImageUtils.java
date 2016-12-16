package com.duobao.file.util;

import static org.bytedeco.javacpp.opencv_core.BORDER_CONSTANT;
import static org.bytedeco.javacpp.opencv_core.copyMakeBorder;
import static org.bytedeco.javacpp.opencv_imgcodecs.imread;
import static org.bytedeco.javacpp.opencv_imgcodecs.imwrite;
import static org.bytedeco.javacpp.opencv_imgproc.CV_FONT_HERSHEY_COMPLEX_SMALL;
import static org.bytedeco.javacpp.opencv_imgproc.INTER_LINEAR;
import static org.bytedeco.javacpp.opencv_imgproc.putText;

import java.io.File;
import java.io.IOException;
import java.util.Random;

import org.bytedeco.javacpp.opencv_core.Mat;
import org.bytedeco.javacpp.opencv_core.Point;
import org.bytedeco.javacpp.opencv_core.Range;
import org.bytedeco.javacpp.opencv_core.Scalar;
import org.bytedeco.javacpp.opencv_core.Size;
import org.bytedeco.javacpp.opencv_imgproc;

import net.coobird.thumbnailator.Thumbnails;

public class ImageUtils {

	public static File resize(File file,int width,int height,double quality){
		File temp=null;
		if(file!=null){
			String path=FileUtil.getUtilProperties("tmp_dir");
			Random random=new Random();
			String tmpName=path+"tmp"+random.nextInt(100000)+String.valueOf(System.currentTimeMillis())+".jpg";
			System.out.println(file.getPath());
			Mat src =  imread(file.getPath());
			int srcWidth=src.cols();
			int srcHeight=src.rows();
			System.out.println(srcWidth+"ffff"+srcHeight);
			System.out.println(width+"fffeeef"+height);
			double srcScale=(double)srcWidth/srcHeight;
			double scale=(double)width/height;
			Mat dst = new Mat();
			int top ,bottom,left, right;
			top=bottom=left=right=0;
			if(srcScale>scale){
				int newWidth=width;
				if(width>srcWidth){
					newWidth=srcWidth;
					left =  (int) (width-newWidth)/2;
					right =  (int) (width-newWidth)/2;
				}
				int newHeight=(int) (newWidth/srcScale);
				opencv_imgproc.resize(src, dst,new Size(newWidth,newHeight), 0, 0, INTER_LINEAR);
				top = (int) (height-newHeight)/2;
				bottom = (int) (height-newHeight)/2;
			}else{
				int newHeight=height;
				if(height>srcHeight){
					newHeight=srcHeight;
					top = (int) (height-newHeight)/2;
					bottom = (int) (height-newHeight)/2;
				}
				int newWidth=(int) (newHeight*srcScale);
				opencv_imgproc.resize(src, dst,new Size(newWidth,newHeight), 0, 0, INTER_LINEAR);
				left =  (int) (width-newWidth)/2;
				right =  (int) (width-newWidth)/2;
			}
			Scalar value = new Scalar(255,255,255, 1);
			System.out.println(top+"dd"+bottom+"ff"+left+"ee"+right);
			copyMakeBorder( dst, dst, top, bottom, left, right, BORDER_CONSTANT,value );
			imwrite(tmpName,dst);
			temp= new File(tmpName);
		}
		return temp;
	}
	public static File addTextToImage(File file,String text,String filename){
		File temp=null;
		if(file!=null){
			String path=FileUtil.getUtilProperties("tmp_dir");
			String tmpName=path+filename+".jpg";
			System.out.println(file.getPath());
			Mat src =  imread(file.getPath());
			int srcWidth=src.cols();
			int srcHeight=src.rows();
			System.out.println(srcWidth+"ffff"+srcHeight);
			Scalar value = new Scalar(255,255,255, 1);
			copyMakeBorder( src, src, 20, 0, 0, 0, BORDER_CONSTANT,value );
			putText(src, text, new Point(srcWidth/3,50), 
					CV_FONT_HERSHEY_COMPLEX_SMALL, 1, new Scalar(0,0,0, 1));
			imwrite(tmpName,src);
			temp= new File(tmpName);
		}
		return temp;
	}
	public static File cutImage(File file,String filename){
		File temp=null;
		if(file!=null){
			String path=FileUtil.getUtilProperties("tmp_dir");
			String tmpName=path+filename+".jpg";
			System.out.println(filename);
			System.out.println(tmpName);
			Mat src =  imread(file.getPath());
			int srcWidth=src.cols();
			int srcHeight=src.rows();
			System.out.println(srcWidth+"ffff"+srcHeight);
			Range r1=new Range();
			Range r2=new Range();
			
			r1.start(0);
			r1.end(srcWidth-60);
			r2.start(50);
			r2.end(srcHeight-50);
			Mat dst=new Mat(src,r1,r2); 
			imwrite(tmpName,dst);
			temp= new File(tmpName);
		}
		return temp;
	}
	
	public static File resizeOld(File file,int width,int height,double quality){
		File temp=null;
		if(file!=null){
			try {
				String path=FileUtil.getUtilProperties("tmp_dir");
				String tmpName="tmp".concat(String.valueOf(System.currentTimeMillis()))+".jpg";
				temp =new File(path,tmpName);
				Thumbnails.of(file)
				.outputQuality(quality)  
				.outputFormat("jpg")
				.size(width,height).toFile(temp);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return temp;
	}
}
