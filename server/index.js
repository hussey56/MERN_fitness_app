const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const { PORT } = require("./config/config");
const errorHandler = require("./middleware/errorHandler");
const dbConnect = require('./database/db');

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
app.use(errorHandler);
app.listen(PORT, console.log(`Backend is running on the ${PORT}`));
