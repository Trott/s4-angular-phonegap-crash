## Steps to duplicate crashing behavior

1. Clone this repo
2. Create the Android executable using PhoneGap. If you have the PhoneGap command-line tool and a free AdobeId login for PhoneGap Build: `phonegap remote build android`
3. Take the resulting APK (downloaded from build.phonegap.com if you used PhoneGap Build) and install it on a Galaxy S4 running Android 4.2.2. If you don't own one, you can test with one for free at http://developer.samsung.com/remotetestlab.
4. Launch the app.
5. Touch the text on the app's main screen.
6. Wait a few seconds and the app will exit.

On everything else I've tested, it loads the color list content, which is the expected behavior.

I don't even know where to file the bug report on this one: Android, PhoneGap, Cordova, Samsung, my own app, maybe even Angular? (That last one seems like a stretch as there's nothing Angular should be able to do to cause this behavior. But on the other hand, that may be the most likely community to figure a workaround.)
