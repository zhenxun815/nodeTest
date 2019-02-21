const readLine = require('readline');
const path = require('path');
const fs = require('fs');


let basePath = "F:/ip_data/test";

let scoreFilePath = path.join(basePath, "score40.txt");
let resultFilePath = path.join(basePath, "result.txt");

let input = fs.createReadStream(scoreFilePath, "utf-8");
const rl = readLine.createInterface({
  input: input,
});

let regEachScore = /^([A-Z]{2}\d+\.\d+)(:\s)+(\d*\.\d+)$/g;
let regTotalScore = /^(total score is)+(:\s)+(\d*\.\d+)$/g;
let zeroCount = 0;
let totalScore = 0;
rl.on("line", line => {
  //console.log('read line: ' + line);
  if (line.match(regEachScore)) {
    //console.log('read score: '+line);
    let result = regEachScore.exec(line);
    let appId = result[1];
    let score = result[3];
    console.log(`appId: ${appId},sore: ${score}`);

    if (0 == parseInt(score)) {
      //console.log(`catch zero score: ${appId}`);
      zeroCount++;
    }
  } else if (line.match(regTotalScore)) {
    //console.log(`total score: ${line}`);
    let result = regTotalScore.exec(line);
    totalScore = parseInt(result[3]);
    console.log(`total score:${totalScore}`);
  }
});

rl.on("close", line => {
  console.log("read finish...");
  let result = `file ${scoreFilePath}, zeroCount is: ${zeroCount}, totalScore is: ${totalScore} \r\n`;
  console.log(result);
  fs.appendFile(resultFilePath, result, "utf-8", function(err) {
    if (err) {
      console.log("write result file error!");
    } else {
      console.log("write result file finish!");
    }
  });
});
