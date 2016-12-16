package com.duobao.date.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期工具类 默认使用 "yyyy-MM-dd HH:mm:ss" 格式化日期
 * 
 */
public abstract class DateUtils {
	/**
	 * 英文简写（默认）如：2010-12-01
	 */
	public static String FORMAT_SHORT = "yyyy-MM-dd";
	/**
	 * 英文简写（默认）如：2010/12
	 */
	public static String YEAR_MONTH = "yyyy/MM/dd";
	/**
	 * 英文简写（默认）如：2010/12/01
	 */
	public static String YEAR_MONTH_DAY = "yyyy/MM/dd";
	/**
	 * 英文简写（默认）如：2010/12/01 11:22:33
	 */
	public static String YEAR_MONTH_LONG = "yyyy/MM/dd HH:mm:ss";
	/**
	 * 英文全称 如：2010-12-01 23:15:06
	 */
	public static String FORMAT_LONG = "yyyy-MM-dd HH:mm:ss";
	/**
	 * 精确到毫秒的完整时间 如：yyyy-MM-dd HH:mm:ss.S
	 */
	public static String FORMAT_FULL = "yyyy-MM-dd HH:mm:ss.S";
	/**
	 * 英文全称 如：2010-12-01 23:15:06
	 */
	public static String FORMAT_TIME= "HH:mm:ss";
	/**
	 * 中文简写 如：2010年12月01日
	 */
	public static String FORMAT_SHORT_CN = "yyyy年MM月dd日";
	/**
	 * 中文全称 如：2010年12月01日 23时15分06秒
	 */
	public static String FORMAT_LONG_CN = "yyyy年MM月dd日  HH时mm分ss秒";
	/**
	 * 精确到毫秒的完整中文时间
	 */
	public static String FORMAT_FULL_CN = "yyyy年MM月dd日  HH时mm分ss秒SSS毫秒";

	/**
	 * 获得默认的 date pattern
	 */
	public static String getDatePattern() {
		return FORMAT_LONG;
	}

	/**
	 * 根据预设格式返回当前日期
	 * 
	 * @return
	 */
	public static String getNow() {
		return format(new Date());
	}

	/**
	 * 根据用户格式返回当前日期
	 * 
	 * @param format
	 * @return
	 */
	public static String getNow(String format) {
		return format(new Date(), format);
	}

	/**
	 * 使用预设格式格式化日期
	 * 
	 * @param date
	 * @return
	 */
	public static String format(Date date) {
		return format(date, getDatePattern());
	}

	/**
	 * 使用用户格式格式化日期
	 * 
	 * @param date
	 *            日期
	 * @param pattern
	 *            日期格式
	 * @return
	 */
	public static String format(Date date, String pattern) {
		String returnValue = "";
		if (date != null) {
			SimpleDateFormat df = new SimpleDateFormat(pattern);
			returnValue = df.format(date);
		}
		return (returnValue);
	}

	/**
	 * 使用预设格式提取字符串日期
	 * 
	 * @param strDate
	 *            日期字符串
	 * @return
	 */
	public static Date parse(String strDate) {
		return parse(strDate, getDatePattern());
	}

	/**
	 * 使用用户格式提取字符串日期
	 * 
	 * @param strDate
	 *            日期字符串
	 * @param pattern
	 *            日期格式
	 * @return
	 */
	public static Date parse(String strDate, String pattern) {
		SimpleDateFormat df = new SimpleDateFormat(pattern);
		try {
			return df.parse(strDate);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 在日期上增加数个整月
	 * 
	 * @param date
	 *            日期
	 * @param n
	 *            要增加的月数
	 * @return
	 */
	public static Date addMonth(Date date, int n) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MONTH, n);
		return cal.getTime();
	}

