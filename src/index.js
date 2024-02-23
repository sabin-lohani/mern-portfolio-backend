import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db/index.js";

const port = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
