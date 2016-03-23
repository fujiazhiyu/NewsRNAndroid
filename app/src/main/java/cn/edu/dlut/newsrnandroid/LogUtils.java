package cn.edu.dlut.newsrnandroid;

/**
 * Created by yufujia on 16/3/14.
 */
import android.os.Environment;
import android.text.TextUtils;
import android.util.Log;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

public class LogUtils {
    private static final String TAG = "ReactNativeTag";

    public static boolean logEnabled = false;
    private static String path = null;
    private static PrintWriter ps;

    public static void setLogEnabled(boolean enabled) {
        logEnabled = enabled;
    }

    public static void d(String message) {
        if (logEnabled == false) {
            return;
        }
        if (path == null) {
            File log = new File(Environment.getExternalStorageDirectory(), "reactNative.log");
            setPath(log.getAbsolutePath());
        }
        if (logEnabled && !TextUtils.isEmpty(message)) {
            Log.d(TAG, message);
            logInternal(message);
        }
    }

    public static void setPath(String p) {
        path = p;
        try {
            FileOutputStream fs = new FileOutputStream(path, true);
            OutputStreamWriter sw = new OutputStreamWriter(fs);
            BufferedWriter output = new BufferedWriter(sw);
            ps = new PrintWriter(output, true);

            Log.d(TAG, "logPtah " + path);
        } catch (IOException e) {
        }
    }

    private static void logInternal(String msg) {
        if (ps != null) {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String date = df.format(new Date());
            try {
                ps.println((date + " Pid(): " + android.os.Process.myPid() + " T" + Thread.currentThread().getId() + " " + msg));
                ps.flush();
            } catch (Exception ex) {
            }
        }
    }

    public static void log(Class t, Throwable e) {
        if (logEnabled == false) {
            return;
        }
        if (t == null) {
            return;
        }
        logInternal(t.getName() + " Exception ");
        if (e == null) {
            return;
        }
        logInternal(e);
    }

    private static void logInternal(Throwable e) {
        if (ps != null) {
            e.printStackTrace(ps);
        }
    }
}