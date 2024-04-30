import { Router } from "express";
import { getLatestAnimes } from "./logic.js";

const logicRoutes = Router();

logicRoutes.get("/latest-animes", getLatestAnimes);

export default logicRoutes;