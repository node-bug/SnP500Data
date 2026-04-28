const fetchSP500 = require("./fetch");
const transform = require("./transform");
const { saveCSV, saveJSON } = require("./save");

async function run() {
  try {
    console.log("Fetching...");
    const raw = await fetchSP500();

    console.log("Transforming...");
    const clean = transform(raw);

    console.log("Saving...");
    saveCSV(clean);
    saveJSON(clean);

    console.log(`Done. ${clean.length} companies saved.`);
  } catch (err) {
    console.error("Pipeline failed:", err);
    process.exit(1);
  }
}

run();
