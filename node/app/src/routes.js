import { Router } from "express";
import { getLatestAnimes, getAllAnimes, getFeaturedAnime, getLatestEpisodes } from "./logic.js";

const logicRoutes = Router();

logicRoutes.get("/latest-animes", getLatestAnimes);

logicRoutes.get("/all-animes", getAllAnimes);

logicRoutes.get("/featured-anime", getFeaturedAnime);

logicRoutes.get("/latest-episodes", getLatestEpisodes);

export default logicRoutes;