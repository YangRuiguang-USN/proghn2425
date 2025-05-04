// Variables globales pour le traitement de texte
let global_var_tokens = [];
let global_var_lines = [];

// CV -----------------------------------------
function showHide_aboutme() {
    const aboutme = document.getElementById("aboutme");
    const button = document.getElementById("button_aboutme");
    // Pour la visibilité
    aboutme.style.display = aboutme.style.display === "none" ? "block" : "none";
    button.textContent = aboutme.style.display === "none" ? "Afficher le détail" : "Cacher le détail";
}

// Salutation -----------------------------------------
function bonjour() {
   const name = document.getElementById("nomInput").value.trim();

   const overlay = document.createElement("div");
   overlay.className = "overlay";

   const modal = document.createElement("div");
   modal.className = "modal";
   
   const closebtn = document.createElement("span");
   closebtn.className = "close";
   closebtn.innerHTML = "x";
   closebtn.onclick = () => {
        document.body.removeChild(overlay);
        document.body.removeChild(modal);
    };

   const content = document.createElement("div");
   content.innerHTML = `Bonjour, ${name || "mon ami,e"}! o(*￣▽￣*)ブ`;
   content.style.fontSize = "20px";
   
   modal.appendChild(closebtn);
   modal.appendChild(content);
   document.body.appendChild(overlay);
   document.body.appendChild(modal);

    overlay.onclick = () => {
        document.body.removeChild(overlay);
        document.body.removeChild(modal);
    };
}

// Page d'analyse et Aide -----------------------------------------
let isHelpVisible = false;

window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
        let file = fileInput.files[0];
        let textType = /text.*/;

        if (file.type.match(textType)) {
            let reader = new FileReader();
            
            reader.onload = function(e) {
                const content = reader.result;
                fileDisplayArea.innerText = content;
                
                const delim = document.getElementById("delimID").value;
                const escapedDelim = delim.replace(/[-[\]{}]/g, '\\$&');
                const regex = new RegExp(`[${escapedDelim}\\s]+`);
                // Génération des tokens
                global_var_tokens = content.split(regex).filter(t => t); 
                // Découpage en lignes
                global_var_lines = content.split(/\r\n|\r|\n/).filter(l => l.trim() !== ""); 
                
                document.getElementById("logger").innerHTML = `
                   <span class="infolog">Fichier chargé avec succès !</span>
                   <div class="stats">
                       Nombre de tokens: ${global_var_tokens.length}<br>
                       Nombre de lignes: ${global_var_lines.length}
                   </div>
                 `;
            };
            
            reader.readAsText(file);
        }
    });
}

function toggleHelp() {
    const helpDiv = document.getElementById("helpText");
    const button = document.getElementById("aideButton");
    
    isHelpVisible = !isHelpVisible;
    
    helpDiv.style.display = isHelpVisible ? "block" : "none"; 
    
    button.textContent = isHelpVisible ? "Cacher l'aide" : "Afficher l'aide"; 
    
}

// Afficher le temps -----------------------------------------
let isDateTimeVisible = false;

function showDateHeure() {
    const displayDiv = document.getElementById('dateHeureDisplay');
    const button = document.getElementById('timeButton');
    
    isDateTimeVisible = !isDateTimeVisible; 
    
    if(isDateTimeVisible) {
        // Extraire l'horaire de l'ordinateur
	let now = new Date();
	let annee = now.getFullYear();
	let mois = ('0' + (now.getMonth() + 1)).slice(-2); 
	let jour = ('0' + now.getDate()).slice(-2);      
	let heure = ('0' + now.getHours()).slice(-2);     
	let minute = ('0' + now.getMinutes()).slice(-2);  
	let seconde = ('0' + now.getSeconds()).slice(-2);

	document.getElementById("dateHeureDisplay").innerHTML = "Nous sommes le "+jour+"/"+mois+"/"+annee+" et il est "+heure+"h "+minute+"min "+seconde+"s."; 
        button.textContent = "Cacher le temps"; 
    } else {
        displayDiv.innerHTML = '';
        button.textContent = "Afficher le temps"; 
    }
}

function maj() {
        // Repérer les éléments à mettre en majuscules
	let targetElement = document.getElementById("dateHeureDisplay");
	let originalText = targetElement.innerHTML;
	targetElement.innerHTML = originalText.toUpperCase(); 
}

// Segmenter les textes -----------------------------------------
function segmentation() {
    const text = document.getElementById("fileDisplayArea").innerText;
    if (!text) {
        document.getElementById('logger').innerHTML = '<span class="errorlog">Il faut d\'abord charger un fichier .txt !</span>';
        return;
    }

    const delimInput = document.getElementById("delimID").value || 
                      document.getElementById("delimID").defaultValue;

    const escapedDelim = delimInput
        .replace(/-/g, "\\-")       
        .replace(/\[/g, "\\[")
        .replace(/\]/g, "\\]");

    const regex_delim = new RegExp(
        "[" + escapedDelim + "\\s" + "]+" 
    );

    let tokens = text.split(regex_delim)
        .map(x => x.trim())
        .filter(x => x !== "");

    global_var_tokens = tokens;

    document.getElementById("page-analysis").innerHTML = 
        `Segmentation réussie : ${tokens.join(" | ")}`;
}

