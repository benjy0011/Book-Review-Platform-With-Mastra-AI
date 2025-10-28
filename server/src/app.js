import "dotenv/config";
import express from 'express';
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
