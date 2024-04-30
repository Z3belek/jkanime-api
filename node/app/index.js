import express from "express";
import logicRoutes from "./src/routes.js";

const app = express();

app.use("/api", logicRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});