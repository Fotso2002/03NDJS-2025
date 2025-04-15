import * as cheerio from 'cheerio';

async function extractATPTournaments2025() {
    try {
        // 1. Ajouter "type": "module" dans package.json pour éliminer l'avertissement
        const $ = await cheerio.fromURL('https://fr.wikipedia.org/wiki/Saison_2025_de_l%27ATP');

        // 2. Trouver le bon tableau
        const tables = $('table.wikitable');
        if (tables.length < 2) {
            throw new Error('Tableau non trouvé');
        }
        const resultsTable = $(tables[1]);

        // 3. Extraire les données correctement
        const tournaments = [];
        
        resultsTable.find('tbody tr').slice(1).each((i, row) => {
            const cols = $(row).find('td');
            
            // Vérifier qu'on a assez de colonnes
            if (cols.length >= 8) {
                tournaments.push({
                    numero: $(cols[0]).text().trim(),
                    date: $(cols[1]).text().trim(),
                    nomEtLieu: $(cols[2]).text().trim(),
                    categorie: $(cols[3]).text().trim(),
                    surface: $(cols[4]).text().trim(),
                    dotation: $(cols[5]).text().trim(),  // Ajouté car présent dans le tableau
                    vainqueur: $(cols[6]).text().trim(),
                    finaliste: $(cols[7]).text().trim(),
                    score: $(cols[8])?.text().trim() || ''  // Colonne optionnelle
                });
            }
        });

        console.log('Tournois ATP 2025 extraits:');
        console.log(tournaments);
        return tournaments;

    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
}

// Exécuter
await extractATPTournaments2025();