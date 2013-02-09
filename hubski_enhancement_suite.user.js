// ==UserScript==
// @name          Hubski Enhancement Suite Refactor
// @namespace     http://markbahnman.github.com
// @description   Several feature additions to Hubski.com
// @license       LGPL
// @author        markbahnman
// @include       http://hubski.com/*
// @include       https://hubski.com/*
// @grant         none
// @version       0.3
// ==/UserScript==
console.log("Script running");
var currentUser = $('.leftmaintitle').html();

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

// Data structures
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

var buttonMap = {
    '▼ ':'▶ ',
    '▶ ': '▼ '
};

var postShortKeys = {
//    '65': // 'a'
//        function() {},
    '82': // 'r'
        function() { $('[name="text"]').focus(); }
//    '83': // 's'
//        function() {}
};

var ShortKeys =  (function() {
    'use strict';
    var ShortcutModule = {
        init: function() { 
            console.log("Initializing ShortKeys module");
            this.keyHandler = keyUpHandler.bind(this);
            $(document).on('keyup',this.keyHandler);
        },
        teardown: function() {
            console.log("Tearing Down ShortKeys module");
            $(document).off('keyup',this.keyHandler);
        }
    };

    return ShortcutModule;
    
    function keyUpHandler(e) {

        var code = e.keyCode;
        
        // Make sure we're not handling keystrokes from inputs or textareas
        var tag = e.target.tagName.toLowerCase();
        if (tag == 'textarea' || tag == 'input') {
            return;
        }

        // Check to see if the key is a global shortcut
        if(code in generalShortKeys) {          
            generalShortKeys[code]();
        }

        // If we're on a individual post page, check keystroke
        if(isPost && code in postShortKeys) {
            postShortKeys[code]();
        }

        if(isGlobal && code >= 49 && code <= 57) {
            var globalNumber = code - 48;
            window.location = globalPostsURL + globalNumber;
        }
    }
}());

var CollapsingComments = (function() {
    'use strict';
    var CollapsingModule = {
        init: function() {
            console.log("Initializing CollapsingComments module");
            insertCollapseButton();
            
            this.commentHandler = collapseHandler.bind(this);
            $('[name="collapseComments"]').on('click',this.commentHandler);
            
        },
        teardown: function() {
        }
    };
    return CollapsingModule;
    
    function toggleComments(node) {
        console.log('In hideComment');
        //var commentDiv = $(node).parents('.outercomm:first');
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
}());

//Create and initialize our module objects
var shortcuts = Object.create(ShortKeys);
shortcuts.init();
var comments = Object.create(CollapsingComments);
comments.init();