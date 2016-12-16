package com.duobao.payment.strategy.wcPaymetnTools;


import java.lang.reflect.*;
import java.util.*;
import org.dom4j.*;

public class PaymentUtils extends PaymentTools
{

 public PaymentUtils()
 {
 }

 protected static Object toXML(String className, String respXML)
 {
     Object obj = getObject(className);
     Class clzz = getInstance(className);
     Element element = getElement(respXML);
     Field afield[];
     int j = (afield = getInstance(className).getDeclaredFields()).length;
     for(int i = 0; i < j; i++)
     {
         Field field = afield[i];
         for(Iterator iterator = element.elementIterator(); iterator.hasNext();)
         {
             Element el = (Element)iterator.next();
             if(field.getName().equals(el.getName()))
             {
                 field = getField(clzz, el.getName());
                 field.setAccessible(true);
                 try
                 {
                     field.set(obj, el.getText());
                 }
                 catch(IllegalArgumentException e)
                 {
                     e.printStackTrace();
                 }
                 catch(IllegalAccessException e)
                 {
                     e.printStackTrace();
                 }
             }
         }

     }

     return obj;
 }

 protected static Object toXML(Class clz, String respXML)
 {
     String className = clz.getName();
     Object obj = getObject(className);
     Class clzz = getInstance(className);
     Element element = getElement(respXML);
     Field afield[];
     int j = (afield = getInstance(className).getDeclaredFields()).length;
     for(int i = 0; i < j; i++)
     {
         Field field = afield[i];
         for(Iterator iterator = element.elementIterator(); iterator.hasNext();)
         {
             Element el = (Element)iterator.next();
             if(field.getName().equals(el.getName()))
             {
                 field = getField(clzz, el.getName());
                 field.setAccessible(true);
                 try
                 {
                     field.set(obj, el.getText());
                 }
                 catch(IllegalArgumentException e)
                 {
                     e.printStackTrace();
                 }
                 catch(IllegalAccessException e)
                 {
                     e.printStackTrace();
                 }
             }
         }

     }

     return obj;
 }

 protected static String froXML(Object obj, String KEYAPI)
 {
     SortedMap packageParams = new TreeMap();
     Class clzz = obj.getClass();
     Field afield[];
     int j = (afield = clzz.getDeclaredFields()).length;
     for(int i = 0; i < j; i++)
     {
         Field f = afield[i];
         if(f.getGenericType().toString().equals("class java.lang.String"))
         {
             Method m = getMethod(clzz, (new StringBuilder("get")).append(getMethodName(f.getName())).toString());
             String value = getValue(m, obj);
             if(value != null)
                 packageParams.put(f.getName(), value);
         }
     }

     return PaymentTools.Signature(packageParams, KEYAPI);
 }

 protected static String getSign(Object obj, String KEYAPI)
 {
     SortedMap packageParams = new TreeMap();
     Class clzz = obj.getClass();
     Field afield[];
     int j = (afield = clzz.getDeclaredFields()).length;
     for(int i = 0; i < j; i++)
     {
         Field f = afield[i];
         if(f.getGenericType().toString().equals("class java.lang.String"))
         {
             Method m = getMethod(clzz, (new StringBuilder("get")).append(getMethodName(f.getName())).toString());
             String value = getValue(m, obj);
             if(value != null)
                 packageParams.put(f.getName(), value);
         }
     }

     return PaymentTools.createSign(packageParams, KEYAPI);
 }

 private static String getValue(Method method, Object obj)
 {
     String value = null;
     try
     {
         value = (String)method.invoke(obj, new Object[0]);
     }
     catch(IllegalArgumentException e)
     {
         e.printStackTrace();
     }
     catch(IllegalAccessException e)
     {
         e.printStackTrace();
     }
     catch(InvocationTargetException e)
     {
         e.printStackTrace();
     }
     return value;
 }

 private static Method getMethod(Class clzz, String name)
 {
     Method method = null;
     try
     {
         method = clzz.getMethod(name, new Class[0]);
     }
     catch(SecurityException e)
     {
         e.printStackTrace();
     }
     catch(NoSuchMethodException e)
     {
         e.printStackTrace();
     }
     return method;
 }

 private static String getMethodName(String fildeName)
 {
     byte items[] = fildeName.getBytes();
     items[0] = (byte)(((char)items[0] - 97) + 65);
     return new String(items);
 }

 private static Field getField(Class clzz, String labelName)
 {
     Field field = null;
     try
     {
         field = clzz.getDeclaredField(labelName);
     }
     catch(SecurityException e)
     {
         e.printStackTrace();
     }
     catch(NoSuchFieldException e)
     {
         e.printStackTrace();
     }
     return field;
 }

 private static Element getElement(String xml)
 {
     Element element = null;
     Document doc = null;
     try
     {
         doc = DocumentHelper.parseText(xml);
         element = doc.getRootElement();
     }
     catch(DocumentException e)
     {
         e.printStackTrace();
     }
     return element;
 }

 private static Object getObject(String className)
 {
     Object obj = null;
     try
     {
         obj = Class.forName(className).newInstance();
     }
     catch(InstantiationException e)
     {
         e.printStackTrace();
     }
     catch(IllegalAccessException e)
     {
         e.printStackTrace();
     }
     catch(ClassNotFoundException e)
     {
         e.printStackTrace();
     }
     return obj;
 }

 private static Class getInstance(String className)
 {
     Class clzz = null;
     try
     {
         clzz = Class.forName(className).newInstance().getClass();
     }
     catch(InstantiationException e)
     {
         e.printStackTrace();
     }
     catch(IllegalAccessException e)
     {
         e.printStackTrace();
     }
     catch(ClassNotFoundException e)
     {
         e.printStackTrace();
     }
     return clzz;
 }
}


/*
	DECOMPILATION REPORT

	Decompiled from: C:\Users\Administrator\.m2\repository\fakepath\wechatpay\1.1\wechatpay-1.1.jar
	Total time: 17 ms
	Jad reported messages/errors:
	Exit status: 0
	Caught exceptions:
*/