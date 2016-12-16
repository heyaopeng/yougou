package com.duobao.payment.strategy.wcPaymetnTools;


import java.io.*;
import java.util.*;

public class IOUtils
{

    public IOUtils()
    {
    }

    public static void closeQuietly(Reader input)
    {
        try
        {
            if(input != null)
                input.close();
        }
        catch(IOException ioexception) { }
    }

    public static void closeQuietly(Writer output)
    {
        try
        {
            if(output != null)
                output.close();
        }
        catch(IOException ioexception) { }
    }

    public static void closeQuietly(InputStream input)
    {
        try
        {
            if(input != null)
                input.close();
        }
        catch(IOException ioexception) { }
    }

    public static void closeQuietly(OutputStream output)
    {
        try
        {
            if(output != null)
                output.close();
        }
        catch(IOException ioexception) { }
    }

    public static byte[] toByteArray(InputStream input)
        throws IOException
    {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        copy(input, output);
        return output.toByteArray();
    }

    public static byte[] toByteArray(Reader input)
        throws IOException
    {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        copy(input, output);
        return output.toByteArray();
    }

    public static byte[] toByteArray(Reader input, String encoding)
        throws IOException
    {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        copy(input, output, encoding);
        return output.toByteArray();
    }

    /**
     * @deprecated Method toByteArray is deprecated
     */

    public static byte[] toByteArray(String input)
        throws IOException
    {
        return input.getBytes();
    }

    public static char[] toCharArray(InputStream is)
        throws IOException
    {
        CharArrayWriter output = new CharArrayWriter();
        copy(is, output);
        return output.toCharArray();
    }

    public static char[] toCharArray(InputStream is, String encoding)
        throws IOException
    {
        CharArrayWriter output = new CharArrayWriter();
        copy(is, output, encoding);
        return output.toCharArray();
    }

    public static char[] toCharArray(Reader input)
        throws IOException
    {
        CharArrayWriter sw = new CharArrayWriter();
        copy(input, sw);
        return sw.toCharArray();
    }

    public static String toString(InputStream input)
        throws IOException
    {
        StringWriter sw = new StringWriter();
        copy(input, sw);
        return sw.toString();
    }

    public static String toString(InputStream input, String encoding)
        throws IOException
    {
        StringWriter sw = new StringWriter();
        copy(input, sw, encoding);
        return sw.toString();
    }

    public static String toString(Reader input)
        throws IOException
    {
        StringWriter sw = new StringWriter();
        copy(input, sw);
        return sw.toString();
    }

    /**
     * @deprecated Method toString is deprecated
     */

    public static String toString(byte input[])
        throws IOException
    {
        return new String(input);
    }

    /**
     * @deprecated Method toString is deprecated
     */

    public static String toString(byte input[], String encoding)
        throws IOException
    {
        if(encoding == null)
            return new String(input);
        else
            return new String(input, encoding);
    }

    public static List readLines(InputStream input)
        throws IOException
    {
        InputStreamReader reader = new InputStreamReader(input);
        return readLines(((Reader) (reader)));
    }

    public static List readLines(InputStream input, String encoding)
        throws IOException
    {
        if(encoding == null)
        {
            return readLines(input);
        } else
        {
            InputStreamReader reader = new InputStreamReader(input, encoding);
            return readLines(((Reader) (reader)));
        }
    }

    public static List readLines(Reader input)
        throws IOException
    {
        BufferedReader reader = new BufferedReader(input);
        List list = new ArrayList();
        for(String line = reader.readLine(); line != null; line = reader.readLine())
            list.add(line);

        return list;
    }

    public static InputStream toInputStream(String input)
    {
        byte bytes[] = input.getBytes();
        return new ByteArrayInputStream(bytes);
    }

    public static InputStream toInputStream(String input, String encoding)
        throws IOException
    {
        byte bytes[] = encoding == null ? input.getBytes() : input.getBytes(encoding);
        return new ByteArrayInputStream(bytes);
    }

    public static void write(byte data[], OutputStream output)
        throws IOException
    {
        if(data != null)
            output.write(data);
    }

    public static void write(byte data[], Writer output)
        throws IOException
    {
        if(data != null)
            output.write(new String(data));
    }

    public static void write(byte data[], Writer output, String encoding)
        throws IOException
    {
        if(data != null)
            if(encoding == null)
                write(data, output);
            else
                output.write(new String(data, encoding));
    }

    public static void write(char data[], Writer output)
        throws IOException
    {
        if(data != null)
            output.write(data);
    }

    public static void write(char data[], OutputStream output)
        throws IOException
    {
        if(data != null)
            output.write((new String(data)).getBytes());
    }

    public static void write(char data[], OutputStream output, String encoding)
        throws IOException
    {
        if(data != null)
            if(encoding == null)
                write(data, output);
            else
                output.write((new String(data)).getBytes(encoding));
    }

    public static void write(String data, Writer output)
        throws IOException
    {
        if(data != null)
            output.write(data);
    }

    public static void write(String data, OutputStream output)
        throws IOException
    {
        if(data != null)
            output.write(data.getBytes());
    }

    public static void write(String data, OutputStream output, String encoding)
        throws IOException
    {
        if(data != null)
            if(encoding == null)
                write(data, output);
            else
                output.write(data.getBytes(encoding));
    }

    public static void write(StringBuffer data, Writer output)
        throws IOException
    {
        if(data != null)
            output.write(data.toString());
    }

    public static void write(StringBuffer data, OutputStream output)
        throws IOException
    {
        if(data != null)
            output.write(data.toString().getBytes());
    }

