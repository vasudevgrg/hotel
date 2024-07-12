const express= require("express");
const cookieParser= require("cookie-parser");
const cors= require("cors");
const {createServer}= require("http");
const app= express();
const hotelRoutes= require("./routes/hotel");
const userRoutes= require("./routes/user");
const travellerRoutes= require("./routes/traveller")
const roomRoutes= require("./routes/room");
const scheduler= require("./services/scheduler");
const {Server}= require("socket.io");
const db= require("./models/index");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use("/hotel", hotelRoutes);
app.use("/traveller", travellerRoutes);
app.use("/user", userRoutes);
app.use("/room", roomRoutes);

const httpServer= createServer(app);
const io= new Server(httpServer,{
    cors:{
        origin:'http://localhost:3000'
    }
});


io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    socket.on('send_message', async ({ content, sender_id, receiver_id }) => {
        console.log(content+" "+sender_id+" "+ receiver_id);
      const message = await db.Message.create({ content, sender_id, receiver_id });
      io.to(receiverId).emit('receive_message', message);
    });
  
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

httpServer.listen(5002, ()=>console.log("listening to 5002"))
