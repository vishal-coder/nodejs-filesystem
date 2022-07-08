import express from "express";
import fs from "fs";

const app = express();

app.listen(3001, () => {
  console.log("Listening requests...");
});

app.get("/", (req, res) => {
  console.log("request accepted");
  res.send(
    "How to use file system API<br>" +
      " to create file use = /createfile<br>" +
      "to get file list use = /getfilelist"
  );
});

app.get("/createfile", (req, res) => {
  const file = createFile();
  res.send(`file Created with name ${file}`);
});

function createFile() {
  const { fileName, timestamp } = getFileDate();
  fs.writeFile(`./Backup/${fileName}.txt`, JSON.stringify(timestamp), (err) => {
    if (err) throw err;
    console.log("file created" + fileName);
  });
  return fileName;
}

app.get("/getfilelist", (req, res) => {
  fs.readdir("./Backup/", (err, files) => {
    let fileList = "Files in directory are<br>";
    files.forEach((file) => {
      fileList += file + "<br>";
    });
    res.send(fileList);
  });
});

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