// Dictionnaire -----------------------------------------
function dictionnaire() {
    const text = document.getElementById("fileDisplayArea").innerText;
    if (!text) {
        document.getElementById('logger').innerHTML = '<span class="errorlog">Il faut d\'abord charger un fichier .txt !</span>';
        return;
    }
    // Calcul de la fréquence
    const freqMap = global_var_tokens.reduce((acc, token) => {
        acc[token] = (acc[token] || 0) + 1;
        return acc;
    }, {});
    // Classer les éléments
    const sorted = Object.entries(freqMap)
        .sort((a, b) => b[1] - a[1])
        .map(([token, count]) => `<tr><td>${token}</td><td>${count}</td></tr>`)
        .join("");

    document.getElementById('page-analysis').innerHTML = `
        <table>
            <tr><th>mot</th><th>fréquence</th></tr>
            ${sorted}
        </table>
    `;
}

// GREP -----------------------------------------
function grep() {
    if (!global_var_lines || global_var_lines.length === 0) {
        document.getElementById('logger').innerHTML = '<span class="errorlog">Il faut d\'abord charger un fichier .txt !</span>';
        return;
    }

    const poleInput = document.getElementById("poleID").value.trim();

    if (!poleInput) {
        document.getElementById('logger').innerHTML = '<span class="errorlog">Entrez un pôle de recherche !</span>';
        return;
    }

    try {
        const poleRegex = new RegExp(poleInput, "gi");

        let resultat = "<tr><th>Ligne</th><th>Résultat</th></tr>";
        for (let i = 0; i < global_var_lines.length; i++) {
            if (global_var_lines[i].match(poleRegex)) {
                resultat += `<tr><td>${i+1}</td><td>${global_var_lines[i]}</td></tr>`;
            }
        }

        if (resultat === "<tr><th>Ligne</th><th>Contenu</th></tr>") {
            document.getElementById('logger').innerHTML = '<span class="errorlog">Aucun résultat.</span>';
            document.getElementById('page-analysis').innerHTML = "";
        } else {
            document.getElementById('page-analysis').innerHTML = 
                `<table>${resultat}</table>`;
        }
    } catch (e) {
        document.getElementById('logger').innerHTML = 
            `Erreur de regex: ${e.message}`;
    }
}

//Concordancier ---------------------------------------------------------------------------
function concord() {
    if (document.getElementById('fileDisplayArea').innerText == "") {
        document.getElementById('logger').innerHTML = '<span class="errorlog">Il faut d\'abord charger un fichier .txt !</span>';
    } else {
        document.getElementById('logger').innerHTML = "";
        let poleInput = document.getElementById('poleID').value;
        if (poleInput == "") {
            document.getElementById('logger').innerHTML = '<span class="errorlog">Il faut d\'abord entrer un pôle !</span>';
        } else {
            document.getElementById('logger').innerHTML = "";
            let lgInput = document.getElementById('lgID').value;
            // Vérifier si une longueur a été saisie, et si > 0
            if (lgInput == "" || parseInt(lgInput) <= 0) { 
                // Afficher un message d'erreur
                document.getElementById('logger').innerHTML = '<span class="errorlog">Il faut d\'abord entrer une longueur > 0 !</span>';
            } else {
                // Préparer les tokens si nécessaire
                if (global_var_tokens.length === 0) {
                    const text = document.getElementById('fileDisplayArea').innerText;
                    const delim = document.getElementById('delimID').value;
                    const regex = new RegExp(`[${delim.replace(/[-[\]{}]/g, '\\$&')}\\s]+`);
                    global_var_tokens = text.split(regex).filter(token => token.trim() !== "");
                }

                // Récupérer le pôle et le convertir en regex
                let poleRegex = new RegExp(poleInput, "gi");
                // Récupérer la longueur de contexte
                let long = parseInt(document.getElementById('lgID').value);
            
                // Chercher le pôle et créer une liste de concordance
                let concordance = [];
                for (let i = 0; i < global_var_tokens.length; i++) {
                    if (poleRegex.test(global_var_tokens[i])) {
                        // Créer le contexte gauche et droit
                        let cLeft = global_var_tokens.slice(Math.max(0, i - long), i).join(" ");
                        let cRight = global_var_tokens.slice(i + 1, Math.min(global_var_tokens.length, i + long + 1)).join(" ");
                        concordance.push([cLeft, global_var_tokens[i], cRight]);
                    }
                }
            
                // Afficher les résultats dans une table HTML
                let tableHTML = '<table><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr>';
                
                concordance.forEach(item => {
                    tableHTML += '<tr><td>' + item[0] + '</td><td>' + item[1] + '</td><td>' + item[2] + '</td></tr>';
                });
                
                tableHTML += '</table>';
                
                // Vérifier si des résultats ont été trouvés
                if (concordance.length === 0) {
                    // Effacer les résultats précédents
                    document.getElementById('page-analysis').innerHTML = "";
                    // Afficher un message d'erreur
                    document.getElementById('logger').innerHTML = '<span class="errorlog">Aucune correspondance trouvée.</span>';
                } else {
                    // Effacer tout message d'erreur précédent
                    document.getElementById('logger').innerHTML = '<span class="infolog">Concordancier créé avec succès.</span>';
                    // Injecter le tableau résultant dans l'élément HTML
                    document.getElementById('page-analysis').innerHTML = tableHTML;
                }
            }
        }
    }
}

