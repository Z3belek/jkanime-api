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

    await browser.close();

    res.json(latestAnimes);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error al obtener los animes más recientes' });
  }
};