var UCSF = UCSF || (function () {
    "use strict";

    var me = {

        createCORSRequest: function (method, url, success, failure) {
            var xhr = new window.XMLHttpRequest();
            if ("withCredentials" in xhr) {
                // XHR for Chrome/Firefox/Opera/Safari.
                xhr.open(method, url);
            } else if (typeof XDomainRequest !== "undefined") {
                // XDomainRequest for IE8+.
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else if ((typeof flensed !== "undefined") && "flXHR" in flensed) {
                // flensed.flXHR polyfill for IE7
                xhr = new flensed.flXHR({
                    xmlResponseText:false,
                    onreadystatechange:
                        function (XHRobj) {
                            if (XHRobj.readyState === 4) {
                                if (XHRobj.status === 200 && success) {
                                    success(JSON.parse(XHRobj.responseText));
                                } else {
                                    failure(XHRobj);
                                }
                            }
                        },
                    ontimeout: failure,
                    onerror: failure
                });
                xhr.open(method, url, true);
            } else {
                xhr = null;
            }
            return xhr;
        },

        run: function (what, success, failure) {
            failure = failure || function (obj) {window.alert(obj.statusText||'An error occurred. Please try again.');};
            var reqString = 'http://apis.ucsf.edu/' + what;
            var xhr = UCSF.createCORSRequest('GET', reqString, success, failure);

            xhr.onload = function () {
                success(JSON.parse(xhr.responseText));
            };
            xhr.onerror=failure;

            xhr.send(null);

        }
    };

    return me;
}());

UCSF.Shuttle = (function() {

    return {
        routes: function (success, failure) {
            UCSF.run('shuttle/routes', success, failure, UCSF.Shuttle.routes);
        }
    };
}());