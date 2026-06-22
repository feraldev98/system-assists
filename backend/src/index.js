import { config as envConfig } from "dotenv";
import app from "./app.js";

envConfig();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
