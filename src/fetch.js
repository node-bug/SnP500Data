const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies";

async function fetchSP500() {
  const { data } = await axios.get(URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  const $ = cheerio.load(data);
  const rows = $("#constituents tbody tr");

  const result = [];

  rows.each((_, el) => {
    const cols = $(el).find("td");

    result.push({
      ticker: $(cols[0]).text().trim(),
      company: $(cols[1]).text().trim(),
      sector: $(cols[3]).text().trim(),
    });
  });

  return result;
}

module.exports = fetchSP500;