    public static void write(StringBuffer data, OutputStream output, String encoding)
        throws IOException
    {
        if(data != null)
            if(encoding == null)
                write(data, output);
            else
                output.write(data.toString().getBytes(encoding));
    }

    public static void writeLines(Collection lines, String lineEnding, OutputStream output)
        throws IOException
    {
        if(lines == null)
            return;
        if(lineEnding == null)
            lineEnding = LINE_SEPARATOR;
        for(Iterator it = lines.iterator(); it.hasNext(); output.write(lineEnding.getBytes()))
        {
            Object line = it.next();
            if(line != null)
                output.write(line.toString().getBytes());
        }

    }

    public static void writeLines(Collection lines, String lineEnding, OutputStream output, String encoding)
        throws IOException
    {
        if(encoding == null)
        {
            writeLines(lines, lineEnding, output);
        } else
        {
            if(lines == null)
                return;
            if(lineEnding == null)
                lineEnding = LINE_SEPARATOR;
            for(Iterator it = lines.iterator(); it.hasNext(); output.write(lineEnding.getBytes(encoding)))
            {
                Object line = it.next();
                if(line != null)
                    output.write(line.toString().getBytes(encoding));
            }

        }
    }

    public static void writeLines(Collection lines, String lineEnding, Writer writer)
        throws IOException
    {
        if(lines == null)
            return;
        if(lineEnding == null)
            lineEnding = LINE_SEPARATOR;
        for(Iterator it = lines.iterator(); it.hasNext(); writer.write(lineEnding))
        {
            Object line = it.next();
            if(line != null)
                writer.write(line.toString());
        }

    }

    public static int copy(InputStream input, OutputStream output)
        throws IOException
    {
        long count = copyLarge(input, output);
        if(count > 2147483647L)
            return -1;
        else
            return (int)count;
    }

    public static long copyLarge(InputStream input, OutputStream output)
        throws IOException
    {
        byte buffer[] = new byte[4096];
        long count = 0L;
        for(int n = 0; -1 != (n = input.read(buffer));)
        {
            output.write(buffer, 0, n);
            count += n;
        }

        return count;
    }

    public static void copy(InputStream input, Writer output)
        throws IOException
    {
        InputStreamReader in = new InputStreamReader(input);
        copy(((Reader) (in)), output);
    }

    public static void copy(InputStream input, Writer output, String encoding)
        throws IOException
    {
        if(encoding == null)
        {
            copy(input, output);
        } else
        {
            InputStreamReader in = new InputStreamReader(input, encoding);
            copy(((Reader) (in)), output);
        }
    }

    public static int copy(Reader input, Writer output)
        throws IOException
    {
        long count = copyLarge(input, output);
        if(count > 2147483647L)
            return -1;
        else
            return (int)count;
    }

    public static long copyLarge(Reader input, Writer output)
        throws IOException
    {
        char buffer[] = new char[4096];
        long count = 0L;
        for(int n = 0; -1 != (n = input.read(buffer));)
        {
            output.write(buffer, 0, n);
            count += n;
        }

        return count;
    }

    public static void copy(Reader input, OutputStream output)
        throws IOException
    {
        OutputStreamWriter out = new OutputStreamWriter(output);
        copy(input, ((Writer) (out)));
        out.flush();
    }

    public static void copy(Reader input, OutputStream output, String encoding)
        throws IOException
    {
        if(encoding == null)
        {
            copy(input, output);
        } else
        {
            OutputStreamWriter out = new OutputStreamWriter(output, encoding);
            copy(input, ((Writer) (out)));
            out.flush();
        }
    }

    public static boolean contentEquals(InputStream input1, InputStream input2)
        throws IOException
    {
        if(!(input1 instanceof BufferedInputStream))
            input1 = new BufferedInputStream(input1);
        if(!(input2 instanceof BufferedInputStream))
            input2 = new BufferedInputStream(input2);
        int ch2;
        for(int ch = input1.read(); -1 != ch; ch = input1.read())
        {
            ch2 = input2.read();
            if(ch != ch2)
                return false;
        }

        ch2 = input2.read();
        return ch2 == -1;
    }

    public static boolean contentEquals(Reader input1, Reader input2)
        throws IOException
    {
        if(!(input1 instanceof BufferedReader))
            input1 = new BufferedReader(input1);
        if(!(input2 instanceof BufferedReader))
            input2 = new BufferedReader(input2);
        int ch2;
        for(int ch = input1.read(); -1 != ch; ch = input1.read())
        {
            ch2 = input2.read();
            if(ch != ch2)
                return false;
        }

        ch2 = input2.read();
        return ch2 == -1;
    }

    public static final char DIR_SEPARATOR_UNIX = 47;
    public static final char DIR_SEPARATOR_WINDOWS = 92;
    public static final char DIR_SEPARATOR;
    public static final String LINE_SEPARATOR_UNIX = "\n";
    public static final String LINE_SEPARATOR_WINDOWS = "\r\n";
    public static final String LINE_SEPARATOR;
    private static final int DEFAULT_BUFFER_SIZE = 4096;

    static 
    {
        DIR_SEPARATOR = File.separatorChar;
        StringWriter buf = new StringWriter(4);
        PrintWriter out = new PrintWriter(buf);
        out.println();
        LINE_SEPARATOR = buf.toString();
    }
}


/*
	DECOMPILATION REPORT

	Decompiled from: C:\Users\Administrator\.m2\repository\fakepath\wechatpay\1.1\wechatpay-1.1.jar
	Total time: 18 ms
	Jad reported messages/errors:
	Exit status: 0
	Caught exceptions:
*/
