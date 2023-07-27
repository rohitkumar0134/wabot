const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode1 = require("qrcode-terminal");
const express = require('express');
const bodyParser = require("body-parser");
const { PrismaClient } =require('@prisma/client')
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');

const {sendOtp,Logout,pofile}=require('./controller/whatsapp')
const {loginUser,check_authentication } = require('./controller/register')

const app = express();
const {saveautoreply,getautoreply,getsendmsg}=require('./controller/autoreply')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Socket.io setup with CORS settings

const io = socketIO(server, {
  cors: {
    origin: '*',
    // Add other CORS options if needed
  }
});

  

  const prisma = new PrismaClient()

  const { createCanvas } = require('canvas');
const qrcode = require('qrcode');
const canvas = createCanvas(200, 200); // Set the canvas size according to your requirement
const ctx = canvas.getContext('2d');



const client = new Client({
  authStrategy: new LocalAuth(),
  restartOnAuthFail: true, // related problem solution
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  } 
});

//api
app.post('/api/login',loginUser);
app.post('/api/check-token',check_authentication );

app.post("/api/send-otp", (req, res) => {
    sendOtp(req, res, client);
  });

  
  app.get("/api/pofile", (req, res) => {
    pofile(req, res, client);
  });

  app.post("/api/logout", (req, res) => {
    Logout(req, res, client);
  });

  app.post("/api/autoreply", (req, res) => {
    saveautoreply(req, res);
  });

  app.get("/api/autoreply", (req, res) => {
    getautoreply(req, res);
  });
  app.get("/api/sentmsg", (req, res) => {
    getsendmsg(req, res);
  });

  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'public', 'index.html'));
  // });

//api

client.on('message', async (msg) => {

  if(msg.body &&  msg.from.endsWith('@c.us')){
  try {
    const autoreplies = await prisma.autoreply.findMany();
    console.log(msg);

    const name = msg._data.notifyName;// Assign the value of msg.notifyName to the variable 'name'
    console.log(msg._data.notifyName)

    for (const autoreply of autoreplies) {
      // Check if the received message matches the 'body' field in the autoreply record
      if (msg.body.toLowerCase() === autoreply.receive.toLowerCase()) {
        const replyWithPlaceholder = autoreply.reply; // Retrieve the reply from the database

        // Replace the '{name}' placeholder with the actual name
        const reply = replyWithPlaceholder.replace('{name}', name);

        // Send the modified autoreply back to the sender
        msg.reply(reply);
        const savelog=await prisma.sendmesagge.create({
          data:{
           number:msg.from,
           message:reply,
           type:"autoreply"
          }
        })
        return; // Exit the loop after sending the reply
      }
    }

    // If no matching autoreply is found, you can handle it here
    msg.reply(process.env.Defaultmsg);
    const savelog=await prisma.sendmesagge.create({
      data:{
       number:msg.from,
       message:process.env.Defaultmsg,
       type:"autoreply"
      }
    })
    console.log("No matching autoreply found for the message:", msg.body);
  } catch (error) {
    console.error("Error fetching autoreplies:", error);
  }}
});

client.on('authenticated', (session) => {

  console.log('AUTHENTICATED');
});

client.on('ready', async () => {
  console.log('READY');

});

client.on('auth_failure', msg => {
  // Fired if session restore was unsuccessful
  console.error('AUTHENTICATION FAILURE', msg);

});


client.on('disconnected', async(reason) => {
  // Destroy and reinitialize the client when disconnected
 console.log("reson for disconnection",reason)
  await client.destroy();
  await client.initialize()
  console.log("initialized again")
});



// Initialize the client after setting up the event handler


client.on("qr",async (qr) => {
  // Send the QR code in the response
  qrcode1.generate(qr, { small: true });
  //Generate the QR code and render it on the canvas

// Now you can send the dataURL to the client or save it as an image
console.log(qr);

});


io.on('connection', (socket) => {
    console.log('a user connected');
    
    client.on("qr",async (qr) => {
      // Send the QR code in the response
      qrcode1.generate(qr, { small: true });
      //Generate the QR code and render it on the canvas
    await qrcode.toCanvas(canvas, qr, { errorCorrectionLevel: 'H', scale: 10 });
    
    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL('image/png');
    
    // Now you can send the dataURL to the client or save it as an image
    
    const sockets = await io.fetchSockets();

    socket.emit("qr", dataURL);
    });

    client.on('ready', async () => {
      console.log('READY');
      socket.emit("clientready", 'update');
    });
   
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });


  });


  client.initialize();


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});