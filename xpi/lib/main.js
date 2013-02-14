// Import the APIs we need
var self = require("sdk/self");
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
    include: "*.hubski.com",
    contentScriptFile:[
                       self.data.url("hubski_enhancement_suite.user.js")
    ]
});