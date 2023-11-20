const playwright = require('playwright');
const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');

const { viewportHeight, viewportWidth, browsers, options, files} = config;

async function executeTest(){
    if(browsers.length === 0){
      return;
    }
    let resultInfo = {}
    // let datetime = new Date().toISOString().replace(/:/g,".");
    for (f of files){
        //replace first two letters of f with v3
        const f_v3 = 'v3'+f.substring(2);
        const f_v5 = 'v5'+f.substring(2);
        const data = await compareImages(
            fs.readFileSync(`v3/${f_v3}`),
            fs.readFileSync(`v5/${f_v5}`),
            options
        );
        resultInfo[f] = {
            isSameDimensions: data.isSameDimensions,
            dimensionDifference: data.dimensionDifference,
            rawMisMatchPercentage: data.rawMisMatchPercentage,
            misMatchPercentage: data.misMatchPercentage,
            diffBounds: data.diffBounds,
            analysisTime: data.analysisTime
        }
        fs.writeFileSync(`results/compare-${f}`, data.getBuffer());
    }
    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    fs.writeFileSync(`results/resultInfo.json`, JSON.stringify(resultInfo));
    fs.writeFileSync(`results/report.html`, createReport(resultInfo));
    fs.copyFileSync('index.css', `results/index.css`);
    return resultInfo;  
  }
(async ()=>console.log(await executeTest()))();

function browser(f, info){
    const f_v3 = 'v3'+f.substring(2);
    const f_v5 = 'v5'+f.substring(2);

    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Browser: ${f}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="../v3/${f_v3}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="../v5/${f_v5}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="compare-${f}" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(resInfo){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${config.url}"> ${config.url}</a>
            </h1>
            <p>Executed: </p>
            <div id="visualizer">
                ${config.files.map(f=>browser(f, resInfo[f]))}
            </div>
        </body>
    </html>`
}