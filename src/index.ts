import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

/**
 * import router
 */
import calendarRouter from "./routes/calendar";

// config
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(helmet());
// app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("API prueba tecnica");
});

// routes
app.use("/api/calendar", calendarRouter);

// listen
app.listen(4000, () => {
  console.log("the application is listening on port 4000");
});
