var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);

var fs = require('fs');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// read from file to user
//ทำให้สมบูรณ์
app.get('/inmsg', async (req, res) => {
  const obj = await readMsg();
  res.send(obj);
})

//from user, write data to file
//ทำให้สมบูรณ์
app.post('/outmsg', async (req, res) => {
  const read = await readMsg();
  const obj = await updateMsg(req.body, read)
  res.json(obj);
})

// read json data from file
//ทำให้สมบูรณ์
const readMsg = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('log.json', 'utf8', (err, data) => {
      if (err)
        reject(err);
      else
        resolve(JSON.parse(data));
    })
  })
}

// update json data
//ทำให้สมบูรณ์
const updateMsg = (new_msg, jsonFile) => {
  return new Promise((resolve) => {  
    jsonFile.dataMsg.push({
      time:new_msg.time,
      user:new_msg.user,
      message:new_msg.message,
    });
    resolve(writeMsg(JSON.stringify(jsonFile)));
  });
}

// write json data to file
//ทำให้สมบูรณ์
const writeMsg = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('log.json', data, (err) => {
        if (err) 
            reject(err);
        else
            resolve(data)
    });
})
};

var server = http.listen(3001, () => {
  console.log('server is running on port http://localhost:' + server.address().port);
});