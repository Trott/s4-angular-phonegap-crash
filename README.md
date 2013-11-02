This very small ~~PhoneGap~~Cordova+AngularJS app exits (in a "oh, hey, I crashed, I'm outta here!" kind of way) when run on a Galaxy S4 running Android 4.2.2. It runs fine on every other device I've tested it on. The www directory stuff also works fine in browsers, including browsers on the S4/Android 4.2.2 device.

So the bug only seems to happen when this code is:

* Run as a native app (via Cordova) and not in a web browser
* On a Galaxy S4 running Android 4.2.2

## It appears that the bug is fixed in Android 4.3 on the S4.

Hooray.

## Steps to duplicate behavior

1. Clone this repo
2. Create the Android executable using Cordova. With `cordova` command line tool and Android SDK installed: 
  - `cordova platform add android`
  - `cordova build`
3. Take the resulting APK and install it on a Galaxy S4 running Android 4.2.2. If you don't own one, you can test with one for free at http://developer.samsung.com/remotetestlab.
4. Launch the app.
5. Touch the text on the app's main screen.
6. Wait a few seconds and the app will exit.

I tried it with Cordova 3.1.0. I also tried it with cordova-3.2.0-dev.jar compiled from [the cordova-android repo](https://github.com/apache/cordova-android) at commit 28c41294bba746c75beae0ab26a42c8412cc665a (most recent commit to master as of October 20, 2013, which is today). No change in behavior--the app still exits unexpectedly.

~~Cordova bug? Samsung bug? Android bug? Something stupid I'm doing?~~ It's a Samsung bug! See https://issues.apache.org/jira/browse/CB-5144?jql=project%20%3D%20CB.


