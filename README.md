This very small ~~PhoneGap~~Cordova+AngularJS app exits (in a "oh, hey, I crashed, I'm outta here!" kind of way) when run on a Galaxy S4 running Android 4.2.2. It runs fine on every other device I've tested it on. The www directory stuff also works fine in browsers, including browsers on the S4/Android 4.2.2 device.

So the bug only seems to happen when this code is:

* Run as a Cordova app
* On a Galaxy S4 running Android 4.2.2

## Steps to duplicate behavior

1. Clone this repo
2. Create the Android executable using Cordova. With `cordova` command line tool: 
  - `cordova platform add android`
  - `cordova build`
3. Take the resulting APK and install it on a Galaxy S4 running Android 4.2.2. If you don't own one, you can test with one for free at http://developer.samsung.com/remotetestlab.
4. Launch the app.
5. Touch the text on the app's main screen.
6. Wait a few seconds and the app will exit.

On everything else I've tested, it loads the color list content, which is the expected behavior.

Cordova bug? Samsung bug? Android bug? Something stupid I'm doing?
