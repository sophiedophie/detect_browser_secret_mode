function detectBrowserMode() {
    var is_private = false;

    // chrome
    var fs = window.webkitRequestFileSystem;
    if (fs) {
        fs(window.TEMPORARY, 100, function(fs) {}, function(err) {
            is_private = true;
        })
    }
    // safari
    var openDB = window.openDatabase;
    if (openDB) {
        try {
            window.openDatabase(null, null, null, null)
        } catch(e) {
            is_private = true;
        }
    }

    // firefox
    var db = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.moz_indexedDB;
    if (db) {
        var openIndexedDB = db.open("test");
        openIndexedDB.onerror = function() {
            is_private = true;
        };
    } else if (typeof indexedDB == 'undefined') {
        // IE: for IE over 10 supports indexedDB
        if(navigator.userAgent.indexOf('Mozilla/4.0') !== -1) is_private = true;
    }

    return is_private;
}

var is_private = detectBrowerMode()
console.log('is browser private mode?: ', is_private)