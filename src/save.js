const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../data");

function ensureDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function saveCSV(data) {
  ensureDir();

  const header = "Ticker,Company,Sector\n";
  const rows = data
    .map((d) => `${d.Ticker},"${d.Company}",${d.Sector}`)
    .join("\n");

  fs.writeFileSync(path.join(dataDir, "sp500.csv"), header + rows);
}

function saveJSON(data) {
  ensureDir();

  fs.writeFileSync(
    path.join(dataDir, "sp500.json"),
    JSON.stringify(data, null, 2)
  );
}

module.exports = { saveCSV, saveJSON };
