# windows99
![](https://therealsujitk-vercel-badge.vercel.app/?app=windows99) [![GitHub issues](https://img.shields.io/github/issues/its-pablo/windows99)](https://github.com/its-pablo/windows99/issues) [![GitHub forks](https://img.shields.io/github/forks/its-pablo/windows99)](https://github.com/its-pablo/windows99/network) [![GitHub stars](https://img.shields.io/github/stars/its-pablo/windows99)](https://github.com/its-pablo/windows99/stargazers) [![GitHub license](https://img.shields.io/github/license/its-pablo/windows99)](https://github.com/its-pablo/windows99) ![GitHub repo size](https://img.shields.io/github/repo-size/its-pablo/windows99) ![Lines of code](https://img.shields.io/tokei/lines/github/its-pablo/windows99) ![GitHub contributors](https://img.shields.io/github/contributors/its-pablo/windows99)   
## About
Windows99 is an open-sourced Web OS, similar to Windows93 or Windows96. You can view a similar version at [this site](https://itspablo.glitch.me), and view the source code right on this repo. Feel free to contribute! Just keep in mind:
* Scripts should go in the `system/scripts` folder, styles go in `system/styles` folder, etc.
* Refrain from removing files, *even if they are not used* - just mention it in the directory README or your commit description.
* Refrain from editing README's when possible.
* Never spam in the issues or pull requests sections - this will get you a ban
* In no way, shape, or form should any content in this repository not be in American English. Writing content in other languages will guarantee you a temporary ban.
## Known bugs
> None so far!
## Github & Contributing
### Forking
When forking windows99, be sure to include the same license and credit your project toward windows99.
### Contributing
Please read the contributing guidelines [here](CONTRIBUTING.md). If you make a mistake and you don't read the contributing guidelines, you are subject to a ban from this repository. Please - try to keep contributions clean. When writing a commit message, make sure to add, in detail, what you changed, added, or removed. We don't want to go through every file in every commit individually.
## Security
Read our security policy [here](%)
## Plans for the future
* Complete login component ('local login, for the webOS') that uses firebase. If the user does not have an internet connection, it may choose to not login, which is the same thing as logging in anonymously, which technically still gives them a firebase login ID. In other words, users have to log in whether they like it or not.
* Support for adding multiple drives
   * As well as reading files from USB maybe? Only supported on chrome [check it out](https://developer.mozilla.org/en-US/docs/Web/API/USB)
* A ROFS which is just the windows99 root files - we still cannot make this because it would have to be manual, because I don't know nor have the time to write a web scraping script. Feel free to contribute this, though!
* Support for adding more drives (up to 26)
* Boot scripts and styles