	/**
	 * 在日期上增加天数
	 * 
	 * @param date
	 *            日期
	 * @param n
	 *            要增加的天数
	 * @return
	 */
	public static Date addDay(Date date, int n) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DATE, n);
		return cal.getTime();
	}

	/**
	 * 在日期上减少天数
	 * 
	 * @param date
	 *            日期
	 * @param n
	 *            要减少的天数
	 * @return
	 */
	public static Date delDay(Date date, int n) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int day = cal.get(Calendar.DATE);
		cal.set(Calendar.DATE, day - n);
		return cal.getTime();
	}

	/**
	 * 在日期上增加秒数
	 * 
	 * @param date
	 *            日期
	 * @param n
	 *            要增加的秒数
	 * @return
	 */
	public static Date addSecond(Date date, int n) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.SECOND, n);
		return cal.getTime();
	}
	
	public static Date addMinute(Date date, int n) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MINUTE, n);
		return cal.getTime();
	}
	
	public static Date addHour(Date date, int n) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.HOUR, n);
		return cal.getTime();
	}

	/**
	 * 获取时间戳
	 */
	public static String getTimeString() {
		SimpleDateFormat df = new SimpleDateFormat(FORMAT_FULL);
		Calendar calendar = Calendar.getInstance();
		return df.format(calendar.getTime());
	}

	/**
	 * 获取日期年份
	 * 
	 * @param date
	 *            日期
	 * @return
	 */
	public static String getYear(Date date) {
		return format(date).substring(0, 4);
	}

	public static String getMonth(Date date) {
		String temp = format(date);
		if (temp.length() > 5) {
			return format(date).substring(5, 7);
		}
		return null;

	}

	public static String getDay(Date date) {
		String temp = format(date);
		if (temp.length() > 5) {
			return format(date).substring(8, 10);
		}
		return null;
	}

	public static String getTime(Date date) {
		String temp = format(date);
		if (temp.length() > 18) {
			String[] temps = temp.split(" ");
			if (temps.length >= 2) {
				return temps[1];
			}
		}
		return null;
	}

	/**
	 * 按默认格式的字符串距离今天的天数
	 * 
	 * @param date
	 *            日期字符串
	 * @return
	 */
	public static int countDays(String date) {
		long t = Calendar.getInstance().getTime().getTime();
		Calendar c = Calendar.getInstance();
		c.setTime(parse(date));
		long t1 = c.getTime().getTime();
		return (int) (t / 1000 - t1 / 1000) / 3600 / 24;
	}

	/**
	 * 按用户格式字符串距离今天的天数
	 * 
	 * @param date
	 *            日期字符串
	 * @param format
	 *            日期格式
	 * @return
	 */
	public static int countDays(String date, String format) {
		long t = Calendar.getInstance().getTime().getTime();
		Calendar c = Calendar.getInstance();
		c.setTime(parse(date, format));
		long t1 = c.getTime().getTime();
		return (int) (t / 1000 - t1 / 1000) / 3600 / 24;
	}

	public static Date getPreMonth(int pre) {
		Calendar c = Calendar.getInstance();
		c.add(Calendar.MONTH, pre);
		// SimpleDateFormat format = new SimpleDateFormat(FORMAT_LONG);
		return c.getTime();
	}

	public static Date getCurrentDate() {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 设置日期格式
		try {
			return df.parse(df.format(new Date()));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public static Date getYearMonth(String date) {
		date = date.concat("/01");
		return parse(date, YEAR_MONTH);

	}

	public static int getDaysBetween(Calendar d1, Calendar d2) {
		if (d1.after(d2)) {
			java.util.Calendar swap = d1;
			d1 = d2;
			d2 = swap;
		}
		int days = d2.get(Calendar.DAY_OF_YEAR) - d1.get(Calendar.DAY_OF_YEAR);
		int y2 = d2.get(Calendar.YEAR);
		if (d1.get(Calendar.YEAR) != y2) {
			d1 = (Calendar) d1.clone();
			do {
				days += d1.getActualMaximum(Calendar.DAY_OF_YEAR);// 得到当年的实际天数
				d1.add(Calendar.YEAR, 1);
			} while (d1.get(Calendar.YEAR) != y2);
		}
		return days;
	}

	public static int daysBetween(Date smdate, Date bdate) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		smdate = sdf.parse(sdf.format(smdate));
		bdate = sdf.parse(sdf.format(bdate));
		Calendar cal = Calendar.getInstance();
		cal.setTime(smdate);
		long time1 = cal.getTimeInMillis();
		cal.setTime(bdate);
		long time2 = cal.getTimeInMillis();
		long between_days = (time2 - time1) / (1000 * 3600 * 24);

		return Integer.parseInt(String.valueOf(between_days));
	}

	public static int timeBetween(Date smdate, Date bdate) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		smdate = sdf.parse(sdf.format(smdate));
		bdate = sdf.parse(sdf.format(bdate));
		Calendar cal = Calendar.getInstance();
		cal.setTime(smdate);
		long time1 = cal.getTimeInMillis();
		cal.setTime(bdate);
		long time2 = cal.getTimeInMillis();
		long between_days = (time2 - time1) / 1000;

		return Integer.parseInt(String.valueOf(between_days));
	}

	public static Date getLastDayOfMonth(int year, int month) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DATE));
		return cal.getTime();
	}

	public static Date getFirstDayOfMonth(int year, int month) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month);
		cal.set(Calendar.DAY_OF_MONTH, cal.getMinimum(Calendar.DATE));
		return cal.getTime();
	}

	public static String getRealTime(int second) {

		int mins = second / 60;
		if (mins == 0) {
			return second + "秒";
		}

		int hour = mins / 60;
		if (hour == 0) {
			return mins + "分钟";
		}

		int day = hour / 24;
		if (day == 0) {
			return hour + "小时";
		}

		int month = day / 30;
		if (month == 0) {
			return day + "天";
		}

		int year = month / 12;
		if (year == 0) {
			return month + "天";
		}

		return year + "年";
	}
	public static Date getStartTime() {  
        Calendar todayStart = Calendar.getInstance();  
        todayStart.set(Calendar.HOUR, 0);  
        todayStart.set(Calendar.MINUTE, 0);  
        todayStart.set(Calendar.SECOND, 0);  
        todayStart.set(Calendar.MILLISECOND, 0);  
        return todayStart.getTime();  
    }  
  
	public static Date getEndTime() {  
        Calendar todayEnd = Calendar.getInstance();  
        todayEnd.set(Calendar.HOUR, 23);  
        todayEnd.set(Calendar.MINUTE, 59);  
        todayEnd.set(Calendar.SECOND, 59);  
        todayEnd.set(Calendar.MILLISECOND, 999);  
        return todayEnd.getTime();  
    }  
		
}
