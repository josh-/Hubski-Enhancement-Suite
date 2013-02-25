# Hubski Enhancement Suite

A simple browser extension that adds features to [Hubski](http://hubski.com), inspired by [Reddit Enhancement Suite](http://redditenhancementsuite.com/).

Note that this extension is currently only a user script - when it's been tested thoroughly and become more feature complete, it'll be compile it into browser extensions for popular browsers.

Check back here regularity as updates are released (currently you'll have to manually update), and the #[enhancement](http://hubski.com/tag?id=enhancement) tag will be used for release notes & other relevant information - so follow that if you wish.

# Implemented Features

* **Never Ending Hubski** - Automatically fetch more posts when scrolling to the bottom of your feed.
* **Comment collapsing** - Collapse comments, pretty self explanatory.
* **Keyboard Shortcuts** - Navigate around quicker with the following shortcuts:
    ### General Shortcuts (active on every page)
    * `f` - Go to your feed.
    * `n` - Go to your notifications.
    * `m` - Go to your mail.
    * `e` - Send a new mail message.
    * `g` - Go to the global feed.
    * `c` - Go to the community page.
    * `b` - Go to the badges page;
    * `p` - Submit a post.
    * `q` - Search Hubski.
    * `u` - Open your user preferences.
    * `number 1 to 9` - Display Global posts with that number of shares.
    
    ### Feed Shortcuts (active when browsing post lists)
    * `j` - Select post above.
    * `k` - Scroll post below.
    * `a` - Share/Unshare post (must have selected a post with j/k first).
    * `s` - Save post (must have selected a post with j/k first).
    * `h` - Hide post (must have selected a post with j/k first).
    * `v` - View post comments  (must have selected a post with j/k first).
    * `o` or `enter` - Open post (must have selected a post with j/k first). `Shift + o` or `Shift + enter` opens the post in a new tab.

    ### Post Shortcuts (active when viewing a single post)
    * `a` - Share/Unshare post.
    * `s` - Save post.
    * `r` - Reply to post.
    
    ### Post Shortcuts (active when viewing an individual post)
    * `r` - Reply to post.
    
    ### Notification Shortcuts (active when viewing notifications)
    * `d` - Dismiss new notifications. 

# Proposed Features

* More keyboard shortcuts.
* Live preview of markup when writing a comment or submitting a post.
* Persistent bar for quick access to tags/users.
* Inline image & video viewer.

# Coding Style

[@markbahnman](http://github.com/markbahnman) recently re-wrote the entire script (for which I am eternally grateful) using jQuery and the Javascript module pattern. He wrote a fantastic [blog post](http://markbahnman.github.com/2013/02/16/javascript-jquery-and-modules.html) describing this process, which is also a great reference for those wanting more information about the project's structure.

Otherwise, sane js coding practices apply and should be able to be determined from the existing code.

# Installation Instructions

Since the extension is currently only a user script it's kind of a pain to install, nonetheless - here are instructions for major browsers (note that I've only tested in Chrome and Opera):

* Google Chrome
    1. [Download user script](https://raw.github.com/josh-/Hubski-Enhancement-Suite/master/hubski_enhancement_suite.user.js) (right click, Save Link As...)
    2. Open the [extensions page](chrome://extensions).
    3. Drag the `hubski_enhancement_suite.user.js` script to the window & confirm the dialog box.
* Firefox
    1. Install the [Greasemonkey extension](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).
    2. [Download user script](https://raw.github.com/josh-/Hubski-Enhancement-Suite/master/hubski_enhancement_suite.user.js) (right click, Save Link As...)
    3. Add the file `hubski_enhancement_suite.user.js` to Greasemonkey
* Safari
    1. Install the [NinjaKit extension](http://ss-o.net/safari/extension/NinjaKit.safariextz)
    2. [Download user script](https://raw.github.com/josh-/Hubski-Enhancement-Suite/master/hubski_enhancement_suite.user.js) (right click, Save Link As...)
    3. Add the file `hubski_enhancement_suite.user.js` to NinjaKit
* Opera
    1. Enable User Javascript:
        * On Mac OS X, go to: Opera menu > Preferences > Advanced > Content > JavaScript options
        * On UNIX and Windows, go to: O menu > Settings > Preferences > Advanced > Content > JavaScript options
    2. Select the directory where the `hubski_enhancement_suite.user.js` is stored.
