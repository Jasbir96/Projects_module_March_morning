/*****
 * 1. read a file -> needs to be added to your ram/ memory
 *  Problems-1
 *      * file sizes can be huge
 *      * ram size is usually limited
 * 
 * Realworld scienarios
 * * sending assets movies , music, files , simple updates
 * 
 * Solution : 
 * using streams
 *  * you might need to create -> fs.read, fs.write
 *  * inbuilt streams -> req,res, compress , decompress function
 * ***/
const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", function (req, res) {
    // this will completeley read the file 
    // and store it inside the ram and then only you can work with it 
    const readStream = fs.createReadStream("./newbig.file");
    readStream.pipe(res);
    //error event
    readStream.on("error", function (data) {
        console.log("error", data)
    })
    // the end event
    readStream.on("end", function () {
        // console.log("last chunk  of data", data)
        readStream.close()
    })

})

app.listen(3000, () => {
    console.log(`Server is listening at port 3000`);
})