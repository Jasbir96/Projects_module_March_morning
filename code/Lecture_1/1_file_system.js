const fs = require("fs");
/***
 * files  -> read, write , update ,delete
 * directories -> create and delete , list out the different files and directory
 * **/
console.log("writing some content");
// fs.writeFileSync("file.txt", "added some content");
// fs.writeFileSync("file.txt", "overwrite the content in the the file ");
// // to append
// fs.appendFileSync("file.txt"," I have appended some content");
/***
 * data -> stored in binary format[raw data] -> hexadecimal format -> buffer
 * encoding -> it tells how to interpret the data
 * * pdf 
 * * xlsx
 * * mp4, mkv
 * * utf-8, ascii
 * * jpeg, png, webp
 * */
// const content = fs.readFileSync("file.txt", "utf-8");
// console.log(content);
// console.log("finished");
// console.log("creating directory");
// fs.mkdirSync("nodeDirec");

// fs.readFile();
// fs.readFileSync();
/****
 * http request -> read (2gb) -> 5sec ->  response 
 * nodejs -> fs.readFile -> asynchronous function
 * nodejs -> fs.readfileSync -> 
 * **/
// console.log("before");
// fs.readFile("file.txt", "utf-8", function (err, data) {

//     if (err) {
//         console.log("err", err);
//     } else {
//         console.log("data", data);
//     }
// });
const filePromise = fs.promises.readFile("file.txt", "utf-8");

filePromise.then((data) => { console.log(data) });




