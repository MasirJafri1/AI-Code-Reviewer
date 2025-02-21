import express from "express";
import aiRoute from "./routes/ai.route.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello World");
});
app.use("/ai", aiRoute);

export default app;
