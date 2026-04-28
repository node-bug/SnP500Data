const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies";

async function fetchSP500() {
  const { data } = await axios.get(URL);
  const $ = cheerio.load(data);

  const rows = $("#constituents tbody tr");
  const raw = [];

  rows.each((_, el) => {
    const cols = $(el).find("td");
    raw.push({
      ticker: $(cols[0]).text().trim(),
      company: $(cols[1]).text().trim(),
      sector: $(cols[3]).text().trim(),
    });
  });

  return raw;
}

module.exports = fetchSP500;
