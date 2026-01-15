import express from "express";
import cookieParser from "cookie-parser";
import { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.routes.js"
import expenseRoute from "./routes/expense.routes.js"

dotenv.config({});


const app = express();
const PORT = 8000;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOptions));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/expense",expenseRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`App is listening at ${PORT}`);
})






// import express, { urlencoded } from "express";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./database/db.js";
// import userRoute from "./routes/user.routes.js";
// import expenseRoute from "./routes/expense.routes.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8000;

// // Middleware
// app.use(express.json({ strict: true })); // strict ensures only proper JSON

// app.use(urlencoded({ extended: true }));
// app.use(cookieParser());

// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
// };

// app.use(cors(corsOptions));

// // Routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/expense", expenseRoute);

// // Connect to MongoDB and start server
// const startServer = async () => {
//   try {
//     await connectDB(); // wait for DB connection
//     console.log("MongoDB connected successfully");
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error.message);
//     process.exit(1); // stop the server if DB connection fails
//   }
// };

// startServer();
    
