// ==UserScript==
// @name          Hubski Enhancement Suite Refactor
// @namespace     http://markbahnman.github.com
// @description   Several feature additions to Hubski.com
// @license       LGPL
// @author        markbahnman
// @include       http://hubski.com/*
// @include       https://hubski.com/*
// @grant         none
// @version       0.2
// ==/UserScript==
console.log("Script running");
var currentUser = $('.topmaintitle').html();

// URLs
var feedURL = 'http://hubski.com/feed?id=';
var notificationURL = 'http://hubski.com/notifications?id=';
var mailboxURL = 'http://hubski.com/mail?id=';
var composeMailURL = 'http://hubski.com/sendmail';
var globalPostsURL = 'http://hubski.com/global?id=';
var communityURL = 'http://hubski.com/community';
var badgesURL = 'http://hubski.com/badgesubs';
var submissionURL = 'http://hubski.com/submit';
var preferencesURL = 'http://hubski.com/pref?id=';

// Conditional variables for seeing what page you're on
var isPost = false;
if(window.location.href.indexOf('pub') !== -1) {
    isPost = true;
}
var isGlobal = false;
if(window.location.href.indexOf('global') !== -1) {
    isGlobal = true;
}
var isNotifications = false;
if (window.location.href.indexOf('notifications') !== -1) { isNotifications = true;
}
console.log("isPost: " + isPost + " isGlobal: " + isGlobal + " isNotifications: " + isNotifications);

var modules = {};

modules['shortcuts'] = (function() {
    'use strict';
    var Module = {
        init: function() { 
            console.log("Initializing ShortKeys module");
            buildKeyMap();
            this.keyHandler = keyUpHandler.bind(this);
            $(document).on('keyup',this.keyHandler);
        },
        isLoaded: function() {
            return true;
        }
    };

    //Private members and functions
    var keyMap = {};

    var generalShortKeys = {
        '66': // 'b"
            function() { window.location = badgesURL; },
        '67': // 'c"
            function() { window.location = communityURL; },
        '69': // 'e'
            function() { window.location = composeMailURL; },
        '70': // 'f'
            function() { window.location = feedURL + currentUser; },
        '71': // 'g'
            function() { window.location = globalPostsURL + '1'; },
        '77': // 'm'
            function() { window.location = mailboxURL + currentUser; },
        '78': // 'n'
            function() { window.location = notificationURL + currentUser; },
        '80': // 'p"
            function() { window.location = submissionURL; },
        '81': // 'q"
            function() { $('.searchbox').focus(); },
        '85': // 'u"
            function() { window.location = preferencesURL + currentUser; }
    };

    var postShortKeys = {
    //    '65': // 'a'
    //        function() {},
        '82': // 'r'
            function() { $('[name="text"]').focus(); }
    //    '83': // 's'
    //        function() {}
    };

    var globalShortKeys = {
        '49': // 1
            function() { window.location = globalPostsURL + '1'; },
        '50': // 2
            function() { window.location = globalPostsURL + '2'; },
        '51': // 3
            function() { window.location = globalPostsURL + '3'; },
        '52': // 4
            function() { window.location = globalPostsURL + '4'; },
        '53': // 5
            function() { window.location = globalPostsURL + '5'; },
        '54': // 6
            function() { window.location = globalPostsURL + '6'; },
        '55': // 7
            function() { window.location = globalPostsURL + '7'; },
        '56': // 8
            function() { window.location = globalPostsURL + '8'; },
        '57': // 9
            function() { window.location = globalPostsURL + '9'; }
    };

    var notificationKeys = {
        '68': // 'd'
            function() { 
                var dismissURL = $('.simplemenu').find('a').attr('href');
                window.location.href = dismissURL;
            }
    };

    function keyUpHandler(e) {

        var code = e.keyCode;
        
        // Make sure we're not handling keystrokes from inputs or textareas
        var tag = e.target.tagName.toLowerCase();
        if (tag == 'textarea' || tag == 'input') {
            return;
        }

        if(code in keyMap) {
            keyMap[code]();
        }
    }
    
    function buildKeyMap() {
        $.extend(keyMap,generalShortKeys);
        if(isPost) {$.extend(keyMap,postShortKeys)};
        if(isNotifications) {$.extend(keyMap,notificationKeys)};
        if(isGlobal) {$.extend(keyMap,globalShortKeys)};
    }
    
    return Module;
}());

modules['collapsingComments'] = (function() {
    'use strict';
    var Module = {
        init: function() {
            console.log("Initializing CollapsingComments module");
            insertCollapseButton();
            this.commentHandler = collapseHandler.bind(this);
            $('[name="collapseComments"]').on('click',this.commentHandler);
        },
        isLoaded: function() {
            if(isPost) {
                return true;
            } else {
                return false;
            }
        }
    };
    
    //Private members and functions
    var buttonMap = {
        '▼ ':'▶ ',
        '▶ ': '▼ '
    };

    function toggleComments(node) {
        console.log('In hideComment');
        node.find('.comm,.replytrigger').toggle();
        node.next('.subcom').toggle();
    }

    function insertCollapseButton() {
      $('<span name="collapseComments">▼ </span>').prependTo('span.comhead');
    }

    function toggleButton(node) {
        node.text(buttonMap[node.text()]);
    }

    function collapseHandler(event) {
        console.log('In collapseHandler');
        var commentButton = $(event.target);
        var commentDiv = commentButton.parents('.outercomm:first');
        
        toggleButton(commentButton);
        toggleComments(commentDiv);
    }

    return Module;
}());


modules['infiniteScroll'] = (function (){
    var Module = {
        init: function () {
            this.infiniteScrollHandler = scrollHandler.bind(this);
            $(window).on('scroll',this.infiniteScrollHandler);
        },
        isLoaded: function () {
            if(!isNotifications&&!isPost) {
                return true;
            } else { 
                return false;
            }
        }
    };
    
    function scrollHandler(event) {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
            console.log("Checking display");
            if($('#loading').css('display')=='none') {
                console.log("clicking");
                $('#iscroll').click();
            }
        }
    }

    return Module;
}());

for(mod in modules) {
    
    console.log("mod = "+mod);
    if(modules[mod].isLoaded()) {
        modules[mod].init();
    }
}