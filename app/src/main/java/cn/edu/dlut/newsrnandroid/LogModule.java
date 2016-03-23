package cn.edu.dlut.newsrnandroid;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by yufujia on 16/3/14.
 */

public class LogModule extends ReactContextBaseJavaModule {
    public LogModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "logModule";
    }

    @ReactMethod
    public void log(String str) {
        LogUtils.d(str);
    }
}