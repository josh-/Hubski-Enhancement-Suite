#!/bin/bash

# Chrome (the generated .crx is also compatible with Opera 15+)
echo "Ouput from Chrome extension compilation:"
cp hubski_enhancement_suite.user.js chrome/
cp jquery-1.8.3.min.js chrome/
cp icon_16.png chrome/
cp icon_48.png chrome/
cp icon_128.png chrome/
rm chrome/Hubski-Enhancement-Suite.crx
rm chrome/Hubski-Enhancement-Suite.pem
echo "Assuming the Chrome binary exists at '/Applications/Google\ Chrome', attempting automated extension packaging..."
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --pack-extension=chrome/
mv chrome.crx chrome/Hubski-Enhancement-Suite.crx
mv chrome.pem chrome/Hubski-Enhancement-Suite.pem
echo -e "---\n"

# Sarari
echo "Ouput from Safari extension compilation:"
cp hubski_enhancement_suite.user.js hes.safariextension
cp jquery-1.8.3.min.js hes.safariextension
cp icon_128.png hes.safariextension/Icon.png
echo "Package ready, now open the Safari Extension builder (Develop > Show Extension Builder) and manually package the extension"
echo -e "---\n"

# Firefox
echo "Ouput from Firefox extension compilation:"
cp hubski_enhancement_suite.user.js firefox/lib/
cp jquery-1.8.3.min.js firefox/lib/
cp icon_48.png firefox/icon.png
cd firefox
zip -vr hes.xpi . -x "*.DS_Store"
mv hes.xpi ..
echo -e "---"
