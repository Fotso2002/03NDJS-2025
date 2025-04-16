import * as cheerio from "cheerio";
import fs from "fs";

async function collectTournoisATP2025() {
  try {
    const $ = await cheerio.fromURL(
      "https://fr.wikipedia.org/wiki/Saison_2025_de_l%27ATP"
    );

    const listeTournois = [];

    $("table.wikitable")
      .eq(2)
      .find("tbody")
      .find("tr")
      .each((i, row) => {
        const cells = $(row).find("td");

        if (!cells) return;

        listeTournois.push({
          number: $(cells[0]).text().trim(),
          date: $(cells[1]).text().trim(),
          ["name & place "]: $(cells[2]).text().trim(),
          categorie: $(cells[3]).text().trim(),
          dotation: $(cells[4]).text().trim(),
          surface: $(cells[5]).text().trim(),
          winner: $(cells[6]).text().trim(),
          finalist: $(cells[7]).text().trim(),
          score: $(cells[8]).text().trim(),
        });
      });

    fs.writeFileSync(
      "./resultat.json",
      JSON.stringify(listeTournois, null, 2),
      "utf-8"
    );
    console.log("file created");
  } catch (erreur) {
    console.error("Une erreur est survenue :", erreur);
    return [];
  }
}
collectTournoisATP2025();