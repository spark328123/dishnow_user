package com.react_dishnow_user;

import android.app.Application;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Log;

import com.dooboolab.kakaologins.RNKakaoLoginsPackage;
import com.dooboolab.naverlogin.RNNaverLoginPackage;
import com.facebook.CallbackManager;
import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;

import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;

import com.airbnb.android.react.maps.MapsPackage;


import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;

import static com.facebook.AccessTokenManager.TAG;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile(){
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            new FastImageViewPackage(),
            new ReactNativeOneSignalPackage(),
            new ImagePickerPackage(),
            new RNCWebViewPackage(),
            new RNNaverLoginPackage(),
            new AsyncStoragePackage(),
            new RNGestureHandlerPackage(),
            new MapsPackage(),
            new RNKakaoLoginsPackage(),
            new FBSDKPackage(mCallbackManager),
            new LinearGradientPackage()
      );
    }


    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
