const express=require("express");
const bodyParser = require('body-parser');
const mongoose=require("mongoose")
const app=express()
const cors = require("cors");


app.use(bodyParser.json());
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/fwebsite").then(()=>{
    console.log("DB connected successfully")
})
.catch(()=>{
    console.log("DB connection failed")
})

const User=mongoose.model("User",{
    userId:String,
    userName:String,
    emailId:String,
    password:String,
    confirmPassword:String,
    phoneNumber:String,
    
},"details")

const Order=mongoose.model("Order",{
    userId:String,
    emailId:String,
    userName:String,
    size:String,
    price:Number,
    quantity:String,
    address:String,
    phoneNumber:String,
    date:String,
    bookid:String
},"order")

app.get("/User/booking/allUser",async function(req,res){
  try {
    const retdata = await Order.find({});
    res.status(200).send(retdata);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving orders" });
  }
})

app.post("/User/order", (req, res) => {
    const { size, price, quantity, address, userId, userName, emailId,password,phoneNumber,date, bookid } = req.body;

    const newOrder = new Order({
      price:price,
      password:password,
      userId:userId,
      emailId:emailId,
      address:address,
      userName:userName,
      quantity:quantity,
      size:size,
      phoneNumber:phoneNumber,
      date:date,
      bookid:bookid
      });

    newOrder.save()
        .then((data) => {
            console.log("User order created successfully",data);
            res.status(201).json({ message: "User order created successfully" });
        })
        .catch((err) => {
            console.error("Error creating user order:", err);
            res.status(500).json({ error: "Internal server error while creating order" });
        });
});

app.delete("/User/DeleteOrder/:userId/:bookingId", async (req, res) => {
  const { bookid, userId } = req.params;

  try {
    const result = await Order.deleteOne({ bookid, userId }); 
    if (result.deletedCount > 0) {
      console.log("Order Deleted");
      res.status(200).json({ message: "Order successfully deleted." });
    } else {
      res.status(404).json({ message: "Order not found." });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


app.get("/User/GetOrders/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).select('size price quantity date'); 

    if (orders.length > 0) {
      res.status(200).json(orders);
      console.log(orders);
    } else {
      res.status(404).json({ message: "No orders found for this user." });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/User/booking/allUser", async function(req, res) {
  try {
    const retdata = await Order.find({});
    res.status(200).send(retdata);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving orders" });
  }
});


app.get("/User/login",function(req,res){
    User.find().then((retdata)=>{
        console.log(retdata)
        res.send(retdata)
    })
})

app.post("/User/login", function (req, res) {
    const { emailId, password, userId } = req.body;
   
    

    User.findOne({ password:password,
      userId:userId,
      emailId:emailId,})
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found or incorrect password' });
        }
        console.log(user);
        res.status(200).json({ message: 'Login successful', user });
      })
      .catch((err) => {
        console.error("Error during login:", err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  
app.get("/User/signUp",function(req,res){
    User.find().then((data)=>{
        console.log(data)
        res.send(data)
    })
})

app.post("/User/signUp", function(req, res) {
    const { userName, emailId, password, confirmPassword, phoneNumber } = req.body;
  
     const newUser = new User({
      userName: userName,
      emailId: emailId,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phoneNumber
    });
  
    newUser.save()
      .then(() => {
        console.log("User created successfully");
        res.status(201).json( 'User created successfully');
      })
      .catch((err) => {
        console.error("Error saving user:", err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });

  const nodemailer = require('nodemailer');

   const mail = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "prasathsaran336@gmail.com", 
      pass: "smxr xdlh yodh ymjb", 
    },
  });
  
  
  app.post("/notify-admin", async (req, res) => {
    const { subject, message, emailId } = req.body; 

    try {
        
        console.log("Received request body:", req.body);

        
        if (!subject || !message) {
            return res.status(400).json({ error: "Subject and message are required" });
        }

        const dynamicMail = emailId || process.env.EMAIL_USER; 

       
        const info = await mail.sendMail({
            from: dynamicMail, 
            to: "prasathsaran336@gmail.com", 
            subject: subject,
            text: message,
            html: `<b>${message}</b>`, 
        });

        console.log("Email sent to admin.");
        console.log("Message sent: %s", info.messageId);

        res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

  

app.listen(3001,function(){
    console.log("server is running on port 3001")
})