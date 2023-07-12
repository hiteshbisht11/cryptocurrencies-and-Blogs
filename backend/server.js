const express = require("express");
const dbConnect = require("./database/index");
const { PORT } = require("./config/index");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
 
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000","https://cryptoapp.onrender.com"], 
};
 
const app = express();

app.use(cookieParser());

 app.use(cors(corsOptions));

app.use(
  cors({ 
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));

app.use(router);

dbConnect();

app.use("/storage", express.static("storage"));

app.use(errorHandler);

app.listen(PORT, console.log(`Backend is running on port: ${PORT}`));
// app.use(express.static(path.resolve("./build/public")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve("./frontend/build/index.html"));
// });
