(function () {
    'use strict';
    angular.module('rssReader', [])
    .factory('rssReaderService', ['$q', function ($q) {
        return {
            getRssData: function (feedUrl, scope, options) {
                var deferred = $q.defer();

                if (! navigator.onLine) {
                    deferred.resolve({});
                    return deferred.promise;
                }

                (function() {
                    var errorFallback = function () {
                        deferred.resolve({});
                        scope.$apply();
                    };

                    if (typeof google !== "object") {
                        errorFallback();
                    } else {
                        google.load("feeds", "1",
                            {
                                nocss: true,
                                callback: function () {
                                    var feed = new google.feeds.Feed(feedUrl);

                                    feed.setNumEntries(10);

                                    feed.load(function (result) {
                                        var i,
                                        thisEntry,
                                        dateTime,
                                        dateObject,
                                        hours,
                                        minutes,
                                        designation,
                                        content = {};

                                        if (! result.error) {
                                            content = {
                                                "feed": this.feed
                                            };
                                            for (i = 0; i < content.feed.entries.length; i = i + 1) {
                                                thisEntry = content.feed.entries[i];
                                                dateTime = {};
                                                dateObject = new Date(thisEntry.publishedDate);
                                                dateTime.date = dateObject.toLocaleDateString();

                                                minutes = dateObject.getMinutes();
                                                if (minutes < 10) {
                                                    minutes = "0" + minutes;
                                                }
                                                hours = dateObject.getHours();
                                                designation = hours < 12 ? 'AM' : 'PM';
                                                if (hours > 12) {
                                                    hours = hours - 12;
                                                }
                                                if (hours === 0) {
                                                    hours = 12;
                                                }

                                                dateTime.time = hours + ':' +
                                                    minutes + ' ' +
                                                    designation;

                                                thisEntry.dateTime = dateTime;
                                            }

                                            deferred.resolve(content.feed);
                                        } else {
                                            errorFallback();
                                        }
                                        scope.$apply();
                                    });
                                }
                            }
                        );
                    }
                }());
                return deferred.promise;
            }
        };
    }]);
}());