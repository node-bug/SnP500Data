const axios = require("axios");

const URL =
  "https://en.wikipedia.org/w/api.php?action=parse&page=List_of_S%26P_500_companies&format=json&origin=*";

async function fetchSP500() {
  const res = await axios.get(URL, {
    headers: {
      "User-Agent": "sp500-bot/1.0 (https://github.com/your-repo)",
    },
  });

  const html = res.data.parse.text["*"];

  const cheerio = require("cheerio");
  const $ = cheerio.load(html);

  const rows = $("#constituents tbody tr");

  const data = [];

  rows.each((_, el) => {
    const cols = $(el).find("td");

    data.push({
      ticker: $(cols[0]).text().trim(),
      company: $(cols[1]).text().trim(),
      sector: $(cols[3]).text().trim(),
    });
  });

  return data;
}

module.exports = fetchSP500;
