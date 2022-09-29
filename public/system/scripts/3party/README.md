# Third party scripts

Keep in mind that 3rd party scripts should *never* be modified, **unless** there is a security update. They should also be minified (but not obfuscated) for the most part.  

This directory (`/system/scripts/3party`) includes
* Howler.js - used for reproducing audio
* localforage.js - used for saving files to the computer in various formats
* jquery.js includes jquery **and** jquery-ui *in one file*. Jquery is used for window-dragging, resizing, and is in general a perfect library for open99.
* screenshot.js is a wrapper of html2canvas. It is not implemented yet.
