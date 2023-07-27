const qrcode = require("qrcode-terminal");
const { PrismaClient } =require('@prisma/client')
const prisma = new PrismaClient()

const sendOtp = async (req, res, client) => {
  const { chat, phone, otp } = req.body;
  client.getNumberId(phone).then((valid_number) => {
    console.log(valid_number)
    if (valid_number) {
      client
        .sendMessage(valid_number._serialized, `${chat} ${otp}`)
        .then(async(response) => {
          const savelog=await prisma.sendmesagge.create({
            data:{
             number:phone,
             message:`${chat} ${otp}`,
             type:"api"
            }
          })
          res.status(200).send({ status: "success", message: "OTP sent" });
        })
        .catch((err) => {
          res.status(500).send({ status: "failed", message: err });
        });
    } else {
      res
        .status(500)
        .send({ status: "failed", message: "Phone number not found" });
    }
  });
};

const sendqr = async (req, res, client) => {
  client.on("qr", (qr) => {
    // Send the QR code in the response
    qrcode.generate(qr, { small: true });
    
    // Send a response indicating that the QR code has been generated
    res.status(200).send({ status: "success", message: "QR code generated" });
  });

  // Initialize the client after setting up the event handler
  client.initialize();
};

const Logout = async (req, res, client) => {
    const { chat, phone, otp } = req.body;
client.logout()
res.status(200).send({ status: "success", message: "logout success" });
  };

  const pofile = async (req, res, client) => {
    if (client.info) {
      const profilepic = await client.getProfilePicUrl(client.info.wid._serialized);
      console.log(profilepic);
const profiledata={
  number: client.info.wid.user,
  name: client.info.pushname,
  profileimage: profilepic,
}
      console.log(profiledata);
  
      res.status(200).send(profiledata);
    } else {
      // If client.info is available, you can handle the else part here.
      // For example, you might want to send an error response or do some other processing.
      res.status(400).send({ message: "Client info is missing or invalid." });
    }
  };
  


module.exports = { sendOtp, sendqr,Logout ,pofile};


