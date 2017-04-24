# Duo Prioritize

This is a Chrome extension for the website [duolingo.com](https://duolingo.com).
It shows skills that need strengthening in the upper right corner of the screen.
This way, you don't need to scroll through the entire tree to find the skills that you need to practice.

![screenshot with arrow](https://raw.githubusercontent.com/zfletch/duo-prioritize/master/images/screenshot_with_arrow.png)

## Installing

#### From the Chrome web store

* Install from the Chrome web store [here](https://chrome.google.com/webstore/detail/duo-prioritize/knbfmpennbhhjndehkilkpadonikbllc).

#### Manual install

* Run `build.sh`
* Go to `chrome://extensions/` in Chrome
* Make sure `Developer mode` is checked
* Click `Load unpacked extension`
* Load the directory `duo-prioritize/temp-dir`.

## Caveats

* The extension could stop working at any time if Duolingo changes their code.
* There's no localization, the text says "Skills that need strengthening" in all locales.
