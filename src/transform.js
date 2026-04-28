function normalizeTicker(ticker) {
  return ticker.replace(".", "-"); // BRK.B → BRK-B
}

function transform(data) {
  const seen = new Set();

  return data
    .map((row) => ({
      Ticker: normalizeTicker(row.ticker),
      Company: row.company,
      Sector: row.sector,
    }))
    .filter((row) => {
      if (!row.Ticker) return false;
      if (seen.has(row.Ticker)) return false;
      seen.add(row.Ticker);
      return true;
    });
}

module.exports = transform;
