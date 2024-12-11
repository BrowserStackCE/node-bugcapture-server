#! /usr/bin/env node

const express = require('express');
const app = new express();
const fs = require('fs')
const path = require('path')
const process = require('process')

global.port = 8000
if (process.argv.length >= 3) {
 global.port = process.argv[2]
}

function modifyWebpage(req, res, next) {
  if(req.url == "/") {
    req.url = "/index.html"
  }
  let bugcapture_app_id = process.env.BUGCAPTURE_APP_ID;
  req.url = decodeURI(req.url)
        if(req.url.match('html')) {
           let data = fs.readFileSync(req.url.slice(1), 'utf8')
                   data = data.replace("</BODY>", "</body>")
                   data = data.replace('</body>',
                    '<script type="text/javascript">' +
                    ";(function(){" +
                    "const birdeatsbug=(window.birdeatsbug=window.birdeatsbug||[]);" +
                    "if(birdeatsbug.initialize)" +
                    "return;" +
                    "if(birdeatsbug.invoked){" +
                    "if(window.console&&console.error){" +
                    "console.error('birdeatsbug snippet included twice.')" +
                    "}" +
                    "return" +
                    "}" +
                    "birdeatsbug.invoked=true;" +
                    "birdeatsbug.methods=['setOptions'," +
                    "'trigger'," +
                    "'resumeSession'," +
                    "'takeScreenshot'," +
                    "'startRecording'," +
                    "'stopRecording'," +
                    "'stopSession'," +
                    "'uploadSession'," +
                    "'deleteSession'];" +
                    "birdeatsbug.factory=function(method){" +
                    "return function(){" +
                    "const args=Array.prototype.slice.call(arguments);" +
                    "args.unshift(method);" +
                    "birdeatsbug.push(args);" +
                    "return birdeatsbug}};" +
                    "for(let i=0;i<birdeatsbug.methods.length;i++){" +
                    "const key=birdeatsbug.methods[i];" +
                    "birdeatsbug[key]=birdeatsbug.factory(key)" +
                    "}" +
                    "birdeatsbug.load=function(){" +
                    "const script=document.createElement('script');" +
                    "script.type='module';" +
                    "script.async=true;script.src='https://sdk.birdeatsbug.com/v3/core.js';" +
                    "const mountJsBefore=document.getElementsByTagName('script')[0]||document.body.firstChild;" +
                    "mountJsBefore.parentNode.insertBefore(script,mountJsBefore);" +
                    "const style=document.createElement('link');" +
                    "style.rel='stylesheet';" +
                    "style.type='text/css';" +
                    "style.href='https://sdk.birdeatsbug.com/v3/style.css';" +
                    "const mountCssBefore=document.querySelector('link[rel=\"stylesheet\"]')||mountJsBefore;" +
                    "mountCssBefore.parentNode.insertBefore(style,mountCssBefore)" +
                    "};" +
                    "birdeatsbug.load();" +
                    "window.birdeatsbug.setOptions({publicAppId:'" +
                    bugcapture_app_id +
                    "'})" +
                    "})();" +
                    "</script>" +
                  "</body>"
                   )
                   res.send(data)
               } else {
                  res.sendFile(path.join(process.cwd(), req.url));
               }
}
   
app.use(modifyWebpage);
   
app.listen(global.port, () => {
  console.log('Server listening on port ' + global.port); 
});