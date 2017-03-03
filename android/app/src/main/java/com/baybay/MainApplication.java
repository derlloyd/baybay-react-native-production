package com.baybay;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.idehub.Billing.InAppBillingBridgePackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.futurice.rctaudiotoolkit.AudioPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new InAppBillingBridgePackage("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArSEXlzZ1U8nowG0Feh3qB9rcPcB7yI6I7E6979SO95hbDZWczn5CEYkYHgyKEHkc4/jE3qZa9MkoWVTkUE8rajR8lf1JTVLkiH0+FVgWSm/wabXwy1OsIGPoZkkLLRr3VnBfoBJn9wesWzVAZFD8yqbrKKAcCYObB0uwMnPB8IT8qcI5WHvrThCCxmsDTBD9DqW6UWCNleF7BmA93xKe377W6urgknfRSVA8VV08WPmkhG7RnYYcSTeqlbkbsEPOroqi+Tw9uaB0nq+X6MDOEUnnt2KmBNl+R86lEtm+VC8Xs+7xzOQ0eLFqmnk9Cc+KcX1nAWXXIagABmZ0wi6Q3wIDAQAB"),
            new ReactNativeLocalizationPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new AudioPackage()
      );
    }
  };

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
