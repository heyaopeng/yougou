package com.duobao.velocity;

import java.util.Calendar;
import java.util.Date;

import org.apache.velocity.tools.Scope;
import org.apache.velocity.tools.config.DefaultKey;
import org.apache.velocity.tools.config.ValidScope;
import org.apache.velocity.tools.generic.DateTool;
import org.joda.time.DateTime;

@DefaultKey("dateTool")
@ValidScope(Scope.APPLICATION)
public class DateTools {
	private static final DateTool tool = new DateTool();

	public static DateTool getTool() {
		return tool;
	}
	
	public static String isFirstHalfOfMonth(Date time){
		if(time instanceof Date){
			DateTime t = new DateTime(time);
			if(t.getDayOfMonth()>=15){
				return "true";
			}else{
				return "false";
			}
		}
		return null;
	}
	/*public static void main(String[] args) {
		System.out.println(DateTools.isFirstHalfOfMonth(new Date()));
	}*/
	
	public static Date addDay(Date date, int n) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, n);
        return cal.getTime();
    }
}
