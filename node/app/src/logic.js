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