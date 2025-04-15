import * as cheerio from 'cheerio';
import { writeFile } from 'node:fs/promises';

async function extractATPTournaments2025() {
    try {
        // 1. Récupération des données depuis Wikipedia
        const $ = await cheerio.fromURL('https://fr.wikipedia.org/wiki/Saison_2025_de_l%27ATP');

        // 2. Localisation du tableau des résultats
        const tables = $('table.wikitable');
        if (tables.length < 2) {
            throw new Error('Tableau non trouvé');
        }
        const resultsTable = $(tables[1]);

        // 3. Extraction des données
        const tournaments = [];
        
        resultsTable.find('tbody tr').slice(1).each((i, row) => {
            const cols = $(row).find('td');
            
            if (cols.length >= 8) {
                tournaments.push({
                    numero: $(cols[0]).text().trim(),
                    date: $(cols[1]).text().trim(),
                    nomEtLieu: $(cols[2]).text().trim(),
                    categorie: $(cols[3]).text().trim(),
                    surface: $(cols[4]).text().trim(),
                    dotation: $(cols[5]).text().trim(),
                    vainqueur: $(cols[6]).text().trim(),
                    finaliste: $(cols[7]).text().trim(),
                    score: $(cols[8])?.text().trim() || ''
                });
            }
        });

        // 4. Sauvegarde dans un fichier JSON
        await saveTournamentsToFile(tournaments);
        
        console.log('Tournois ATP 2025 extraits et sauvegardés avec succès!');
        return tournaments;

    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
}

async function saveTournamentsToFile(tournaments) {
    try {
        const fileName = 'tournois_atp_2025.json';
        const jsonData = JSON.stringify(tournaments, null, 2); // Formatage lisible
        
        await writeFile(fileName, jsonData, 'utf-8');
        console.log(`Données sauvegardées dans ${fileName}`);
    } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err);
        throw err; // Propage l'erreur
    }
}

// Exécution
(async () => {
    await extractATPTournaments2025();
})();