

/*****
 * 
 *  1. HTTP -> (req,res)
        -> internally use streams to break req/res data into chunks
 *      -> recieveing data in packets ->req -> readStream 
 *      -> sending data in packets ->  res -> writeStream
 * 
 * //z-lib -> stream
 *  2. compression 
 *      -> internally use streams to compress and decompress
 *           ->compress -> in chunks
 *           ->decompress -> in chunks
 * 3. Files 
 *      -> reading -> createReadStream
 *       -> writing -> createWriteStream 
 * 
 * 
 * ****/
const fs = require("fs");
const path = require("path");

const srcPath = path.join("../", "problems", "big.file");

const destPath = "./newbig.file";
// you have created a read stream at the srcPath location
const readStream = fs.createReadStream(srcPath);
// you have created a writeStream in which you can write the data in chunks
const writeStream = fs.createWriteStream(destPath);

// connect
readStream.pipe(writeStream);

//error event
readStream.on("error", function (data) {
    console.log("error", data)
})
// the end event
readStream.on("end", function () {
    // console.log("last chunk  of data", data)
    readStream.close()
})




