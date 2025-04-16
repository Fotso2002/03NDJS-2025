import * as cheerio from 'cheerio';
import fs from 'fs';

// Fonction principale pour extraire les tournois ATP 2025
async function collectTournoisATP2025() {
    try {
        const $ = await cheerio.fromURL('https://fr.wikipedia.org/wiki/Saison_2025_de_l%27ATP');

        const tableaux = $('table.wikitable');
        if (tableaux.length < 2) {
            throw new Error('Deuxième tableau introuvable sur la page');
        }

        const tableauResultats = $(tableaux[1]);
        const listeTournois = [];

        tableauResultats.find('tbody tr').each((index, ligne) => {
            const colonnes = $(ligne).find('td');

            if (colonnes.length >= 8) {
                const numeroTournoi = $(colonnes[0]).text().trim();
                const dateTournoi = $(colonnes[1]).text().trim();
                const nomEtVille = $(colonnes[2]).text().trim();
                const typeCategorie = $(colonnes[3]).text().trim();
                const typeSurface = $(colonnes[4]).text().trim();
                const montantDotation = $(colonnes[5]).text().trim();
                const nomVainqueur = $(colonnes[6]).text().trim();
                const nomFinaliste = $(colonnes[7]).text().trim();
                const resultatScore = $(colonnes[8])?.text().trim() || '';

                const tournoi = {
                    numero: numeroTournoi,
                    date: dateTournoi,
                    nomEtLieu: nomEtVille,
                    categorie: typeCategorie,
                    surface: typeSurface,
                    dotation: montantDotation,
                    vainqueur: nomVainqueur,
                    finaliste: nomFinaliste,
                    score: resultatScore
                };

                listeTournois.push(tournoi);
            }
        });

        await sauvegarderTournois(listeTournois);
        console.log('Tournois ATP 2025 extraits et sauvegardés avec succès !');

        return listeTournois;

    } catch (erreur) {
        console.error('Une erreur est survenue :', erreur);
        return [];
    }
}

// Fonction pour sauvegarder les données extraites
async function sauvegarderTournois(donnees) {
    try {
        const cheminFichier = 'C:/Users/franc/Bureau/IT/Courses/3NJS/03NDJS-2025/Day-2/exo/scraper/tournois_atp_2025.json';
        const contenuJSON = JSON.stringify(donnees, null, 2);
        await fs.promises.writeFile(cheminFichier, contenuJSON, 'utf-8');
        console.log(`Fichier enregistré : ${cheminFichier}`);
    } catch (e) {
        console.error('Échec lors de l’écriture du fichier :', e);
        throw e;
    }
}

// Lancer la récupération
async function lancerExtraction() {
    await collectTournoisATP2025();
}
lancerExtraction();
