var UCSF = {};
UCSF.Shuttle = {};
UCSF.Shuttle.routes = function(success, failure) {
    failure = failure || function (obj) {window.alert(obj.statusText||'An error occurred. Please try again.');};
    var xhr = new window.XMLHttpRequest();
    xhr.open('GET', 'http://apis.ucsf.edu/shuttle/routes');
    xhr.onload = function () {
        success(JSON.parse(xhr.responseText));
    };
    xhr.onerror=failure;

    xhr.send(null);
};
