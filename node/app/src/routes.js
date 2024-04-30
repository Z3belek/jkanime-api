import { Router } from "express";
import { getLatestAnimes, getLatestEpisodes, getAllAnimes, getFeaturedAnime, getTopAnime, getAnimesByGenre, getAnimesByLetter, getAnimesBySearch, getAnimeDetails } from "./logic.js";

const logicRoutes = Router();

logicRoutes.get("/latest-animes", getLatestAnimes);

logicRoutes.get("/latest-episodes", getLatestEpisodes);

logicRoutes.get("/all-animes", getAllAnimes);

logicRoutes.get("/featured-anime", getFeaturedAnime);

logicRoutes.get("/top-anime", getTopAnime);

logicRoutes.get("/animes-g/:genre", getAnimesByGenre);

logicRoutes.get("/animes-l/:letter", getAnimesByLetter);

logicRoutes.get("/animes-s/:search", getAnimesBySearch);

logicRoutes.get("/anime/:id", getAnimeDetails);

export default logicRoutes;