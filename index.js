import express from "express";
import fs from "fs";

const app = express();

import dotenv from "dotenv";
dotenv.config();
app.use(express.json());

// making express listen to our request at port 3001

app.listen(process.env.PORT, () => {
  console.log("Listening to requests....");
});

// this is for default request
app.get("/", (req, res) => {
  console.log("request accepted");
  res.send(
    "How to use file system API<br>" +
      " to create file use = /createfile<br>" +
      "to get file list use = /getfilelist"
  );
});

// when user enters "createFIle" this function will get called and
//file with current date-time will be created with timestamp as body of file
app.post("/createfile", (req, res) => {
  const { fileName, timestamp } = getFileDate();
  fs.writeFile(`./Backup/${fileName}.txt`, JSON.stringify(timestamp), (err) => {
    if (err) throw err;
    console.log("file created" + fileName);
  });
  res.send({ filename: `${fileName}.txt` });
});

app.get("/getfilelist", (req, res) => {
  fs.readdir("./Backup/", (err, files) => {
    if (files.length == 0) {
      res.send("No files in directory..YO");
    } else {
      // let fileList = "Files in directory are<br>";
      // files.forEach((file) => {
      //   fileList += file + "<br>";
      // });
      var myJsonString = JSON.stringify(files);
      res.send(myJsonString);
    }
  });
});

// this function is written to get current timestamp and date-time
function getFileDate() {
  var timestamp = new Date().getTime();
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hrs = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let fileName =
    date + "-" + month + "-" + year + " " + hrs + "_" + minutes + "_" + seconds;

  return { fileName, timestamp };
}
