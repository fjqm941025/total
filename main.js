/* socket\app.js */
const express = require("express");
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require('body-parser');
const { json } = require("express");


let edgeNo;
let traffic_light;
let occasion;



app.use(express.static("static"));
app.use(express.json());//JSON을 사용하게 해 줌
app.use(express.urlencoded({ extended: true }));
app.use(cors());//CORS 헤더를 알아서 사용해줌

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, ".static/index.html"));
  });

app.get("/Response_E1", (req, res) => {
    res.sendFile(path.resolve(__dirname, "static/Response_E1.html"));
})

let title_num = 1;
app.post("/Response_E1",(req,res) => { //

  req.body.JSON

  const light = req.body.Select_light;
  const sec = req.body.control_light_time;
//   const occ = req.body.occasion;
  console.log(sec);
  console.log(light);
  // var num1 = 1;
  // var num2 = 2;
  
  var title = `test${title_num}.xml`
  var des = `<?xml version="1.0"?>\n<control>\n\t<edgeNo>1</edgeNo>\n\t<traffic_light>${light}</traffic_light>\n\t<how_many>${sec}</how_many>\n\t<occasion>NA</occasion>\n</control>`;
  fs.writeFile('./data/' + title, des, (err) => {
    if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
  });
  title_num ++;
//    res.send({msg :'성공!'});
  res.end();
})

io.on('connection', (socket) => {

    socket.interval = setInterval(() => {
        const jsonFile = fs.readFileSync('./realtime/realtime.json', 'utf8');
        const jsonData = JSON.parse(jsonFile);

        edgeNo = jsonData.edgeNo;
        traffic_light = jsonData.traffic_light;
        occasion = jsonData.occasion;
       
        const green_light = edgeNo + traffic_light;
      
        socket.emit('chat message', green_light);

    }, 1000); 
});

http.listen(8080, () => {
    console.log('Connected at 3000');
  });


  //occasion NA(정상), A(비정상)
  //