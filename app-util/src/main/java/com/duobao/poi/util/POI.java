package com.duobao.poi.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFShape;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Picture;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.util.IOUtils;

import com.alibaba.fastjson.JSON;
import com.duobao.file.util.FileUtil;

public class POI {
	/**
     * 根据单元格信息动态插入图片，如果单元格有文字，图片的位置会在文字之后，如果同样的位置已有图片则会往下插入
     *
     * @param workbook Excel
     * @param cell 单元格信息
     * @param inputStream 图片输入流
     * @param scale 图片缩放，传入null表示原始尺寸，其余表示图片高于行高的比（例如传入1.5，表示该图片占1.5个行高）
     */
    public static void createPicture(HSSFWorkbook workbook, HSSFCell cell, String targetUrl, Double scale) {
        ByteArrayOutputStream byteArrayOut = null;
        try {
            byteArrayOut = new ByteArrayOutputStream();
            URL url;
            final int pos = targetUrl.lastIndexOf('.');
			String tmpUrl = targetUrl.substring(0, pos) + "_" + "100" + "x" + "100"
					+ "." + targetUrl.substring(pos + 1);
			url = new URL(targetUrl);
			HttpURLConnection urlConnection = (HttpURLConnection) url
					.openConnection();
			//GET Request Define:   
			urlConnection.setRequestMethod("GET");
			urlConnection.connect();
			InputStream in = urlConnection.getInputStream();
            BufferedImage bufferImg = ImageIO.read(in);
            ImageIO.write(bufferImg, "png", byteArrayOut);

            if (cell != null && (cell.getCellType() == HSSFCell.CELL_TYPE_STRING || cell.getCellType() == HSSFCell.CELL_TYPE_BLANK)) {
                HSSFSheet sheet = cell.getSheet();
                sheet.createDrawingPatriarch();
                HSSFRow row = cell.getRow();
                HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
                String cellValue = cell.getStringCellValue().contains("#{") ? cell.getStringCellValue().split("#\\{")[0] : cell.getStringCellValue();

                int i = row.getRowNum();
                short j = (short) cell.getColumnIndex();

                int colWidth = sheet.getColumnWidth(cell.getColumnIndex()) / 32; // 单元格像素宽度
                int wordWidth = cellValue.getBytes("GBK").length == 0 ? 0 : ((cellValue.getBytes("GBK").length + 2) * 8); // 单元格文本大致像素宽度
                double pert = new BigDecimal(wordWidth).divide(new BigDecimal(colWidth), 10, BigDecimal.ROUND_HALF_UP).doubleValue();

                int dx1 = new BigDecimal(pert * 1023).setScale(0, BigDecimal.ROUND_HALF_UP).intValue();
                int dy1 = 0;
                /*List<HSSFShape> shapes = sheet.getDrawingPatriarch().getChildren();
                for (HSSFShape shape : shapes) {
                    HSSFClientAnchor anchor = (HSSFClientAnchor) shape.getAnchor();
                    if (anchor.getRow1() == i && anchor.getCol1() == j && anchor.getDx1() == dx1 && anchor.getDy1() == dy1) {
                        if (anchor.getDy2() >= 255) {
                            i = anchor.getRow2() + 1;
                            dy1 = 0;
                        } else {
                            i = anchor.getRow2();
                            dy1 = anchor.getDy2() + 1;
                        }
                    }
                }*/

                HSSFClientAnchor anchor = new HSSFClientAnchor(1, 1, 0, 0, j, i, j, i + 1); // 由于用了getPreferredSize所以dx2,dy2无效
                anchor.setAnchorType(3);
                if (scale == null) {
                    patriarch.createPicture(anchor, workbook.addPicture(byteArrayOut.toByteArray(), HSSFWorkbook.PICTURE_TYPE_PNG)).getPreferredSize(1.0);
                } else {
                    double zoom = new BigDecimal(row.getHeight() / 15).divide(new BigDecimal(bufferImg.getHeight()), 10, BigDecimal.ROUND_HALF_UP).doubleValue(); // 行高像素与图片高度像素比例
                    patriarch.createPicture(anchor, workbook.addPicture(byteArrayOut.toByteArray(), HSSFWorkbook.PICTURE_TYPE_PNG)).getPreferredSize(zoom * scale);
                }
            }
        } catch (IOException ioe) {
        	ioe.printStackTrace();
        } finally {
            if (byteArrayOut != null) {
                try {
                    byteArrayOut.close();
                } catch (IOException e) {
                	e.printStackTrace();
                }
            }
        }
    }
    
    
    public static void insert(int x1 , int y1 , int x2 , int y2 , String targetUrl,HSSFWorkbook hSSFWorkbook,HSSFSheet sheet1,Drawing drawing1){
    	try {

    		   //Workbook wb = new XSSFWorkbook();
    		   HSSFWorkbook wb = hSSFWorkbook;
    		   Sheet sheet = sheet1;

    		   //FileInputStream obtains input bytes from the image file
    		  // InputStream inputStream = new FileInputStream("E://tmp.png");
    		   File tmp = FileUtil.urlRequestToGetFileForExcel(targetUrl);
    		   InputStream inputStream = new FileInputStream(tmp);
    		   //Get the contents of an InputStream as a byte[].
    		   byte[] bytes = IOUtils.toByteArray(inputStream);
    		   //Adds a picture to the workbook
    		   int pictureIdx = wb.addPicture(bytes, Workbook.PICTURE_TYPE_PNG);
    		   //close the input stream
    		   inputStream.close();

    		   //Returns an object that handles instantiating concrete classes
    		   CreationHelper helper = wb.getCreationHelper();

    		   //Creates the top-level drawing patriarch.

    		   //Create an anchor that is attached to the worksheet
    		   ClientAnchor anchor = helper.createClientAnchor();
    		   //set top-left corner for the image
    		   anchor.setCol1(x1);
    		   anchor.setRow1(y1);
    		   anchor.setCol2(x2);
    		   anchor.setRow2(y2);
    		   
    		   if(y2-y1>2){
    			   anchor.setRow2(y1+2);
    		   }

    		   //Creates a picture
    		   Picture pict = drawing1.createPicture(anchor, pictureIdx);
    		   //Reset the image to the original size

    		   //Write the Excel file
    		   /*FileOutputStream fileOut = null;
    		   fileOut = new FileOutputStream("E://myFile1.xlsx");
    		   wb.write(fileOut);
    		   fileOut.close();*/

    		  }
    		  catch (Exception e) {
    		   System.out.println(e);
    		  }
    }
}
