// Fonction pour afficher ou cacher l'aide
function ShowHideHelp() {
    let helpZone = document.getElementById("help-placeholder");
    let helpButton = document.getElementById("help-button");
    let contenu = "";
    let texteBouton = "";
    
    if (helpZone.innerHTML === "") {
        contenu += "<h3>Aide</h3>";
        contenu += "<p>Ici, on va afficher l'aide.</p>";
        texteBouton = "Cacher l'aide";
    } else {
        texteBouton = "Afficher l'aide";
    }
    
    helpZone.innerHTML = contenu;
    helpButton.innerHTML = texteBouton;
}

// Fonction pour demander le nom et afficher un message de bienvenue
function demanderNom() {
    // Récupérer le nom saisi
    let nom = document.getElementById("bonjour-form-nom").value;
    
    // Créer une boîte de dialogue
    let boiteDialogue = document.createElement("div");
    boiteDialogue.className = "boite-dialogue";
    boiteDialogue.innerHTML = `
        <div class="boite-contenu">
            <span class="titre-dialogue">file://</span>
            <p>Bonjour ${nom} !</p>
            <button id="boutonOk" class="bouton-ok">OK</button>
        </div>
    `;
    
    // Ajouter la boîte de dialogue à la page
    document.body.appendChild(boiteDialogue);
    
    // Ajouter un événement au bouton OK
    document.getElementById("boutonOk").addEventListener("click", function() {
        boiteDialogue.remove();
    });
}


// Fonction lireFichier d'après l'image originale, mais adaptée pour fonctionner avec onchange
function lireFichier() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');
    
    let file = fileInput.files[0];
    let textType = /text.*/;
    
    if (file.type.match(textType)) {
        let reader = new FileReader();
        reader.onload = function(e) { fileDisplayArea.innerText = reader.result; }
        reader.readAsText(file);
    } else {
        alert("File not supported!");
    }
}

// Fonction pour l'exercice  - Découper le texte en mots et afficher dans un tableau
function exercice() {
    // Récupérer le texte saisi
    let texte = document.getElementById("texteExercice").value;
    
    // Découper le texte en mots
    let tokens = texte.split(" ");
    
    // Créer un tableau HTML
    let table = document.createElement("table");
    
    // Ajouter une bordure au tableau
    table.setAttribute("border", "1");
    
    // Utiliser forEach pour parcourir chaque mot
    tokens.forEach(mot => {
        // Créer une ligne pour chaque mot
        let row = document.createElement("tr");
        // Définir le contenu de la ligne
        row.innerHTML = mot;
        // Ajouter la ligne au tableau
        table.appendChild(row);
    });
    
    // Vider d'abord la zone de résultat
    let resultatDiv = document.getElementById("exerciceResultat");
    resultatDiv.innerHTML = "";
    
    // Ajouter le tableau à la zone de résultat
    resultatDiv.appendChild(table);
    
    // Ajouter une explication simple du code
    let explication = document.createElement("p");
    explication.innerHTML = "Explication : Ce code découpe le texte en mots avec split(\" \"), puis utilise forEach pour créer une ligne de tableau pour chaque mot.";
    resultatDiv.appendChild(explication);
}

// Code ajouté depuis code.js
window.onload = function() {
    let fileInputReader = document.getElementById('fileInputReader');
    let fileDisplayAreaReader = document.getElementById('fileDisplayAreaReader');
    let logger = document.getElementById('logger');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    if (fileInputReader) {
        fileInputReader.addEventListener('change', function(e) {
            // Dans le HTML, fileInput est un élément de tag "input" avec un attribut type="file".
            // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
            // On peut potentiellement donner plusieurs fichiers,
            // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
            let file = fileInputReader.files[0];
            // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
            let textType = new RegExp("text.*");

            if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
                // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
                var reader = new FileReader();

                // on dit au lecteur de fichier de placer le résultat de la lecture
                // dans la zone d'affichage du texte.
                reader.onload = function(e) {
                    fileDisplayAreaReader.innerText = reader.result;
                }

                // on lit concrètement le fichier.
                // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
                reader.readAsText(file);    

                if (logger) {
                    logger.innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
                }
            } else { // pas un fichier texte : message d'erreur.
                fileDisplayAreaReader.innerText = "";
                if (logger) {
                    logger.innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
                }
            }
        });
    }
}

// Fonction de segmentation simple avec le délimiteur "," (virgule)
function segmentation() {
    let fileDisplayAreaReader = document.getElementById('fileDisplayAreaReader');
    let pageAnalysis = document.getElementById('page-analysis');
    
    // Récupérer le contenu du fichier affiché
    let fileContent = fileDisplayAreaReader.innerText;
    
    if (!fileContent) {
        alert("Veuillez d'abord charger un fichier.");
        return;
    }
    
    // Segmenter le contenu en utilisant la virgule comme délimiteur
    let segments = fileContent.split(',');
    
    // Créer le tableau d'affichage
    let table = document.createElement('table');
    table.setAttribute('border', '1');
    
    // Créer l'en-tête du tableau
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    let thIndex = document.createElement('th');
    thIndex.textContent = 'Index';
    let thSegment = document.createElement('th');
    thSegment.textContent = 'Segment';
    
    headerRow.appendChild(thIndex);
    headerRow.appendChild(thSegment);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Créer le corps du tableau
    let tbody = document.createElement('tbody');
    
    // Ajouter chaque segment au tableau
    segments.forEach((segment, index) => {
        let row = document.createElement('tr');
        
        let tdIndex = document.createElement('td');
        tdIndex.textContent = index + 1;
        
        let tdSegment = document.createElement('td');
        tdSegment.textContent = segment.trim();
        
        row.appendChild(tdIndex);
        row.appendChild(tdSegment);
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    
    // Afficher le résultat dans la zone d'analyse
    pageAnalysis.innerHTML = '';
    pageAnalysis.appendChild(table);
    
    // Ajouter un résumé
    let summary = document.createElement('p');
    summary.innerHTML = `<strong>Nombre total de segments:</strong> ${segments.length}`;
    pageAnalysis.appendChild(summary);
}

