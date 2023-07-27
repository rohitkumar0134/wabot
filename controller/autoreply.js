const { PrismaClient } =require('@prisma/client')
const prisma = new PrismaClient()


const saveautoreply = async (req, res, client) => {
    const { receive, reply} = req.body;
    console.log(req.body)
    const autoreplies = await prisma.autoreply.create({
        data:{
            receive:receive,
            reply:reply
        }
    });
    console.log(autoreplies)
    res.status(200).send({ status: "success", message: "save success" });
  };

  const getautoreply = async (req, res, client) => {
    const { receive, reply} = req.body;
    console.log(req.body)
    const autoreplies = await prisma.autoreply.findMany();
    console.log(autoreplies)
    res.status(200).send(autoreplies);
  };

  const getsendmsg= async (req, res, client) => {
    const { receive, reply} = req.body;
    console.log(req.body)
    const sendmesagge = await prisma.sendmesagge.findMany();
    console.log(sendmesagge)
    res.status(200).send(sendmesagge);
  };


  module.exports = { saveautoreply,getautoreply,getsendmsg};