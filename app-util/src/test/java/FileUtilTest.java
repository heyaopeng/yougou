import static org.bytedeco.javacpp.opencv_core.copyMakeBorder;
import static org.bytedeco.javacpp.opencv_core.cvReleaseImage;
import static org.bytedeco.javacpp.opencv_core.BORDER_CONSTANT;
import static org.bytedeco.javacpp.opencv_imgcodecs.cvLoadImage;
import static org.bytedeco.javacpp.opencv_imgcodecs.cvSaveImage;
import static org.bytedeco.javacpp.opencv_imgcodecs.imread;
import static org.bytedeco.javacpp.opencv_imgcodecs.imwrite;
import static org.bytedeco.javacpp.opencv_imgproc.INTER_LINEAR;
import static org.bytedeco.javacpp.opencv_imgproc.cvResize;
import static org.bytedeco.javacpp.opencv_imgproc.resize;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.net.URL;

import org.apache.log4j.Logger;
import org.bytedeco.javacpp.opencv_core.IplImage;
import org.bytedeco.javacpp.opencv_core.Mat;
import org.bytedeco.javacpp.opencv_core.Scalar;
import org.bytedeco.javacpp.opencv_core.Size;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.duobao.file.util.FileUtil;
import com.duobao.file.util.ImageUtils;

public class FileUtilTest extends AbstractServiceTests {
	private static final Logger logger = Logger.getLogger(FileUtilTest.class);

	@Test
	public void testConvertToFile() {
		String text = "abc";
		File file = FileUtil.convertToFile(text);
		try {
			String result = FileUtil.convertToString(new FileInputStream(file));
			logger.info(result);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Test
	public void testImageresize() {
		URL fileUrl = this.getClass().getResource("/wKgL6VXBgzSADQYMAAS3fBQv1pU.jpg");
		File file = new File(fileUrl.getPath());
		File newFile = ImageUtils.addTextToImage(file, "新潮都1103","test");
	}

	@Test
	public void testImageresizeJavacv() {
		IplImage origImg = cvLoadImage("/tmp/TB.jpg");
		IplImage resizedImage = IplImage.create(512, 768, origImg.depth(), origImg.nChannels());
		// cvSmooth(origImg, origImg);
		cvResize(origImg, resizedImage, 1);
		cvSaveImage("/tmp/new.jpg", resizedImage);
		cvReleaseImage(resizedImage);

	}

	@Test
	public void testImageresizeMatJavacv() {
		int width = 512;
		int height = 768;
		Mat src = imread("/tmp/ddd.jpg");
		int srcWidth = src.cols();
		int srcHeight = src.rows();
		double scale = (double) srcWidth / srcHeight;
		Mat dst = new Mat();
		int top, bottom, left, right;
		top = bottom = left = right = 0;
		if (srcWidth >= srcHeight) {
			int newWidth = width < srcWidth ? width : srcWidth;
			int newHeight = (int) (newWidth / scale);
			resize(src, dst, new Size(newWidth, newHeight), 0, 0, INTER_LINEAR);
			top = (int) (height - newHeight) / 2;
			bottom = (int) (height - newHeight) / 2;
			if (newWidth != width) {
				left = (int) (width - newWidth) / 2;
				right = (int) (width - newWidth) / 2;
			}
		} else {
			int newHeight = height < srcHeight ? height : srcHeight;
			int newWidth = (int) (height * scale);
			resize(src, dst, new Size(newWidth, height), 0, 0, INTER_LINEAR);
			left = (int) (width - newWidth) / 2;
			right = (int) (width - newWidth) / 2;
			if (newHeight != height) {
				top = (int) (height - newHeight) / 2;
				bottom = (int) (height - newHeight) / 2;
			}
		}
		Scalar value = new Scalar(255, 255, 255, 1);
		copyMakeBorder(dst, dst, top, bottom, left, right, BORDER_CONSTANT, value);
		imwrite("/tmp/new.jpg", dst);

	}

	@Test
	public void testStringFormat() {
		BigDecimal money = new BigDecimal("3.0");
		String format = "%." + 3 + "f";
		System.out.println(String.format(format, money));

	}
	
	
}
