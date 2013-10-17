var UCSF = UCSF || (function () {
    "use strict";

    var me = {
    // work queue for IE7 polyfill

        _ie7q: [],

        serialize: function (obj, prefix) {
            var str = [];
            for (var p in obj) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push(typeof v === "object" ?
                    this.serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
            return str.join("&");
        },

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

        createRequestString: function(url, options) {
            var separator = url.indexOf('?')===-1 ? '?' : '&';
            return url + separator + this.serialize(options);
        },

        // callee is optional; pass for IE7 compatibility only
        run: function (what, options, success, failure, callee) {
            failure = failure || function (obj) {window.alert(obj.statusText||'An error occurred. Please try again.');};
            var reqString = UCSF.createRequestString('http://apis.ucsf.edu/' + what, options);
            var xhr = UCSF.createCORSRequest('GET', reqString, success, failure);
            if (! xhr && callee) {
                UCSF._ie7q.push({callee:callee, options:options, success:success, failure:failure});
            } else {
                // Using onreadystatechange rather than onload for Android 4.2.2. + Galaxy S4 + PhoneGap
                if ('readyState' in xhr) {
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && window.location.protocol === 'file:')) {
                                xhr.onreadystatechange = function () {};
                                success(JSON.parse(xhr.responseText));
                            } else {
                                failure(xhr);
                            }
                        }
                    };
                } else {
                    // IE 8 & 9
                    xhr.onload = function () { success(JSON.parse(xhr.responseText)); };
                    xhr.onerror = failure;
                }
                xhr.send(null);
            }
        }
    };

    // Determine if CORS is supported. If not, load flXHR polyfill.
    // Needed for IE7 support. :-(
    if (! me.createCORSRequest('GET', 'http://www.example.com/')) {
        window.flensed={base_path:"http://apis.ucsf.edu/static/flensed/"};
        var polyfill = document.createElement('script');
        polyfill.src = 'http://apis.ucsf.edu/static/ie7_polyfill.js';
        polyfill.onreadystatechange = function () {
            if ((polyfill.readyState !== "complete") && (polyfill.readyState !== "loaded")) {
                return;
            }
            var length = me._ie7q.length;
            for (var i=0; i<length; i++) {
                me._ie7q[i].callee(me._ie7q[i].options, me._ie7q[i].success, me._ie7q[i].failure);
            }
        };
        document.getElementsByTagName('head')[0].appendChild(polyfill);
    }

    // End code specifically for IE7 support.
    return me;
}());

UCSF.Shuttle = (function() {

    return {
        stops: function (options, success, failure) {
            UCSF.run('shuttle/stops', options, success, failure, UCSF.Shuttle.stops);
        },

        routes: function (options, success, failure) {
            UCSF.run('shuttle/routes', options, success, failure, UCSF.Shuttle.routes);
        },

        plan: function (options, success, failure) {
            // See shuttle.js for some useful options and link to other possible options.
            // TODO: JSDoc options etc. Automate documentation.
            failure = failure || function (obj) {window.alert(obj.statusText||'An error occurred. Please try again.');};
            if (! options || ! options.fromPlace || ! options.toPlace) {
                failure({statusText: 'Required options fromPlace and toPlace were not specified'});
                return;
            }
            UCSF.run('shuttle/plan', options, success, failure, UCSF.Shuttle.plan);
        },

        times: function (options, success, failure) {
            UCSF.run('shuttle/times', options, success, failure, UCSF.Shuttle.times);
        },

        predictions: function (options, success, failure) {
            UCSF.run('shuttle/predictions', options, success, failure, UCSF.Shuttle.predictions);
        }
    };
}());