import puppeteer from "puppeteer";

export const getLatestAnimes = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  try {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")

    await page.goto("https://jkanime.net/");

    const latestAnimes = await page.evaluate(() => {
      const animeItems = Array.from(document.querySelectorAll(".trending__anime .anime__item"));
      return animeItems.map(anime => {
        const title = anime.querySelector("h5 a").textContent;
        const id = anime.querySelector("a").href.split("/")[3];
        const poster = anime.querySelector("div.anime__item__pic").dataset.dataSetbg;
        const status = anime.querySelector("div.anime__item__text ul li").textContent.trim();
        const animeType = anime.querySelector("div.anime__item__text ul li.anime").textContent.trim().replace(/\s+/g, " ");
        return { title, id, poster, status, animeType };
      });
    });

    res.json(latestAnimes);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error al obtener los animes más recientes' });
  }
  finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const getLatestEpisodes = async (req, res) => {

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  try {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")

    await page.goto("https://jkanime.net/");

    const latestEpisodes = await page.evaluate(() => {
      const episodes = Array.from(document.querySelectorAll(".anime_programing .bloqq"));
      return episodes.map(episode => {
        const title = episode.querySelector("h5").textContent;
        const id = episode.href.split("/").slice(3).join("/").replace(/\/$/, "");
        const poster = episode.querySelector("img").src;
        const episode_id = episode.querySelector("h6").textContent.trim().replace(/\s+/g, " ");
        const episode_release = episode.querySelector("span").textContent.trim().replace(/\s+/g, " ");
        return { title, id, poster, episode_id, episode_release };
      });
    });

    res.json(latestEpisodes);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error al obtener los últimos episodios' });
  }
  finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const getAllAnimes = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  try {
    const pageNumber = req.query.page || 1;
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")

    await page.goto(`https://jkanime.net/directorio/${pageNumber}`);

    const { data: animeList, morePages } = await page.evaluate(() => {
      const animeItems = Array.from(document.querySelectorAll(".page_directorio .custom_item2"));
      const nextPage = document.querySelector("div.navigation a.nav-next");

      const data = animeItems.map(anime => ({
        title: anime.querySelector("h5 a").textContent,
        id: anime.querySelector("a").href.split("/")[3],
        poster: anime.querySelector("img").src,
        status: anime.querySelector("div.card-info p.card-status").textContent.trim(),
        animeType: anime.querySelector("div.card-info p.card-txt").textContent.trim(),
        synopsis: anime.querySelector("div.card-body p.synopsis").textContent.trim()
      }));

      return { data, morePages: nextPage ? true : false };
    });

    res.json({ animeList, morePages });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error al obtener los animes' });
  }
  finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const getFeaturedAnime = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  try {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")

    await page.goto("https://jkanime.net/");

    const featuredAnime = await page.evaluate(() => {
      const animeItems = Array.from(document.querySelectorAll(".owl-carousel .hero__items"));
      return animeItems.map(anime => {
        const title = anime.querySelector("div.hero__text h2").textContent.trim();
        const id = anime.querySelector("a").href.split("/")[3];
        const poster = anime.dataset.setbg;

        return { title, id, poster };
      });
    });

    const uniqueFeaturedAnime = [...new Map(featuredAnime.map(anime => [anime.id, anime])).values()];

    res.json(uniqueFeaturedAnime);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error al obtener el anime destacado' });
  }
  finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const getTopAnime = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  try {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")

    await page.goto("https://jkanime.net/ranking");

    const topAnime = await page.evaluate(() => {
      const animeItems = Array.from(document.querySelectorAll(".page_mirando .col-lg-2.col-md-6.col-sm-6"));
      return animeItems.map(anime => {
        const title = anime.querySelector("h5 a").textContent.trim();
        const id = anime.querySelector("a").href.split("/")[3];
        const poster = anime.querySelector("div.anime__item__pic").dataset.dataSetbg

        return { title, id, poster };
      });
    });

    const uniqueTopAnime = [...new Map(topAnime.map(anime => [anime.id, anime])).values()];

    res.json(uniqueTopAnime);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error al obtener el top de animes' });
  }
  finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const getAnimesByGenre = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  try {
    const genre = req.params.genre;
    const pageNumber = req.query.page || 1;
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")

    await page.goto(`https://jkanime.net/genero/${genre}/${pageNumber}`);

    const { data: animeList, morePages } = await page.evaluate(() => {
      const animeItems = Array.from(document.querySelectorAll(".page_directorio .col-lg-2.col-md-6.col-sm-6"));
      const nextPage = document.querySelector("div.navigation a.nav-next");

      const data = animeItems.map(anime => ({
        title: anime.querySelector("h5 a").textContent,
        id: anime.querySelector("a").href.split("/")[3],
        poster: anime.querySelector("div.anime__item__pic").getAttribute("data-setbg"),
      }));

      return { data, morePages: nextPage ? true : false };
    });

    res.json({ animeList, morePages });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error al obtener los animes' });
  }
  finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const getAnimesByLetter = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  try {
    const letter = req.params.letter;
    const pageNumber = req.query.page || 1;
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")

    await page.goto(`https://jkanime.net/letra/${letter}/${pageNumber}`);

    const { data: animeList, morePages } = await page.evaluate(() => {
      const animeItems = Array.from(document.querySelectorAll(".anime__page__content .col-lg-2.col-md-6.col-sm-6"));
      const nextPage = document.querySelector("div.navigation a.nav-next");

      const data = animeItems.map(anime => ({
        title: anime.querySelector("h5 a").textContent,
        id: anime.querySelector("a").href.split("/")[3],
        poster: anime.querySelector("div.anime__item__pic").getAttribute("data-setbg")
      }));

      return { data, morePages: nextPage ? true : false };
    });

    res.json({ animeList, morePages });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error al obtener los animes' });
  }
  finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const getAnimesBySearch = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  try {
    const search = req.params.search;
    const pageNumber = req.query.page || 1;
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")

    await page.goto(`https://jkanime.net/buscar/${search}/${pageNumber}`);

    const { data: animeList, morePages } = await page.evaluate(() => {
      const animeItems = Array.from(document.querySelectorAll(".anime__page__content .col-lg-2.col-md-6.col-sm-6"));
      const nextPage = document.querySelector("div.navigation a.nav-next");

      const data = animeItems.map(anime => ({
        title: anime.querySelector("h5 a").textContent,
        id: anime.querySelector("a").href.split("/")[3],
        poster: anime.querySelector("div.anime__item__pic").getAttribute("data-setbg")
      }));

      return { data, morePages: nextPage ? true : false };
    });

    res.json({ animeList, morePages });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error al obtener los animes' });
  }
  finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const getAnimeDetails = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  try {
    const animeId = req.params.id;
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")

    await page.goto(`https://jkanime.net/${animeId}`);

    const animeDetails = await page.evaluate(() => {
      const title = document.querySelector("div.anime__details__title h3").textContent;
      const poster = document.querySelector("div.anime__details__pic").getAttribute("data-setbg");
      const synopsis = document.querySelector("div.anime__details__text p.sinopsis").textContent.trim().replace(/\s+/g, " ");
      const internal_id = document.querySelector("div.anime__details__title div#guardar-anime").getAttribute("data-anime");

      return { title, poster, synopsis, internal_id };
    });

    const episodes = await fetchAnimeEpisodes(animeDetails.internal_id);

    res.json({ ...animeDetails, episodes });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error al obtener los detalles del anime' });
  }
  finally {
    if (browser) {
      await browser.close();
    }
  }
};

const fetchAnimeEpisodes = async (internal_id) => {
  const episodes = [];
  let episodesPage = 1;

  while (true) {
    const episodesResponse = await fetch(`https://jkanime.net/ajax/pagination_episodes/${internal_id}/${episodesPage}`);

    if (!episodesResponse.ok) {
      throw new Error("No se pudo obtener los episodios");
    }

    const episodesData = await episodesResponse.json();

    if (episodesData.length === 0) {
      break;
    }

    episodesData.forEach(episode => {
      episodes.push({
        id: episode.number,
        title: episode.title,
        preview: `https://cdn.jkdesu.com/assets/images/animes/video/image_thumb/${episode.image}`
      });
    });

    if (episodesData.length < 11) {
      break;
    }

    episodesPage++;
  }

  return episodes;
};