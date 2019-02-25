var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

let root = path.resolve(process.argv[2] || '.');
console.log(`root is : ${root}`);

http.createServer(function (request, response) {
    let pathName = url.parse(request.url).pathname;
    let dirPath = path.join(root, pathName);

    console.log(`pathName is: ${pathName}, dirPath is: ${dirPath}`);

    fs.exists(dirPath, (exists)=>{
        if(exists){
            fs.stat(dirPath, (error,stats)=>{
                if(error){
                    console.log(`error ${error}`);
                }else{
                    if(stats.isDirectory()){
                        writeHtml(dirPath, response);
                    }else{
                        response.end(`<h1>${pathName} is not a directory!</h1>`); 
                    }
                }
            });
        }
    });
   
}).listen(8080);

function writeHtml(dirPath, response) {
    fs.readdir(dirPath, 'utf-8', (err, files) => {
        response.writeHead(500, { 'Content-Type': 'text/html' });
        if (err) {
    
            response.end('<h1>server error!</h1>');
        }
        else {
            let fileCount = 0;
            files.forEach((file, index) => {
                console.log(`file ${index} is: ${file}...`);
                response.write(`<h1>${file}</h1>`);
                fileCount++;
            });
            response.end(`<h1>file count is: ${fileCount}</h1>`);
        }
    });
}
