/*****
 * read a file -> needs to be added to your ram/ memory
 *  Problems-1
 *      * file sizes can be huge
 *      * ram size is usually limited
 * 
 * Realworld scienarios
 * * sending assets movies , music, files , simple updates
 * ***/
const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", function (req, res) {
// this will completeley read the file 
// and store it inside the ram and then only you can work with it 
    fs.readFile("./big.file", function (err, data) {
        if (err) {
            res.status(200).send("There was some err");
        } else {
            res.send(data);
        }
    })

})

app.listen(3000, () => {
    console.log(`Server is listening ate port 3000`);
})