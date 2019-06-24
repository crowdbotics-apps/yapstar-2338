package com.crowdbotics.yapstars;

import android.annotation.SuppressLint;
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

// import io.invertase.firebase.RNFirebasePackage;
// // optional packages - add/remove as appropriate
// import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
// import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
// import io.invertase.firebase.auth.RNFirebaseAuthPackage;
// import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
// import io.invertase.firebase.database.RNFirebaseDatabasePackage;
// import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
// import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
// import io.invertase.firebase.functions.RNFirebaseFunctionsPackage;
// import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
// // import io.invertase.firebase.invites.RNFirebaseInvitesPackage;
// import io.invertase.firebase.links.RNFirebaseLinksPackage;
// import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
// import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
// import io.invertase.firebase.perf.RNFirebasePerformancePackage;
// import io.invertase.firebase.storage.RNFirebaseStoragePackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.functions.RNFirebaseFunctionsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
//import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @SuppressLint("MissingPermission")
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.asList(new MainReactPackage(),
            new OrientationPackage(),
            new AsyncStoragePackage(),
            new SplashScreenReactPackage(), new FastImageViewPackage(), new RNGoogleSigninPackage(),
          new RNCWebViewPackage(), new TwitterSigninPackage(),

          new FBSDKPackage(mCallbackManager),
          // new FBSDKPackage(),
          new VectorIconsPackage(), new RNGestureHandlerPackage(), new RNFirebasePackage(),
          // add/remove these packages as appropriate
          new RNFirebaseAuthPackage(),
          new RNFirebaseFirestorePackage(),
          new RNFirebaseFunctionsPackage(),
          new RNFirebaseMessagingPackage(),
          new RNFirebaseNotificationsPackage(),
          new RNFirebaseStoragePackage(),
          new RNFirebaseInstanceIdPackage()
          // new RNFirebaseAdMobPackage(), new RNFirebaseAnalyticsPackage(), new RNFirebaseAuthPackage(),
          // new RNFirebaseRemoteConfigPackage(), new RNFirebaseCrashlyticsPackage(), new RNFirebaseDatabasePackage(),
          // new RNFirebaseFirestorePackage(), new RNFirebaseFunctionsPackage(), new RNFirebaseInstanceIdPackage(),
          // new RNFirebaseLinksPackage(), new RNFirebaseMessagingPackage(),
          // new RNFirebaseNotificationsPackage(), new RNFirebasePerformancePackage(), new RNFirebaseStoragePackage());
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
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
