const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const { PORT } = require("./config/config");
const errorHandler = require("./middleware/errorHandler");
const dbConnect = require('./database/db');
const cron = require('node-cron');
const User = require("./model/user");
const updateNotifications = require("./middleware/notify");

const app = express();

app.use(
  cors({
origin:function(origin,callback){
return callback(null,true);
},
optionsSuccessStatus:200,
credentials:true
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(router);

dbConnect();
cron.schedule('* * * * *', async () => {
  const currentDateTime = new Date();
  const users = await User.find(); 

  for (const user of users) {
    await updateNotifications(user, currentDateTime);
    await user.save();
  }
  console.log("Notifier Running"); 
   
});
app.use(errorHandler);
app.listen(PORT, console.log(`Backend is running on the ${PORT}`));
