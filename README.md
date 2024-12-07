### bugcapture-server

#### Description
This is a process to run a simple http service on a directory with the BrowserStack Bug Capture
SDK automatically enabled.

#### Background
Much like the `npm http-server` or the `python -m http.server` bugcapture-server starts a web
service in a directory, but adds the button to "Report a Bug" to all pages.

#### Installation
While global npm packages are generally discouraged, I suggest installing the package globally:

`sudo npm install -g git+https://github.com/kentonself-browserstack/node-bugcapture-server``

This will also create a `bugcapture-server` executable on your system path.

#### Usage
Once installed globally, you can run a server anywhere with `bugcapture-server [port]`
Prior to running, set an environment variable `BUGCAPTURE_APP_ID` from 
https://app.birdeatsbug.com/workspaces/settings/sdk

The default port is 8000

#### Removal
Use `sudo npm remove bugcapture-server` to remove the server package.