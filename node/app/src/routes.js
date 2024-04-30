import { Router } from "express";
import { getLatestAnimes, getAllAnimes, getFeaturedAnime, getLatestEpisodes, getAnimesByGenre } from "./logic.js";

const logicRoutes = Router();

logicRoutes.get("/latest-animes", getLatestAnimes);

logicRoutes.get("/all-animes", getAllAnimes);

logicRoutes.get("/featured-anime", getFeaturedAnime);

logicRoutes.get("/latest-episodes", getLatestEpisodes);

logicRoutes.get("/animes-g/:genre", getAnimesByGenre);

export default logicRoutes;