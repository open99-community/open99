# windows99
![](https://therealsujitk-vercel-badge.vercel.app/?app=windows99) [![GitHub issues](https://img.shields.io/github/issues/its-pablo/windows99)](https://github.com/its-pablo/windows99/issues) [![GitHub forks](https://img.shields.io/github/forks/its-pablo/windows99)](https://github.com/its-pablo/windows99/network) [![GitHub stars](https://img.shields.io/github/stars/its-pablo/windows99)](https://github.com/its-pablo/windows99/stargazers) [![GitHub license](https://img.shields.io/github/license/its-pablo/windows99)](https://github.com/its-pablo/windows99) ![GitHub repo size](https://img.shields.io/github/repo-size/its-pablo/windows99) ![Lines of code](https://img.shields.io/tokei/lines/github/its-pablo/windows99) ![GitHub contributors](https://img.shields.io/github/contributors/its-pablo/windows99)   
## About
Windows99 is an open-sourced Web OS, similar to Windows93 or Windows96. You can view a similar version at [this site](https://itspablo.glitch.me), and view the source code right on this repo.  
### Projects
| Project                                                                         | Short description                                  |
|---------------------------------------------------------------------------------|----------------------------------------------------|
| [windows99](https://github.com/its-pablo/windows99)                             | Frontend code for Windows 99. Main repository      |
| [windows99-signup-screen](https://github.com/its-pablo/windows99-signup-screen) | Standalone signup and config screen for Windows 99 |
| [windows99-plugin](https://github.com/its-pablo/windows99-plugin)               | Plugin (JS) for Windows 99 apps                    |
| [99captcha](https://github.com/its-pablo/99captcha)                             | Funny reCAPTCHA alternative for Windows 99         |

### Links
* Windows 99
  * [Live (stable)](https://windows99.vercel.app)
  * [Live (development)](https://windows99dev.vercel.app)
  * [Github](https://github.com/its-pablo/windows99)
  * [Vercel overview](https://vercel.com/its-pablo/windows99) *requires proper permissions*
* Windows 99 standalone signup screen
  * [Github](https://github.com/its-pablo/windows99-signup-screen)
  * [Live](https://windows99-signup-screen.vercel.app)
* Windows 99 Plugin
  * [Github](https://github.com/its-pablo/windows99-plugin)
  * [Live](https://its-pablo.github.io/windows99-plugin)
* 99captcha
  * [Github](https://github.com/its-pablo/99captcha)
  * [Live](https://its-pablo.github.io/99captcha)
#### Windows 99 Stable
* [Live (stable)](https://windows99.vercel.app)
* [Live (development)](https://windows99dev.vercel.app)
* [Github](https://github.com/its-pablo/windows99)
* [Vercel overview](https://vercel.com/its-pablo/windows99) *requires proper permissions*  
windows99.vercel.app is the main Windows 99 site. It is completely stable, with no bugs, and is the channel you should usually use. windows99dev.vercel.app, on the other hand, is completely unstable and filled with bugs - development happens **directly on it**. Refrain from using our development server. Windows 99 is served and hosted using Vercel. Our Vercel overview is only meant for administrators to view (for now), so most of the general public cannot access this portal.
#### Windows 99 standalone signup screen
* [Github](https://github.com/its-pablo/windows99-signup-screen)
* [Live](https://windows99-signup-screen.vercel.app)  
This is the open-sourced setup screen end users view when first booting Windows 99. It does not synchronize directly with Windows 99 itself - all changes made on `windows99-signup-screen` must be reviewed manually and merged via a pull request.
#### Windows 99 Plugin
* [Github](https://github.com/its-pablo/windows99-plugin)
* [Live](https://its-pablo.github.io/windows99-plugin)
This plugin (script) should be used for all Windows 99 applications planning on being entered into the Package Manager (coming soon!) unless it does not fit the general theme of the application - exceptions are made ;)
#### 99captcha
* [Github](https://github.com/its-pablo/99captcha)
* [Live](https://its-pablo.github.io/99captcha)
This funny captcha parody is soon to be the main captcha used in forms (signup, bugs). Once we reach a large amount of visitors, Google Recaptcha will be used and the `99captcha` repository will be archived.
---

Feel free to contribute! Just keep in mind:
* Scripts should go in the `system/scripts` folder, styles go in `system/styles` folder, etc.
* Refrain from removing files, *even if they are not used* - just mention it in the directory README or your commit description.
* README's have a specific formatting all must follow.
  * Please look at an example (read any README but this one) when contributing.
* Never spam in the issues or pull requests sections - this will get you a ban
* In no way, shape, or form should any content in this repository not be in American English. Writing content in other languages will guarantee you a temporary ban.
* Windows 99 is a semi-casual app. NSFW content should not be included. Do not overload parts of the app with funny memes.
* _NEVER_ edit any vercel files (`vercel.json`, `.vercelignore`).
## Known bugs
> None so far
## Github & Contributing
### Forking
When forking windows99, be sure to include the same license and credit your project toward windows99.
### Contributing
Please read the contributing guidelines [here](CONTRIBUTING.md). If you make a mistake and you don't read the contributing guidelines, you are subject to a ban from this repository. Please - try to keep contributions clean. When writing a commit message, make sure to add, in detail, what you changed, added, or removed. We don't want to go through every file in every commit individually.
### Useful information
* The entirety of the `sys41` api is stored at `system/scripts/config.js`
* When modifying open99 elements, such as the filesystem and boot message log, you always use `add`, `edit`, and `delete`. The exception of this are windows.
* Modifying bootup can be done at `system/scripts/boot.js`.
## Security
Read our security policy [here](/CODE_OF_CONDUCT.md)
## Plans for the future (Version 1 FINAL RELEASE)
* Complete login component ('local login, for the webOS') that uses firebase. If the user does not have an internet connection, they may choose to not login, which is the same thing as logging in anonymously - which technically still gives them a firebase login ID. In other words, users have to log in whether they like it or not.
* Support for adding multiple drives (up to 26)
   * As well as using the filesystem API
* A ROFS which is just the windows99 root files - we still cannot make this because it would have to be manual, because I do not know nor have the time to write a web scraping script. Feel free to contribute this, though!
* Boot scripts and styles
