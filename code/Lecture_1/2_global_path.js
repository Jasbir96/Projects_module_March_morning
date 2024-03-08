/**********************global variables available in nodejs*********************************/

// global object -> nodejs 
// console.log(global);
// it repersent current nodejs process
// console.log(process);

// console.log("filename", __filename);
// console.log("dirname", __dirname);
// /**********************global variables available in nodejs*********************************/
// const path = require("path");
// console.log("```````````````````````````");

// const fileExt = path.extname(__filename);
// const directoryPath = path.dirname(__filename);
// const fileName = path.basename(__filename);

// console.log("fileExt:   ", fileExt);
// console.log("fileName:   ", fileName);
// console.log("directoryPath:   ", directoryPath);


/****
 * code directory -> 16 folders -> lecture-1 to 16
 * **/

const fs = require("fs");
const path = require("path");

const targetPath = path.dirname(__dirname);

for (let i = 1; i <= 16; i++) {
    const finalPathofDir = path.join(targetPath, `Lecture_${i}`);
    // creating the directory -> check if that directory is prensent /not 
    if (fs.existsSync(finalPathofDir) == false) {
        console.log(`Lecture_${i} created`);
        fs.mkdirSync(finalPathofDir)
    }
}















