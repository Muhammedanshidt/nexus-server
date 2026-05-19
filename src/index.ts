import dotenv from "dotenv";
dotenv.config();

import express  from "express";
import router  from "./routes";

const app = express();


const PORT = parseInt(process.env['PORT'] || '3000', 10);

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();

// routes
app.use("/api", router);