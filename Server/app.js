const mongoose = require("mongoose");
const express = require("express");
var http = require("http");
const User = require("./models/userSchema");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const OpenAi = require("openai");
app.use(cookieParser());
dotenv.config({ path: "./config.env" });
require("./db/connection");
app.use(express.json());
app.use(require("./router/auth"));

const url = require("url");

const io = require("socket.io")(5500, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

const dataBase = process.env.DATABASE;
const PORT = process.env.PORT;

mongoose
  .connect(dataBase, {})
  .then((res, err) => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

const openai = new OpenAi({
  apiKey: "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",
});


io.on("connection", (socket) => {
  console.log(`socket user connected`);

  socket.on("disconnect", async () => {
    console.log("userDisconnected")
      // Assuming you have a unique identifier for each user (e.g., email)
      const email = socket.email; // Assuming you stored the user's email in the socket object
      console.log(email)

      if (email) {
          try {
              // Update the user's online status to "offline"
              var newStatus="offline";
              await User.updateOne(
                  { email: email },
                  { $set: { is_online: "offline" } }
              );
              console.log(`User ${email} is now offline`);
              socket.broadcast.emit("updatePrevStatus",({email,newStatus}));
          } catch (error) {
              console.error("Error updating user status:", error);
          }
      }
      else
      {
        console.log("cant update");
      }
  });


  socket.on("updateStatus", async (email) => {
    socket.email=email;
    //socket.name=data.name;
    const user = await User.findOne({ email:email });
    if (user) {
        const newStatus = user.is_online === "online" ? "offline" : "online";
        await User.updateOne(
            { email: email },
            {
                $set: {
                    is_online: newStatus,
                },
            }
        );
        socket.broadcast.emit("updatePrevStatus",({email,newStatus}));
        console.log(`${email} user connected`);
    }
});

  // Handle events from the client
});

app.get("/makeUsersOffline", async (req, res) => {
  try{
  await User.updateMany({is_online:"online"},{$set:{is_online:"offline"}});
  res.json({message:"All Are OFFLine NOW"});
  }
  catch(err){
    console.log(err);
    res.json({message:"error"});
  }
 
});

app.get("/getResponse", async (req, res) => {
  const { name } = req.query;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Give me 5 Mcq Question of ${name} in this Format- question:options and please give me the content part in json format`,
      },
    ],
  });
  res.send(response);
});

// Online Users

app.listen(PORT, () => {
  console.log("server started");
});
