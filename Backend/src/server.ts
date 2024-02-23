import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", (req: Request, res: Response) => {
    res.json({message: "hello from express endpoint!"});
});


// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/my-hotels", myHotelRoutes);
// app.use("/api/hotels", hotelRoutes);
// app.use("/api/my-bookings", bookingRoutes);

// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
// });

app.listen(7000, () => {
  console.log("server running on localhost:7000");
});