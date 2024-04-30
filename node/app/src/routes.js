import { Router } from "express";
import { getLatestAnimes, getAllAnimes, getFeaturedAnime } from "./logic.js";

const logicRoutes = Router();

logicRoutes.get("/latest-animes", getLatestAnimes);

logicRoutes.get("/all-animes", getAllAnimes);

logicRoutes.get("/featured-anime", getFeaturedAnime);

export default logicRoutes;