// kujuj() rajoute "uj" à chaque token ------------------------------------------------
function kujuj() {
    if (document.getElementById('fileDisplayArea').innerText == "") {
        document.getElementById('logger').innerHTML = '<span class="errorlog">Il faut d\'abord charger un fichier .txt !</span>';
    } else {
        alert("c'est une plaisanterie !");
        
        // Préparer les tokens si nécessaire
        if (global_var_tokens.length === 0) {
            const text = document.getElementById('fileDisplayArea').innerText;
            const delim = document.getElementById('delimID').value;
            const regex = new RegExp(`[${delim.replace(/[-[\]{}]/g, '\\$&')}\\s]+`);
            global_var_tokens = text.split(regex).filter(token => token.trim() !== "");
        }
        
        let kujujTokens = global_var_tokens.map(token => token + "uj");
        let kujujText = kujujTokens.join(" ");
        document.getElementById('logger').innerHTML = '<span class="infolog">Transformation kujuj effectuée.</span>';
        document.getElementById('page-analysis').innerHTML = '<div>' + kujujText + '</div>';
    }
}

// Nombre de phrases -----------------------------------------
function nbPhrases() {
    if (document.getElementById('fileDisplayArea').innerText == "") {
        document.getElementById('logger').innerHTML = '<span class="errorlog">Il faut d\'abord charger un fichier .txt !</span>';
    } else {
        document.getElementById('logger').innerHTML = "";
        let text = document.getElementById('fileDisplayArea').innerText;
        let phrase = /[.!?]/g;
        let nbPhrases = (text.match(phrase) || []).length;
        let resultat = nbPhrases;
        document.getElementById('logger').innerHTML = '<span class="infolog">Analyse des phrases effectuée.</span>';
        document.getElementById('page-analysis').innerHTML = '<div>Il y a ' + resultat + ' phrase' + (resultat > 1 ? 's' : '') + ' dans ce texte.</div>';
    }
}

// Mots les plus longs -----------------------------------------
function tokenLong() {
    if (!global_var_tokens.length) {
        document.getElementById('logger').innerHTML = 
            '<span class="errorlog">Veuillez télécharger le document !</span>';
        return;
    }

    const sortedTokens = global_var_tokens
        .filter((v, i, a) => a.indexOf(v) === i) 
        .sort((a, b) => b.length - a.length || a.localeCompare(b)) 
        .slice(0, 10); // ordre par longueur et alphabet


    const html = `
        <table class="result-table">
            <tr><th>mots</th><th>longueur</th></tr>
            ${sortedTokens.map(token => `
                <tr>
                    <td>${token}</td>
                    <td>${token.length}</td>
                </tr>
            `).join('')}
        </table>
    `;

    document.getElementById('page-analysis').innerHTML = html;
}

// Pie chart -----------------------------------------
function pieChart() {
    if (!global_var_tokens.length) {
        document.getElementById('logger').innerHTML = 
            '<span class="errorlog">Veuillez télécharger le document !</span>';
        return;
    }
    // Normalisation des stopwords
    const stopwordInput = document.getElementById('stopwordID').value;
    const stopwords = stopwordInput
        .split(',')
        .map(s => s.trim().toLowerCase());
    // Filtrages des mots
    const filteredTokens = global_var_tokens
        .map(token => token.toLowerCase())
        .filter(token => !stopwords.includes(token));

    const frequencyMap = filteredTokens.reduce((acc, token) => {
        acc[token] = (acc[token] || 0) + 1;
        return acc;
    }, {});
    // Une sélection des 30 éléments
    const chartData = Object.entries(frequencyMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 30) 
        .map(([label, y]) => ({ label, y }));
    // Formuler le graphique à partir de CanvasJS
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Distribution des mots",
            fontSize: 16
        },
        legend: {
            fontSize: 12
        },
        data: [{
            type: "pie",
            showInLegend: true,
            indexLabel: "{label} ({y})",
            indexLabelFontSize: 12,
            dataPoints: chartData //Pour le graphique
        }]
    });

    chart.render();
}