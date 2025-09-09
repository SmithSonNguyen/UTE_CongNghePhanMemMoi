import dotenv from "dotenv";
dotenv.config();

import express from "express";
import configViewEngine from "./config/viewEngine.js";
import apiRoutes from "./routes/api.js";
import { connection } from "./config/database.js";
import { getHomepage } from "./controllers/homeController.js";
import cors from "cors";

const app = express(); // cấu hình app là express
const port = process.env.PORT || 3000;

// cấu hình middleware
app.use(cors()); // config cors
app.use(express.json()); // config req.body cho json
app.use(express.urlencoded({ extended: true })); // for form data

// config template engine
configViewEngine(app);

// config route cho view ejs
const webAPI = express.Router();
webAPI.get("/", getHomepage);
app.use("/", webAPI);

// khai báo route cho API
app.use("/v1/api", apiRoutes);

// kết nối DB và khởi động server
(async () => {
  try {
    await connection(); // Kết nối database using mongoose
    app.listen(port, () => {
      console.log(`✅ Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Error connect to DB:", error);
  }
})();
