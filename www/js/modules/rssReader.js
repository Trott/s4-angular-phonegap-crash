!function(){"use strict";angular.module("rssReader",[]).factory("rssReaderService",["$q",function(a){return{getRssData:function(b,c,d){var e=a.defer(),f=d.localStorageKey,g=function(a){var b;if(Modernizr.localstorage){b=window.localStorage.getItem(a);if(null!==b)return JSON.parse(b)}return{}};if(!navigator.onLine){f?e.resolve(g(f).feed):e.resolve({});return e.promise}Modernizr.load([{load:"http://www.google.com/jsapi",callback:function(){var a=function(){f?e.resolve(g(f).feed):e.resolve({});c.$apply()};"object"!=typeof google?a():google.load("feeds","1",{nocss:!0,callback:function(){var d=new google.feeds.Feed(b);d.setNumEntries(10);d.load(function(b){var d,g,h,i,j,k,l,m={};if(b.error)a();else{m={feed:this.feed};for(d=0;d<m.feed.entries.length;d+=1){g=m.feed.entries[d];h={};i=new Date(g.publishedDate);h.date=i.toLocaleDateString();k=i.getMinutes();10>k&&(k="0"+k);j=i.getHours();l=12>j?"AM":"PM";j>12&&(j-=12);0===j&&(j=12);h.time=j+":"+k+" "+l;g.dateTime=h}e.resolve(m.feed);Modernizr.localstorage&&window.localStorage.setItem(f,JSON.stringify(m))}c.$apply()})}})}}]);return e.promise}}}])}();