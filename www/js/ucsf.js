var UCSF = UCSF || (function () {
    "use strict";

    var me = {

        run: function (what, success, failure) {
            failure = failure || function (obj) {window.alert(obj.statusText||'An error occurred. Please try again.');};
            var xhr = new window.XMLHttpRequest();
            xhr.open('GET', 'http://apis.ucsf.edu/shuttle/routes');
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