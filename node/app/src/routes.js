import { Router } from "express";
import { getLatestAnimes, getAllAnimes } from "./logic.js";

const logicRoutes = Router();

logicRoutes.get("/latest-animes", getLatestAnimes);

logicRoutes.get("/all-animes", getAllAnimes);

export default logicRoutes;