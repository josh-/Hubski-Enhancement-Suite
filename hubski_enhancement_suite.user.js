// ==UserScript==
// @name          Hubski Enhancement Suite
// @namespace 	  http://joshparnham.com/
// @description	  Several feature additions to Hubski.com
// @copyright     Josh Parnham 2013 (http://joshparnham.com/)
// @license       LGPL
// @author        joshparnham
// @include       http://hubski.com/*
// @include       https://hubski.com/*
// @version       0.1
// ==/UserScript==

var currentUser = document.getElementsByClassName('topmaintitle')[0].innerHTML;
var feedSelectionIndex;
var backgroundColorOffset = 0x111111;

//
// Function to get computed style of an element
// All credit to Robert Nyman
// http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
//
function getStyle(oElm, strCssRule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }
    else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}

//
// Converting RGB color to hex
// http://haacked.com/archive/2009/12/29/convert-rgb-to-hex.aspx
//
function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
};

//
// Never Ending Hubski
// 
window.addEventListener('scroll', function() {
    var element =  document.getElementById('iscroll');
    if (typeof(element) != 'undefined' && element != null) {
        if (window.innerHeight + window.scrollY == document.getElementsByClassName('pagecontent')[0].offsetHeight) {
            if (document.getElementById('loading').style.display == 'none') {
                document.getElementById('iscroll').click();
            }
        }
    }
},false);

//
// Collapsing comments
//
for (var i = 0; i < document.getElementsByClassName('comhead').length; i++) {
    document.getElementsByClassName('comhead')[i].innerHTML = '<a href=\'javascript:collapse(' + i + ')\'>▼ </a>' + document.getElementsByClassName('comhead')[i].innerHTML;
}
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.textContent = 'function collapse(e) {if (document.getElementsByClassName(\'comhead\')[e].parentNode.parentNode.nextSibling.style.display !== \'none\') {document.getElementsByClassName(\'comhead\')[e].parentNode.parentNode.nextSibling.style.display = \'none\';document.getElementsByClassName(\'comhead\')[e].parentNode.childNodes[1].style.display = \'none\';document.getElementsByClassName(\'comhead\')[e].innerHTML = document.getElementsByClassName(\'comhead\')[e].innerHTML.replace(\'▼\', \'▶\');}else {document.getElementsByClassName(\'comhead\')[e].parentNode.parentNode.nextSibling.style.display = \'block\';document.getElementsByClassName(\'comhead\')[e].parentNode.childNodes[1].style.display = \'block\';document.getElementsByClassName(\'comhead\')[e].innerHTML = document.getElementsByClassName(\'comhead\')[e].innerHTML.replace(\'▶\', \'▼\');}} ';
head.appendChild(script);

