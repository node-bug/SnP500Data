const fs = require("fs");
const path = require("path");

function saveCSV(data) {
  const header = "Ticker,Company,Sector\n";
  const rows = data
    .map((d) => `${d.Ticker},"${d.Company}",${d.Sector}`)
    .join("\n");

  fs.writeFileSync(
    path.join(__dirname, "../data/sp500.csv"),
    header + rows
  );
}

function saveJSON(data) {
  fs.writeFileSync(
    path.join(__dirname, "../data/sp500.json"),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { saveCSV, saveJSON };
