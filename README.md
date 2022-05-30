# open99

## About
open99 is an open-sourced Web OS, similar to Windows93 or Windows96. It is based on the System41 open99 project, and   
### Projects
| Project                                                                         | Short description                                  |
|---------------------------------------------------------------------------------|----------------------------------------------------|
| [open99](https://github.com/system41/open99)                             | Frontend code for open99. Main repository      |

### Links
| Project                                                                         | Short description                                  |
|---------------------------------------------------------------------------------|----------------------------------------------------|
| [open99](https://github.com/system41/open99)                                    | Frontend code for open99. Main repository          |
| [open99-plugin](https://github.com/system41/open99-plugin)                      | Plugin (JS) for open99 apps                        |
| [99captcha](https://github.com/system41/99captcha)                              | Funny reCAPTCHA alternative for open99             |
| [open99-apps](https://github.com/system41/open99-apps)                          | Base repo for applications' source code            |

### Links
* open99
  * [Github](https://github.com/system41/open99)
  * [Live](https://open99.ga)
* open99 plugin
  * [Github](https://github.com/system41/open99-plugin)
  * [Live](https://system41.github.io/open99-plugin)
* 99captcha
  * [Github](https://github.com/system41/99captcha)
  * [Live](https://captcha.open99.ga/)
* open99-apps
  * [Github](https://github.com/system41/open99-apps)
#### open99
* [Github](https://github.com/system41/open99)  
* [Live](https://open99.ga) (coming soon)  
open99.ga is the main open99 project. It is completely stable, with no bugs, and is the channel you should usually use. open99 is served and hosted using Netlify.  
#### open99 plugin
* [Github](https://github.com/system41/open99-plugin)
* [Live](https://system41.github.io/open99-plugin)
This plugin (script) should be used for all open99 applications planning on being entered into the Package Manager/App Store (coming soon!) unless it does not fit the general theme of the application - exceptions are made.
#### 99captcha
* [Github](https://github.com/system41/99captcha)
* [Live](https://captcha.open99.ga/)
This funny captcha parody is soon to be the main captcha used in forms (signup, bugs). Once open99 reaches a large amount of visitors, Google Recaptcha will be used and the `99captcha` repository will be archived.
#### open99-apps
* [Github](https://github.com/system41/99captcha)
open99-apps is where the source code is stored for all applications in open99.
---
## Contributing
Please read the contributing guidelines [here](CONTRIBUTING.md). If you make a mistake and you don't read the contributing guidelines, you are subject to a ban from this repository. Please - try to keep contributions clean. When writing a commit message, make sure to add some sort of commit message. It can be vague
## Plans for the future (Version 1 FINAL RELEASE)
* Complete login component ('local login, for the webOS') that uses firebase. If the user does not have an internet connection, they may choose to not login, which is the same thing as logging in anonymously - which technically still gives them a firebase login ID. In other words, users have to log in whether they like it or not.
* Support for adding multiple drives (up to 26)
   * As well as using the filesystem API
* [done] A ROFS which is just the open99 root files - still a work in progress, but this is done with dir2json
* Boot scripts and styles