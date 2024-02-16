import express from "express";
import morgan from "morgan";
import path from "path";
import indexRoutes from "./routes/index.route";
import connectDB from "./config/db.conn";
import credentials from "./middlewares/credentials";
import corsOptions from "./config/corsOptions";
import cors from "cors";

// Initializations
const app: express.Application = express();

// Handle options credentials check - before CORS!
app.use(credentials);
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Settings
app.set("port", process.env.PORT || 3500);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", indexRoutes);

app.all("*", (req: express.Request, res: express.Response) => {
  res.status(404);
  if (req.accepts("html")) {
    const filePath = path.join(__dirname, "..", "views", "404.html");
    res.sendFile(filePath);
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

(async () => {
  try {
    await connectDB();
    app.listen(app.get("port"), () => {
      console.log(`Server on port ${app.get("port")}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
