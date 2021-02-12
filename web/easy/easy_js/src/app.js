const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path')  
const staticFiles = require('koa-static');


app.use(staticFiles( path.join( __dirname,'/public')));

app.use(async ctx => {
  const flag = process.env.FLAG
  const scriptUrl = '/static/js/jquery-1.7.1-46ed976b-536b-4519-a6b2-ea31ab'
  let scriptSting = ''
  for (let char of flag) {
    const fileNmae = scriptUrl + char + '33a98e.js'
    fs.writeFile(path.join(__dirname,'/public',fileNmae),'Flag is not here!!!','utf8',function(error){
      if(error){
          console.log(error);
          return false;
      }
    })

    scriptSting += '<script src="' + fileNmae + '"></script>\n'
  }
  ctx.response.type = 'html'
  ctx.response.body = 
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n'+
    '<head>\n' +
    '<meta charset="UTF-8" />\n' +
    '<meta http-equiv="X-UA-Compatible" content="IE=edge" />\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
    scriptSting +
    '<title>welcome CTF</title>\n' +
    '</head>\n' +
    '<body>\n'+
    '<h1>Welcome CTF World</h1>\n' +
    '</body>'+
    '</html>'
});

app.listen(8000);