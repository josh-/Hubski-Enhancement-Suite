# Hubski Enhancement Suite

A simple browser extension that adds features to [Hubski](http://hubski.com), inspired by [Reddit Enhancement Suite](http://redditenhancementsuite.com/).

Check back here regularity as updates are released (currently you'll have to manually update), and the #[enhancement](http://hubski.com/tag?id=enhancement) tag will be used for release notes & other relevant information - so follow that if you wish.

## Installation Instructions

* Firefox
    1. [Download the .xpi](http://joshparnham.com/downloads/Hubski-Enhancement-Suite.xpi)
    2. Open the Add-ons window
    3. Drag `Hubski-Enhancement-Suite.xpi` onto the window

* Chrome (and Opera 15+)
    1. [Download the .crx](http://joshparnham.com/downloads/Hubski-Enhancement-Suite.crx)
    2. Open the Extensions page (chrome://extensions)
    3. Drag `Hubski-Enhancement-Suite.crx` onto the window

* Safari
    1. [Download the .safariextz](http://joshparnham.com/downloads/Hubski-Enhancement-Suite.safariextz)
    2. Open the downloaded .safariextz

---

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

# Browser Extension Compilation

To compile the browser extensions yourself, run the `compile.sh` script in the projects root directory (which currently only works on OS X).

For other platforms, follow the manual instructions below:

* Firefox 
    1. [Download the repo](https://github.com/josh-/Hubski-Enhancement-Suite/archive/master.zip) and unzip it
    2. Copy the hes_icon64.png into the firefox folder
    3. Copy the jquery-1.8.3.min.js and hubski_enhancement_suite.user.js files into the firefox/data folder
    4. Install the [Add-on SDK](https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/tutorials/installation.html)
    5. Navigate to the firefox folder with the addon-sdk enabled
    6. Run `cfx xpi`
    7. Install the extension with the resulting .xpi file
* Chrome
    1. [Download the repo](https://github.com/josh-/Hubski-Enhancement-Suite/archive/master.zip) and unzip it
    2. Copy the hes_icon64.png, jquery-1.8.3.min.js, and hubski_enhancement_suite.user.js files into the chrome folder
    3. In Chrome go to `chrome://extensions/`
    4. Enable Developer Mode
    5. Click `Load unpacked extension...` and navigate to the chrome folder, then click open to install it.
