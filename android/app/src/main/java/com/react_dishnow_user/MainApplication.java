package com.react_dishnow_user;

import android.app.Application;

import com.dooboolab.kakaologins.RNKakaoLoginsPackage;
import com.dooboolab.naverlogin.RNNaverLoginPackage;
import com.facebook.CallbackManager;
import com.facebook.react.ReactApplication;
import com.dylanvann.fastimage.FastImageViewPackage;


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

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FastImageViewPackage(),
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
