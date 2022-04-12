# windows99
![Vercel status](https://therealsujitk-vercel-badge.vercel.app/?app=windows99)  
## About
Windows99 is an open-sourced Web OS, similar to Windows93 or Windows96. It is based on the System41 open99 project, and   
### Projects
| Project                                                                         | Short description                                  |
|---------------------------------------------------------------------------------|----------------------------------------------------|
| [windows99](https://github.com/its-pablo/windows99)                             | Frontend code for Windows 99. Main repository      |
| [windows99-signup-screen](https://github.com/its-pablo/windows99-signup-screen) | Standalone signup and config screen for Windows 99 |

### Links
* Windows 99
  * [Live (stable)](https://windows99.vercel.app)
  * [Live (development)](https://windows99dev.vercel.app)
  * [Github](https://github.com/its-pablo/windows99)
  * [Vercel overview](https://vercel.com/its-pablo/windows99)
* Windows 99 standalone signup screen
  * [Github](https://github.com/its-pablo/windows99-signup-screen)
  * [Live](https://windows99-signup-screen.vercel.app)
  * [Vercel overview](https://vercel.com/its-pablo/windows99-signup-screen)
#### Windows 99 Stable
* [Live (stable)](https://windows99.vercel.app)
* [Live (development)](https://windows99dev.vercel.app)
* [Github](https://github.com/its-pablo/windows99)
* [Vercel overview](https://vercel.com/its-pablo/windows99)  
windows99.vercel.app is the main Windows 99 site. It is completely stable, with no bugs, and is the channel you should usually use. windows99dev.vercel.app, on the other hand, is completely unstable and filled with bugs - development happens **directly on it**. Refrain from using our development server. Windows 99 is served and hosted using Vercel. Our Vercel overview is only meant for administrators to view (for now), so most of the general public cannot access this portal.
#### Windows 99 standalone signup screen
* [Github](https://github.com/its-pablo/windows99-signup-screen)
* [Live](https://windows99-signup-screen.vercel.app)  
* [Vercel overview](https://vercel.com/its-pablo/windows99-signup-screen)  
This is the open-sourced setup screen end users view when first booting Windows 99. It does not synchronize directly with Windows 99 itself - all changes made on `windows99-signup-screen` must be reviewed manually and merged via a pull request.  
---
## Contributing
Please read the contributing guidelines [here](CONTRIBUTING.md). If you make a mistake and you don't read the contributing guidelines, you are subject to a ban from this repository. Please - try to keep contributions clean. When writing a commit message, make sure to add some sort of commit message. It can be vague
## Plans for the future (Version 1 FINAL RELEASE)
* Complete login component ('local login, for the webOS') that uses firebase. If the user does not have an internet connection, they may choose to not login, which is the same thing as logging in anonymously - which technically still gives them a firebase login ID. In other words, users have to log in whether they like it or not.
* Support for adding multiple drives (up to 26)
   * As well as using the filesystem API
* A ROFS which is just the windows99 root files - we still cannot make this because it would have to be manual, because I do not know nor have the time to write a web scraping script. Feel free to contribute this, though!
* Boot scripts and styles