//
// Keyboard Shortcuts
//
document.onkeyup = function keyUp(e) {
    if (e.target.tagName == 'TEXTAREA' || e.target.tagName == 'INPUT') {
        return;
    }

    // General Shortcuts
    if (e.keyCode == 70) { // 'f'
        var url = 'http://hubski.com/feed?id=';
    window.location = url.concat(currentUser);
    }
    else if (e.keyCode == 78) { // 'n'
        var url = 'http://hubski.com/notifications?id=';
        window.location = url.concat(currentUser);
    }
    else if (e.keyCode == 77) { // 'm'
        var url = 'http://hubski.com/mail?id=';
        window.location = url.concat(currentUser);
    }
    else if (e.keyCode == 69) { // 'e'
        window.location = 'http://hubski.com/sendmail';
    }
    else if (e.keyCode == 71) { // 'g'
        window.location = 'http://hubski.com/global?id=1';
    }
    else if (e.keyCode == 67) { // 'c"
        window.location = 'http://hubski.com/community';
    }
    else if (e.keyCode == 66) { // 'b"
        window.location = 'http://hubski.com/badgesubs';
    }
    else if (e.keyCode == 80) { // 'p"
        window.location = 'http://hubski.com/submit';
    }
    else if (e.keyCode == 81) { // 'q"
        document.getElementsByClassName('searchbox')[0].focus();
    }
    else if (e.keyCode == 85) { // 'u"
        var url = 'http://hubski.com/pref?id=';
        window.location = url.concat(currentUser);
    }

    // Feed Shortcuts
    if (e.keyCode == 65) { // 'a'
        if (feedSelectionIndex >= 0) {
            location.href = 'javascript:void(vote(document.getElementById(\'grid\').childNodes[' + feedSelectionIndex + '].childNodes[0].childNodes[0]));';
        }
    }
    else if (e.keyCode == 83) { // 's'
        if (feedSelectionIndex >= 0) {
            window.location = document.getElementsByClassName('gridfeed')[0].childNodes[feedSelectionIndex].childNodes[1].childNodes[2].childNodes[1].childNodes[3].href;
        }
    }
    else if (e.keyCode == 72) { // 'h'
        if (feedSelectionIndex >= 0) {
            window.location = document.getElementsByClassName('gridfeed')[0].childNodes[feedSelectionIndex].childNodes[1].childNodes[2].childNodes[1].childNodes[1].href;
        }
    }
    else if (e.shiftKey && e.keyCode == 79 || e.shiftKey && e.keyCode == 13) { // 'o or enter'
        if (feedSelectionIndex >= 0) {
            window.open(document.getElementsByClassName('gridfeed')[0].childNodes[feedSelectionIndex].childNodes[1].childNodes[0].childNodes[0].href, '_blank');
    window.focus();
        }
    }
    else if (e.keyCode == 79 || e.keyCode == 13) { // 'o or enter'
        if (feedSelectionIndex >= 0) {
            window.location = document.getElementsByClassName('gridfeed')[0].childNodes[feedSelectionIndex].childNodes[1].childNodes[0].childNodes[0].href;
        }
    }

    // Post Shortcuts
    if (window.location.href.indexOf('pub') !== -1) {
        if (e.keyCode == 65) { // 'a'
            location.href = 'javascript:void(vote(document.getElementsByClassName(\'sub\')[0].childNodes[0].childNodes[0]));';
        }
        else if (e.keyCode == 83) { // 's'
            // Save post
        }
        else if (e.keyCode == 82) { // 'r'
            document.getElementsByName('text')[0].focus();
        }
    }

    // Global Shortcuts
    if (window.location.href.indexOf('global') !== -1) {
        if (e.keyCode == 49) { // '1'
            window.location = 'http://hubski.com/global?id=1';
        }
        else if (e.keyCode == 50) { // '2'
            window.location = 'http://hubski.com/global?id=2';
        }
        else if (e.keyCode == 51) { // '3'
            window.location = 'http://hubski.com/global?id=3';
        }
        else if (e.keyCode == 52) { // '4'
            window.location = 'http://hubski.com/global?id=4';
        }
        else if (e.keyCode == 53) { // '5'
            window.location = 'http://hubski.com/global?id=5';
        }
        else if (e.keyCode == 54) { // '6'
            window.location = 'http://hubski.com/global?id=6';
        }
        else if (e.keyCode == 55) { // '7'
            window.location = 'http://hubski.com/global?id=7';
        }
        else if (e.keyCode == 56) { // '8'
            window.location = 'http://hubski.com/global?id=8';
        }
        else if (e.keyCode == 57) { // '9'
            window.location = 'http://hubski.com/global?id=9';
        }
    }

    // Notification Shortcuts
    if (window.location.href.indexOf('notifications') !== -1) {
        if (e.keyCode == 68) { // 'd'
            // Find url to dismiss notifications
            var urlBeginningIndex = document.getElementsByClassName('simplemenu')[0].innerHTML.indexOf('\'');
            var urlEndingIndex = document.getElementsByClassName('simplemenu')[0].innerHTML.indexOf('\'', i+1);
            var url = document.getElementsByClassName('simplemenu')[0].innerHTML.substring(urlBeginningIndex+1, urlEndingIndex);
            window.location.href = url;
        }
    }
}

//
// Calculate appropriate background color for selecting posts
//
var bgColorAttr = getStyle(document.getElementsByTagName('body')[0],"background-color");

if(bgColorAttr=='transparent') { //edge case for the snow hubski-style
    bgColorAttr='rgb(255, 255, 255)';
}

var originalBgColor = colorToHex(bgColorAttr);
var parsedHexBgColor = originalBgColor.replace("#","");
parsedHexBgColor = parseInt(parsedHexBgColor, 16);
var selectBgColor = '#'+((parsedHexBgColor - backgroundColorOffset).toString(16));


document.onkeydown = function keyDown(e) {
    if (e.target.tagName == 'TEXTAREA' || e.target.tagName == 'INPUT') {
        return;
    }

    if (e.keyCode == 74) { // 'j'
        if (typeof feedSelectionIndex === 'undefined') {
            feedSelectionIndex=-1;
        }
        if (feedSelectionIndex >= 0) {
            document.getElementsByClassName('gridfeed')[0].childNodes[feedSelectionIndex].style.backgroundColor = '';
        }
        feedSelectionIndex++;
        document.getElementsByClassName('gridfeed')[0].childNodes[feedSelectionIndex].style.backgroundColor = selectBgColor;
    }
    else if (e.keyCode == 75) { // 'k'
        if (typeof feedSelectionIndex === 'undefined') {
            feedSelectionIndex=-1;
        }
        if (feedSelectionIndex >= 0) {
            document.getElementsByClassName('gridfeed')[0].childNodes[feedSelectionIndex].style.backgroundColor = '';
        }
        feedSelectionIndex--;
        document.getElementsByClassName('gridfeed')[0].childNodes[feedSelectionIndex].style.backgroundColor = selectBgColor;
    }
}
