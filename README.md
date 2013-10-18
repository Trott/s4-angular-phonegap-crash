## Steps to duplicate crashing behavior

1. Clone this repo
2. Create the Android executable using PhoneGap. (If you have the PhoneGap command-line tool and a free AdobeId login for PhoneGap Build: `phonegap remote build android`
3. Take the resulting APK (downloaded from build.phonegap.com if you used PhoneGap Build) and install it on a Galaxy S4 running Android 4.2.2. If you don't own one, you can test with one for free at http://developer.samsung.com/remotetestlab.
4. Launch the app.
5. Touch the text on the app's main screen.
6. Wait a few seconds and the app will exit.

On everything else I've tested, it loads the news headlines, which is the expected behavior.

## Notes

* If I remove `fastclick.js` then the crashing stops, but the app still doesn't work. You touch the text and nothing happens.
* If I remove any asynchronous code in the Angular controller (in the case of this sample code, the `$timeout` stuff, but in the case of my actual app, XHR calls), then the app works.
