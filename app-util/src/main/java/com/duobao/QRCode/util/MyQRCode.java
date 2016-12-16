package com.duobao.QRCode.util;
import java.io.ByteArrayOutputStream;  
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;  
import java.io.FileOutputStream;  
import java.io.IOException;
import java.io.InputStream;

import Decoder.BASE64Decoder;
import Decoder.BASE64Encoder;
import net.glxn.qrgen.QRCode;
import net.glxn.qrgen.image.ImageType;  
public class MyQRCode {
	
	public static void generateQRCode(){
		ByteArrayOutputStream out = QRCode.from("http://www.cookabuy.com")  
                .to(ImageType.PNG).withSize(500, 500).stream();  

        try {  
            FileOutputStream fout = new FileOutputStream(new File(  
                    "E:\\QR_Code.JPG"));  

            fout.write(out.toByteArray());  

            fout.flush();  
            fout.close();  

        } catch (FileNotFoundException e) {  
            // Do Logging  
        } catch (IOException e) {  
            // Do Logging  
        }  
          
        // get QR file from text using defaults  
         File file = QRCode.from("Hello World").file();  
         // get QR stream from text using defaults  
         ByteArrayOutputStream stream = QRCode.from("Hello World").stream();  
             
         // override the image type to be JPG  
         QRCode.from("Hello World").to(ImageType.JPG).file();  
         QRCode.from("Hello World").to(ImageType.JPG).stream();  
             
         // override image size to be 250x250  
         QRCode.from("Hello World").withSize(250, 250).file();  
         QRCode.from("Hello World").withSize(250, 250).stream();  
             
         // override size and image type  
         QRCode.from("Hello World").to(ImageType.GIF).withSize(250, 250).file();  
         QRCode.from("Hello World").to(ImageType.GIF).withSize(250, 250).stream();  
           
//       Website Link (URLs) QR Code in Java  
         ByteArrayOutputStream out1 = QRCode.from("http://viralpatel.net")  
                    .to(ImageType.PNG).stream();  
	}
	public static void generateQRCodeIMG(int width,int height,String url){
		ByteArrayOutputStream out = QRCode.from(url)  
                .to(ImageType.PNG).withSize(width, height).stream();  

        try {  
            FileOutputStream fout = new FileOutputStream(new File(  
                    "E:\\temp.jpg"));  

            fout.write(out.toByteArray());  

            fout.flush();  
            fout.close();  

        } catch (FileNotFoundException e) {  
            e.printStackTrace();
        } catch (IOException e) {  
        	e.printStackTrace();
        }  
	}
	public static File generateQRCode(int width,int height,String url){
		return QRCode.from(url).to(ImageType.JPG).withSize(width, height).file();  
	}
	
}
